import styled from "styled-components";

import Router from "./router";

const Root = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

const App = () => (
  <Root>
    <Router />
  </Root>
);

export default App;
