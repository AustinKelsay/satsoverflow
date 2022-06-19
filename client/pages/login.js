import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/auth-forms/login-form/login";
// import { ME } from "../fragments/users";

export default function LoginPage() {
  const { data: session1 } = useSession();
  return (
    <>
      <Login />
    </>
  );
}

export async function getServerSideProps({
  req,
  res,
  query: { callbackUrl = "/", error = null },
}) {
  const session = await getSession({ req });
  const providers = await getProviders();

  if (session && res && callbackUrl) {
    res.writeHead(302, {
      Location: callbackUrl,
    });
    res.end();
    return { props: {} };
  }

  return {
    props: {
      providers: providers,
      callbackUrl,
      error,
    },
  };
}
