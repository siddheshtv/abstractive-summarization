import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Login = () => {
  const { user, loginWithRedirect } = useAuth0();

  console.log(user);
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-blue-500 rounded-lg px-4 py-2 text-gray-50"
    >
      Log In
    </button>
  );
};

export default Login;
