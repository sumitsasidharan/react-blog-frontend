import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      const getCategories = async () => {
         const res = await axios.get('/categories');
         setCategories(res.data.cats);
      };

      getCategories();
   }, []);

   return (
      <div className="Sidebar">
         <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            {/* <img
               src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
               alt="sidebar profile"
            /> */}
            <img
               src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
               alt="sidebar profile"
            />
            <p>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
               vel amet ea tenetur porro placeat quam atque
            </p>
         </div>

         <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
               {categories.map((cat) => (
                  <Link key={cat._id} to={`/?cat=${cat.name}`} className="link">
                     <li className="sidebarListItem">{cat.name}</li>
                  </Link>
               ))}
            </ul>
         </div>

         <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
               <i className="sidebarIcon fab fa-github-square"></i>
               <i className="sidebarIcon fab fa-linkedin"></i>
               <i className="sidebarIcon fab fa-instagram-square"></i>
               <i className="sidebarIcon fab fa-twitter-square"></i>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
