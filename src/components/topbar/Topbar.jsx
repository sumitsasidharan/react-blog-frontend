import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Topbar.css';

const Topbar = () => {
   const history = useHistory();
   const { user, dispatch } = useContext(Context);
   const PF =
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';

   const handleLogout = () => {
      dispatch({ type: 'LOGOUT' });
      history.push('/');
   };

   return (
      <div className="top">
         <div className="topLeft">
            <i className="topIcon fab fa-github-square"></i>
            <i className="topIcon fab fa-linkedin"></i>
            <i className="topIcon fab fa-instagram-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
         </div>
         <div className="topCenter">
            <ul className="topList">
               <li className="topListItem">
                  <Link className="link" to="/">
                     HOME
                  </Link>
               </li>
               <li className="topListItem">
                  <Link className="link" to="/about">
                     ABOUT
                  </Link>
               </li>
               <li className="topListItem">
                  <Link className="link" to="/contact">
                     CONTACT
                  </Link>
               </li>
               <li className="topListItem">
                  <Link className="link" to="/write">
                     WRITE
                  </Link>
               </li>
               <li className="topListItem" onClick={handleLogout}>
                  {user && 'LOGOUT'}
               </li>
            </ul>
         </div>
         <div className="topRight">
            {user ? (
               <Link to="/settings">
                  <img
                     className="topImg"
                     src={PF + user.profilePic}
                     alt="profile"
                  />
               </Link>
            ) : (
               <ul className="topList">
                  <li className="topListItem">
                     <Link className="link" to="/login">
                        LOGIN
                     </Link>
                  </li>
                  <li className="topListItem">
                     <Link className="link" to="/register">
                        REGISTER
                     </Link>
                  </li>
               </ul>
            )}

            <i className="topSearchIcon fas fa-search"></i>
         </div>
      </div>
   );
};

export default Topbar;
