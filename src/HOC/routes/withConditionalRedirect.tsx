import { useRouter } from "next/router";
import { NextPage } from "next";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Support conditional redirecting, both server-side and client-side.
 *
 * Client-side, we can use next/router. But that doesn't exist on the server.
 * So on the server we must do an HTTP redirect. This component handles
 * the logic to detect whether on the server and client and redirect
 * appropriately.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param clientCondition A function that returns a boolean representing
 * whether to perform the redirect. It will always be called, even on
 * the server. This is necessary so that it can have hooks in it (since
 * can't be inside conditionals and must always be called).
 * @param serverCondition A function that returns a boolean representing
 * whether to perform the redirect. It is only called on the server. It
 * accepts a Next page context as a parameter so that the request can
 * be examined and the response can be changed.
 * @param location The location to redirect to.
 */
export default function withConditionalRedirect<
  CP = Record<string, never>,
  IP = CP
>({
  WrappedComponent,
  clientCondition,
  location,
}: {
  WrappedComponent: NextPage<CP, IP>;
  clientCondition(): boolean;
  location: string;
}): NextPage<CP, IP> {
  const WithConditionalRedirectWrapper: NextPage<CP, IP> = (props) => {
    const router = useRouter();
    const redirectCondition = clientCondition();
    // console.log(clientCondition());
    if (isBrowser() && redirectCondition) {
      router.replace(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  return WithConditionalRedirectWrapper;
}
