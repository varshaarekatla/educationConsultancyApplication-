import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentStudents } from '../../Services/StudentService';

const StudentCurrent = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentStudents()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>📚 Current Students</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.headerRow}>
                                <th>Reg. Number</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index} style={styles.row}>
                                        <td>{student.registrationNumber || "N/A"}</td>
                                        <td>{student.username || "N/A"}</td>
                                        <td>{student.studentName || "N/A"}</td>
                                        <td>{student.email || "N/A"}</td>
                                        <td>{student.mobile || "N/A"}</td>
                                        <td>{student.address || "N/A"}</td>
                                        <td>{student.studentLevel || "N/A"}</td>
                                        <td>
                                            <span style={{
                                                ...styles.status,
                                                backgroundColor: student.status ? '#28a745' : '#dc3545'
                                            }}>
                                                {student.status ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={styles.noData}>No student data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.backBtn} onClick={() => navigate('/AdminMenu')}>⬅ Back</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0f2f1, #e3f2fd)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    },
    card: {
        width: '100%',
        maxWidth: '1100px',
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: '1.5rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    headerRow: {
        backgroundColor: '#00796b',
        color: '#fff',
    },
    row: {
        backgroundColor: '#fafafa',
        textAlign: 'center',
    },
    noData: {
        textAlign: 'center',
        padding: '1rem',
        fontStyle: 'italic',
        color: '#555',
        backgroundColor: '#fff3cd',
    },
    status: {
        padding: '0.4rem 0.8rem',
        borderRadius: '20px',
        color: '#fff',
        fontWeight: 'bold',
        display: 'inline-block',
    },
    buttonContainer: {
        textAlign: 'center',
        marginTop: '2rem',
    },
    backBtn: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '0.6rem 1.4rem',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.3s',
    }
};

export default StudentCurrent;
