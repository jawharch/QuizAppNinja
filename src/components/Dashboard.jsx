import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Data } from './Data';

import SearchIcon from '@mui/icons-material/Search';
import Meta from 'antd/es/card/Meta';
import { Card } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../Features/quizSlice';
import Modal from 'react-modal';
import LogoutIcon from '@mui/icons-material/Logout';
import { resetUser } from '../Features/userSlice';



const Dashboard = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [input,setinput]=useState("")
  const searchdata=Data.filter((item)=>item.name.includes(input))
  const {currentUser}=useSelector(state=>state.user)
  console.log(currentUser)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 


  

  return (
    
      <div>
      <Sidebar/>
      <div className='main-content'>
      {currentUser &&   <button className='deconnecter' onClick={()=>{dispatch(resetUser())
      navigate('/auth') 
        window.location.reload();
         
        }}> Se deconnecter  <LogoutIcon/> </button> }
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,m:'5px auto' }}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a quiz"
        inputProps={{ 'aria-label': 'Search for a test' }}
        onChange={(e)=>setinput(e.target.value.toLowerCase())}
      
      
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
    </Paper>
    <br />
   
    <div className='flex' style={{ overflowY: 'auto', height: 'calc(100vh - [header_height])' }}>
          {searchdata.length > 0 ? (
            searchdata.map((item, i) => (
             <div key={i}>
              {
                currentUser ?(
                  <Link to={`/quiz/${item.name}` }>
                  <Card
                  onClick={()=>dispatch(resetQuiz())}
                    hoverable
                    style={{ width: 240, marginBottom: '10px' }}
                    cover={<img alt='example' src={item.img} key={i} />}
                  >
                    <Meta className='meta' title={item.title} description={item.desc} />
                  </Card>
                  </Link>
                ):(

                 <div>
                  <Card
                  onClick={openModal}
                    hoverable
                    style={{ width: 240, marginBottom: '10px' }}
                    cover={<img alt='example' src={item.img} key={i} />}
                  >
                    <Meta className='meta' title={item.title} description={item.desc} />
                  </Card>
                 </div>
                )
              }
             
              </div>
            ))
          ) : (
            <div className='no-data'>No tests found for:{input}</div>
          )}
        </div>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            padding: '20px',
            textAlign: 'center',
            
          },
        }}
      >
        <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '40px' }}>You need to sign up first</h2>

  <Link to={'/auth'} > 
  <button style={{ backgroundColor: 'black', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', marginRight: '10px',marginTop:'20px' }} > Sign up</button> </Link>
  <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', marginLeft: '10px',marginTop:'20px'}} onClick={closeModal}>Cancel</button>
      </Modal>


      </div>
    </div>
  );
};

export default Dashboard
