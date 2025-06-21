import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components";
import { firestore } from "../firebaseconfig";
import { IPostType } from "./TimeLime.d";

const Container = styled(View)``;
const Title = styled(Text)``;
export const Timeline = () => {
  //불러온 게시글 ';들'을 저장할 state
  const [posts, setPosts] = useState<IPostType[]>([]);

  //서버로부터 post 데이터를 불러옴옴
  const getPosts = async () => {
    //1. 특정 데이터를 가져오기 위한 쿼리문

    //. 나 혹은 다른 사람들이올린 post(게시글)을 불러오기
    //1-1 경로,
    const path = collection(firestore, "posts"); //firebase의 폴더 이름을 사용용
    //1-2 조건,
    const condition = orderBy("CreatedAt", "desc");
    const postQuery = query(path, condition);

    //2. 1번에 해당하는 데이터를 로드

    const snapshot = await getDocs(postQuery); //getDocs(쿼리문문)으로 데이터를 가져옴, await처리
    //3. 해당 데이터를 분류
    const newPost = snapshot.docs.map((doc) => {
      //3-1 doc 안에 존재하는 필드를 가져온다\
      const { userId, caption, CreatedAt, nickname, photos } =
        doc.data() as IPostType;
      //3-2 가져온 필드를 새롭게 그룹화시킴'
      return {
        id: doc.id,
        userId,
        nickname,
        CreatedAt,
        caption,
        photos,
      };
      // 아이템을벗겨내고 리턴하여 저장장
    }); //docs는 배열, 아이템템꺼내오기위해 map(콜백함수)

    //docs의 몇몇
    setPosts(newPost);
    //4. 분류된 데이터를 화면에 그려주기 위해 state 할당(저장)
  };
  useEffect(() => {
    //
    getPosts();
  }, []);

  return (
    <Container>
      <Title>TimeLine=----------------- </Title>
      {/* 서버에서 가져온 데이터를 최신순으로 보여주기기 */}
      {posts.map((post) => {
        return (
          //키값이 같아서 unique key 오류가발생, 가장 상위의 VIEW안에 key값을 줘서 중복되지 않게 설정하면 에러 해결결 map((post, index)), key에 index를 줘도됨됨
          <View key={post.id}>
            <Title>{post.id}</Title>
            <Title>{post.userId}</Title>
            <Title>{post.CreatedAt}</Title>
            <Title>{post.nickname}</Title>
            <Title>{post.caption}</Title>
            {post.photos && (
              <Image
                source={{ uri: post.photos[0] }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
        );
      })}
    </Container>
  );
};
