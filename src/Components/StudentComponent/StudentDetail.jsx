import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentDetail } from "../../Services/StudentService";

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getStudentDetail(id)
            .then((response) => {
                if (response.data) {
                    setStudent(response.data);
                } else {
                    setError("Student details not found");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching student details:", error);
                setError("Error loading student details");
                setLoading(false);
            });
    }, [id]);

    const returnBack = () => {
        navigate("/StudentMenu");
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>📘 Student Details</h2>

                {loading && <p style={styles.loading}>Loading...</p>}
                {error && <p style={styles.error}>{error}</p>}

                {!loading && !error && student && (
                    <div style={styles.detailsGrid}>
                        <DetailItem label="Registration Number" value={student.registrationNumber} />
                        <DetailItem label="User Name" value={student.username} />
                        <DetailItem label="Student Name" value={student.studentName} />
                        <DetailItem label="Email" value={student.email} />
                        <DetailItem label="Mobile" value={student.mobile} />
                        <DetailItem label="Address" value={student.address} />
                        <DetailItem label="Student Level" value={student.studentLevel} />
                        <DetailItem label="Status" value={student.status ? "Active" : "Inactive"} />
                    </div>
                )}

                <button style={styles.button} onClick={returnBack}>
                    ← Return
                </button>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div style={styles.detailItem}>
        <span style={styles.label}>{label}</span>
        <span style={styles.value}>{value || "N/A"}</span>
    </div>
);

// CSS-in-JSX styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9f9f9, #d0e8f2)",
        padding: "2rem",
    },
    card: {
        backgroundColor: "#fff",
        padding: "2rem 3rem",
        borderRadius: "20px",
        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        width: "100%",
    },
    title: {
        textAlign: "center",
        color: "#007BFF",
        fontSize: "2rem",
        marginBottom: "2rem",
    },
    loading: {
        textAlign: "center",
        color: "#0066cc",
        fontSize: "1.2rem",
    },
    error: {
        textAlign: "center",
        color: "#cc0000",
        fontSize: "1.2rem",
    },
    detailsGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
        marginBottom: "2rem",
    },
    detailItem: {
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        backgroundColor: "#f8f9fa",
    },
    label: {
        fontWeight: "bold",
        fontSize: "0.95rem",
        color: "#333",
        marginBottom: "0.5rem",
    },
    value: {
        color: "#555",
        fontSize: "1rem",
    },
    button: {
        display: "block",
        margin: "0 auto",
        padding: "0.6rem 1.5rem",
        backgroundColor: "#28a745",
        color: "#fff",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "background 0.3s ease",
    },
};

export default StudentDetail;
