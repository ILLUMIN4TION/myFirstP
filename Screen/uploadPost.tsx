import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components";
import { MainStackScreenList, NaviProps } from "../stacks/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderBtn from "../components/HeaderBtn";
import { auth, firestore as firestoreDB, storage } from "../firebaseconfig";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { assetToBlob } from "../utils";

const Conatiner = styled(View)`
  background-color: black;
  flex: 1;
`;
const Title = styled(Text)``;

const UploadBox = styled(View)`
  flex-direction: row;
`;

const Caption = styled(View)`
  flex: 1; /*남아있는 모든 영역 100%로 설정하기 <- CSS 안에 주석을 달기 위해 다음과 같이 주석을 작성해야함    */
`;

const Input = styled(TextInput)`
  color: white;
  font-size: 20px;
  padding: 15px;
`;

const PhotoBox = styled(View)`
  width: 100px;
  height: 100px;
`;

const Photo = styled(Image)`
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const PhotoBlack = styled(View)`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
  border-radius: 10px;
  position: absolute;
`;

const LoadingBox = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #000000b8;
`;

//외부의 데이터를 가져오기 위해 사용용, 여기서 {}는 구조분해를 해서 가져온다는 뜻 구조분해된 것을 또 구조분해해서 가져올때 구조분해된 아이템 옆에 : 를 입력력
//route.params -> usaNavigation에서 전달받은 데이터가 들어어있음 , 메인스택스크린리스트에 지정해둔 assets을 가져올 수 있음음
export default ({
  route: { params },
}: NativeStackScreenProps<MainStackScreenList, "UploadPost">) => {
  //   const assets = params.assets === null ? [] : params.assets; //널일 경우 빈 배열, 있을 경우 가져오기기 방법1 삼항연산자
  const assets = params.assets ?? []; //타입스크립트의 방법2
  //input text caption을 관리하는 state
  const [caption, setCaption] = useState<string>("");

  //input text 입력/변경 시, State에 반영할
  const onChangeCaption = (text: string) => {
    setCaption(text);
    //추출한 Text(입력한 caption)을 state에 저장
  };

  const [loading, setLoading] = useState<boolean>(false);

  const navi = useNavigation();

  //사진과 글을 업로드하기 위한 함수
  const onUpload = async () => {
    //방어코드: text 작성 안한 경우, 작성하도록 알람람
    if (caption === "") {
      Alert.alert("업로드 오류", "캡션을 적어야 업로드가 가능합니다,");
      return;
    }
    if (loading) return;
    //방어코드2, 업로드중 업로드를 방지하기 위해 로딩중이 아닌 경우에만 업로드 가능, 로딩중에는 기능종료

    setLoading(true);
    try {
      //2sever에 데이터 업로드
      //서버에 업로드할 데이터 셋 만들기기
      const uploadData = {
        caption: caption,
        userID: auth.currentUser?.uid,
        CreatedAt: Date.now(),
        nickname: auth.currentUser?.displayName,
      };
      //어디 서버에 업로드 할지 경로 지정하기기
      const path = collection(firestoreDB, "posts");
      //만든 파일을 토대로 doc로 만들어 올리기
      const doc = await addDoc(path, uploadData);

      //firebase storage(image) convert(url) upload
      //1. 여러 사진들을 url형식으로 변환하여 업로드할 배열 만들기
      const photoURLs = [];

      //2. 여러 사진들을 반복해서 서버에 업로드하고 배열에 넣는다.

      for (const asset of assets) {
        //  2-2 여러 사진들을 서버에 업로드 storage
        //2-2-1 경로, blob형태로 추가변환환
        const path = `posts/${auth.currentUser?.uid}/${doc.id}/${asset.id}.png`;
        const locationRef = ref(storage, path);

        const blob = await assetToBlob(asset.uri);
        //  2-3 서버에 업롣한 사진을 url로 변환
        const result = await uploadBytesResumable(locationRef, blob);

        //  2-4 uRL로 변환된 사진들 배열에 추가

        const url = await getDownloadURL(result.ref);

        photoURLs.push(url);

        await updateDoc(doc, { photos: photoURLs });

        //4. 홈화면(메인화면) 으로 이동
        if (navi.canGoBack()) {
          navi.goBack();
          navi.goBack(); //이전 페이지로 ㄴ이동
        }
      }

      //3. url로 변환된 여러 사진들을 넣은 배열을 서버에(firesote) 업로드하여 갱신
    } catch (error) {
      //exception: 예외처리, 업로드가 실패시 --Error

      Alert.alert("error", `${error}`);
    } finally {
      //try든 catch든 끝나면 모두 이코드 실행  //에러발생시에도 로딩 종료
      setLoading(false);
    }
  };

  //header를 만들기 위해 useLayoutEffec를 작성
  useLayoutEffect(() => {
    //헤더 수정 need to navigaton 아직 안만듬듬
    navi.setOptions({
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor:
        "white" /*틴트컬러, 헤더 텍스트 컬러, 헤더타이틀, 헤더의 텍스트 */,
      headerTitle: "Caption",
      headerRight: () => <HeaderBtn title="Upload" onPress={onUpload} />,
    });
  }, [loading, caption, assets]);

  return (
    <Conatiner>
      <Title>Upload Post Page</Title>
      <UploadBox>
        <PhotoBox>
          <Photo source={{ uri: assets[0].uri }} />
          <PhotoBlack />
          {/**두 장 이상일 경우에만 아이콘 표시 */}
          {assets.length > 1 && (
            <AntDesign
              style={{ position: "absolute", right: 0, margin: 7 }}
              name="switcher"
              size={25}
              color={"white"}
            />
          )}
        </PhotoBox>
        {/*글작성부분분*/}
        <Caption>
          <Input
            multiline={true}
            value={caption}
            placeholder="글을 작성해주세요"
            placeholderTextColor={"#646464"}
            onChangeText={(text) => {
              onChangeCaption(text);
            }}
          />
        </Caption>
      </UploadBox>
      {loading && (
        <LoadingBox>
          <ActivityIndicator size={"large"} color={"white"} />
          <Text style={{ color: "white" }}>Uploading</Text>
        </LoadingBox>
      )}
    </Conatiner>
  );
};
