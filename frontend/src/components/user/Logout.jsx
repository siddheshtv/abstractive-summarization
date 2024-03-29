import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="bg-blue-500 rounded-lg px-4 py-2 text-gray-50"
    >
      Log Out
    </button>
  );
};

export default Logout;
