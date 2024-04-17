import { useState } from "react"
import {useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function fetchToken() {      
        let item = { UserName: email, password };
        fetch("https://localhost:7228/api/user-accounts/login",
            {
                method: 'POST', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }
        ).then(async (res) => {
            if (res.status == 200) {
                let result = await res.json()
                localStorage.setItem('Token', result.token);
                props.ChangeIslogin(true);
                navigate("/Dashboard")
            } else {
                alert("invalid user name or password");
            }
        }) 
    }

      return (
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid" alt="Sample image" />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example1">Email address</label>
                            <input type="email" id="form2Example1" onChange={(e) => setEmail(e.target.value)} class="form-control" />
                        </div>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example2">Password</label>
                            <input type="password" id="form2Example2" onChange={(e) => setPassword(e.target.value)} class="form-control" />
                        </div>

                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={fetchToken}>Sign in</button>

                        <div class="text-center">
                            <p>Not a member? <Link to='/Register'>Register</Link> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;