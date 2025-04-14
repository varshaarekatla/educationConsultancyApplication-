import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { getBillByStudentId } from "../../Services/PaymentService";

const StudentPaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getBillByStudentId()
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setPayments(response.data);
                } else {
                    setError("No payment records found.");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Error loading payment records.");
                setLoading(false);
            });
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.heading}>📄 Payment Records</h2>

                {loading && <p style={styles.info}>⏳ Loading...</p>}

                {error && <p style={styles.error}>❌ {error}</p>}

                {!loading && !error && payments.length > 0 && (
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Bill No</th>
                                    <th>Subscription ID</th>
                                    <th>Student ID</th>
                                    <th>Installment</th>
                                    <th>Amount (₹)</th>
                                    <th>Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, idx) => (
                                    <tr key={payment.billNumber || `pay-${idx}`}>
                                        <td>{payment.billNumber}</td>
                                        <td>{payment.subscriptionId}</td>
                                        <td>{payment.studentId}</td>
                                        <td>{payment.installmentNo}</td>
                                        <td>₹{payment.amount}</td>
                                        <td>{payment.payDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <button style={styles.button} onClick={() => navigate("/StudentMenu")}>
                        ⬅ Return
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #fce4ec)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
    },
    card: {
        background: "#fff",
        padding: "2rem 2.5rem",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        width: "90%",
        maxWidth: "1000px",
        overflowX: "auto"
    },
    heading: {
        textAlign: "center",
        fontSize: "1.8rem",
        color: "#1976d2",
        marginBottom: "1.5rem"
    },
    info: {
        textAlign: "center",
        fontSize: "1.1rem",
        color: "#007bff"
    },
    error: {
        textAlign: "center",
        fontSize: "1.1rem",
        color: "#dc3545"
    },
    tableContainer: {
        overflowX: "auto"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "1rem"
    },
    button: {
        padding: "0.6rem 1.5rem",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        transition: "0.3s"
    }
};

// Add table border styles via global CSS or scoped CSS
// You can also use Bootstrap classes if you prefer

export default StudentPaymentList;
