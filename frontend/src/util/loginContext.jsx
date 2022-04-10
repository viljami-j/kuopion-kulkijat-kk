import { createContext } from "react";

export const LoginContext = createContext([
  { email: "", password: "" },
  (data) => null,
]);
