import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { fetchToken } from '../services/user-service'

function Login(props) {
    const [email, setEmail] = useState("")
    const [showSendMeLink, setShowSendMeLink] = useState(false)
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function fetchUserToken() {
        let result = await fetchToken(email, password);
        localStorage.setItem('Token', result.token);
        props.ChangeIslogin(true);
        navigate("/Dashboard");
    }  
    return (
        <div className="container-fluid h-custom custom-bg h-auto">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid" alt="Sample image" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                    <form className="bg-white rounded">
                    <label className="form-label" htmlFor="form2Example1">Login</label>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example1">Email address</label>
                            <input type="email" id="form2Example1" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example2">Password</label>
                            <input type="password" id="form2Example2" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                        </div>

                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={fetchUserToken}>Sign in</button>

                        <div className="text-center">
                            <p>Not a member? <Link to='/Register'>Register</Link> </p>
                        </div>
                        <div className="text-center">
                            <p ><Link to='/ForgotPassword'> Forgot password</Link> </p>
                        </div>
                        {/* {
                            showSendMeLink && (
                                <div>
                                    <p> Send me link </p>
                                </div>
                            )
                        } */}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;