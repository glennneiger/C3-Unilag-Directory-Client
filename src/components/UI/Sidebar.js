import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import slugify from 'slugify';

const sidebar= (props) => {
    const theUrl = props.match.url;
    const navlinks = props.navlinks;
    let navlinksArray = [];

    // cycle through the navlinks map
    for(const [key, value] of navlinks){
        let link = (key === 'Dashboard') ? theUrl : `${theUrl}/${ slugify(key, { lower: true }) }`;

      let navlink = (
          <NavLink to={link} exact activeClassName={value.activeClass} key={key} >
             <span><i className={value.iconClass}></i></span>
              {key} 
          </NavLink>
      );

      // add navlink to the navlinks array
      navlinksArray.push(navlink);
    }
    

    return (
        <aside className="sidebar">
            <header>
                <h2>Navigation</h2>
            </header>
            <ul>
                {navlinksArray}
            </ul>
        </aside>
    );
};

export default withRouter(sidebar);