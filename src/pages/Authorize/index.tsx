import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "src/components/Button";
import Logo from "src/components/Logo";
import { Scope } from "src/utils/schema";
import styled from "styled-components";
import { z } from "zod";

import useAuthorize from "./useAuthorize";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1.25rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  padding: 0.5rem 0;
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      margin-left: 0.5rem;
    }
  }

  &:not(:first-of-type) {
    border-top: 1px solid #ccc;
  }
`;

const Authorize = () => {
  const { error, consent, scopesNotConsented, clientData } = useAuthorize();
  const [scopesConsented, setScopesConsented] = useState<
    z.infer<typeof Scope>[]
  >([]);
  const { t } = useTranslation();

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
        <Title>{t("authorize.title", { application: clientData.name })}</Title>
        <p>{t("authorize.description", { application: clientData.name })}</p>
        <List>
          {scopesNotConsented.map((scope) => (
            <Item key={scope}>
              <label>
                {t(`authorize.scopes.${scope}`)}
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
                />
              </label>
            </Item>
          ))}
        </List>
        <p>
          <Button onClick={() => consent(scopesConsented)}>
            {t("authorize.action")}
          </Button>
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
