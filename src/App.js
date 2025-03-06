import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import HomeB from './components/Home/HomeB';
import Register from './components/register/register';
import { Route, Routes } from 'react-router-dom';
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
import Footer from "./components/layout/footer";

function App() {
  const [user, setUser] = useState();
  const [isload, Setload] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("LoginUser")));

    setTimeout(() => {
      Setload(false);
    }, 100);
  }, []);

  if (isload) {
    return (
      <div>
        {user ? <Navbar2 /> : <Navbar />}
        <div id="extradiv"></div>
        <div id="Loading"><div className=""></div></div>
      </div>
    );
  } else {
    return (
      <div className="App">
        {user ? <Navbar2 /> : <Navbar />}
        <Routes>
          <Route path='/' element={user ? <ForYou /> : <HomeB />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/ourstory' element={<OurStory />} />
          <Route path='/membership' element={<Membership />} />
          <Route path='/write' element={<Write />} />
          <Route path='/write2' element={<Write2 />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/ArticleDetail/:id' element={<ArticleDetail />} />
          <Route path='/selfimprovement' element={<SelfImprovement />} />
          <Route path='/technology' element={<Technology />} />
          <Route path='/programming' element={<Programming />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/updateArticle/:id' element={<UpdateW />} />
          <Route path='/search' element={<Search />} />
          <Route path='/find' element={<FindFriend />} />
          <Route path='/following' element={<Following />} />
          <Route path='/notification' element={<Notification />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
