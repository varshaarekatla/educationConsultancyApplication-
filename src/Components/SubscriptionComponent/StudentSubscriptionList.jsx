import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSubscriptionsByStudent } from '../../Services/SubscriptionService';

const StudentSubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSubscriptionsByStudent()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSubscriptions(response.data);
                } else {
                    console.warn("Unexpected response format:", response.data);
                    setSubscriptions([]);
                }
            })
            .catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    const returnBack = () => navigate('/StudentMenu');

    const handlePayment = (subscriptionId) => {
        console.log("Initiating payment for subscription:", subscriptionId);
        navigate('/payment-add');
    };

    return (
        <>
            <style>{`
                .subscription-container {
                    padding: 2rem;
                    min-height: 100vh;
                    background: linear-gradient(to right, #f9fafb, #f0f4ff);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .subscription-card {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    max-width: 100%;
                    overflow-x: auto;
                }

                .subscription-title {
                    font-size: 2rem;
                    color: #1e3a8a;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 1rem;
                    text-align: center;
                    border-bottom: 1px solid #e5e7eb;
                }

                th {
                    background-color: #f3f4f6;
                    color: #374151;
                    font-weight: 600;
                }

                tr:hover {
                    background-color: #f9fafb;
                }

                .btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out;
                }

                .btn-pay {
                    background-color: #3b82f6;
                    color: white;
                }

                .btn-pay:hover {
                    background-color: #2563eb;
                }

                .btn-return {
                    margin-top: 1.5rem;
                    background-color: #10b981;
                    color: white;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }

                .btn-return:hover {
                    background-color: #059669;
                }

                .no-data {
                    text-align: center;
                    color: #6b7280;
                    font-style: italic;
                }

                @media (max-width: 768px) {
                    table, thead, tbody, th, td, tr {
                        display: block;
                    }

                    th {
                        display: none;
                    }

                    td {
                        padding: 0.75rem;
                        text-align: right;
                        position: relative;
                    }

                    td::before {
                        content: attr(data-label);
                        position: absolute;
                        left: 1rem;
                        top: 0.75rem;
                        font-weight: bold;
                        text-align: left;
                        color: #374151;
                    }

                    .btn-pay, .btn-return {
                        width: 100%;
                        margin-top: 0.5rem;
                    }
                }
            `}</style>

            <div className="subscription-container">
                <div className="subscription-card">
                    <h2 className="subscription-title">Your Course Subscriptions</h2>
                    {subscriptions.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Subscription ID</th>
                                    <th>Course ID</th>
                                    <th>Subscription Date</th>
                                    <th>End Date</th>
                                    <th>Installments</th>
                                    <th>Installment Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map((sub, index) => (
                                    <tr key={`sub-${index}`}>
                                        <td data-label="Student ID">{sub.studentId || "N/A"}</td>
                                        <td data-label="Subscription ID">{sub.subscriptionId || "N/A"}</td>
                                        <td data-label="Course ID">{sub.courseId || "N/A"}</td>
                                        <td data-label="Subscription Date">{sub.subscriptionDate ? new Date(sub.subscriptionDate).toLocaleDateString() : "N/A"}</td>
                                        <td data-label="End Date">{sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "N/A"}</td>
                                        <td data-label="Installments">{sub.installments || "N/A"}</td>
                                        <td data-label="Amount">₹{sub.installmentAmount?.toFixed(2) || "0.00"}</td>
                                        <td data-label="Status">{sub.status || "N/A"}</td>
                                        <td data-label="Action">
                                            <button className="btn btn-pay" onClick={() => handlePayment(sub.subscriptionId)}>Pay</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-data">No subscriptions found.</p>
                    )}
                    <button className="btn btn-return" onClick={returnBack}>Return</button>
                </div>
            </div>
        </>
    );
};

export default StudentSubscriptionList;
