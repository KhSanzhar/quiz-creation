import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherBoard from './components/teacher/teacherBoard';
import CreateQuiz from './components/teacher/createQuiz';
import Dashboard from './components/student/dashboard';
import ResultItem from './components/common/resultItem';
import ResultsList from './components/common/resultsList';
import NavBar from './components/common/NavBar';
import TakeTest from './components/student/takeAssignment';
import AssignmentComponent from './components/newTeacher/Assignment';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={ <TeacherBoard />}/>
          <Route path='/create' element={ <CreateQuiz />}/>
          <Route path='/student' element= { <Dashboard />}/>
          <Route path='/test/:testId' element={ <TakeTest />}/>
          <Route path='/quiz' element={ <AssignmentComponent />} />
          <Route path='/results' element={ <ResultsList />} />
          <Route path='/results/:id' element={ <ResultItem />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
