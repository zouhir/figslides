export default function Header(props) {
  console.log(props.user)
  return (
    <header>
      {props.user === null ? (
        <button onClick={props.onLoginClick}>
          Login using your figma account!
        </button>
      ) : (
        <div>
          <b>{props.user.name}</b>
          <img src={props.user.avatar} />
        </div>
      )}
    </header>
  );
}
