
import './App.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Report from './components/Report';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Test from './components/Test';
import Result from './components/Result';
import { routes } from './config';

function App() {
  return (
    <div className="App">
      
     
     <Router>
      
      <Routes>
        
        {routes.map((item,i)=>
        (
          <Route  key={i}  exact={item.exact} path={item.path} element={item.element }/>
        ))}

      </Routes>
      
     </Router>
     
    </div>
  );
}

export default App;
