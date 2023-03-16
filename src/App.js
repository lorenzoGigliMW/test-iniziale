import React, { Component } from "react";//useState, useRef, useEffect,
import Todo from "./components/Todo";
import Form from "./components/Form";
//import FilterButton from "./components/FilterButton";

import FilterButton from "./components/FilterButton";
import axios from 'axios';

//import { nanoid } from "nanoid";
import PropTypes from 'prop-types'



//import { Routes, Route } from 'react-router-dom';
//import Home from './Pages/Home';
// function usePrevious(value) {  // gestione da tastiera
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }
// const DATA = [
//   { id: "todo-0", name: "Eat", completed: true },
//   { id: "todo-1", name: "Sleep", completed: false },
//   { id: "todo-2", name: "Repeat", completed: false }
// ];
const FILTER_MAP = {    //vari campi di Filtraggio e funzionalità
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);   //Array di filters name

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
      tasks: props.tasks
    }
    this.listHeadingRef = React.createRef();

  }

  setFilter(filter) {
    this.setState({ filter: filter })
  }
  setTasks(taskk) {
    this.setState({ tasks: taskk })
  }

  //EDITO UNA TASK
  editTask = (id, newName) => {

    axios.post('http://localhost:3005/api/todo/edit/' + id, { name: newName }, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },)
      .then((res) => {
        //this.setTasks({ name: res.newName })
        console.log(res.data)
        //this.visualizzaTodo();
      }).catch((error) => {
        console.log(error)
      });

    const editedTaskList = this.state.tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task;
    });
    this.setTasks(editedTaskList);
  }

  // const [tasks, setTasks] = useState(props.tasks);

  //AGGIUNGO UNA TASK
  addTask = (idAdd, nameAdd) => {

    axios.post('http://localhost:3005/api/todo/add', { id: idAdd, name: nameAdd }, {
    }, //{ id: idAdd, name: nameAdd }

    )
      .then(function (response) {
        //this.setTasks({id:response.id,name:response.name})
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });                //aggiunge task
    const newTask = { id: idAdd, name: nameAdd, completed: false };  // nano serve per gli id univoci
    this.setTasks([...this.state.tasks, newTask])
    //alert("task "+ name +" aggiunta");

  }

  //SETTO COMPLETED A TRUE PER TUTTE LE TASK
  mostraTodo = () => {
    axios.post('http://localhost:3005/api/todos', {

    }, {})//

      .then(function (response) {
        //this.setTasks(response.data)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    const TaskCompleted = this.state.tasks.map((task) => {
      return { completed: true }

    }
    )
    this.setTasks(TaskCompleted)
    this.visualizzaTodo();
  }

  //ELIMINO UNA TASK
  deleteTask = (id) => {
    axios.delete('http://localhost:3005/api/todo/del/' + id, {}, {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    const remainingTasks = this.state.tasks.filter((task) => id !== task.id);
    this.setTasks(remainingTasks);
  }



  //RICONOSCE IL CLICK INVERTE COMPLETED SU UNA TASK
  toggleTaskCompleted = (id) => {
    const updatedTasks = this.state.tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    this.setTasks(updatedTasks);
  }

  //VISUALIZZA LISTA TASK DATO UN FILTRO
  taskList = () => {
    //debugger
    const tastksState = this.state.tasks;
    return tastksState.filter(FILTER_MAP[this.state.filter]).map((task) => (  //mappo solo quelli che rispecchiano il filtro
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={this.toggleTaskCompleted}
        deleteTask={this.deleteTask}
        editTask={this.editTask}
      />
    ))
  };

  filterList = () => FILTER_NAMES.map((name) => (
    <FilterButton                         // invoco filterButton con i seguenti props
      key={name}
      name={name}
      //selezionato={this.state.filter}
      isPressed={name === this.state.filter}
      setFilter={() => this.setFilter(name)}
    />

  ));

  // tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  // headingText = `${taskList.length} ${tasksNoun} remaining`;
  // listHeadingRef = useRef(null);

  // prevTaskLength = usePrevious(this.state.tasks.length);   //Gestione focus da tastiera dopo delete
  // useEffect(() => {                                    //
  //   if (this.state.tasks.length - prevTaskLength === -1) {        //
  //     listHeadingRef.current.focus();
  //   }
  // }, [this.state.tasks.length, prevTaskLength]);


  //GET VISUALIZZA TASKS
  visualizzaTodo = () => {//filtro
    // contesto della funzione dentro
    axios.get('http://localhost:3005/api/todos')
      .then((response) => {

        this.setState({ tasks: response.data })
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };


  componentDidMount = () => {


    //visualizza task che non hanno un determinato id "eliminato"

    this.visualizzaTodo();//this.state.filter

  }

  // funzioneDentro.bind(this)();

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.tasks.length !== prevState.tasks.length) {        //
      this.listHeadingRef.current.focus();
    }
  }



  // setEditModal = (id) => {

  //   const xhttp = new XMLHttpRequest();

  //   xhttp.open("GET", `http://localhost:3005/api/${id}`, false);
  //   xhttp.send();

  //   const book = JSON.parse(xhttp.responseText);

  //   const {
  //       name
  //   } = tasks;

  //   document.getElementById('id').value = id;
  //   document.getElementById('name').value = name;
  //   document.getElementById('editForm').action = `http://localhost:3005/api/todo/${id}`;
  // }

  render = () => {
    const tasksNoun = this.taskList().length !== 1 ? 'tasks' : 'task';
    const headingText = `${this.taskList().length} ${tasksNoun} remaining`;

    return (

      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={this.addTask} />
        <div className="filters btn-group stack-exception">
          {this.filterList()}
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={this.listHeadingRef}>
          {headingText}
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"//
        >
          {this.taskList()}
        </ul>
        <h1>Mostra Todo</h1>
        <button type="submit" onClick={() => this.mostraTodo(/*this.state.tasks.id,this.state.tasks.completed*/)}>Click to lista Todo</button>


      </div>
    );
  }
}

App.propType = {
  tasks: PropTypes.array
}

App.defaultProps = {
  // tasks: DATA
  tasks: []
}
export default App;


