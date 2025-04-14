import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateSubscriptionId, saveSubscription } from '../../Services/SubscriptionService';
import { displayAllCourses } from '../../Services/CourseService';
import { getStudentDetail } from '../../Services/StudentService';

const SubscriptionAddition = () => {
    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const [subscription, setSubscription] = useState({
        subscriptionId: '',
        studentId: 'A',
        courseId: '',
        subscriptionDate: formatDate(today),
        endDate: formatDate(threeMonthsLater),
        installments: 1,
        installmentAmount: 0.0,
        status: ''
    });

    const [courses, setCourses] = useState([]);
    const [studentStatus, setStudentStatus] = useState(false);
    const [selectedCoursePrice, setSelectedCoursePrice] = useState(0.0);
    const navigate = useNavigate();

    useEffect(() => {
        generateSubscriptionId().then(response => {
            setSubscription(prev => ({ ...prev, subscriptionId: response.data }));
        });

        getStudentDetail().then(response => {
            if (response.data?.registrationNumber) {
                setSubscription(prev => ({ ...prev, studentId: response.data.registrationNumber }));
                setStudentStatus(response.data.status);
            }
        });

        displayAllCourses().then(response => {
            setCourses(response.data);
        });
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setSubscription(prev => ({ ...prev, [name]: value }));

        if (name === 'courseId' && value !== '') {
            const selectedCourse = courses.find(course => course.courseId.toString() === value);
            if (selectedCourse) {
                setSelectedCoursePrice(selectedCourse.price);
                updateInstallmentAmount(selectedCourse.price, subscription.installments);
            }
        }

        if (name === 'installments') {
            updateInstallmentAmount(selectedCoursePrice, value);
        }
    };

    const updateInstallmentAmount = (price, installments) => {
        const amount = price / installments;
        setSubscription(prev => ({ ...prev, installmentAmount: amount.toFixed(2) }));
    };

    const subscriptionSave = (event) => {
        event.preventDefault();

        if (!studentStatus) {
            alert('Student is not registered. Please complete registration first.');
            navigate('/StudentMenu');
            return;
        }

        saveSubscription(subscription)
            .then(() => {
                alert('Subscription successfully added!');
                navigate('/StudentMenu');
            })
            .catch(error => {
                alert('Error occurred while saving subscription: ' + error);
            });
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>📋 New Subscription</h2>
                <form onSubmit={subscriptionSave} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Subscription ID</label>
                        <input style={styles.input} value={subscription.subscriptionId} readOnly />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Student ID</label>
                        <input style={styles.input} value={subscription.studentId} readOnly />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Subscription Date</label>
                        <input style={styles.input} value={subscription.subscriptionDate} readOnly />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>End Date</label>
                        <input style={styles.input} value={subscription.endDate} readOnly />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Course</label>
                        <select name="courseId" style={styles.select} onChange={onChangeHandler}>
                            <option value="">--Select Course--</option>
                            {courses.map(course => (
                                <option key={course.courseId} value={course.courseId}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Installments</label>
                        <select name="installments" style={styles.select} onChange={onChangeHandler}>
                            <option value="1">Full Payment</option>
                            <option value="2">2 Installments</option>
                            <option value="3">3 Installments</option>
                            <option value="4">4 Installments</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Installment Amount</label>
                        <input style={styles.input} value={subscription.installmentAmount} readOnly />
                    </div>
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.subscribeBtn}>Subscribe</button>
                        <button type="button" style={styles.returnBtn} onClick={() => navigate('/StudentMenu')}>Return</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f0f2f5, #c3e4f8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    },
    card: {
        width: '100%',
        maxWidth: '600px',
        background: '#fff',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#007bff',
        marginBottom: '1.5rem',
        fontWeight: 'bold',
        fontSize: '1.8rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    label: {
        fontWeight: '500',
        marginBottom: '0.5rem',
        display: 'block',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    select: {
        width: '100%',
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        backgroundColor: '#fff',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.5rem',
    },
    subscribeBtn: {
        padding: '0.6rem 1.5rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    returnBtn: {
        padding: '0.6rem 1.5rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
};

export default SubscriptionAddition;
