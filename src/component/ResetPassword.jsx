import React, { useState } from 'react';
import customToaster from '../helper/custom-toaster'

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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

    async function ResetPassword() {
        if (!passwordMatchError) {
            var result = await ResetPassword(email, password);
        }
        else {
            //customToaster.warning('Please check password');
            customToaster.error('Please check password');
        }
    }
    return (
        <div>
            <form>
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

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={ResetPassword} >Reset Password</button>
                </div>
            </form>
        </div>
    )
}
export default ResetPassword;