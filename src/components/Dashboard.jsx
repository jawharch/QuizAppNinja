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
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetQuiz } from '../Features/quizSlice';


const Dashboard = () => {
  const dispatch=useDispatch()
  const [input,setinput]=useState("")
  const searchdata=Data.filter((item)=>item.name.includes(input))

  return (
    
      <div>
      <Sidebar/>
      <div className='main-content'>
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
            ))
          ) : (
            <div className='no-data'>No tests found for:   {input}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard
