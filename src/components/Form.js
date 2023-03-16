import React, { Component } from "react";
import { nanoid } from "nanoid";
//function Form(props) {
class Form extends Component {
  //const [name, setName] = useState('');
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  setName(nameS) {
    this.setState({ name: nameS })
  }

  handleChange = (e) => {
    this.setName(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(`todo-${nanoid()}`, this.state.name);
    this.setName('');
  }
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>

        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }

}
export default Form;