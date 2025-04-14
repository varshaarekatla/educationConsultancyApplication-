import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { displayAllCourses, deleteCourseById } from '../../Services/CourseService';

const AdminCourseList = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        displayAllCourses()
            .then((response) => setCourses(response.data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    };

    const removeCourse = (id) => {
        deleteCourseById(id)
            .then(() => setCourses(courses.filter(course => course.courseId !== id)))
            .catch(error => console.error("Error deleting course:", error));
    };

    return (
        <>
            <style>{`
                .admin-course-container {
                    min-height: 100vh;
                    background: linear-gradient(to bottom right, #e0e7ff, #f3e8ff);
                    padding: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }

                .course-list-box {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    width: 100%;
                    max-width: 1100px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .course-list-box h2 {
                    text-align: center;
                    font-size: 2rem;
                    color: #4c1d95;
                    margin-bottom: 1rem;
                }

                .styled-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 1rem;
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 1.5rem;
                }

                .styled-table th, .styled-table td {
                    padding: 1rem;
                    text-align: center;
                }

                .styled-table thead {
                    background: linear-gradient(to right, #8b5cf6, #a78bfa);
                    color: white;
                }

                .styled-table tbody tr:nth-child(even) {
                    background-color: #f9fafb;
                }

                .styled-table tbody tr:hover {
                    background-color: #f3e8ff;
                }

                .btn {
                    padding: 0.5rem 1rem;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                }

                .btn-update {
                    background-color: #38bdf8;
                    color: white;
                }

                .btn-update:hover {
                    background-color: #0ea5e9;
                }

                .btn-delete {
                    background-color: #ef4444;
                    color: white;
                }

                .btn-delete:hover {
                    background-color: #dc2626;
                }

                .btn-return {
                    display: block;
                    background-color: #10b981;
                    color: white;
                    margin: 0 auto;
                    padding: 0.75rem 2rem;
                    font-weight: 700;
                    border-radius: 0.75rem;
                    margin-top: 1rem;
                }

                .btn-return:hover {
                    background-color: #059669;
                }

                @media (max-width: 768px) {
                    .styled-table th, .styled-table td {
                        padding: 0.75rem;
                        font-size: 0.875rem;
                    }

                    .btn {
                        padding: 0.4rem 0.8rem;
                        font-size: 0.875rem;
                    }
                }
            `}</style>

            <div className="admin-course-container">
                <div className="course-list-box">
                    <h2>Course List</h2>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Course Id</th>
                                <th>Course Name</th>
                                <th>Course Hours</th>
                                <th>Course Price</th>
                                <th>Technology</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.courseId}>
                                    <td>{course.courseId}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.hours}</td>
                                    <td>{course.price}</td>
                                    <td>{course.technology}</td>
                                    <td>
                                        <Link to={`/update-course/${course.courseId}`}>
                                            <button className="btn btn-update">Update</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => removeCourse(course.courseId)} className="btn btn-delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={returnBack} className="btn btn-return">Return</button>
                </div>
            </div>
        </>
    );
};

export default AdminCourseList;
