import { View, Text, Button } from "react-native";
import { auth } from "../firebaseconfig";

export default () => {
  //log아웃할 수있는 버튼
  const signOut = async () => {
    auth.signOut();
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="logout" onPress={signOut} />
    </View>
  );
};
