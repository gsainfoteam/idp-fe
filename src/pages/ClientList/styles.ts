import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  background-color: #f5f5f5;
  height: 1px;
  margin: 1.875rem 0;

  @media screen and (max-width: 425px) {
    height: 1rem;
    margin: 1.875rem -2.25rem;
  }
`;

export const Section = styled.section`
  padding: 0 1.875rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary-text);
  margin: 0;
`;

export const ClientCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
`;
