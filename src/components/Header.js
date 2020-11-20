import Button from './Button.js';

export default function Header (props) {
  return (
    <header className={props.hide}>
      <div className="wrapper">
        <h1>
          <span>Introducing
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
          <span className="lineBreak">
            A Night at the Art Box
          </span>
        </h1>
      </div>
      <Button handleChange={props.onChange}/>
    </header>
  )
}