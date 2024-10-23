import React, { useState } from 'react';
import './login.css'; // You can add the styles in a separate CSS file or as inline styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Student_sidebar from '../student/Student_sidebar';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if(username!=='' && password!==''){

      axios.post('http://localhost:3001/login',{
        rollno: username,
        password: password
      }).then(res => {
        //console.log(res.data)
        localStorage.setItem('user_name', res.data.name);
        localStorage.setItem('user_rollno', res.data.rollno);
        localStorage.setItem('user_year', res.data.year);
        localStorage.setItem('user_dept', res.data.dept);

        toast.success('login successfull',{autoClose: 1000, onClose: () => navigate('/homepage')})
      }).catch(err => {
        //console.log(err)
        toast.error(err)
      })

      localStorage.setItem("rollno",username)
    } else{
      toast.error('Input Empty')
    }
  };

  return (
    <div>
      <ToastContainer
        toastStyle={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '40px', /* Adjust the height as needed */
          lineHeight: '40px' /* Center the text vertically */
        }}
      />
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Roll Number</label>
        <input 
          type="number" 
          placeholder="Roll Number" 
          id="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          placeholder="Password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleLogin}>Log In</button>

      </form>
    </div>
  );
};

export default Login;
