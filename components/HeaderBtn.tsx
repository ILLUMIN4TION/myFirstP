import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

const BtnContainer = styled(TouchableOpacity)`
  padding: 10px 15px;
`;

const Title = styled(Text)`
  font-size: 18px;
  color: tomato;
`;

//전달받을 props의 타입을 지정
type Props = {
  /**버튼의 타이틀틀 */
  title: string;
  /**버튼 눌렀을 때 실행되는 함수*/
  onPress: () => void;
};

export default ({ title, onPress }: Props) => {
  return (
    <BtnContainer onPress={onPress}>
      <Title>{title}</Title>
    </BtnContainer>
  );
};
/*지금은 onPress={}안에 ()=>{} 양쪽 다 매개변수가 없기 떄문에 저렇게 줄여 쓸 수 있음음 */
