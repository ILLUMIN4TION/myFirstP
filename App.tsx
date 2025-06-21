import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./stacks/MainStack";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./stacks/AuthStack";
import { useEffect, useState } from "react";
import { auth } from "./firebaseconfig";
import { User } from "firebase/auth";
import LoadingScreen from "./Screen/loadingScreen";

const Stack = createStackNavigator();

export default function App() {
  //유저정보 state
  const [user, setUser] = useState<User | null>(null);

  //로딩 여부 파악할 때까지 걸리는 시간 동안만 로딩
  const [loading, setLoading] = useState(true);

  //서버와 소통하여 로그인 여부를 파악하는 함수
  const getAuth = async () => {
    try {
      //서버와 통신, 로그인 여부 확인까지 기다림
      await auth.authStateReady(); //파이어베이스에 연결해서 로그인유무를 처리하여 auth에 저장 <- 여기서 로그인 여부 파악이 완료됨, 로딩종료

      setLoading(false);

      //로그인 여부에 따른 현재 접속 유저의 상태변화 체크
      auth.onAuthStateChanged((authState) => {
        //상태변화에따라 로그인 여부 판단S
        //로그인 성공 user에 값 할당
        //로그인 실패 user에 값 리셋
        if (authState) setUser(authState);
        else setUser(null);
      });

      //상태변화에 따라 Login 여부 판단
    } catch (e) {
      console.warn(e);
    }
  };
  //App.tsx 실행 시 최초 1번 실행하는 useEffect
  useEffect(() => {
    getAuth();
  }, []);

  const mainStream = user ? <MainStack /> : <AuthStack />;

  return (
    <NavigationContainer>
      {/* 로그인여부에 따라 다른 stack등록
      로그인 o  : mainStack
      로그인 x : authStack 
      1번쨰 검사 로딩여부 , 2.로그인을 실제로 했나 안했나 확인 
      */}

      {loading ? <LoadingScreen /> : mainStream}
    </NavigationContainer>
  );
}
