/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import withConditionalRedirect from "./withConditionalRedirect";
import { useIsAuthenticated } from "../contexts/AuthContext";
import { ADMIN_HOME } from "../../../shared/constants/routes";

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth<P>(
  WrappedComponent: NextPage<P>,
  location = ADMIN_HOME()
): NextPage<P> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: () => useIsAuthenticated(),
  });
}
