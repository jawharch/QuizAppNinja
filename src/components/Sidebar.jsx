import React from 'react'
import { SidebarData } from './SidebarData'
import { Link, useLocation } from 'react-router-dom'
const Sidebar = () => {
  const location=useLocation()
  return (
    <div className='sidebar'>
        <div className='brand'>
            <h3>QUIZ</h3>

        </div>
        <div className="sidemenu">
          <div className="side-user">
          <div className='side-img' style={{ backgroundImage: "url('user.jpeg')" }}></div>
            <div className="user">
              <small>Jawhar Chouri</small>
              <p>Developer</p>
              
            </div>
          </div>
          <ul>
            {
              SidebarData.map((item,i)=>
              (
                <Link to={item.link}  key={i}>
                 <li key={i} id={location.pathname === item.link ? "active" : ""}>
              <Link to={item.link}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
                </Link>
              ))
            }

          </ul>
        </div>
       
    </div>
  )
}

export default Sidebar
