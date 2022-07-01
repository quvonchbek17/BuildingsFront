import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import AdminCompany from './pages/AdminCompany/AdminCompany';
import AdminComplex from './pages/AdminComplex/AdminComplex';
import AdminBank from './pages/AdminBank/AdminBank';
import AdminRoom from './pages/AdminRoom/AdminRoom';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/admin' element={<Admin/>} />
      <Route  path='/admincompanies' element={<AdminCompany/>} />
      <Route  path='/admincomplexes' element={<AdminComplex/>} />
      <Route  path='/adminbanks' element={<AdminBank/>} />
      <Route  path='/adminrooms' element={<AdminRoom/>} />
    </Routes>




    </>
  );
}

export default App;
