import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Login.css';

const Login = () => {
   const history = useHistory();
   const userRef = useRef();
   const passwordRef = useRef();
   const { dispatch, isFetching } = useContext(Context);

   const handleSubmit = async (e) => {
      e.preventDefault();

      dispatch({ type: 'LOGIN_START' });
      try {
         const res = await axios.post(
            process.env.REACT_APP_BACKEND_URL + '/auth/login',
            {
               username: userRef.current.value,
               password: passwordRef.current.value,
            }
         );

         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
         history.push('/');
      } catch (err) {
         dispatch({ type: 'LOGIN_FAILURE' });
         console.log(err.message);
      }
   };

   return (
      <div className="Login">
         <span className="loginTitle">Login</span>

         <form onSubmit={handleSubmit} className="loginForm">
            <label>Username</label>
            <input
               className="loginInput"
               type="text"
               placeholder="Enter your username"
               ref={userRef}
            />
            <label>Password</label>
            <input
               className="loginInput"
               type="password"
               placeholder="Enter your password..."
               ref={passwordRef}
            />

            <button type="submit" className="loginButton" disabled={isFetching}>
               Login
            </button>
         </form>

         <button className="loginRegisterButton">
            <Link className="link" to="/register">
               Register
            </Link>
         </button>
      </div>
   );
};

export default Login;
