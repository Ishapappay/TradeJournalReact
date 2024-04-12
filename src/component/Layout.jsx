import { Link, Outlet } from "react-router-dom"
import strategy from "../css/Layout.css"
import { useNavigate } from 'react-router-dom'



const Layout = () => {
    const navigate = useNavigate();

    async function search(e) {
        e.preventDefault()

        navigate("/TradeSearch")
    }
    return (
        <div className='container-fluid'>
            <div className="row">

                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <form className="d-flex" onSubmit={search}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
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

                        </div>
                    </div>
                </nav>

                <div className='col-2' >
                    <ul>
                        <li>
                            <Link to='/Dashboard'>Dashboard</Link>
                        </li>
                        <li>
                            <Link to='/Trades'>Trades</Link>
                        </li>
                        <li>
                            <Link to='/Portfolio'>Portfolio</Link>
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