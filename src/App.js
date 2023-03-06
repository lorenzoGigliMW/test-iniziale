import React, {  Component } from "react";//useState, useRef, useEffect,
import Todo from "./components/Todo";
import Form from "./components/Form";
//import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";

//import { Routes, Route } from 'react-router-dom';
//import Home from './Pages/Home';
// function usePrevious(value) {  // gestione da tastiera
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];
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
  this.setState({filter: filter})
}
setTasks(taskk) {
  this.setState({tasks: taskk})
} 
deleteTask=(id)=> {             //visualizza task che non hanno un determinato id "eliminato"
    const remainingTasks = this.state.tasks.filter((task) => id !== task.id);
    this.setTasks(remainingTasks);
  }
editTask=(id, newName)=> {
    const editedTaskList = this.state.tasks.map((task) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    this.setTasks(editedTaskList);
  }

   // const [tasks, setTasks] = useState(props.tasks);
    
    addTask=(name)=> {                  //aggiunge task
      if(name !==""){
      const newTask = { id: `todo-${nanoid()}`, name, completed: false };  // nano serve per gli id univoci
      this.setTasks([...this.state.tasks, newTask])
      alert("task "+ name +" aggiunta");
    }else{
    alert("Impossibile creare task senza nome");}
  }

  toggleTaskCompleted=(id)=> {
    const updatedTasks = this.state.tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
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

componentDidMount() {
  // if (this.state.tasks.length - prevTaskLength === -1) {        //
  //   listHeadingRef.current.focus();
  // }
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (this.state.tasks.length !== prevState.tasks.length) {        //
    this.listHeadingRef.current.focus();
  }

}
//   // Changing the state after 2 sec
//   // from the time when the component
//   // is rendered
//   setTimeout(() => {
//     this.setState({ color: 'wheat' });
//   }, 2000);
//}
  render =() => {
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
          aria-labelledby="list-heading"
        >
          {this.taskList()}
        </ul>
      </div>
    );}
  }

  App.defaultProps = {
    tasks: DATA
  }
 export default App;


//const [filter, setFilter] = useState('All');  //gancio che mostra tutti i filtri presenti e imposta pred a all
// const filterList = FILTER_NAMES.map((name) => (
//   <FilterButton                           // invoco filterButton con i seguenti props
//     key={name}
//     name={name}
//     isPressed={name === this.filter}  
//     setFilter={() => this.setFilter(name)}
//  /> 
 
// ));

 
  

// //   const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (  //mappo solo quelli che rispecchiano il filtro
// //     <Todo
// //     id={task.id}
// //     name={task.name}
// //     completed={task.completed}
// //     key={task.id}
// //     toggleTaskCompleted={toggleTaskCompleted}
// //     deleteTask={deleteTask}
// //     editTask={editTask}
// //   />
// // )
// // );

// const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
// const headingText = `${taskList.length} ${tasksNoun} remaining`;
// const listHeadingRef = useRef(null);

// const prevTaskLength = usePrevious(tasks.length);   //Gestione focus da tastiera dopo delete
// useEffect(() => {                                    //
//   if (tasks.length - prevTaskLength === -1) {        //
//     listHeadingRef.current.focus();
//   }
// }, [tasks.length, prevTaskLength]);                   //


// render =() => {
//   return (
   
//     <div className="todoapp stack-large">
//       <h1>TodoMatic</h1>
//       <Form addTask={addTask} />
//       <div className="filters btn-group stack-exception">
//       {filterList}
//       </div>
//       <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
//         {headingText}
//       </h2>
//       <ul
//         role="list"
//         className="todo-list stack-large stack-exception"
//         aria-labelledby="list-heading"
//       >
//         {taskList}
//       </ul>
//     </div>
//   );

//   }
  

