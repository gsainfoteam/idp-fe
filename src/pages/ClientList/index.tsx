import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useClients } from "src/api/client";
import Button from "src/components/Button";

import {
  ClientCardContainer,
  Container,
  Divider,
  Row,
  Section,
  Title,
} from "./styles";

const ClientCard = ({
  uuid,
  name,
  id,
}: {
  uuid: string;
  name: string;
  id: string;
}) => (
  <ClientCardContainer>
    <b>
      <Link to={`/clients/${uuid}`}>{name}</Link>
    </b>
    <div>
      ID: <code>{id}</code>
    </div>
  </ClientCardContainer>
);

const ClientListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: clients } = useClients();
  return (
    <Container>
      <Section>
        <Row>
          <Title>{t("clients.list.title")}</Title>
        </Row>

        {clients?.map((client) => (
          <Row key={client.uuid}>
            <ClientCard {...client} />
          </Row>
        ))}
      </Section>

      <Divider />

      <Section>
        <Button onClick={() => navigate("/clients/new")}>
          {t("clients.list.add")}
        </Button>
      </Section>
    </Container>
  );
};

export default ClientListPage;
