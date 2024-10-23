import logo from './logo.svg';
import './App.css';
import './index.css'; 
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Sidebar from './components/dashboard/Sidebar';
import Student_sidebar from './components/student/Student_sidebar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Sidebar />}/>
          <Route path="/homepage" element={<Student_sidebar />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
