//로그인 전에 사용할 수 있는 페이지들을 모은 페이지

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screen/login/LoginScreen";

export type AuthStackScreenList = {
  Login: undefined;
};
const Stack = createStackNavigator<AuthStackScreenList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"Login"}
        component={LoginScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
