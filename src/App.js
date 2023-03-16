import React, { Component } from "react";//useState, useRef, useEffect,
import Todo from "./components/Todo";
import Form from "./components/Form";
//import FilterButton from "./components/FilterButton";

import FilterButton from "./components/FilterButton";
import axios from 'axios';
// import MostraTodo from "./components/MostraTodo";
// import EditaTodo from "./components/EditaTodo";
// import AddTodo from "./components/AddTodo";
//import { nanoid } from "nanoid";
import PropTypes from 'prop-types'

// const express= require('express');
// var router=express.Router();
// const app=express()
// app.use(express.static('public'))
// app.use(express.json())

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


  // deleteTask=(id)=> {             //visualizza task che non hanno un determinato id "eliminato"
  //   cancellaTask(id)
  //     const remainingTasks = this.state.tasks.filter((task) => id !== task.id);
  //     this.setTasks(remainingTasks);
  //   }


  // editTask=(id,newName,completed)=> {

  //     axios.post(`http://localhost:3005/api/todo/edit/${id}`, {
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json',
  //     }, {id,newName,completed})
  //   .then((res) => {
  //     this.setTasks({name:res.newName})
  //       console.log(res.data)
  //       this.visualizzaTodo();
  //   }).catch((error) => {
  //       console.log(error)
  //     });


  editTask = (id,newName) => {

    axios.post('http://localhost:3005/api/todo/edit/'+id,{name:newName},{
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }, )
      .then((res) => {
        //this.setTasks({ name: res.newName })
        console.log(res.data)
        //this.visualizzaTodo();
      }).catch((error) => {
        console.log(error)
      });




    // const nuovoNome ={name:newName};
    // axios.put('http://localhost:3005/api/todo/edit', nuovoNome, {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json',
    // } )
    //  .then((res) => {
    //   console.log(res)
    //   this.setTasks(nuovoNome)
    //     console.log(res.data)
    //     this.visualizzaTodo();
    // }).catch((error) => {
    //     console.log(error)
    // }); 

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

  addTask = (idAdd, nameAdd) => {

    axios.post('http://localhost:3005/api/todo/add', { id:idAdd , name: nameAdd  },{
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
      return {completed: true}
       
    }
    )
    this.setTasks(TaskCompleted)
    this.visualizzaTodo();
  }


  deleteTask = (id) => {
    axios.delete('http://localhost:3005/api/todo/del/'+id,{},{})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    const remainingTasks = this.state.tasks.filter((task) => id !== task.id);
    this.setTasks(remainingTasks);
  }




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




  //   const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (  //mappo solo quelli che rispecchiano il filtro
  //     <Todo
  //     id={task.id}
  //     name={task.name}
  //     completed={task.completed}
  //     key={task.id}
  //     toggleTaskCompleted={toggleTaskCompleted}
  //     deleteTask={deleteTask}
  //     editTask={editTask}
  //   />
  // )
  // );

  // tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  // headingText = `${taskList.length} ${tasksNoun} remaining`;
  // listHeadingRef = useRef(null);

  // prevTaskLength = usePrevious(this.state.tasks.length);   //Gestione focus da tastiera dopo delete
  // useEffect(() => {                                    //
  //   if (this.state.tasks.length - prevTaskLength === -1) {        //
  //     listHeadingRef.current.focus();
  //   }
  // }, [this.state.tasks.length, prevTaskLength]);

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



  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  //   });


  componentDidMount = () => {


    //visualizza task che non hanno un determinato id "eliminato"

    this.visualizzaTodo();//this.state.filter

  }

  // contesto della funzione did mount

  // contesto del then
  // console.log('pippo', pippo);
  // console.log('pippo2', pippo2);
  // const tasks=this.state.tasks

  // if(this.state.filter==="Active"){
  //   tasks=tasks.filter(this.completed===false).map(this.task)
  // }else
  // if(this.state.filter==="Completed"){
  //   tasks=tasks.filter(this.completed===true).map(this.task)
  // }else{ tasks=tasks.map(this.task)}



  //   this.state = {
  //     name: '',
  //     email: ''
  // }
  // }
  // onChangeUserName(e) {
  // this.setState({ name: e.target.value })
  // }
  // onChangeUserEmail(e) {
  // this.setState({ email: e.target.value })
  // }
  // onSubmit(e) {
  // e.preventDefault()
  // const userObject = {
  //     name: this.state.name,
  //     email: this.state.email
  // };
  //   axios.post('http://localhost:3005/api/todo/add', userObject)
  //   .then((res) => {
  //       console.log(res.data)
  //   }).catch((error) => {
  //       console.log(error)
  //   });
  // this.setState({ name: '', email: '' })



  //  function editaTodo() {
  // // axios.post('http://localhost:3005/api/todo/edit/:id', {
  // //   name: 'Fred',

  // // })
  // // .then(function (response) {
  // //   console.log(response);
  // // })
  // // .catch(function (error) {
  // //   console.log(error);
  // // });

  // }
  // function editaTodo() {
  //   axios.post('http://localhost:3005/api/todo/edit/:id', {
  //     name: 'Fred',

  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //   }

  // function aggiungiTodo() {
  //   axios.post('http://localhost:3005/api/todo/add', {
  //   id:`todo-${nanoid()}`,
  //   name: 'Fred',
  //   completed:false

  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });


  // } 

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


  // mostraTodo=(taskSalvate)=>{app.post('/api/todos',(req,res)=>{
  // res.status(200).json({data:taskSalvate})
  //   })}


  // filtroTodo=(taskSalvate)=>{
  //   app.get('/api/todos',(req,res)=>{
  //   FILTER_NAMES.map((taskSalvate.name) => ())
  //   res.status(200).json({data:taskSalvate})
  //     })}


  // addTodo=(taskSalvate)=>{
  //   app.post('/api/todos/add',(req,res)=>{
  //    const daAggiungere=req.body
  //    taskSalvate.push(daAggiungere)
  //   res.status(200).json({data:taskSalvate})
  //     })}

  //     modificaTodo=(taskSalvate)=>{app.post('/api/todos/edit',(req,res)=>{
  //       {editTask(id,newName)}
  //       res.status(200).json({data:taskSalvate})
  //         })}




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
// <button type="submit" onClick={mostraTodo()} >Lista Todo </button>

App.propType = {
  tasks: PropTypes.array
}

App.defaultProps = {
  // tasks: DATA
  tasks: []
}
export default App;


