import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState=
{
    questionsArray:[],
    isloading:false,
    status:null,
    currQuesIndex:0,
    userAnwsers:[],
    userScores:[],
    correctAnwsers:[],
    



}
export const quizFetch=createAsyncThunk('questions',async(url)=>
 {
    const res= await axios.get(url)
    
    return res?.data
   
   
})
const quizSlice=createSlice(
    {
        name:'quiz',
        initialState,
        reducers:{
            getToNextQuestion(state)
            {
                state.currQuesIndex=state.currQuesIndex+1
            },
            getToPrevQuestion(state)
            {
                state.currQuesIndex=state.currQuesIndex-1
            },
            setUserAnswer(state,action)
            {
                const { questionIndex, answer } = action.payload;
                state.userAnwsers[questionIndex]=answer

            },
            setScore(state,action)
            {
                const {questionIndex,answerValue}=action.payload
                if(answerValue===1)
                {
                    state.userScores[questionIndex]=answerValue
                }
                else
                {
                    state.userScores[questionIndex]=undefined
                }

            },
            resetQuiz(state,action)
            {
                return{
                    ...initialState
                }
            }


        },
        extraReducers:{
            [quizFetch.pending] :(state,action)=>
            {
                state.status='pending'
                state.isloading=true
            },
            [quizFetch.fulfilled] :(state,action)=>
            {
                
                state.status='success'
                state.questionsArray=action.payload
                state.correctAnwsers=action.payload.map((answer)=>
                {
                    const correctKey=Object.keys(answer.correct_answers).find(key=>answer.correct_answers[key]==="true")
                    const correctKeyIndex=Object.keys(answer.correct_answers).indexOf(correctKey)
                    console.log(correctKey, correctKeyIndex);
                    return correctKeyIndex

                })
                state.isloading=false
            },
            [quizFetch.rejected] :(state,action)=>
            {
                console.log(action)
                state.status='rejected'
                state.isloading=false
            },
        }
        
    }
)
export const { getToNextQuestion, getToPrevQuestion, setUserAnswer, setScore,resetQuiz } = quizSlice.actions;
export default quizSlice.reducer