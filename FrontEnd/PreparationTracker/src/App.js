import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import TopicCard from './Pages/Topic';
import ProblemCard from './Pages/Problems';

import ProblemDetails from './Pages/ProblemDetailView';
import Home from './Pages/Home';
import About from './Pages/About';
import Exams from './Pages/Exam';


function App() {
  return (
    <div className="flex flex-col h-screen">
            <Header/>
      <div className="flex flex-1 Home">
            <Router>
            <Sidebar/>
          <main className="flex-1 bg-[#F3F4F6] px-6 py-8 main">
            <Routes>
              <Route exact path = "/" element={<Home/>}></Route> 
              <Route exact path = "/topic" element={<TopicCard/>}></Route>
              <Route exact path = "/:topicId" element={<ProblemCard/>}></Route>
              <Route exact path="/About" element={<About/>}></Route>
              <Route exact path='/problemDetail/:topicID/:problemId' element={<ProblemDetails/>}></Route>
            </Routes>
          </main>
            </Router>
       </div>
    </div>
  );
}

export default App;
