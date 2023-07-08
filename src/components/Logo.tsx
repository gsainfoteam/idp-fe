import infoteamTextSrc from "src/assets/infoteam.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`;

const Image = styled.img`
  height: 48px;
  margin-top: -20px;
`;
Image.defaultProps = {
  src: infoteamTextSrc,
  alt: "infoteam",
};

const Logo = () => (
  <Container>
    <img width={220} height={220} src="/logo.svg" />
    <Image />
  </Container>
);

export default Logo;
