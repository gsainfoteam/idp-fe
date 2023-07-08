import styled from "styled-components";

import Router from "./router";

const Root = styled.main`
  max-width: 425px;
  margin: 0 auto;
`;

const App = () => (
  <Root>
    <Router />
  </Root>
);

export default App;
