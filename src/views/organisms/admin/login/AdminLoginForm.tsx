import React, { useRef, useState } from "react";
import {
  PasswordFieldForm,
  TextFieldForm,
} from "../../../molecules/inputfields";
import { Gap } from "../../../atoms/spaces/index";
import { FormSubmitButton } from "../../../atoms/buttons";
import { Text1 } from "../../../atoms/texts/Text";
import { useAuthContext } from "../../../../HOC/contexts/AuthContext";
import { showErrorToastAction } from "../../../../HOC/contexts/toast";
import { useRouter } from "next/router";
import { ADMIN_HOME } from "../../../../../shared/constants/routes";
import CookieModal from "../../../atoms/modal/CookieModal";
import { checkCookie } from "../../../../utils/cookie";
import styled from "styled-components";

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    margin: auto;
  }
`;

const AdminLoginForm: React.FC = () => {
  const { loginAdminApiAction } = useAuthContext();
  const router = useRouter();

  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [cookieModal, setCookieModal] = useState<boolean>(false);

  const usernameInput = useRef<any>(null);
  const passInput = useRef<any>(null);

  const onLoginSuccess = () => {
    setLoginLoading(false);
    router.replace(ADMIN_HOME());
  };

  const onSubmitClick = (e: any) => {
    e.preventDefault();

    /**
     * Check for cookie enabled first
     */
    if (!checkCookie()) {
      setCookieModal(true);
      return;
    }

    if (usernameInput?.current && passInput?.current) {
      const data = {
        username: usernameInput.current.input.value,
        password: passInput.current.input.value,
      };

      if (data.username && data.password) {
        setLoginLoading(true);
        try {
          loginAdminApiAction(data, onLoginSuccess, () =>
            setLoginLoading(false)
          );
        } catch (error) {
          setLoginLoading(false);
          showErrorToastAction({
            message: "Something went wrong",
          });
        }
      } else {
        showErrorToastAction({
          message: "Please provide all information",
          description: "Username or password is missing",
        });
      }
    }
  };

  return (
    <FormContainer onSubmit={onSubmitClick}>
      <TextFieldForm
        innerRef={usernameInput}
        name="name"
        size={"large"}
        labelSize={1}
        labelText={"Username"}
        placeholder={"Input username"}
      />
      <Gap height={"1.5rem"} />

      <PasswordFieldForm
        innerRef={passInput}
        name="password"
        size={"large"}
        labelSize={1}
        labelText={"Password"}
        placeholder={"Input password"}
      />
      <Gap height={"3rem"} />

      <FormSubmitButton
        onClick={onSubmitClick}
        size={"large"}
        type={"submit"}
        loading={loginLoading}
        disabled={loginLoading}
      >
        <Text1 level={3} color="white">
          Login
        </Text1>
      </FormSubmitButton>

      {/* ENABLE COOKIE MODAL */}
      <CookieModal
        visible={cookieModal}
        onCancel={() => setCookieModal(false)}
        onOk={() => setCookieModal(false)}
      />
    </FormContainer>
  );
};

export default AdminLoginForm;
