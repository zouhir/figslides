import style from './index.sass';

export default function (props) {
	return (
		<div class={ style.card }>
			{ props.children }
		</div>
	);
}
