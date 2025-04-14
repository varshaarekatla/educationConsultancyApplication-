import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentMenu = () => {
    const [isStudentOpen, setIsStudentOpen] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logging out..."); 
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        navigate('/'); 
    };

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h2 style={styles.title}>Student Dashboard</h2>

                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsStudentOpen(true)}
                    onMouseLeave={() => setIsStudentOpen(false)}
                >
                    <span style={styles.menuItem}>Student ▾</span>
                    {isStudentOpen && (
                        <div style={styles.dropdownContent}>
                            <Link to="/student-add" style={styles.link}>Student Registration</Link>
                            <Link to="/student-detail" style={styles.link}>Student Detail</Link>
                        </div>
                    )}
                </div>

                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsCoursesOpen(true)}
                    onMouseLeave={() => setIsCoursesOpen(false)}
                >
                    <span style={styles.menuItem}>Courses ▾</span>
                    {isCoursesOpen && (
                        <div style={styles.dropdownContent}>
                            <Link to="/student-course-list" style={styles.link}>Course List</Link>
                            <Link to="/subscription-add" style={styles.link}>Course Subscription</Link>
                            <Link to="/stud-subscription-list" style={styles.link}>Subscription List</Link>
                        </div>
                    )}
                </div>

                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsPaymentOpen(true)}
                    onMouseLeave={() => setIsPaymentOpen(false)}
                >
                    <span style={styles.menuItem}>Payment ▾</span>
                    {isPaymentOpen && (
                        <div style={styles.dropdownContent}>
                            <Link to="/payment-add" style={styles.link}>Pay Course</Link>
                            <Link to="/stud-payment-list" style={styles.link}>Payment Report</Link>
                        </div>
                    )}
                </div>

                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </aside>

            <main style={styles.main}>
                <h1 style={styles.heading}>Welcome to the Student Dashboard</h1>
                <p style={styles.subtext}>Use the navigation on the left to manage your courses and payments.</p>
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        fontFamily: 'Segoe UI, sans-serif',
        minHeight: '100vh',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '30px 20px',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        height: '100vh',
    },
    title: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '30px',
    },
    menuItem: {
        cursor: 'pointer',
        padding: '10px 0',
        fontWeight: '500',
    },
    link: {
        display: 'block',
        color: 'white',
        textDecoration: 'none',
        padding: '8px 0',
        marginLeft: '10px',
        fontSize: '15px',
    },
    dropdown: {
        marginBottom: '15px',
    },
    dropdownContent: {
        marginLeft: '10px',
        marginTop: '5px',
    },
    logoutButton: {
        marginTop: '30px',
        padding: '10px 20px',
        backgroundColor: '#e74c3c',
        border: 'none',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    main: {
        flex: 1,
        padding: '60px 40px',
        backgroundImage: 'url("/assets/studentmenu.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#1e293b',
    },
    heading: {
        fontSize: '34px',
        color: '#1e293b',
        marginBottom: '15px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        display: 'inline-block',
        padding: '10px 20px',
        borderRadius: '10px',
    },
    subtext: {
        fontSize: '18px',
        color: '#334155',
        backgroundColor: 'rgba(255,255,255,0.7)',
        display: 'inline-block',
        padding: '8px 15px',
        borderRadius: '8px',
    },
};

export default StudentMenu;
