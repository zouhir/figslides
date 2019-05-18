import { Component } from 'preact';
import { Router } from 'preact-router';
import Home from 'async!@pages/Home';
import style from './index.scss';

export default class App extends Component {
	onRoute = e => {
		if (process.env.NODE_ENV === 'production') {
			if (!!e.previous && window.ga) {
				// analytics if applicable
			}
		}
	}

	render() {
		return (
			<div class={ style.app }>
				App layout
				<main class={ style.wrapper }>
					<Router onChange={ this.onRoute }>
						<Home path="/" />
					</Router>
				</main>
			</div>
		);
	}
}
