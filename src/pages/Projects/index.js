import style from "./index.scss";
import { Component } from "preact";
import { route } from "preact-router";

import TextBox from "@components/TextBox";
import Button from "@components/Button";

import Api from "../../api";

export default class Projects extends Component {
  state = {
    key: null
  };
  componentDidMount() {
    if (this.props.accessToken === null) {
      route("/");
      return;
    }
  }
  onSubmit = e => {
    e.preventDefault();
  };
  onInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div class={style.container}>
        <div class={style.formCard}>
          <h2>Project Key</h2>
          <p>
            Please enter your Figma project key
          </p>
          <form onSubmit={this.onSubmit}>
            {/* <label for="key">Enter your project key</label>
          <input type="text" id="key" name="key" onInput={this.onInput} required /> */}
              <TextBox />

            <Button>Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}
