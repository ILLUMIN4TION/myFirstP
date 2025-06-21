//로그인 전에 사용할 수 있는 페이지들을 모은 페이지

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screen/login/LoginScreen";
import SignUpScreen from "../Screen/login/SignUpScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackScreenList = {
  Login: undefined;
  SignUp: undefined;
};
const Stack = createStackNavigator<AuthStackScreenList>();

//페이지 이동 시 필요한 navi props 타입 생성 간단하게 이동하기 위함함
export type AuthNaviProps = NativeStackNavigationProp<AuthStackScreenList>;

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"SignUp"} component={SignUpScreen} />
    </Stack.Navigator>
  );
};
