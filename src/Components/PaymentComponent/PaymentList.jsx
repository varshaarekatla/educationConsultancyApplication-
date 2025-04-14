import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBills } from "../../Services/PaymentService";

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBills()
            .then((response) => {
                setPayments(response.data);
            })
            .catch((error) => console.error("Error fetching payments:", error));
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>💸 Payment Records</h2>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.headerRow}>
                                <th>Bill No.</th>
                                <th>Subscription ID</th>
                                <th>Student ID</th>
                                <th>Installment No.</th>
                                <th>Amount</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment, index) => (
                                    <tr key={payment.billNumber || index} style={styles.row}>
                                        <td>{payment.billNumber}</td>
                                        <td>{payment.subscriptionId}</td>
                                        <td>{payment.studentId}</td>
                                        <td>{payment.installmentNo}</td>
                                        <td>₹{payment.amount}</td>
                                        <td>{payment.payDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={styles.noData}>No payment records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.backBtn} onClick={() => navigate("/AdminMenu")}>
                        ⬅ Back to Admin Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
    },
    card: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "1100px",
    },
    title: {
        textAlign: "center",
        fontSize: "1.8rem",
        color: "#343a40",
        fontWeight: "bold",
        marginBottom: "1.5rem",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        borderRadius: "10px",
        overflow: "hidden",
    },
    headerRow: {
        backgroundColor: "#00796b",
        color: "#fff",
    },
    row: {
        backgroundColor: "#f8f9fa",
        textAlign: "center",
    },
    noData: {
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#fff3cd",
        color: "#856404",
        fontStyle: "italic",
    },
    buttonContainer: {
        textAlign: "center",
        marginTop: "2rem",
    },
    backBtn: {
        padding: "0.6rem 1.4rem",
        fontSize: "1rem",
        borderRadius: "8px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s",
    },
};

export default PaymentList;
