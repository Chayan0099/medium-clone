import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import  Signup from './pages/Signup';
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Editor from "./pages/Newblog";
import Read from "./pages/Read";

function App() {
   return (
   <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/signin" element={<Signin></Signin>}></Route>
    <Route path="/" element={<Blog></Blog>}></Route>
    <Route path='/new-blog' element={<Editor></Editor>}></Route>
    <Route path='/read/:id' element={<Read></Read>}></Route>
   </Routes>
   </BrowserRouter>
  )
} 

export default App
