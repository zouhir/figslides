import style from "./index.scss";
import { Component } from "preact";
import { route } from "preact-router";

import TextBox from "@components/TextBox";
import Button from "@components/Button";
import UICard from "@components/UICard";

import Api from "../../api";

export default class Projects extends Component {
  state = {
    key: null,
    formErrors: {}
  };
  componentDidMount() {
    if (this.props.accessToken === null) {
      route("/");
      return;
    }
  }
  onSubmit = e => {
    e.preventDefault();
    let fe = Object.create({}, this.state.formErrors)
    fe['key'] = true
    this.setState({ formErrors: fe})
  };
  onInput = e => {
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  };
  render(props, state) {
    return (
      <div class={style.container}>
        <UICard title="Create new figslides">
          <h2><b>Figma</b> file key</h2>
          <p>Please enter the file key for your Figma project where your slides are at! You can find the file key in the Figma URL https://www.figma.com/file/<span class={style.highlight}>MyWprbBTkNWe7vr9LzTG6pEg</span>/MySlides2019</p>
          <form onSubmit={this.onSubmit}>
            <TextBox name="key" onInput={this.onInput} label="Enter your Figma File Key" value={state["key"]} required error={state.formErrors["key"]} />
            { state.formErrors['key'] === true && <p class={style.error}>Error</p> }
            <Button type="submit">Submit</Button>
          </form>
        </UICard>
      </div>
    );
  }
}
