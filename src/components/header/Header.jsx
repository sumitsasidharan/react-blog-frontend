import React from 'react';
import './Header.css';

const Header = () => {
   return (
      <div className="Header">
         <div className="headerTitles">
            <span className="headerTitleSmall">React & Node</span>
            <span className="headerTitleLarge">Blog</span>
         </div>

         <img
            src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80"
            alt="blog main"
            className="headerImg"
         />
      </div>
   );
};

export default Header;
