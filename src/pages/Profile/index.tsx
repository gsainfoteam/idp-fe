import { useTranslation } from "react-i18next";
import { useAuth } from "src/api/auth";
import Button from "src/components/Button";

import {
  Container,
  Divider,
  LabelTitle,
  LabelValue,
  Row,
  Section,
  TextLink,
  Title,
} from "./styles";

const Landing = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <Container>
      <Section>
        <Row>
          <Title>{t("profile.userInfo")}</Title>
          {/* <TextLink to="/profile/edit">{t("profile.edit")}</TextLink> */}
        </Row>
        <Row>
          <LabelTitle>{t("name.label")}</LabelTitle>
          <LabelValue>{user.name}</LabelValue>
        </Row>
        <Row>
          <LabelTitle>{t("studentId.label")}</LabelTitle>
          <LabelValue>{user.studentId}</LabelValue>
        </Row>
        <Row>
          <LabelTitle>{t("email.label")}</LabelTitle>
          <LabelValue>{user.email}</LabelValue>
        </Row>
        <Row>
          <LabelTitle>{t("phoneNumber.label")}</LabelTitle>
          <LabelValue>{user.phoneNumber}</LabelValue>
        </Row>
      </Section>
      <Divider />
      {/* <Section>
        <Title>{t("profile.services.title")}</Title>
      </Section>
      <Divier /> */}
      <Section>
        <Button onClick={logout} outline>
          logout
        </Button>
        <TextLink to="/profile/withdraw">
          {t("profile.withdraw.action")}
        </TextLink>
      </Section>
    </Container>
  );
};

export default Landing;
