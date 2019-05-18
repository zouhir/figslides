import style from './index.sass';

export default function (props) {
	return (
		<header class={ style.intro }>
			{ props.children }
		</header>
	);
}
