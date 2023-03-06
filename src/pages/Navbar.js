import React from 'react';
//import '../App.css'
import {Link} from 'react-router-dom';
import './Navbar.css'


function Navbar() {
  return (
    <div className="Navbar">
        <ul className="Links">
            <Link style={{color :'white'}} to="/"><li>App</li></Link>
            <Link style={{color :'white'}} to="/contact"><li>Contact</li></Link>
            <Link style={{color :'white'}} to="/blogs"><li>Blogs</li></Link>
        </ul>
    </div>
  );
}

export default Navbar;