import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { displayAllCourses } from '../../Services/CourseService';

const StudentCourseList = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        displayAllCourses()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                }
            })
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const returnBack = () => {
        navigate('/StudentMenu');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>📚 Student Course List</h2>
                <hr style={styles.divider} />
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Course Id</th>
                                <th style={styles.th}>Course Name</th>
                                <th style={styles.th}>Hours</th>
                                <th style={styles.th}>Price</th>
                                <th style={styles.th}>Technology</th>
                                <th style={styles.th}>Subscribe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={course.courseId || `course-${index}`} style={styles.tr}>
                                    <td style={styles.td}>{course.courseId}</td>
                                    <td style={styles.td}>{course.courseName}</td>
                                    <td style={styles.td}>{course.hours}</td>
                                    <td style={styles.td}>₹ {course.price}</td>
                                    <td style={styles.td}>{course.technology}</td>
                                    <td style={styles.td}>
                                        <Link to="/subscription-add">
                                            <button style={styles.registerBtn}>Register</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={returnBack} style={styles.returnBtn}>← Return</button>
            </div>
        </div>
    );
};

// CSS-in-JSX styling
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        padding: "2rem",
        maxWidth: "1100px",
        width: "100%",
    },
    title: {
        textAlign: "center",
        color: "#007bff",
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    divider: {
        height: "3px",
        backgroundColor: "#ff3c3c",
        border: "none",
        marginBottom: "1.5rem",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "2rem",
    },
    th: {
        backgroundColor: "#343a40",
        color: "#fff",
        padding: "12px 16px",
        textAlign: "center",
        fontWeight: "600",
    },
    tr: {
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
    },
    td: {
        padding: "12px 16px",
        textAlign: "center",
        color: "#333",
    },
    registerBtn: {
        backgroundColor: "#17a2b8",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background-color 0.3s",
    },
    returnBtn: {
        display: "block",
        margin: "0 auto",
        marginTop: "1rem",
        backgroundColor: "#28a745",
        color: "white",
        padding: "10px 20px",
        fontSize: "1rem",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default StudentCourseList;
