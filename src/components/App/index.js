import { Component } from "preact";
import { Router, route } from "preact-router";
import style from "./index.scss";

import { initOAuth, getAccessToken } from "../../utility/oauth";
import Api from "../../api";
import Models from "../../models";

// pages
import Home from "@pages/Home";
import Auth from "@pages/Auth";
import Projects from "@pages/Projects";

// components
import Header from "@components/Header";

export default class App extends Component {
  state = {
    oAuthPopup: null,
    oAuthSecret: null,
    oAuthCode: null,
    accessToken: null,
    refreshToken: null,
    user: null
  };

  componentDidMount() {
    window.addEventListener("message", this.onOAuthMessage, false);
    let accessToken = localStorage.getItem("access_token");
    let refreshToken = localStorage.getItem("refresh_token");
    let expiry = localStorage.getItem("expires_in");
    // let refreshToken = localStorage.getItem("refresh_token");
    let now = new Date().getTime();
    expiry = +expiry;
    if (accessToken && now < expiry) {
      this.setState({ accessToken, refreshToken }, this.onAuthSuccess);
    }
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
      // expiries in is time in seconds (can be equal to ~90 days) convert it to milliseconds timestamp for easier compariosn
      localStorage.setItem(
        "expires_in",
        new Date().getTime() + expires_in * 1000
      );
      localStorage.setItem("refresh_token", refresh_token);
      this.setState(
        { accessToken: access_token, refreshToken: refresh_token },
        this.onAuthSuccess
      );
    });
  };

  onAuthSuccess = () => {
    //redirect the user to projects page
    Api.User.me(this.state.accessToken).then(figmaUser => {
      let user = new Models.User(figmaUser);
      this.setState({ user }, () => {
        route("/projects");
      });
    });
    
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

  render(props, state) {
    return (
      <div class={style.app}>
        <Header onLoginClick={this.onLoginClick} user={state.user} />

        <main class={style.wrapper}>
          <Router onChange={this.onRoute}>
            <Home path="/" />
            <Auth path="/auth" />
            <Projects path="/projects" accessToken={this.state.accessToken} user={state.user}/>
          </Router>
        </main>
      </div>
    );
  }
}
