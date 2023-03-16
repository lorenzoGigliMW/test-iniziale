import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

function Blogs(){
  useEffect(()=>{
      fetchData();
  
    },[]); 
    const[posts,setPosts]= useState([]);
    
    const fetchData= async()=>{
      const rawdata =await fetch('https://jsonplaceholder.typicode.com/posts');
      const data =await rawdata.json();
      const posts =data.slice(0,8)
      setPosts(posts)
      console.log(posts)
    }
  
   
    return (
      <div className="App">
          <h1>Blogs Articles</h1>
          {posts.map(post=>(
            
          <Link to={`/blogs/${post.id}`}>
            <h4 key={post.id}>{post.title}</h4>
          </Link>
      
          ))}
          </div>
          );
}

  export default Blogs;