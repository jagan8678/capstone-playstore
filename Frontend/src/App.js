import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Login from './Components/Login';
import Register from './Components/Register'; 
import Footer from'./Components/Footer';
import ApplicationList from './Components/Applicatioslist';
import AddApplication from './Components/Addapplication';
import UpdateApplication from './Components/UpdateApplication';
import Comments from'./Components/Coments';
import CreateNotification from './Components/Createnotification';
import UserProfile from './Components/Userprofile';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path='/applicationlist' element={<ApplicationList />} />
          <Route path='/addapplication' element={<AddApplication />} />
          <Route path='/updateapplication/:id' element={<UpdateApplication />} />
          <Route path="/createcomment/:id" element={<Comments />} />
          <Route path="/createnotification/:id" element={<CreateNotification />} />


        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
