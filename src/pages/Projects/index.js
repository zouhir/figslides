import style from './index.scss';
import { Component } from 'preact';
import { route } from 'preact-router';

import Api from '../../api';

export default class Projects extends Component {
  state = {
    key: null
  }
  componentDidMount() {
    if( this.props.accessToken === null ) {
      route('/')
      return;
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    
  }
  onInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label for="key">Enter your project key</label>
          <input type="text" id="key" name="key" onInput={this.onInput} required />
          <button>Submit</button>
        </form>
      </div>
    );
  }
	
}
