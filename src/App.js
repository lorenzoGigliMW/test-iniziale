import React, { useState, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

function usePrevious(value) {  // gestione da tastiera
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {    //vari campi di Filtraggio e funzionalità
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);   //Array di filters name

function App(props) {

const [filter, setFilter] = useState('All');  //gancio che mostra tutti i filtri presenti
const filterList = FILTER_NAMES.map((name) => (
  <FilterButton                           // invoco filterButton con i seguenti props
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));
  function deleteTask(id) {             //visualizza task che non hanno un determinato id "eliminato"
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

    const [tasks, setTasks] = useState(props.tasks);
    
    function addTask(name) {                  //aggiunge task
      const newTask = { id: `todo-${nanoid()}`, name, completed: false };  // nano serve per gli id univoci
  setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (  //mappo solo quelli che rispecchiano il filtro
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
)
);

const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
const headingText = `${taskList.length} ${tasksNoun} remaining`;
const listHeadingRef = useRef(null);

const prevTaskLength = usePrevious(tasks.length);   //Gestione focus da tastiera dopo delete
useEffect(() => {                                    //
  if (tasks.length - prevTaskLength === -1) {        //
    listHeadingRef.current.focus();
  }
}, [tasks.length, prevTaskLength]);                   //

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
