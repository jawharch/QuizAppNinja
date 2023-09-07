import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ProgressBar from '@ramonak/react-progress-bar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getToPrevQuestion,getToNextQuestion , quizFetch, score, setUserAnswer, setScore } from '../Features/quizSlice';
import { useDispatch ,useSelector} from 'react-redux';
import axios from 'axios';


const Test = () => {
  const dispatch=useDispatch()
  const location = useLocation();
const cat = location.pathname.split('/')[2];
const  {questionsArray,currQuesIndex,userAnwsers,correctAnwsers,score,userScores}=useSelector(state=>state.quiz)
console.log('questionsArray:', questionsArray)

useEffect(() => {
  const url=`https://quizapi.io/api/v1/questions?apiKey=5TajBteklIW1kNOZVzGoQmLObgwDXb88mFWZcavr&limit=6&tags=${cat}`

 dispatch(quizFetch(url))
}, [dispatch])








const isloading=useSelector(state=>state.quiz.isloading)
const currentQuestion=questionsArray[currQuesIndex]
const islastquestion=currQuesIndex===questionsArray.length-1
const userAnswer=userAnwsers[currQuesIndex]
const handlenextclick=()=>
{
  dispatch(getToNextQuestion())
  
}

const handleAnswerChange=(value,i)=>
{
  const answer=value
  const answerValue=i===correctAnwsers[currQuesIndex] ? 1:0

  dispatch(setUserAnswer({questionIndex:currQuesIndex,answer}))


 dispatch(setScore({questionIndex:currQuesIndex,answerValue}))
 
 

}
const completedPer= currQuesIndex !==5 ?((currQuesIndex/questionsArray.length)*100):100







  return (
    <div className='container'>
      {isloading?(<p>Loading...</p>):(
        <>
        <ProgressBar
        completed={completedPer}
        bgColor="orange"
        labelColor="orange"
       
        height="20px"
        width='100%'
        labelAlignment="center"
      />
      
      <div className='questions-container'>
         {questionsArray.length > 0 && currentQuestion ? (

<div className='question' >
<span className='span'> Question: {currQuesIndex+1} / 6</span>
<h1 className='title'>{currentQuestion?.question}</h1>
<ul className='answers'>
{Object.entries(currentQuestion?.answers).map(([key, value],i) => (
value !== null && (
<li className='answer' key={key}>
<input type='radio'
 className='radiob'
 name='answer'
 value={value}
 checked={userAnswer===value}
 onChange={()=>handleAnswerChange(value,i) }

/>
{value}


</li>
)

))}

 

<div className='btns'>
  {currQuesIndex!==0 &&(
    <button className='btn-Previous' onClick={()=>dispatch(getToPrevQuestion())}><ArrowBackIcon /> Prev</button>
  )}

        <Link to={'/'}>
        <button className='bt'>Go Back to Tests</button>
        </Link>
    

{islastquestion ? <Link to={`/result/${cat}`}>
  <button className={islastquestion ?'btn-finish':'btn-Next'} onClick={handlenextclick}> {islastquestion ? 'Finish':'Next'}<ArrowForwardIcon/></button>
</Link>:<button className={islastquestion ?'btn-finish':'btn-Next'} onClick={handlenextclick}> {islastquestion ? 'Finish':'Next'}<ArrowForwardIcon/></button>}

</div>
</ul>
</div>
        ):(<p>no questions availables</p>)}
        
          


        
          
        
      </div>
        
        </>
        
      )}

      
    </div>
  );
};

export default Test;
