import { useState, useEffect } from "react";
window.Buffer = window.Buffer || require("buffer").Buffer;

export const useUser = () => {
  const token = localStorage.getItem("token");

  const getPayloadFromToken = (token) => {
    const encodedPayload = token?.split(".")[1];

    return JSON.parse(Buffer.from(encodedPayload, "base64"));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;

    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user?.data;
};
