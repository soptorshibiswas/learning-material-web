import React, { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { ADMIN_LOGIN } from "../../../shared/constants/routes";
import { IAdminLoginData, IAuthAdmin } from "../../../shared/types/admin";
import { loginAdminApi, logoutAdminApi } from "../../apiLib/admin/adminApi";
import { IAdminApiError } from "../../apiLib/admin/adminApiURLs";
import { handlePublicApiError } from "../../apiLib/errorHandlers";
import { showErrorToastAction, showToastAction } from "./toast";

interface IAuthContextProps {
  isAuthenticated: boolean;
  authAdmin: IAuthAdmin | null;
  setAuthentication: (isAuth: boolean, authAdmin: IAuthAdmin | null) => void;
  loginAdminApiAction: (
    loginInfo: IAdminLoginData,
    onSuccess?: () => void,
    onFail?: () => void
  ) => void;
  logoutAdminApiAction: (onSuccess?: () => void, onFail?: () => void) => void;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined
);

/**
 * The initial value of `isAuthenticated` comes from the `authenticated`
 * and 'authAdmin' from 'admin' prop which gets set by _app.
 * We store that value in state and ignore the prop from then on. The value
 * can be changed by calling the`setAuthentication()` method in the context.
 */
const AuthContextProvider: React.FC<{
  children: ReactNode;
  authenticated: boolean;
  admin: IAuthAdmin | null;
}> = ({ children, authenticated, admin }) => {
  const [isAuthenticated, setAuthenticated] =
    React.useState<boolean>(authenticated);
  const [authAdmin, setAuthAdmin] = React.useState<IAuthAdmin | null>(admin);

  const setAuthentication = (isAuth: boolean, authAdmin: IAuthAdmin | null) => {
    setAuthenticated(isAuth);
    setAuthAdmin(authAdmin);
  };

  const loginAdminApiAction = (
    loginInfo: IAdminLoginData,
    onSuccess?: () => void,
    onFail?: () => void
  ) => {
    loginAdminApi(loginInfo)
      .then((response) => {
        const data = response.data;

        showToastAction({ type: "success", message: "Login Success" });
        setAuthentication(true, data);
        onSuccess && onSuccess();
      })
      .catch((err: IAdminApiError) => {
        const { error, data } = handlePublicApiError(err);
        // setAuthentication(false, null);
        showErrorToastAction({
          message: "Login failed",
          description: error || data?.message,
        });
        onFail && onFail();
      });
  };

  const router = useRouter();
  const logoutAdminApiAction = (
    onSuccess?: () => void,
    onFail?: () => void
  ) => {
    logoutAdminApi()
      .then(() => {
        showToastAction({ type: "success", message: "Logged out" });
        setAuthentication(false, null);
        if (onSuccess) onSuccess();
        else router.push(ADMIN_LOGIN());
      })
      .catch((err: IAdminApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Logging out failed",
          description: error || data?.message,
        });
        onFail && onFail();
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authAdmin,
        setAuthentication,
        loginAdminApiAction,
        logoutAdminApiAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export function useIsAuthenticated(): boolean {
  const context = useAuthContext();
  return context.isAuthenticated;
}
