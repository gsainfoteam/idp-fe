import Logo from "src/components/Logo";
import styled from "styled-components";

import useAuthorize from "./useAuthorize";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1.25rem;
  text-align: center;
`;

const Authorize = () => {
  const { error } = useAuthorize();

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Authorize;
