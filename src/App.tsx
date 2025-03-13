import i18next from "i18next";
import styled from "styled-components";

import Router from "./router";

const Root = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

document.documentElement.lang = i18next.language;

const App = () => (
  <Root>
    <Router />
  </Root>
);

export default App;
