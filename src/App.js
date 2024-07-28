import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import PortfolioProvider from './component/PortfolioProvider'; // Import the PortfolioProvider component

//import portfolioContext from './component/portfolioContext'
import Login from './component/Login';
import Register from "./component/RegisterUser";
import Layout from './component/Layout';
import Strategies1 from './component/Strategies';
import Holdings from './component/Holdings';
import Trades from './component/Trades';
import AddNewTrade from './component/AddNewTrade';
import { Settings } from './component/Settings';
import Dashboard from './component/Dashboard';
import ForgotPassword from './component/ForgotPassword';
import TradeSearch from './component/TradeSearch';
import ResetPassword from './component/ResetPassword';


import test from './component/Test';

function App() {

  let [isLogin, setIsLogin] = useState(true)
  const handleLoginChange = (newValue) => {
    setIsLogin(newValue);
  };

  return (
    //<PortfolioProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login ChangeIslogin={handleLoginChange}></Login>}></Route>
          <Route>
            <Route element={!isLogin ? <Login ChangeIslogin={handleLoginChange}></Login> : <Layout />}>
              <Route path='/Strategies' Component={Strategies1}></Route>
              <Route path='/Trades' Component={Trades}></Route>
              <Route path='/AddNewTrade/:id' Component={AddNewTrade}></Route>
              <Route path='/Holdings' Component={Holdings}></Route>
              <Route path='/settings' Component={Settings}></Route>
              <Route path='/dashboard' Component={Dashboard}></Route>
              <Route path='/tradeSearch/:stock' Component={TradeSearch}></Route>
              <Route path='/test' Component={test}></Route>


            </Route>
          </Route>
          <Route path='/Register' Component={Register}></Route>
          <Route path='/ForgotPassword' Component={ForgotPassword}></Route>
          <Route path='/ResetPassword' Component={ResetPassword}></Route>

        </Routes>

        <Toaster />
      </div>
    </Router>
    //</PortfolioProvider>

  );
}

export default App;

