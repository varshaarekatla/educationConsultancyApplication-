import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { generateBillId, savePayment } from '../../Services/PaymentService';
import { getAllSubscriptionsByStudent } from '../../Services/SubscriptionService';

const PaymentAddition = () => {
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];

    const [payment, setPayment] = useState({
        billNumber: '',
        subscriptionId: '',
        studentId: '',
        installmentNo: 1,
        amount: 0.0,
        payDate: formatDate(today)
    });

    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        generateBillId().then(response => {
            setPayment(prev => ({ ...prev, billNumber: response.data }));
        }).catch(error => console.error("Error generating bill number:", error));

        getAllSubscriptionsByStudent().then(response => {
            setSubscriptions(response.data);
        }).catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setPayment(prev => ({ ...prev, [name]: value }));
    };

    const onSubscriptionChange = (event) => {
        const selectedSubscription = subscriptions.find(sub => sub.subscriptionId === event.target.value);
        if (selectedSubscription) {
            setPayment(prev => ({
                ...prev,
                subscriptionId: selectedSubscription.subscriptionId,
                studentId: selectedSubscription.studentId,
                installmentNo: selectedSubscription.installments,
                amount: selectedSubscription.installmentAmount
            }));
        }
    };

    const paymentSave = (event) => {
        event.preventDefault();
        savePayment(payment)
            .then(() => {
                alert('✅ Payment successfully added!');
                navigate('/StudentMenu');
            })
            .catch(error => {
                alert('❌ Error occurred while saving payment: ' + error);
            });
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>💸 Add New Payment</h2>
                <form onSubmit={paymentSave} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Bill Number</label>
                        <input type="text" value={payment.billNumber} readOnly style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Select Subscription</label>
                        <select name="subscriptionId" onChange={onSubscriptionChange} style={styles.input} required>
                            <option value="">-- Choose Subscription --</option>
                            {subscriptions.map(sub => (
                                <option key={sub.subscriptionId} value={sub.subscriptionId}>
                                    {sub.subscriptionId} - {sub.studentId}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Student ID</label>
                        <input type="text" value={payment.studentId} readOnly style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Installment Number</label>
                        <input type="number" value={payment.installmentNo} readOnly style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Amount (₹)</label>
                        <input type="text" value={payment.amount} readOnly style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Payment Date</label>
                        <input type="text" value={payment.payDate} readOnly style={styles.input} />
                    </div>

                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.saveBtn}>✅ Pay Now</button>
                        <button type="button" onClick={() => navigate('/StudentMenu')} style={styles.backBtn}>⬅ Return</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

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
        background: '#fff',
        padding: '2rem 3rem',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
        animation: 'fadeIn 0.5s ease-in-out'
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
    label: {
        fontWeight: '600',
        marginBottom: '0.3rem'
    },
    input: {
        padding: '0.7rem',
        borderRadius: '10px',
        border: '1px solid #ccc',
        outline: 'none',
        fontSize: '1rem',
        backgroundColor: '#f9f9f9'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.5rem'
    },
    saveBtn: {
        padding: '0.6rem 1.5rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: '0.3s ease'
    },
    backBtn: {
        padding: '0.6rem 1.5rem',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: '0.3s ease'
    }
};

export default PaymentAddition;
