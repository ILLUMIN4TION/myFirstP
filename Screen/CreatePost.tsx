import { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  ActionSheetIOS,
  Touchable,
} from "react-native";
import styled from "styled-components";
import LoadingScreen from "./loadingScreen";
import * as MediaLibrary from "expo-media-library";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MainStackScreenList, NaviProps } from "../stacks/MainStack";
import HeaderBtn from "../components/HeaderBtn";

const Container = styled(View)`
  flex: 1;
`;

//myGallery photo styled-component
const PhotoBtn = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
`;

const PhotoImg = styled(Image)`
  width: 100%;
  height: 100%;
`;

//select photo
const SelectedPhoto = styled(View)`
  width: 200px;
  height: 200px;
`;

const SelectedPhotoImg = styled(Image)`
  width: 100%;
  height: 100%;
`;

//selectIcon
const InnerCircle = styled(View)`
  width: 25px;
  height: 25px;
  background-color: tomato;
  position: absolute;
  justify-content: center;
  border-radius: 50%;
  margin: 5px;
  right: 0px;
`;

const AlbumMenuTitle = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  color: black;
  margin: 15px 10px;
`;

//margin 15px 20px = 상하 15px 좌우 20px

//한 줄에 띄울 gallery photo 사진 수
const numColumns = 3;

export default () => {
  const [loading, setLoading] = useState<boolean>(true); //a :로딩 여부부
  const [myPhotos, setMyPhotos] = useState<DummyDataType[]>([]); //  //b : 갤러리에서 불러온 사진들 초기값을 지정할 떄 대충 어떤 타입이 들어갈 지 예상해서 ()안에 넣어준다, 지금은 배열타입
  const [selectedPhotos, setSelectedPhotos] = useState<DummyDataType[]>([]); //c : 불러온 사진 중에서 선택한 사진들
  //hOOK :스마트폰의 화면 넓이르 가져오는 기능
  const { width: WIDTH } = useWindowDimensions();

  //Hook, page이동을 하기위한 네비게이션 훅

  const navi = useNavigation<NaviProps>();

  //갤러리 포토 사이즈 (in FlatList)
  const itmeSize = WIDTH / numColumns; //넘 칼럼즈 = 3 width /3

  const photoSize = WIDTH * 0.7;
  const photoPadding = (WIDTH - photoSize) / 2;

  //내가 선택한 사진인지 아닌지 확인 타입을 지정해주기기

  const isSelect = (photo: DummyDataType): boolean => {
    const findPhotoIndex = selectedPhotos.findIndex(
      (asset) => asset.id === photo.id
    );
    //findPhotoIndex: 0보다 작으면 내가 선택하지 않은 값이므로 false 반환
    //finPhotoIIndex: 0보다 크면 내가 선택한 사진이므로 true 반환환
    return findPhotoIndex < 0 ? false : true;
  };

  const onSelectPhoto = (photo: DummyDataType) => {
    //1선택한 사진인지 아닌지 확인
    // photo가 selectedphotos안에 들어가있는지 확인,
    // let isSelected = false;
    // for (let i = 0; i< selectedPhotos.length; i++) {
    //   if(selectedPhotos[i].id == photo.id){
    //     isSelected = true;
    //     true;
    //   }
    // }

    const findPhotoIndex = selectedPhotos.findIndex(
      (asset) => asset.id === photo.id
    );

    //A 한 번도 선택 안 한 사진 =>선택한 사진 리스트(selectedPhotos)에 추가가
    if (findPhotoIndex < 0) {
      const newPhotos = [...selectedPhotos, photo];
      //selectedPhotos의 state에 내가 선택한 사진을 추가
      setSelectedPhotos(newPhotos);
    }

    //B 이미 선택했던 사진 =>선택한 사진리스트에서 삭제
    else {
      //지우고싶은 사진의 인덱스 번호 알아오기, ->findPhotoIndex
      //선택사진 리스트에서 해당 인덱스의 사진 지우기
      const removedPhotos = selectedPhotos.concat();
      const deleteCount = 1;
      removedPhotos.splice(findPhotoIndex, deleteCount);
      setSelectedPhotos(removedPhotos);
      //해당사진이 지워진 새로운 리스트로 갱신(update)
    }
    //내가 선택한 사진이 추가된 새로운 리스트 생성
    //...?? : Spread 문법 배열/리스트에 있는 요소들을 모두 꺼내옴옴
  };

  //갤러리에서 사진들 불러오기 (비동기처리 )
  const getMyPhotos = async () => {
    //1. 나의 사진첩에 접근 권한 요청
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === MediaLibrary.PermissionStatus.DENIED) {
      Alert.alert(
        "사진접근권한",
        "기능을 사용하시려면 사진 접근 권한을 허용해주세요",
        [
          {
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ]
      );
      return;
    }

    const { assets } = await MediaLibrary.getAssetsAsync();

    setMyPhotos(dummyPhotoDatas);

    setLoading(false);
  };

  //현재페이지 접속 시 한 번 실행되는 Hook
  useEffect(() => {
    //3초후에 getMyPhotos실행

    setTimeout(() => {
      getMyPhotos();
    }, 500);
  }, []); //deps 의존성 배열, 원래 useEffect() 안의 내용은 페이지 생성시 한 번만 실행되지만, 의존성 배열을 통해 특정 지점에 변경경

  //Header의 Style을 변경하기 위해 사용
  useLayoutEffect(() => {
    //navigation hook 사용하여 헤더 접근

    //헤더 접근근
    //문제 페이지 생성시 1번실행,=>  비어있는 selectedPhoto를 1번 집어넣고 끝, 사진을 나중에 선태갷도 selectedPhotos가 갱신이 되지않음 => 의존성배열 사용[sele...photo]를 넣어서 사진 선택시마다 useEffect가 새로 실행되게하여 갱신되도록 설정.
    const goTO = () => {
      //선택한 사진이 없으면 이동 알람!
      if (selectedPhotos.length < 1) {
        Alert.alert("알림", "선택한 사진이 없습니다. 사진을 선택해주세요");
        return;
      }

      //페이지 이동동
      //navigation(param1(이동할 스크린 이름), param2(존덜할 데이터))
      navi.navigate("UploadPost", {
        assets: selectedPhotos, //assets이라는 이름으로 selectedPhotos 데이터 가지고 전달 / Stack에서 가져갈 데이터 타입(설계도도 )정의의
      });
    };

    //네이게이션 훅을 사용해
    navi.setOptions({
      //json객체 여기 안에서는 자동완성 안됨됨/
      headerRight: () => <HeaderBtn title="Next" onPress={goTO} />,
    });
  }, [selectedPhotos]);

  //로딩일때 로딩스크린, 로딩끝나면 현재페이지

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      {/* A.내가 선택할 사진들 보여줄 가로 스크롤뷰 */}
      <ScrollView
        style={{ width: WIDTH + 100, height: WIDTH + 100 }}
        contentContainerStyle={{
          paddingHorizontal: photoPadding,
          alignItems: "center",
          gap: 10,
        }}
        snapToInterval={photoSize + 10}
        decelerationRate={"fast"}
        horizontal={true} //가로모드드
        showsHorizontalScrollIndicator={false}
      >
        {selectedPhotos.map((photo, index) => {
          return (
            <SelectedPhoto
              key={index}
              style={{
                width: photoSize,
                height: photoSize,
              }}
            >
              <SelectedPhotoImg source={{ uri: photo.uri }} />
            </SelectedPhoto>
          );
        })}
      </ScrollView>

      <AlbumMenuTitle> 최근 순 </AlbumMenuTitle>

      {/* B.내 갤러리의 사진들 보여줄 세로 플랫리스트 */}
      <FlatList
        //keyExtractor ={(item) =?item.id} 아이디가 있으면 다음방식 없으며 ㄴ아래방식식
        keyExtractor={(itemm, index) => index.toString()}
        numColumns={numColumns} //FlatList의 세로줄 갯수를 3으로 하겠다 numColumns = 3
        data={myPhotos} //보여줄 데이터터
        //renderITem : data 를 어떻게 보여줄지를 결정
        renderItem={({ item }) => {
          return (
            <PhotoBtn
              onPress={() => onSelectPhoto(item)}
              style={{ width: itmeSize, height: itmeSize }}
            >
              <PhotoImg source={{ uri: item.uri }} />
              {isSelect(item) && (
                <InnerCircle>
                  <FontAwesome name="check" size={24} color={"Black"} />
                </InnerCircle>
              )}
            </PhotoBtn>
          );
        }}
      />
    </Container>
  );
};

//더미데이터의의 타입 제작 ver1, 더미데이터를 전달하기 위해 export를 사용 => 다른페이지로 ㅓ전달하기위ㅔ해해
export type DummyDataType = {
  id: string;
  uri: string;
};

//[TYPE] => union (값을 제한)
//type AlignItems = "center|'flex-end'|flex-start'"
//const style:Alignitems = 1 <_ 버그 "center,flex-end,flex-start만 들어갈 수 있음음"

//더미데이터의 타입 제작 ver2 , 타입보다 국소적(좁은) 범위, 우리가 만들어야하는 틀이 아래처럼 단순한 구조라면(형태만 있다면면) interface를 사용하는 게 더 좋음음 Type은 형태를 잡고 나머지 부가기능도 사용할 수 있는 것것
interface IdummyData {
  id: string;
  uri: string;
}

//더미 데이터  내가 만든 커스텀 타입을 변수의 타입으로 설정할 수 있음
const dummyPhotoDatas: DummyDataType[] = [
  {
    id: "1",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-SYQ4Ez6ByTo9hWWwNQ4qf9o3o7dseAlyyw&s",
  },
  {
    id: "2",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH_VaZ4prGJaLV5VUqlEejRNkDQdkddrT5uQ&s",
  },
  {
    id: "3",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSU7ewvK9sAhqSMv8_pSKRChnHe-BfT0r30g&s",
  },
  {
    id: "4",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKtWQKkjwHdJWB4Qdy7cUr1bgIHdiYe5GHkw&s",
  },
  {
    id: "5",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9BIVJJb8gyi7ukgGNU4Op-hm2L5IVO4pQA&s",
  },
  {
    id: "6",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_qoxBU-yRiZUU2DRfFVeNEpG13vv79SXOA&s",
  },
  {
    id: "7",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3hg6mKT8ruXz7Rh4Avkyd1E6Vmv_7yQkMw&s",
  },
  {
    id: "8",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqOTp8cG1koFX0t3Z-15UiGlZe0hyGbIi1w&s",
  },
  {
    id: "9",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3hg6mKT8ruXz7Rh4Avkyd1E6Vmv_7yQkMw&s",
  },
  {
    id: "10",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqOTp8cG1koFX0t3Z-15UiGlZe0hyGbIi1w&s",
  },
];
