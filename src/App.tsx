import styled from "styled-components";

import Landing from "./pages/Landing";

const Root = styled.main`
  max-width: 425px;
  margin: 0 auto;
`;

const App = () => (
  <Root>
    <Landing />
  </Root>
);

export default App;
