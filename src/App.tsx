import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScreenTest from './pages/ScreenTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/screen-test" element={<ScreenTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;