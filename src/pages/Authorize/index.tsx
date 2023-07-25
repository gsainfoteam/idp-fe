import { useEffect, useState } from "react";
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
  const { error, consent, scopesNotConsented, clientData } = useAuthorize();
  const [scopesConsented, setScopesConsented] = useState<string[]>([]);

  useEffect(() => {
    if (!clientData) return;
    if (scopesNotConsented.length > 0) {
      setScopesConsented(
        clientData.recentConsent
          ? clientData.recentConsent
          : scopesNotConsented,
      );
    }
  }, [clientData, scopesNotConsented]);

  if (!clientData) return null;

  if (error) {
    return <Container>{error}</Container>;
  }

  if (scopesNotConsented.length > 0) {
    return (
      <Container>
        <h1>Missing scopes</h1>
        <p>
          application name: <strong>{clientData?.name}</strong>
        </p>
        <p>
          You need to consent to the following scopes for{" "}
          {scopesNotConsented.join(", ")}
        </p>
        <ul>
          {scopesNotConsented.map((scope) => (
            <li key={scope}>
              <label>
                <input
                  type="checkbox"
                  checked={scopesConsented.includes(scope)}
                  onChange={(e) =>
                    setScopesConsented(
                      e.target.checked
                        ? [...scopesConsented, scope]
                        : scopesConsented.filter((s) => s !== scope),
                    )
                  }
                  readOnly
                />{" "}
                {scope}
              </label>
            </li>
          ))}
        </ul>
        <p>
          <button onClick={() => consent(scopesConsented)}>Consent</button>
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Authorize;
