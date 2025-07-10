import Addmovie from "./addmovie";
import Menubar from "./menubar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Routes,Route} from 'react-router-dom';
import Myevents from "./myevents";
import Mybookings from "./mybookings";
import Contact from "./contacts";
import Home from "./home";
import { useContext } from "react";
import { useState } from "react";
import LocationContext from "./locationcontext";
import Login from "./login";
function App()

{

  const [location,setlocation]=useState('Bangalore'); 

  const updateLocation=(newLocation)=>{
    setlocation(newLocation)
  }

  return  (
    //ye context ki value ko provide krta hai niche ke sare child components ko
    <LocationContext.Provider value={{location,updateLocation}}>    
  <div>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">My show-{location}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to='/'>HOME <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to='/movies'>MOVIES</Link>
      </li>
      {(location==='Bangalore')?
       <li class="nav-item">
       <Link class="nav-link" to='/events'>Events</Link>
     </li>
    :''
    }
     {/* <li class="nav-item">
       <Link class="nav-link" to='/events'>Events</Link>
     </li> */}
    
      <li class="nav-item">
        <Link class="nav-link" to='/bookings'>BOOKINGS</Link>
      </li>
     
      <li class="nav-item">
        <Link class="nav-link" to='/contact'>CONTACT</Link>
      </li>
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
     
      <Link to="/login"
        class="btn btn-outline-success my-2 my-sm-0" value="login" />

    </form>
  </div>
</nav>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/movies" element={<Addmovie title="Movies"/>}/>
  <Route path="/events" element={<Myevents/>}/>
  <Route path="/bookings" element={<Mybookings/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/login" element={<Login/>}/>

</Routes>
 
  </div>
  </LocationContext.Provider>
  );


}
export default App;