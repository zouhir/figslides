import style from './index.scss';

export default function UICard({ title = null, children }) {
  return (
    <div class={style.card}>
      { title !== null && (<div class={style.header}>
        { title }
      </div>) }
      <div class={style.body}>
        { children }
      </div>
    </div>
  )
}