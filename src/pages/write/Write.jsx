import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './Write.css';

const Write = () => {
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [file, setFile] = useState(null);
   const { user } = useContext(Context);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newPost = {
         title,
         desc,
         username: user.username,
      };
      if (file) {
         const data = new FormData();
         const filename = Date.now() + file.name;
         data.append('name', filename);
         data.append('file', file);
         newPost.photo = filename;

         try {
            await axios.post(
               process.env.REACT_APP_BACKEND_URL + '/upload',
               data
            );
         } catch (err) {
            console.log(err.message);
         }
      }

      try {
         const res = await axios.post('/posts', newPost);
         window.location.replace('/post/' + res.data._id);
      } catch (err) {
         console.log(err.message);
      }
   };

   return (
      <div className="Write">
         {file && (
            <img
               className="writeImg"
               src={URL.createObjectURL(file)}
               alt="blog top"
            />
         )}
         <form onSubmit={handleSubmit} className="writeForm">
            <div className="writeFormGroup">
               <label htmlFor="fileInput">
                  <i className="writeIcon fas fa-plus"></i>
               </label>
               <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <input
                  type="text"
                  placeholder="Title"
                  className="writeInput"
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
               />
            </div>

            <div className="writeFormGroup">
               <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  className="writeInput writeText"
                  type="text"
                  placeholder="Post your article"></textarea>
            </div>

            <button type="submit" className="writeSubmit">
               Publish
            </button>
         </form>
      </div>
   );
};

export default Write;
