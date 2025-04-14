import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../Services/LoginService';

const backgroundStyle = {
    margin: 0,
    padding: 0,
    fontFamily: 'Segoe UI, sans-serif',
    backgroundImage: 'url("/assets/login.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const cardStyle = {
    width: '420px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
};

const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    marginTop: '10px',
    borderRadius: '10px',
    border: '1px solid #bbb',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '5px',
};

const inputFocusStyle = {
    border: '1px solid #007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
};

const errorStyle = {
    color: 'red',
    fontSize: '13px',
    marginBottom: '10px',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '14px',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
};

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState({ username: false, password: false });

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!username || username.length < 3) {
            newErrors.username = 'Please fill the username.';
        }
        if (!password || password.length < 5) {
            newErrors.password = 'Please enter the password.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            validateUser(username, password).then((response) => {
                const role = String(response.data);
                if (role === 'Admin') navigate('/AdminMenu');
                else if (role === 'Student') navigate('/StudentMenu');
                else alert('Wrong Userid/Password');
            });
        }
    };

    const registerNewUser = () => {
        navigate('/Register');
    };

    return (
        <div style={backgroundStyle}>
            <div style={cardStyle}>
                <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
                    <u>Login Page</u>
                </h2>
                <form onSubmit={checkLogin}>
                    <div className="form-group">
                        <label style={{ fontWeight: '600' }}>User Name:</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            style={focused.username ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                            value={username}
                            onFocus={() => setFocused({ ...focused, username: true })}
                            onBlur={() => setFocused({ ...focused, username: false })}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <div style={errorStyle}>{errors.username}</div>}
                    </div>

                    <div className="form-group">
                        <label style={{ fontWeight: '600' }}>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            style={focused.password ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                            value={password}
                            onFocus={() => setFocused({ ...focused, password: true })}
                            onBlur={() => setFocused({ ...focused, password: false })}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div style={errorStyle}>{errors.password}</div>}
                    </div>

                    <button type="submit" style={{ ...buttonStyle, backgroundColor: '#007bff' }}>
                        Submit
                    </button>
                </form>
                <button
                    onClick={registerNewUser}
                    style={{ ...buttonStyle, backgroundColor: '#20c997' }}
                >
                    Register New User
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
