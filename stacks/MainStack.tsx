import { createStackNavigator } from "@react-navigation/stack";
import CreatePost, { DummyDataType } from "../Screen/CreatePost";
import Home from "../Screen/Home";
import MainTabs from "./MainTabs";
import uploadPost from "../Screen/uploadPost";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//MainStack 에 등록된 스크린 리스트(type)
export type MainStackScreenList = {
  /** 화면이름: 전달 할 data, 데이터가 따로 없으면 undefined */
  MainTabs: undefined;
  CreatePost: undefined;
  UploadPost: {
    assets: DummyDataType[];
  };
};

export type NaviProps = NativeStackNavigationProp<MainStackScreenList>;

//stack 을 사용하기위한 네비게이션 컴포넌트
export const Stack = createStackNavigator<MainStackScreenList>();

export default () => {
  return (
    <Stack.Navigator>
      {/*1번째화면 메인화면 :버텀탭스*/}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }} //기본 헤더를 안보이게 할 거임
      />
      {/*2번째화면 피드/포스트 만들기 페이지*/}
      <Stack.Screen name="CreatePost" component={CreatePost} />

      <Stack.Screen name="UploadPost" component={uploadPost} />
    </Stack.Navigator>
  );
};
