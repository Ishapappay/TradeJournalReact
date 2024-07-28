import React from 'react'
import { useState } from "react"
import  {ForgotPasswordLink}  from '../services/user-service'

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    async function ResetPasswordLink() {
        debugger
        await ForgotPasswordLink(email);
    }
    return (
        <div>
            <form>
                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={ ResetPasswordLink} >Send me link</button>
                </div>
            </form>
        </div>
    )
}
export default ForgotPassword;