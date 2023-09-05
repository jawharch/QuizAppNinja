import Auth from "./components/Auth"
import Dashboard from "./components/Dashboard"  
import Quiz from "./components/Quiz"
import Report from "./components/Report"
import Result from "./components/Result"
import Test from "./components/Test"
  
  
  
  export const routes=[
    
    {
        path: '/',
    element: <Dashboard/>,
    exact: true, 

    },
    {
        path: '/quizs',
        element: <Quiz/>,
        exact:false
    

    },
    {
        path: '/auth',
    element: <Auth/>,
    exact:false
   

    },
    {
        path: '/report',
    element: <Report/>,
    exact:false
   

    },
    {
        path: '/quiz/:cat',
       element: <Test/>,
       exact:false
   

    },
    {
        path: '/result/:cat',
    element: <Result/>,
    exact:false
   

    },
    
]