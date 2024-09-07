import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './components/Home'
import Registration from './components/Registration'
import Login from './components/Login'
import Table from './components/Table'
import S from './components/S'
import Navbar from './components/Navbar'
import Student from './components/Student'
import Loginvip from './components/Loginvip'
import Protect from './components/Protect'
import Posting from './components/Posting'
import Homeuser from './components/homeuser'
import Updateuser from './components/Uuser'
import Updatepost from './components/Updatepost'
import Pp from './components/Pp'
import Ppp from './components/Ppp'
import User from './components/Users'
import Post from './components/Post'
import Upost from './components/Upost'
import Uuser from './components/Uuser'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    
       <Routes>
       <Route path='/' element={<Home />}></Route>
       <Route path='/login/:id' element={<Login />}></Route>
       <Route path='/loginvip' element={<Loginvip />}></Route>
       <Route path='/prisont/:id' element={<Pp />}></Route>
       <Route path='/prodacts/:id' element={<Ppp />}></Route>
       <Route  element={<Protect />}>
       <Route path='/registration' element={<Registration />}></Route>
       <Route path='/table' element={<Table />}></Route>
       <Route path='/upost/:id/:y' element={<Upost />}></Route>
       <Route path='/uusers/:id/:y' element={<Uuser />}></Route>
       <Route path='/posting/:id/:y' element={<Posting />}></Route>
       <Route path='/Homeuser/:id/:y' element={<Homeuser />}></Route>
       <Route path='/users/:id' element={<User />}></Route>
       <Route path='/post/:id' element={<Post />}></Route>
       <Route path='/Updateuser/:id/:y' element={<Updateuser />}></Route>
       <Route path='/Updatepost/:id/:y' element={<Updatepost />}></Route>
       </Route>
       <Route path='/S' element={<S />}></Route>
       <Route path='*' element={<Student />}></Route>
       </Routes>

       </BrowserRouter>
         )
}

export default App
