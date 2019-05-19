import fetch from "unfetch";

export default class Projects {
  static list(id, token) {
    let url = `${FIGMA_API_ORIGIN}/v1/teams/${id}/projects`;
    
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(r => r.json());
  }
}