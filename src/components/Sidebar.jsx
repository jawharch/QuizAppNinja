import React from 'react'
import { SidebarData } from './SidebarData'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Sidebar = () => {
  const location=useLocation()
  const {currentUser}=useSelector(state=>state.user)
  const filtersidebarData=SidebarData.filter((item)=>item.title!=="Authentication")

  return (
    <div className='sidebar'>
        <div className='brand'>
            <h3>QUIZ</h3>

        </div>
        <div className="sidemenu">
          <div className="side-user">
          <div className='side-img' style={{ backgroundImage: "url('cong.png')" }}></div>
            <div className="user">
              {currentUser &&(
                <strong style={{ fontSize:'40px'}}>{currentUser.username}</strong>
              )}
              
              
            </div>
          </div>
          <ul>
            { !currentUser ?( SidebarData.map((item,i)=>
              (
                <Link to={item.link}  key={i}>
                 <li key={i} id={location.pathname === item.link ? "active" : ""}>
              <Link to={item.link}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
                </Link>
              ))):(
                filtersidebarData.map((item,i)=>
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
              )
             
            }

          </ul>
        </div>
       
    </div>
  )
}

export default Sidebar
