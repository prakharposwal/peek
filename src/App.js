import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextView from './components/TextView';
import TextCreate from './components/TextCreate';



function App() {
  
  return (
    <Router>
    <div className="App">
    <h1>Peek</h1>
      <Routes>
        <Route path='/' element={<TextCreate/>} />
      <Route path="/:secretId" element={<TextView />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App; 