//import React, { useEffect, useRef, useState } from "react";
import React, { Component } from "react";
// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

class Todo extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isEditing:false,
      newName: ''
    }
    this.editFieldRef = React.createRef();  /****************************************************************/
    this.editButtonRef = React.createRef();
  }
  
  setEditing(edit) {
    this.setState({isEditing: edit})
  }
  setNewName(nName) {
    this.setState({newName: nName})
  }
  //const [isEditing, setEditing] = useState(false);
  //const [newName, setNewName] = useState('');

  //const editFieldRef = useRef(null);
  //const editButtonRef = useRef(null);

 

  handleChange=(e)=> {
    this.setNewName(e.target.value);
  }

  handleSubmit=(e)=> {
    e.preventDefault();
    this.props.editTask(this.props.id, this.state.newName);
    this.setNewName("");
    this.setEditing(false);
  }

  editingTemplate = ()=>{                                  //vista di modifica
    <form className="stack-small" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={this.props.id}>
          New name for {this.props.name}
        </label>
        <input
          id={this.props.id}
          className="todo-text"
          type="text"
          value={this.state.newName}
          onChange={this.handleChange}
          ref={this.editFieldRef}                //riferimento per utilizzo da tastiera*******************************************************
        />
      </div>
      <div className="btn-group">
      <button
        type="button"
        className="btn todo-cancel"
        onClick={() => this.setEditing(false)}
      >
        Cancel
        <span className="visually-hidden">renaming {this.props.name}</span>
      </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {this.props.name}</span>
        </button>
      </div>
    </form>
  }
  viewTemplate = ()=>{                                     //vista base con impl eliminazione task
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={this.props.id}
            type="checkbox"
            defaultChecked={this.props.completed}
            onChange={() => this.props.toggleTaskCompleted(this.props.id)}
          />
          <label className="todo-label" htmlFor={this.props.id}>
            {this.props.name}
          </label>
        </div>                               
        <div className="btn-group">
        <button type="button" className="btn" onClick={() => this.setEditing(true)} ref={this.editButtonRef} //riferimento per utilizzo da tastiera**************************
        >  
          Edit <span className="visually-hidden">{this.props.name}</span>
        </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => this.props.deleteTask(this.props.id)}
          >
            Delete <span className="visually-hidden">{this.props.name}</span>
          </button>
        </div>
    </div>
  } //const wasEditing = usePrevious(isEditing);
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.isEditing && this.state.isEditing) {
      this.editFieldRef.current.focus(); 
    if (prevState.isEditing && !this.state.isEditing) {
      this.editButtonRef.current.focus();
    }
    }
  }
  // useEffect(() => {
  //   if (!wasEditing && isEditing) {
  //     editFieldRef.current.focus();
  //   }
  //   if (wasEditing && !isEditing) {
  //     editButtonRef.current.focus();
  //   }
  // }, [wasEditing, isEditing]);
  render =() => {
    return (<li className="todo">{this.state.isEditing ? this.editingTemplate() : this.viewTemplate()}</li>);
  } }
  export default Todo;