import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter ,Routes,Route} from 'react-router-dom' ; 
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Navbar from "./pages/Navbar";

// const DATA = [
//   { id: "todo-0", name: "Eat", completed: true },
//   { id: "todo-1", name: "Sleep", completed: false },
//   { id: "todo-2", name: "Repeat", completed: false }
// ];<App/>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/> 
    <Routes> <Route exact path="/" element={<App/>}/> </Routes>
    
    <Routes> <Route exact path="/contact" element={<Contact/>}/> </Routes>
    <Routes> <Route exact path="/blogs" element={<Blogs/>}/> </Routes> 
    </BrowserRouter>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
