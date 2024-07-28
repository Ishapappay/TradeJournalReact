import React, { useState } from 'react';
import { CreateTrader } from '../services/user-service'
import customToaster from '../helper/custom-toaster'

function Register(props) {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e);
    setPasswordMatchError(e !== confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e);
    setPasswordMatchError(e !== password);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  async function CreateNewUser() {
    debugger
    let newUser = new FormData();
    newUser.append('FirstName', fisrtName);
    newUser.append('LastName', lastName);
    newUser.append('Email', email);
    newUser.append('Password', password);
    newUser.append('Phone', phone);
    newUser.append('ImageFile', image);
   
    if (!passwordMatchError) {
      var result = await CreateTrader(newUser);
    }
    else {
      //customToaster.warning('Please check password');
      customToaster.error('Please check password');
    }
  }

  return (
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <form className="mx-1 mx-md-4">

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">First Name</label>
                    </div>
                  </div>


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" onChange={(e) => setLastName(e.target.value)} className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Last Name</label>
                    </div>
                  </div>
                 
                  <input type="file" accept="image/*" onChange={handleImageChange} />


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" onChange={(e) => setPhone(e.target.value)} className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Phone</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" value={password} onChange={(e) => handlePasswordChange(e.target.value)} className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c" >Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)} className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c" >Confirm Password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={CreateNewUser} >Register</button>
                  </div>

                </form>

              </div>

              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;