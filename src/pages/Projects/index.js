import style from './index.scss';
import { Component } from 'preact';
import { route } from 'preact-router';

export default class Projects extends Component {
  componentDidMount() {
    if( this.props.accessToken === null ) {
      route('/')
      return;
    }
  }
  render() {
    return (
      <div>
        welcome to  projects page!
      </div>
    );
  }
	
}
