import clsx from 'clsx';

import style from "./index.scss";

export default function Button({ type = null, onClick = null, color = 'primary',  children }) {
  return (
    <button class={clsx(style.button, style[color])} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
