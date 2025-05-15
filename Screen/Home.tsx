import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { MainStackScreenList, NaviProps } from "../stacks/MainStack";

export default function Home() {
  //0. init(initialized)
  //Hook: 특정한 어떤 특수한한 기능능을 조금 더 편리하게 사용할수 잇도록 별도로 만든 함수같은 것 : 네비게이션 기능을 사용하기 위한 훅사용
  const navi = useNavigation<NaviProps>(); //이동할 페이지 설계도 미리 전달 받음

  //1. Logic Process 받은 데이터를 분리 추론하거나, 기능수행  등등
  const goToPage = () => {
    //Alert.alert("페이지 이동!") <- 화면에 알림을 표시해주는 기능
    navi.navigate("CreatePost");
  };

  //2. Page UI Rendering 페에지를 그려주기위한 영역
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>InstaDaelim</Text>
        <Button onPress={goToPage} title={"CREATE"}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    flex: 1,
    justifyContent: "flex-start", //flex가 사용됐을 때 flex가 start되는 flex-start로 설정할 경우 생략가능능
    //alignItems: ''// flex, 모든 기기에서 해당 영역이 얼마정도를 차지하는지 알아서 처리해주는 프로퍼티티
  },
  header: {
    backgroundColor: "tomato",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //paddingLeft: 20,
    //paddingRight:20,
    paddingHorizontal: 15,

    //width: '100%' 생략가능능
  },
});
