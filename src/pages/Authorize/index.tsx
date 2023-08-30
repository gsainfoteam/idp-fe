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

const translateScope = (scope: string) => {
  switch (scope) {
    case "student_id":
      return "학번";
    case "profile":
      return "프로필";
    case "email":
      return "이메일";
    case "phone":
      return "전화번호";
    default:
      return scope;
  }
};

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

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!clientData) return null;

  if (scopesNotConsented.length > 0) {
    return (
      <Container>
        <h1>아래 항목에 동의해주세요</h1>
        <p>
          다음에 연결 : <strong>{clientData?.name}</strong>
        </p>
        <p>
          다음 항목에 동의해야 합니다 :
          {scopesNotConsented.map(translateScope).join(", ")}
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
                {translateScope(scope)}
              </label>
            </li>
          ))}
        </ul>
        <p>
          <button
            style={{
              backgroundColor: "#eb6263",
              padding: "0.5rem 1rem",
              color: "white",
            }}
            onClick={() => consent(scopesConsented)}
          >
            동의합니다
          </button>
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
