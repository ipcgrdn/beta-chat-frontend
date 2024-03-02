import './App.css';
import Login from './login';
import Signup from './signup';
import Main from './components/main';
import Home from './components/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Create from './components/chat/create';
import Chat from './components/chat/chat';
import Join from './components/chat/join';

function App() {

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/main' element={<Main />} />
      <Route path='/create' element={<Create />} />
      <Route path='/join' element={<Join />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
