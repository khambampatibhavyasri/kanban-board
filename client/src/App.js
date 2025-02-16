
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Protected from './utils/Protected';
import Home from './components/Home';
import AddProject from './components/AddProject';
import Task from './components/Task';
import AddTask from './components/AddTask';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Protected Cmp={Home}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/addProject' element={<Protected Cmp={AddProject}/>}/>
          <Route path='/task/:id' element={<Protected Cmp={Task}/>}/>
          <Route path='/addTask/:id' element={<Protected Cmp={AddTask}/>}/>
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
