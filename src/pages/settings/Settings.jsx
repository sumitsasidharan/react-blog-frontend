import axios from 'axios';
import { useContext, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import './Settings.css';

const Settings = () => {
   const [file, setFile] = useState(null);
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [success, setSuccess] = useState(false);

   const { user, dispatch } = useContext(Context);
   const PF =
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';

   const handleSubmit = async (e) => {
      e.preventDefault();

      dispatch({ type: 'UPDATE_START' });

      const updatedUser = {
         userId: user._id,
         username,
         email,
         password,
      };
      if (file) {
         const data = new FormData();
         const filename = Date.now() + file.name;
         data.append('name', filename);
         data.append('file', file);
         updatedUser.profilePic = filename;

         try {
            await axios.post('/upload', data);
         } catch (err) {
            console.log(err.message);
         }
      }

      try {
         const res = await axios.put('/users/' + user._id, updatedUser);
         setSuccess(true);
         dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
      } catch (err) {
         console.log(err.message);
         dispatch({ type: 'UPDATE_FAILURE' });
      }
   };

   return (
      <div className="Settings">
         <div className="settingsWrapper">
            <div className="settingsTitle">
               <span className="settingsUpdateTitle">Update Your Account</span>
               <span className="settingsDeleteTitle">Delete Account</span>
            </div>

            <form onSubmit={handleSubmit} className="settingsForm">
               <label>Profile Picture</label>
               <div className="settingsPP">
                  <img
                     src={
                        file ? URL.createObjectURL(file) : PF + user.profilePic
                     }
                     alt="profile"
                  />
                  <label htmlFor="fileInput">
                     <i className="settingsPPIcon far fa-user-circle"></i>
                  </label>
                  <input
                     type="file"
                     id="fileInput"
                     style={{ display: 'none' }}
                     onChange={(e) => setFile(e.target.files[0])}
                  />
               </div>

               <label>Username</label>
               <input
                  type="text"
                  placeholder={user.username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <label>Email</label>
               <input
                  type="email"
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <label>Password</label>
               <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
               />

               <button type="submit" className="settingsSubmit">
                  Update
               </button>

               {success && (
                  <span className="success">Profile has been updated!!</span>
               )}
            </form>
         </div>
         <Sidebar />
      </div>
   );
};

export default Settings;
