import { resolvePlugin } from "@babel/core";

/** 
 @param url 특정 asset, photo 등이 url 값값
*/
export const assetToBlob = async (url: string) => {
  //fetch 함수를 활용해서 blob데이터로 밖?ㅜ기 위한 응답데이터
  const respone = await fetch(url);

  const blob = await respone.blob();

  return blob;
  //응답 데이터로부터 blob생성

  // 생성된 blob데이터 반환(return)
};
