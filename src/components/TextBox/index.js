import { Component } from "preact";
import clsx from 'clsx';

import style from './index.scss';

export default class TextBox extends Component {
  state = {
    focused: false,
    inputElement: null
  }
  componentDidMount() {
    let element = this.base.querySelector('input');
    this.setState( {
      inputElement: element
    })
    element.addEventListener('blur', () => {
      this.setState({ focused: false })
    })
  }
  focus = () => {
    this.setState({ focused: true }, () => {
      this.state.inputElement.focus();
    })
  }
  render({ type = 'text', label = 'unlabeled', value='', id='' , name=null, placeholder = null, error = false, required=false, onInput }, state) {
    return (

      <div class={clsx(style.textControl, state.focused && style.focused, error && style.error )} onClick={this.focus}>
        <label for={id}>
          {label}
        </label>
        <input name={name} type={type} value={value} onInput={onInput} id={id} placeholder={placeholder} required={required}/>
      </div>
    )
  }
}