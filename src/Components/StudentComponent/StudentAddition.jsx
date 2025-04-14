import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRegistration, saveStudent, getStudentStatusByUsername } from "../../Services/StudentService";

const StudentAddition = () => {
    const [student, setStudent] = useState({
        registrationNumber: "",
        username: "",
        studentName: "",
        email: "",
        mobile: "",
        address: "",
        studentLevel: "",
        status: "Active"
    });

    const [newId, setNewId] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = () => {
        getStudentStatusByUsername().then(response => {
            if (response.data === true || response.data === false) {
                alert("Student is already registered.");
                navigate("/StudentMenu");
            } else {
                showStudentId();
            }
        });
    };

    const showStudentId = () => {
        generateRegistration().then((response) => {
            setNewId(response.data);
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!student.username || student.username.length < 3) tempErrors.username = "Username must be at least 3 characters.";
        if (!student.studentName || student.studentName.length < 3) tempErrors.studentName = "Student Name must be at least 3 characters.";
        if (!student.email || !/\S+@\S+\.\S+/.test(student.email)) tempErrors.email = "Email is not valid.";
        if (!student.mobile || !/^\d{10}$/.test(student.mobile)) tempErrors.mobile = "Mobile must be a 10-digit number.";
        return tempErrors;
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setStudent(values => ({ ...values, [name]: value }));
    };

    const studentSave = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            return;
        }

        const studentWithId = { ...student, registrationNumber: newId };
        saveStudent(studentWithId).then(() => {
            alert("New student is registered successfully!");
            navigate('/StudentMenu');
        });
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>🎓 Student Registration</h2>
                <form onSubmit={studentSave} style={styles.form}>
                    <FormField label="Registration Number">
                        <input type="text" name="registrationNumber" value={newId} readOnly style={styles.input} />
                    </FormField>

                    <FormField label="Username" error={errors.username}>
                        <input type="text" name="username" value={student.username} onChange={onChangeHandler} style={styles.input} />
                    </FormField>

                    <FormField label="Student Name" error={errors.studentName}>
                        <input type="text" name="studentName" value={student.studentName} onChange={onChangeHandler} style={styles.input} />
                    </FormField>

                    <FormField label="Email" error={errors.email}>
                        <input type="email" name="email" value={student.email} onChange={onChangeHandler} style={styles.input} />
                    </FormField>

                    <FormField label="Mobile" error={errors.mobile}>
                        <input type="tel" name="mobile" value={student.mobile} onChange={onChangeHandler} style={styles.input} />
                    </FormField>

                    <FormField label="Address">
                        <input type="text" name="address" value={student.address} onChange={onChangeHandler} style={styles.input} />
                    </FormField>

                    <FormField label="Student Level">
                        <input type="text" name="studentLevel" value={student.studentLevel} onChange={onChangeHandler} style={styles.input} />
                    </FormField>

                    <FormField label="Status">
                        <select name="status" value={student.status} onChange={onChangeHandler} style={styles.select}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </FormField>

                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.saveBtn}>✅ Save</button>
                        <button type="button" onClick={() => navigate('/StudentMenu')} style={styles.backBtn}>⬅ Return</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Reusable field wrapper
const FormField = ({ label, children, error }) => (
    <div style={styles.inputGroup}>
        <label>{label}</label>
        {children}
        {error && <span style={styles.errorText}>{error}</span>}
    </div>
);

// Styling
const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '2rem 3rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        padding: '0.7rem',
        borderRadius: '10px',
        border: '1px solid #ccc',
        outline: 'none',
        fontSize: '1rem'
    },
    select: {
        padding: '0.7rem',
        borderRadius: '10px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        backgroundColor: '#fff'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.5rem'
    },
    saveBtn: {
        padding: '0.6rem 1.2rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    backBtn: {
        padding: '0.6rem 1.2rem',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        fontSize: '0.85rem',
        marginTop: '4px'
    }
};

export default StudentAddition;
