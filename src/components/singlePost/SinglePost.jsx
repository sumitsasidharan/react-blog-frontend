import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import './SinglePost.css';

const SinglePost = () => {
   const location = useLocation();
   const postID = location.pathname.split('/')[2];
   const [post, setPost] = useState({});
   const { user } = useContext(Context);
   const PF = 'https://source.unsplash.com/600x500/?programming';
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [updateMode, setUpdateMode] = useState(false);

   useEffect(() => {
      const getPost = async () => {
         const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/' + postID
         );
         setPost(res.data);
         setTitle(res.data.title);
         setDesc(res.data.desc);
      };

      getPost();
   }, [postID]);

   const handleDelete = async () => {
      try {
         await axios.delete(
            process.env.REACT_APP_BACKEND_URL + '/posts/' + post._id,
            {
               data: { username: user.username },
            }
         );
         window.location.replace('/');
      } catch (err) {
         console.log(err.message);
      }
   };

   const handleUpdate = async () => {
      try {
         await axios.put('/posts/' + post._id, {
            username: user.username,
            title,
            desc,
         });
         // window.location.reload();
         setUpdateMode(false);
      } catch (err) {
         console.log(err.message);
      }
   };

   return (
      <div className="SinglePost">
         <div className="singlePostWrapper">
            {post.photo && (
               <img
                  src={PF + post.photo}
                  alt="blog top"
                  className="singlePostImg"
               />
            )}

            {updateMode ? (
               <input
                  type="text"
                  value={title}
                  className="singlePostTitleInput"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
               />
            ) : (
               <h1 className="singlePostTitle">
                  {title}
                  {post.username === user?.username && (
                     <div className="singlePostEdit">
                        <i
                           className="singlePostIcon far fa-edit"
                           onClick={() => setUpdateMode(true)}></i>
                        <i
                           className="singlePostIcon far fa-trash-alt"
                           onClick={handleDelete}></i>
                     </div>
                  )}
               </h1>
            )}

            <div className="singlePostInfo">
               <span className="singlePostAuthor">
                  Author:
                  <Link to={`/?user=${post.username}`} className="link">
                     <strong>{post.username}</strong>
                  </Link>
               </span>
               <span className="singlePostDate">
                  {new Date(post.createdAt).toDateString()}
               </span>
            </div>

            {updateMode ? (
               <textarea
                  className="singlePostDescInput"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
               />
            ) : (
               <p className="singlePostDesc">{desc}</p>
            )}

            {updateMode && (
               <button onClick={handleUpdate} className="singlePostButton">
                  Update
               </button>
            )}
         </div>
      </div>
   );
};

export default SinglePost;
