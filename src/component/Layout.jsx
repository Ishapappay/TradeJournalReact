import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { PortfolioContext } from './portfolioContext'


const Layout = () => {
    const [stock, setStock] = useState([]);
    // const [portfolio, setPortfolio] = useState("9bec7817-3435-4a8f-8156-23da0d05cf3e");

    const navigate = useNavigate();
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [showPortfolioSettings, setShowPortfolioSettings] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    async function search(e) {
        e.preventDefault()
        debugger
        //navigate("/TradeSearch")
        navigate(`/TradeSearch/${stock}`, { state: { stock: stock } });
    }
   
    return (
        <div className='container-fluid'>
            <div className="row">
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <form className="d-flex" onSubmit={search}>
                            <input className="form-control me-2" type="search" onChange={(e) => setStock(e.target.value)} placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" >Search</button>
                        </form>
                       
                        <div className="d-flex">
                            <div> Profile pic </div>
                            <div> User name </div>
                            <div>
                                <select className="">
                                    <option value="">Profile settings</option>
                                    <option value="">Portfolio settings</option>
                                    <option value="">Logout</option>
                                </select>
                            </div>
                            {/* 
                            <div className="dropdown dropleft">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Settings
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div className="dropdown-item" onClick={() => setShowProfileSettings(!showProfileSettings)}>
                                        Profile settings
                                        {showProfileSettings && (
                                            <div>
                                                <input type="radio" name="profile" id="profile1" />
                                                <label htmlFor="profile1">Profile1</label>
                                                <input type="radio" name="profile" id="profile2" />
                                                <label htmlFor="profile2">Profile2</label>
                                                <input type="radio" name="profile" id="profile3" />
                                                <label htmlFor="profile3">Profile3</label>
                                            </div>
                                        )}
                                    </div>
                                    <div className="dropdown-item" onClick={() => setShowPortfolioSettings(!showPortfolioSettings)}>
                                        Portfolio settings
                                    </div>
                                    <div className="dropdown-item" onClick={() => setShowLogout(!showLogout)}>
                                        Logout
                                    </div>
                                </div>
                            </div>
                             */}
                        </div>
                    </div>
                </nav>

                <div className='col-2'>
                    <ul>
                        <li>
                            <Link to='/Dashboard'>Dashboard</Link>
                        </li>
                        <li>
                            <Link to='/Trades'>Trades</Link>
                        </li>
                        <li>
                            <Link to='/Holdings'>Holdings</Link>
                        </li>
                        <li>
                            <Link to='/Settings'>Settings</Link>
                        </li>
                        <li>
                            <Link to='/test'>Test</Link>
                        </li>
                    </ul>
                </div>

                <div className='col-10' id='page-content-wrapper'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Layout