import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';



const NavBar = () => {

//In navBAr can I show photo of loggedIn user by subscribing to the appStore?
const loggedInUser=useSelector((store)=>store.user)
// console.log(loggedInUser);
const dispatch=useDispatch();
const navigate=useNavigate();

const handleLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    dispatch(removeUser()); // Update state
    navigate("/"); // Navigate after state update
  } catch (err) {
    console.error("Logout error:", err);
    // Optionally handle error with a message or redirect
  }
};


  return (
  
    <div className="navbar bg-neutral fixed h-20 top-0 left-0 w-full z-50">
  <div className="flex-1">
    <Link to="/" className="btn btn-white text-xl">👨🏻‍💻DevTinder</Link>
  </div>

  {loggedInUser &&
   <div className="flex-none gap-2">
    <div className="form-control">
      {/* <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" /> */}
    </div>


<div className="dropdown dropdown-end mx-10 flex">
    <p className='px-4 text-white flex items-center'>Welcome, {loggedInUser.firstName}</p>
      <div tabindex="0" role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={loggedInUser.photoUrl}/>
        </div>
      </div>
      <ul
        tabindex="0"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>


  </div>}

</div>
  
  )
}

export default NavBar
