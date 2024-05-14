import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainView } from './components/main-view/main-view';
import { WelcomeView } from './components/welcome-view/welcome-view';

function App() {
  return ( 
    <div className="app">
    
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route path="/homepage" element={<MainView />} />
      </Routes>
   
  </div>
  );
}
export default App;