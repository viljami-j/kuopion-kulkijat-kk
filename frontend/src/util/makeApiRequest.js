import { isNil } from "lodash";

function makeApiRequest(method) {
  return function withPath(path) {
    return async function withBody(body) {
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}${path}`;
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: isNil(body) ? JSON.stringify({}) : JSON.stringify(body),
      });
      return await response.json();
    };
  };
}

const makePutRequest = makeApiRequest("PUT");
const makePostRequest = makeApiRequest("POST");
const makeDeleteRequest = makeApiRequest("DELETE");
const makeGetRequest = makeApiRequest("GET");

export { makePostRequest, makePutRequest, makeDeleteRequest, makeGetRequest };
