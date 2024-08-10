import { Router,Route, Routes } from 'react-router-dom';
import './App.css';
import Items from './components/Items';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Items/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
