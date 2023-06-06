import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import HomeB from './components/Home/HomeB';
import Register from './components/register/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import OurStory from './components/OurStory';
import Membership from './components/membership';
import Write from './components/write';
import { useEffect, useState } from 'react';
import Navbar2 from './components/layout/Navbar2';
import ForYou from './components/Home/forYou';
import Write2 from './components/write/write';
import Logout from './components/login/logout';
import ArticleDetail from './components/Home/articleDetail';
import SelfImprovement from './components/Home/selfimprovement';
import Technology from './components/Home/technology';
import Programming from './components/Home/programming';
import Profile from './components/Home/profile';
import UpdateW from './components/write/updateWrite';
import Search from './components/Home/search';
import FindFriend from './components/Home/FindFriend';
import Following from './components/Home/following';
import Notification from './components/Home/notification';
import Navbar from './components/layout/navbar';


function App() {
  const [user,setUser]=useState();
 const [isload,Setload]=useState(true);
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("LoginUser")));
    
    setTimeout(() => {
      Setload(false)
    }, 100);
  },[]);
  
  // alert(user);
  if(isload){
    return(
      <div >{user?<Navbar2/>:<Navbar/>}<div id="extradiv"></div ><div id="Loading"><div className=""></div></div></div>
    )
  }
  else{
  return (
    <div className="App">
      {user?<Navbar2/>:<Navbar/>}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user?<ForYou/>:<HomeB/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/ourstory' element={<OurStory/>}></Route>
          <Route path='/membership' element={<Membership/>}></Route>
          <Route path='/write' element={<Write/>}></Route>
          <Route path='/write2' element={<Write2/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/ArticleDetail/:id' element={<ArticleDetail/>}></Route>
          <Route path='/selfimprovement' element={<SelfImprovement/>}></Route>
          <Route path='/technology' element={<Technology/>}></Route>
          <Route path='/programming' element={<Programming/>}></Route>
          <Route path='/profile/:id' element={<Profile/>}></Route>
          <Route path='/updateArticle/:id' element={<UpdateW/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/find' element={<FindFriend/>}></Route>
          <Route path='/following' element={<Following/>}></Route>
          <Route path='/notification' element={<Notification/>}></Route>

        </Routes>
      </BrowserRouter>
      
      
      
    </div>
  )};
}

export default App;
