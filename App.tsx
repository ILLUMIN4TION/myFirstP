import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./stacks/MainStack";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./stacks/AuthStack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* 로그인후에 사용되는 Screen */}
      {/* <MainStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
}
