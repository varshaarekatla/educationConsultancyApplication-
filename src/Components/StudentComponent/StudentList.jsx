import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllStudents } from '../../Services/StudentService';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllStudents()
            .then((response) => setStudents(response.data))
            .catch((error) => console.error("Error fetching students:", error));
    }, []);

    const handleReturn = () => {
        navigate('/AdminMenu');
    };

    return (
        <>
            <style>{`
                .student-list-container {
                    background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
                    padding: 50px 30px;
                    border-radius: 16px;
                    max-width: 1300px;
                    margin: 60px auto;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .student-list-title {
                    font-size: 2.8rem;
                    font-weight: 700;
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 30px;
                }

                .custom-hr {
                    height: 4px;
                    border: none;
                    background: linear-gradient(to right, #ff4b2b, #ff416c);
                    width: 80%;
                    margin: 0 auto 40px auto;
                    border-radius: 10px;
                }

                .table-wrapper {
                    overflow-x: auto;
                    border-radius: 12px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
                }

                .student-table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .student-table thead {
                    background: linear-gradient(to right, #34495e, #2c3e50);
                    color: white;
                }

                .student-table th,
                .student-table td {
                    padding: 16px 20px;
                    text-align: center;
                    border-bottom: 1px solid #eaeaea;
                }

                .student-table tbody tr:nth-child(even) {
                    background-color: #f7f9fc;
                }

                .student-table tbody tr:hover {
                    background-color: #eef5ff;
                    transition: 0.3s;
                }

                .update-btn {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .update-btn:hover {
                    background-color: #0056b3;
                }

                .return-btn {
                    display: block;
                    margin: 40px auto 0;
                    padding: 14px 40px;
                    background: linear-gradient(to right, #28a745, #218838);
                    color: white;
                    font-size: 18px;
                    font-weight: 600;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .return-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                }

                @media (max-width: 768px) {
                    .student-list-container {
                        padding: 30px 15px;
                    }

                    .student-list-title {
                        font-size: 2rem;
                    }

                    .student-table th,
                    .student-table td {
                        padding: 10px;
                        font-size: 14px;
                    }

                    .return-btn {
                        padding: 12px 24px;
                        font-size: 16px;
                    }
                }
            `}</style>

            <div className="student-list-container">
                <h2 className="student-list-title">📋 Student List</h2>
                <hr className="custom-hr" />

                <div className="table-wrapper">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Registration Number</th>
                                <th>Username</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Student Level</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.registrationNumber}>
                                    <td>{student.registrationNumber}</td>
                                    <td>{student.username}</td>
                                    <td>{student.studentName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.mobile}</td>
                                    <td>{student.address}</td>
                                    <td>{student.studentLevel}</td>
                                    <td>{student.status.toString()}</td>
                                    <td>
                                        <Link to={`/update-student/${student.registrationNumber}`}>
                                            <button className="update-btn">Update</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={handleReturn} className="return-btn">Return</button>
            </div>
        </>
    );
};

export default StudentList;
