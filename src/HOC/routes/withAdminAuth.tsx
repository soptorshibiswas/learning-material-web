/* eslint-disable */
import { NextPage } from "next";
import { ADMIN_LOGIN } from "../../../shared/constants/routes";
import { useIsAuthenticated } from "../contexts/AuthContext";
import withConditionalRedirect from "./withConditionalRedirect";

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withAdminAuth<CP, IP>(
  WrappedComponent: NextPage<CP, IP>,
  location = ADMIN_LOGIN()
): NextPage<CP, IP> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: () => !useIsAuthenticated(),
  });
}
