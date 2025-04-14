import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminMenu = () => {
    const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
    const [isStudentsDropdownOpen, setIsStudentsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h2 style={styles.title}>Admin Panel</h2>

                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsStudentsDropdownOpen(true)}
                    onMouseLeave={() => setIsStudentsDropdownOpen(false)}
                >
                    <span style={styles.menuItem}>Students ▾</span>
                    {isStudentsDropdownOpen && (
                        <div style={styles.dropdownContent}>
                            <Link to="/student-list" style={styles.link}>Student List</Link>
                            <Link to="/student-current-list" style={styles.link}>Student Current List</Link>
                        </div>
                    )}
                </div>

                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsCoursesDropdownOpen(true)}
                    onMouseLeave={() => setIsCoursesDropdownOpen(false)}
                >
                    <span style={styles.menuItem}>Courses ▾</span>
                    {isCoursesDropdownOpen && (
                        <div style={styles.dropdownContent}>
                            <Link to="/course-add" style={styles.link}>Course Addition</Link>
                            <Link to="/admin-course-list" style={styles.link}>Course List</Link>
                        </div>
                    )}
                </div>

                <Link to="/subscription-list" style={styles.link}>Subscriptions</Link>
                <Link to="/payment-list" style={styles.link}>Payments</Link>

                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </aside>

            <main style={styles.main}>
                <div style={styles.textContainer}>
                    <h1 style={styles.heading}>Welcome to the Admin Dashboard</h1>
                    <h2 style={styles.subtext}>
                        Use the navigation on the left to manage students, courses, and payments.
                    </h2>
                </div>
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
        backgroundImage: 'url("/assets/admin.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#1e293b',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
    },
    heading: {
        fontSize: '34px',
        color: '#1e293b',
        marginBottom: '10px',
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

export default AdminMenu;
