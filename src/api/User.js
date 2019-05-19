import fetch from "unfetch";

export default class User {
  static me(token) {
    let url = `${FIGMA_API_ORIGIN}/v1/me`;
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(r => r.json());
  }
}
