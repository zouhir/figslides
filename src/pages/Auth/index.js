import { Component } from "preact";

export default class Auth extends Component {
  componentDidMount() {
    let url = window.location.href;
    const params = new URLSearchParams(url);
    let secret = params.get("state");
    let code = params.get(`${OAUTH_CALLBACK}?code`);
    window.opener.postMessage({ code, secret, __figslides: true }, "*");
  }
  render() {
    return <div>redirecting...</div>;
  }
}
