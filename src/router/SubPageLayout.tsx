import { Outlet } from "react-router";
import Header from "src/components/Header";
import styled from "styled-components";

const Container = styled.div``;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2.25rem;
`;

const SubPageLayout = () => (
  <Container>
    <Header />
    <Wrapper>
      <Outlet />
    </Wrapper>
  </Container>
);

export default SubPageLayout;
