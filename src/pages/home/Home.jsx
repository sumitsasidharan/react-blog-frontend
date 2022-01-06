import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './Home.css';
import { useLocation } from 'react-router-dom';

const Home = () => {
   const [posts, setPosts] = useState([]);
   const { search } = useLocation();

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const res = await axios.get(
               process.env.REACT_APP_BACKEND_URL + '/posts' + search
            );
            setPosts(res.data.posts);
            // console.log(res.data);
         } catch (err) {
            console.log(err);
         }
      };

      fetchPosts();
   }, [search]);

   return (
      <React.Fragment>
         <Header />
         <div className="Home">
            <Posts posts={posts} />
            <Sidebar />
         </div>
      </React.Fragment>
   );
};

export default Home;
