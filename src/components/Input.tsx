import styled from "styled-components";

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #e4e4e4;

  padding: 0.5rem 1rem;
  min-height: 40px;
  box-sizing: border-box;
  width: 100%;
  line-height: 1rem;

  &::placeholder {
    color: #959595;
  }
`;

export default Input;
