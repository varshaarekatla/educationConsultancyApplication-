import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSubscriptions } from '../../Services/SubscriptionService';

const SubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSubscriptions()
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>📄 Subscription List</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.headerRow}>
                                <th>Subscription ID</th>
                                <th>Student ID</th>
                                <th>Course ID</th>
                                <th>Subscription Date</th>
                                <th>End Date</th>
                                <th>Installments</th>
                                <th>Installment Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.length > 0 ? (
                                subscriptions.map(subscription => (
                                    <tr key={subscription.subscriptionId} style={styles.row}>
                                        <td>{subscription.subscriptionId}</td>
                                        <td>{subscription.studentId}</td>
                                        <td>{subscription.courseId}</td>
                                        <td>{subscription.subscriptionDate}</td>
                                        <td>{subscription.endDate}</td>
                                        <td>{subscription.installments}</td>
                                        <td>{subscription.installmentAmount}</td>
                                        <td>{subscription.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={styles.noData}>No subscriptions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.returnBtn} onClick={() => navigate(-1)}>⬅ Return</button>
                </div>
            </div>
        </div>
    );
};

// CSS-in-JSX styling
const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0f7fa, #f1f8ff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    },
    card: {
        width: '100%',
        maxWidth: '1000px',
        background: '#fff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#0077b6',
        marginBottom: '1.5rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    headerRow: {
        backgroundColor: '#0077b6',
        color: '#fff',
    },
    row: {
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    },
    noData: {
        textAlign: 'center',
        padding: '1rem',
        fontStyle: 'italic',
        color: '#555',
        backgroundColor: '#fff3cd',
    },
    buttonContainer: {
        marginTop: '1.5rem',
        textAlign: 'center',
    },
    returnBtn: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '0.6rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.3s ease',
    },
};

export default SubscriptionList;
