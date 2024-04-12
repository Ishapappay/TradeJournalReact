import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import  { Toaster } from 'react-hot-toast';

import Login from './component/Login';
import Register from "./component/RegisterUser";
import Layout from './component/Layout';
import Strategies1 from './component/Strategies';
import Portfolio from './component/Portfolio';
// import NewTrade  from './component/NewTrade';
import Trades from './component/Trades';
import AddNewTrade from './component/AddNewTrade';



function App() {

  let [isLogin, setIsLogin] = useState(true)
  const handleLoginChange = (newValue) => {
     setIsLogin(newValue);
  };

  return (
    <Router>
    <div className="App">  
        <Routes>
          <Route path='/' element= {<Login ChangeIslogin={handleLoginChange}></Login> }></Route>
          <Route>
          <Route element={!isLogin?<Login ChangeIslogin={handleLoginChange}></Login>: <Layout/>}>
            <Route path='/Strategies' Component={Strategies1}></Route>
            <Route path='/Trades' Component={Trades}></Route>
            <Route path='/AddNewTrade' Component={AddNewTrade}></Route>
            <Route path='/Portfolio' Component={Portfolio}></Route>
          </Route>
          </Route>
          <Route path='/Register' Component={Register}></Route>
        </Routes>
        <Toaster />
    </div>
    </Router>
  );
}

export default App;

