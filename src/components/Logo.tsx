import styled from "styled-components";

import infoteamTextSrc from "../assets/infoteam.png";
import { ReactComponent as CatLogo } from "../assets/logo.svg";

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
    <CatLogo width={220} height={220} />
    <Image />
  </Container>
);

export default Logo;
