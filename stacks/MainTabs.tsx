//하단 탭을 위한 TabNavigator 컴포넌트 생성성

import {
  BottomTabView,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Home from "../Screen/Home";
import Profile from "../Screen/Profile";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator>
      {/*1번쨰 탭*/}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/*2번쨰 탭*/}
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};
