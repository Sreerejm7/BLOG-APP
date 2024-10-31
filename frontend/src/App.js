
import { Route, Routes,Navigate } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CreateBlog from './Pages/CreateBlog';
import MyBlogs from './Pages/MyBlogs';
import EditBlog from './Pages/EditBlog';

const ProtectedRoute = ({element})=>{
  const token = localStorage.getItem('token');
  return token? element: <Navigate to='/login'/>
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<Navigate to="/login"/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<ProtectedRoute element={<Home/>}/>}/>
        <Route path='/blog/create' element={<ProtectedRoute element={<CreateBlog/>}/>}/>
        <Route path='/blog/myblogs' element={<ProtectedRoute element={<MyBlogs/>}/>}/>
        <Route path='/blog/edit/:id' element={<ProtectedRoute element={<EditBlog/>}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
