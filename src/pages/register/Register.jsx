import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './register.css';

const Register = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(false);
   const history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         setError(true);
         const res = await axios.post(
            process.env.REACT_APP_BACKEND_URL + '/auth/register',
            {
               username,
               email,
               password,
            }
         );
         res.data && history.push('/login');
      } catch (err) {
         console.log(err.message);
         setError(true);
      }
   };

   return (
      <div className="Register">
         <span className="registerTitle">Register</span>

         <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
               className="registerInput"
               type="text"
               placeholder="Enter your Username"
               onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email</label>
            <input
               className="registerInput"
               type="email"
               placeholder="Enter your email"
               onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
               className="registerInput"
               type="password"
               placeholder="Enter your password..."
               onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="registerButton">
               Register
            </button>
         </form>

         <button className="registerLoginButton">
            <Link className="link" to="/login">
               Login
            </Link>
         </button>

         {error && <h2 className="error">Something Went Wrong!!</h2>}
      </div>
   );
};

export default Register;
