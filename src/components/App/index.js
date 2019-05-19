import { Component } from "preact";
import { Router, route } from "preact-router";
import style from "./index.scss";

import { initOAuth, getAccessToken } from "../../utility/oauth";

import Home from "@pages/Home";
import Auth from "@pages/Auth";
import Projects from "@pages/Projects";

export default class App extends Component {
  state = {
    oAuthPopup: null,
    oAuthSecret: null,
    oAuthCode: null
  };

  componentDidMount() {
    window.addEventListener("message", this.onOAuthMessage, false);
  }

  onRoute = e => {
    if (process.env.NODE_ENV === "production") {
      if (!!e.previous && window.ga) {
        // analytics if applicable
      }
    }
  };

  onLoginClick = () => {
    let state = new Date().getTime();
    const url = `${OAUTH_URL}?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK}&scope=file_read&state=${state}&response_type=code`;
    let popup = initOAuth(url, {});
    this.setState({ oauthPopup: popup, oAuthSecret: state });
  };

  authenticate = () => {
    let url = `https://www.figma.com/api/oauth/token?client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&redirect_uri=${OAUTH_CALLBACK}&code=${
      this.state.oAuthCode
    }&grant_type=authorization_code`;
    getAccessToken(url).then(res => {
      let { access_token, expires_in, refresh_token } = res;
      //TODO: either use cookies or idb
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
      localStorage.setItem("refresh_token", refresh_token);
      this.onAuthSuccess();
    });
  };

  onAuthSuccess = () => {
    //redirect the user to projects page
    route('/projects');
  };

  onOAuthMessage = e => {
    // only listen to messages from oauth callback
    let data = e.data;
    if (
      e.origin === APP_ORIGIN &&
      data &&
      typeof data === "object" &&
      typeof data.__figslides !== "undefined"
    ) {
      let { code, secret } = data;
      if (+secret === this.state.oAuthSecret) {
        this.setState({ oAuthCode: code }, () => {
          // close the popup
          this.state.oauthPopup.close();
          this.authenticate();
        });
      }
    }
  };

  render() {
    return (
      <div class={style.app}>
        App layout
        <button onClick={this.onLoginClick}>Login to figma</button>
        <main class={style.wrapper}>
          <Router onChange={this.onRoute}>
            <Home path="/" />
            <Auth path="/auth" />
            <Projects path="/projects" />
          </Router>
        </main>
      </div>
    );
  }
}
