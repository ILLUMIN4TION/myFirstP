##수업 명령어

#Expo 서버 시작
npx expo start

npx create-expo-app "프젝이름" --template
black(TypeScript)

expo icon 설치
npm install @expo/vector-icons --force

파이어 베이스 설치하기:
1.firebase 프로젝트 생성 -웹으로 추가가
2.firebase SDK 추가가
npm install 3. firebase sdk config 설정 복하해서 , firebaseconfig 만들고 붙여넣기기

## FireBase RN용으로 변경하기위한 Asyncstoragr설치

1. npm i @react-native-async-storage/async-storage
2. firebaseConfig에 1번으로 설치된 설정값 추가/수정정
3. tsCondig.ts 에 "paths" ["@firebase/auth":.. 키 밸류 ] 추가 - 2번을 하기위해 바른 사용경로 인식을 위한 ts작성

## expo build

1. npx expo login (expo 홈페이지에서 새로 가입을하든, 로그인을 하든 해야함함)
2. eas build -p android (.apk)
3. eas build -p ios (.ipa) .. Apple
