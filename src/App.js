
import './App.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Report from './components/Report';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Test from './components/Test';
import Result from './components/Result';

function App() {
  return (
    <div className="App">
      
     
     <Router>
      
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/quizs' element={<Quiz/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/quiz/:cat' element={<Test/>}/>
        <Route path='/result/:cat' element={<Result/>}/>

      </Routes>
      
     </Router>
     
    </div>
  );
}

export default App;
