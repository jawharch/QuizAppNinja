import React, { useEffect } from 'react'
import Confetti from 'react-confetti'
import { useDispatch, useSelector } from 'react-redux'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Link, useNavigate } from 'react-router-dom';
import { resetQuiz } from '../Features/quizSlice';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const Result = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const {currentUser}=useSelector(state=>state.user)

   const dispatch=useDispatch()
    const {userScores}=useSelector(state=>state.quiz)
    const correctUsersScores=userScores.filter((item)=>item===1)
     const correctIndex=correctUsersScores.length
     
    const incorrectUsersScores=userScores.filter((item)=>item===undefined)
     const incorrectIndex=incorrectUsersScores.length
     console.log(incorrectIndex)
     const cat=location.pathname.split('/')[2]
     console.log(cat)
     

   
    useEffect(() => {
        const sendSuccesful=async()=>
        {
            try {
                const res=await axios.post('http://localhost:5001/user/send-success-email', {userEmail:currentUser.email,correctIndex:correctIndex})
                if(res)
                {
                    console.log(res.data)
                    console.log('email sent successfully')
                }
                else
                {
                    console.error('Eroor sending email')
                }
            } catch (error) {
                console.log(error)
                
            }
        }
        if(correctIndex<=4)
        return 
        sendSuccesful()
   
      }
    , [correctIndex,currentUser])
    
   
    
  
  return (
    <>
    {correctIndex >=4 ?(
        <div className='container-result'>
        <div className="cont">
   <div className='con-image'>
  <img src='/cong.png' alt='img' />

  <Confetti
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}
    wind={0}
  />
</div>
<div className="content">
    <h1 className="title">
        Congratulations
    </h1>
    <small>You have succesfully completed</small>
</div>
<div className="score">
    <p>80%  passed</p>
</div>
</div>
<div className="options">
    <div className="correct">
        <CheckIcon className='corr'/>
        <strong>
            {correctIndex}
        </strong>
        
        <p>Correct</p>
        

    </div>
    <div className="incorrect">
        <ClearIcon className='clear'/>
        <strong>{incorrectIndex}</strong>
        
        
        <p>Incorrect</p>

    </div>
</div>
<div className="next-quiz">
    <Link to={'/'}>
    <button className='next-btn' onClick={()=>
    {
        dispatch(resetQuiz())
       
    }
   
    
    }>
        Start New Quiz

    </button>
    
</Link>
    
    
    
</div>
     
    </div>

    ):(
        <div className='container-result-'>
        <div className="cont">
   <div className='con-image'>
  <img src='/fail.jpg' alt='img' />

 
</div>
<div className="content">
    <h1 className="titles">
        Failed!
    </h1>
    <small>You Failed the Quiz</small>
</div>
<div className="scores">
    <p>You didnt pass 80% of the test</p>
</div>
</div>
<div className="optionss">
   
    <div className="incorrects">
        <ClearIcon className='clear'/>
        <strong>{incorrectIndex}</strong>
        
        
        <p>Incorrect</p>

    </div>
    <div className="corrects">
        <CheckIcon className='corr'/>
        <strong>
            {correctIndex}
        </strong>
        
        <p>Correct</p>
        

    </div>
</div>
<div className="next-quiz">
    <Link to={`/quiz/${cat}`}>
    <button className='next-btns' onClick={()=>
    {
        dispatch(resetQuiz())
       
    }}>
       Retry Quiz

    </button>
    
    </Link>
    
</div>
     
    </div>



    )} </>
   
  )
}

export default Result
