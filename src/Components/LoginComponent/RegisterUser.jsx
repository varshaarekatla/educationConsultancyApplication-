import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';

const RegisterUser = () => {
    const [educonUser, setEduconUser] = useState({
        username: "",
        password: "",
        email: "",
        category: "",
    });
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!educonUser.username || educonUser.username.length < 3) {
            newErrors.username = "Please enter the username.";
        }

        if (!educonUser.password || educonUser.password.length < 5 || educonUser.password.length > 10) {
            newErrors.password = "Password must be between 5 to 10 characters.";
        }

        if (educonUser.password !== password2) {
            newErrors.password2 = "Passwords do not match.";
        }

        if (!educonUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(educonUser.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!educonUser.category) {
            newErrors.category = "Please select a category.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setEduconUser(prev => ({ ...prev, [name]: value }));
    };

    const saveNewUser = (e) => {
        e.preventDefault();
        if (validate()) {
            registerNewUser(educonUser).then(() => {
                alert("User registered successfully!");
                navigate('/');
            });
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "5px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none"
    };

    const errorStyle = {
        color: "red",
        fontSize: "13px",
        marginBottom: "10px"
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px"
        }}>
            <div style={{
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                padding: "30px",
                width: "100%",
                maxWidth: "450px"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Register New User</h2>
                <form onSubmit={saveNewUser}>
                    <label>Username: <span style={{ color: "red" }}>*</span></label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={educonUser.username}
                        onChange={onChangeHandler}
                        style={inputStyle}
                    />
                    {errors.username && <div style={errorStyle}>{errors.username}</div>}

                    <label>Password: <span style={{ color: "red" }}>*</span></label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={educonUser.password}
                        onChange={onChangeHandler}
                        style={inputStyle}
                    />
                    {errors.password && <div style={errorStyle}>{errors.password}</div>}

                    <label>Confirm Password: <span style={{ color: "red" }}>*</span></label>
                    <input
                        type="password"
                        name="password2"
                        placeholder="Re-enter password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        style={inputStyle}
                    />
                    {errors.password2 && <div style={errorStyle}>{errors.password2}</div>}

                    <label>Email: <span style={{ color: "red" }}>*</span></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={educonUser.email}
                        onChange={onChangeHandler}
                        style={inputStyle}
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}

                    <label>Category: <span style={{ color: "red" }}>*</span></label>
                    <input
                        list="types"
                        name="category"
                        placeholder="Select role"
                        value={educonUser.category}
                        onChange={onChangeHandler}
                        style={inputStyle}
                    />
                    <datalist id="types">
                        <option value="Student" />
                        <option value="Admin" />
                    </datalist>
                    {errors.category && <div style={errorStyle}>{errors.category}</div>}

                    <button type="submit" style={{
                        marginTop: "20px",
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#6c63ff",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;

