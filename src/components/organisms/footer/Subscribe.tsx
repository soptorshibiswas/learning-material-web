import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const SubscribeForm = styled.form`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const TextInput = styled(Input)`
  height: 3.125rem;
  background: ${({ theme }) => theme.colors.culturedBg};
  border-radius: 0;
`;
const SubmitButton = styled(Button)`
  height: 3.125rem;
  border-radius: 0;
`;

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState("");

  const onEmailSubmit = (event: any) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log("Subscribe Button Clicked");
  };

  return (
    <SubscribeForm onSubmit={onEmailSubmit}>
      <TextInput
        name="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubmitButton type="primary" htmlType="submit">
        Subscribe
      </SubmitButton>
    </SubscribeForm>
  );
};

export default EmailInput;
