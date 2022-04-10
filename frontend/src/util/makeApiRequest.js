import { isEmpty } from "lodash";

function makeApiRequest(method) {
  return function withPath(path) {
    return async function withBody(body, abortController = null, raw = false) {
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}${path}`;
      const response = await fetch(apiUrl, {
        method,
        signal: abortController != null ? abortController.signal : null,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: isEmpty(body) ? null : JSON.stringify(body),
      });
      return raw ? await response : await response.json();
    };
  };
}

const makePutRequest = makeApiRequest("PUT");
const makePostRequest = makeApiRequest("POST");
const makeDeleteRequest = makeApiRequest("DELETE");
const makeGetRequest = makeApiRequest("GET");

export { makePostRequest, makePutRequest, makeDeleteRequest, makeGetRequest };
