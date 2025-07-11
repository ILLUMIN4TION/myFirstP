import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components";
import { auth } from "../../firebaseconfig";
import { FirebaseError } from "firebase/app";
import { useNavigation } from "@react-navigation/native";
import { AuthNaviProps, AuthStackScreenList } from "../../stacks/AuthStack";
import SignUpScreen from "./SignUpScreen";

const ImageContainer = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WelcomeTitle = styled(Text)`
  font-size: 14px;
  color: black;
`;

const AccountBox = styled(View)`
  background-color: white;
  width: 70%;
  padding: 20px;
  border-radius: 10px;
  gap: 25px;
`;

const Logo = styled(Image)`
  width: 100%;
  height: 70px;
`;

const InputFIeld = styled(View)`
  gap: 10px;
`;

const UserInput = styled(TextInput)`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  color: black;
`;

const UserId = styled(UserInput)``;

const UserPw = styled(UserInput)``;

const LoginBtn = styled(TouchableOpacity)`
  background-color: dodgerblue;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

const LoginBtnTitle = styled(Text)`
  color: white;
`;

const CreateAccountBox = styled(View)`
  align-items: center;
`;

const CreateAccountBtn = styled(TouchableOpacity)``;

const SubTitle = styled(Text)`
  font-size: 12px;
  color: #8f8f8f;
`;

export default () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navi = useNavigation<AuthNaviProps>();

  //email, pw input text를 가져와서 문자에 state에 할달
  const onchageText = (text: string, type: "email" | "password") => {
    switch (type) {
      case "email":
        setEmail(text);
        break;
      case "password":
        setPassword(text);
        break;
    }
  };

  //login버튼 클릭시 호출 서버와 통신하여 로그인 프로세스 진행
  const onLogin = async () => {
    //방어코드1 로그인, 패스워드 입력x
    //방어코드2 아직 로딩중중]

    setLoading(true);
    //1.로그인에 필요한 정보를 받아오기
    //2. 서버와 통신 try catch, async
    //3.Error, loading 작업
    try {
      //user의 id pw auth정보를 통해 firebase에 로그인 요청
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        Alert.alert("로그인 성공");
      }
    } catch (error) {
      //fireBase관련 에러인 경우에만만
      if (error instanceof FirebaseError) {
        // code 형변환(as) sting -> Errorcode

        const code = error.code as keyof errorCodeType;
        //해당 키값의 밸류를 가져옴
        const message = ErrorCode[code];
        Alert.alert("경고", message);
      }
    } finally {
      //에러 여부와는 관계없이 종료 로딩을 종료해야하므로
      setLoading(false);
    }
  };
  //CreateAccount 버튼 클릭시, 회원가입 페이지로 이동
  const goTo = () => {
    navi.navigate("SignUp"); //우리가 만든 다른 스택의 페이지를 이동할 수 없음
  };

  return (
    <ImageContainer
      source={require("../../assets/resources/instaDaelim_background.jpg")}
    >
      <AccountBox>
        <Logo
          source={require("../../assets/resources/instaDaelim_title.png")}
        />
        <WelcomeTitle>
          Welcome!{"\n"}Here is a My Instagram for Daelim. Glad to meet u guys
        </WelcomeTitle>
        <InputFIeld>
          <UserId
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => onchageText(text, "email")}
          />

          <UserPw
            placeholder="Password"
            keyboardType="default"
            value={password}
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={(text) => onchageText(text, "password")}
          />

          {/* null vs undefined null은 저장된 주소는 있지만 값이 x , 장소도 존재하지 않는 것이 undefinded */}
        </InputFIeld>
        <LoginBtn onPress={loading ? undefined : onLogin}>
          <LoginBtnTitle>{loading ? "Loading..." : "Log in"}</LoginBtnTitle>
        </LoginBtn>
        <CreateAccountBox>
          <SubTitle>Already have an account?</SubTitle>
          <CreateAccountBtn onPress={goTo}>
            <SubTitle
              style={{
                color: "#81b6ff",
                fontWeight: "600",
                textDecorationLine: "underline",
                fontSize: 12.5,
              }}
            >
              Create Account
            </SubTitle>
          </CreateAccountBtn>
        </CreateAccountBox>
      </AccountBox>
    </ImageContainer>
  );
};

//퍼이어 베이스 로그인 에러 코드
//auth/invalid-credential 유효하지 않은 이메일/암호
//auth/invalid-email 유효하지 않은 이메일 형식
//auth/missis-password  비밀번호 입력 x
type errorCodeType = {
  "auth/invalid-credential": string;
  "auth/invalid-email": string;
  "auth/missing-password": string;
  name: "";
};

const ErrorCode: errorCodeType = {
  "auth/invalid-credential": "유효하지 않은 이메일 또는 비밀번호입니다.",
  "auth/invalid-email": "유효하지 않은 이메일 형식입니다.",
  "auth/missing-password": "비밀번호를 입력하세요.",
  name: "",
};
