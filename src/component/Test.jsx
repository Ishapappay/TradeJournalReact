import React, { useState } from 'react';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Check if passwords match
        setPasswordMatchError(e.target.value !== confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Check if passwords match
        setPasswordMatchError(e.target.value !== password);
    };

    const handleSubmit = () => {
        if (!passwordMatchError) {
            // Handle form submission (e.g., fetch user token)
            // ...
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            {passwordMatchError && (
                <p style={{ color: 'red' }}>Passwords do not match</p>
            )}
            <button onClick={handleSubmit}>Sign in</button>
        </div>
    );
}

export default Login;
