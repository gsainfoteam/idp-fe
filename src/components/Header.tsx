import { Link } from "react-router-dom";
import infoteamTextSrc from "src/assets/infoteam.png";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 1.25rem;
  position: sticky;
  top: 0;
  background-color: var(--color-white);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Image = styled.img`
  height: 24px;
`;
Image.defaultProps = {
  src: infoteamTextSrc,
  alt: "infoteam",
};

const Header = () => (
  <Container>
    <Logo to="/">
      <img width={70} height={70} src="/logo.svg" />
      <Image />
    </Logo>
  </Container>
);

export default Header;
