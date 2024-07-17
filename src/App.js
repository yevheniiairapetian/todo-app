import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainView } from './components/main-view/main-view';
import { WelcomeView } from './components/welcome-view/welcome-view';
import { HashRouter } from 'react-router-dom';

function App() {
  return ( 
    <div className="app">
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route path="/homepage" element={<MainView />} />
      </Routes>
      </HashRouter>
  </div>
  );
}
export default App;