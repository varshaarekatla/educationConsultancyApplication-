import React, { useState, useEffect } from 'react';
import { updateStudent, getStudentById } from "../../Services/StudentService";
import { useParams, useNavigate } from 'react-router-dom';

const StudentUpdate = () => {
    const [student, setStudent] = useState({
        registrationNumber: '',
        studentName: '',
        address: '',
        mobile: '',
        studentLevel: '',
        username: '',
        email: '',
        status: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { studentId } = useParams();

    useEffect(() => {
        getStudentById(studentId)
            .then(res => setStudent(res.data))
            .catch(err => console.log("Error fetching student data:", err));
    }, [studentId]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setStudent(values => ({ ...values, [name]: value }));
    };

    const validate = () => {
        const errs = {};
        if (!student.registrationNumber.trim()) errs.registrationNumber = "Registration number is required";
        if (!student.username.trim()) errs.username = "Username is required";
        if (!student.studentName.trim()) errs.studentName = "Student name is required";
        if (!student.email.trim()) errs.email = "Email is required";
        if (!student.address.trim()) errs.address = "Address is required";
        if (!student.mobile.trim() || !/^\d{10}$/.test(student.mobile)) errs.mobile = "Enter a valid 10-digit mobile number";
        if (!student.studentLevel.trim()) errs.studentLevel = "Student level is required";
        if (!student.status.trim()) errs.status = "Status is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const studentSave = (event) => {
        event.preventDefault();
        if (!validate()) return;

        updateStudent(student)
            .then(() => {
                alert("Student is updated successfully!");
                navigate('/student-list');
            })
            .catch(error => {
                console.error("Update failed", error);
                alert("Update failed. Check console.");
            });
    };

    const goBack = () => {
        navigate('/student-list');
    };

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
            padding: '30px'
        },
        card: {
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: '600px'
        },
        title: {
            textAlign: 'center',
            color: '#4b0082',
            marginBottom: '20px',
            fontSize: '28px',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '8px 0 4px',
            borderRadius: '8px',
            border: '1px solid #ccc'
        },
        label: {
            fontWeight: '600',
            color: '#333'
        },
        error: {
            color: 'red',
            fontSize: '12px',
            marginBottom: '10px'
        },
        buttonRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
        },
        saveBtn: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600'
        },
        returnBtn: {
            backgroundColor: '#333',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Update Student</h2>
                <form onSubmit={studentSave}>
                    <div>
                        <label style={styles.label}>Registration Number:</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            value={student.registrationNumber}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.registrationNumber && <div style={styles.error}>{errors.registrationNumber}</div>}
                    </div>

                    <div>
                        <label style={styles.label}>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={student.username}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.username && <div style={styles.error}>{errors.username}</div>}
                    </div>

                    <div>
                        <label style={styles.label}>Student Name:</label>
                        <input
                            type="text"
                            name="studentName"
                            value={student.studentName}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.studentName && <div style={styles.error}>{errors.studentName}</div>}
                    </div>

                    <div>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={student.email}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.email && <div style={styles.error}>{errors.email}</div>}
                    </div>

                    <div>
                        <label style={styles.label}>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={student.address}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.address && <div style={styles.error}>{errors.address}</div>}
                    </div>

                    <div>
                        <label style={styles.label}>Mobile:</label>
                        <input
                            type="text"
                            name="mobile"
                            value={student.mobile}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.mobile && <div style={styles.error}>{errors.mobile}</div>}
                    </div>

                    <div>
                        <label style={styles.label}>Student Level:</label>
                        <input
                            type="text"
                            name="studentLevel"
                            value={student.studentLevel}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.studentLevel && <div style={styles.error}>{errors.studentLevel}</div>}
                    </div>

                    <div>
                        <label style={styles.label}>Status:</label>
                        <input
                            type="text"
                            name="status"
                            value={student.status}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.status && <div style={styles.error}>{errors.status}</div>}
                    </div>

                    <div style={styles.buttonRow}>
                        <button type="button" style={styles.returnBtn} onClick={goBack}>Return</button>
                        <button type="submit" style={styles.saveBtn}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentUpdate;
