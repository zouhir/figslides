import fetch from "unfetch";

export function initOAuth(url, options = {}) {
  let name = options.name || "Authenticate Your Account!";
  let height = options.height || 600;
  let width = options.width || 800;
  let popup = window.open(url, name, `width=${width}, height=${height}`);
  return popup;
}

export function getAccessToken(url) {
  return fetch(url, {
    method: "POST"
  }).then(r => {
    return r.json();
  });
}
