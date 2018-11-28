import React from 'react';
import { Link } from 'react-router-dom';

const home_header = () => {
     return (
         <nav className="Nav">
             <Link to="/" className="logo">
                 <span>C3 Unilag </span> Directory
             </Link>
         </nav>
     );
};

export default home_header;