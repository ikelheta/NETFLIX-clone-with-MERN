import { Search, NotificationsNone, ArrowDropDown } from '@material-ui/icons'
import React, { useState } from 'react'
import "./navbar.scss"
import { NavLink } from 'react-router-dom'


const Navbar = () => {

  const [isScrolled , setIsScrolled]= useState(false)
  window.onscroll = ()=>{
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return ()=>(window.onscroll = null)
  }
  return (
  <div className= {isScrolled ? "navbar scrolled": "navbar"}>
    <div className="container">
      <div className="left"> 
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix logo" />
        <NavLink to="/" className="link" >Home page</NavLink>
        <NavLink to = "/series" className="link">series</NavLink>
        <NavLink to = "/movies" className="link">Movies</NavLink>
        <NavLink to = "/new" className="link">New and pobular</NavLink>
        <NavLink to = "/list" className="link">My list</NavLink>
      </div>
      <div className="right">
        <Search className= "icons"/>
        <NotificationsNone className= "icons"/>
        <img src="https://i.pinimg.com/736x/0a/53/c3/0a53c3bbe2f56a1ddac34ea04a26be98.jpg" alt="" />
        <div className="profile">
        <ArrowDropDown className= "icons" />
        <div className="options">
          <span>setting</span>
          <span>logout</span>
        </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Navbar
