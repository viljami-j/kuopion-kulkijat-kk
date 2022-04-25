import { createContext } from "react";

export const LoginContext = createContext([
  {
    idmatkaaja: 0,
    etunimi: "",
    sukunimi: "",
    nimimerkki: "",
    paikkakunta: "",
    esittely: "",
    email: "",
    password: "",
  },
  (data) => null,
]);
