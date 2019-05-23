import style from "./index.scss";

import Button from '@components/Button';

export default function Header(props) {
  return (
    <header class={style.header}>
      <div class={style.logo}>FIGSLIDES</div>
      <div class={style.nav}>
        {props.user === null ? (
          <button onClick={props.onLoginClick}>
            Login using your figma account!
          </button>
        ) : (
          <div class={style.nav}>
            <div class={style.username}>{props.user.name}</div>
            <div
              class={style.logo}
              role="img"
              aria-label="avatar"
              style={{ backgroundImage: `url(${props.user.avatar})` }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
