import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { displayCourseById, updateCourse } from '../../Services/CourseService';

const CourseUpdate = () => {
    const [course, setCourse] = useState({
        courseId: 0,
        courseName: '',
        hours: '',
        price: '',
        technology: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { courseId } = useParams();

    useEffect(() => {
        displayCourseById(courseId).then((response) => {
            setCourse(response.data);
        });
    }, [courseId]);

    const validate = () => {
        const validationErrors = {};
        if (!course.courseName.trim()) validationErrors.courseName = 'Course Name is required';
        if (!course.hours || isNaN(course.hours) || course.hours <= 0) validationErrors.hours = 'Hours must be a positive number';
        if (!course.price || isNaN(course.price) || course.price <= 0) validationErrors.price = 'Price must be a positive number';
        if (!course.technology.trim()) validationErrors.technology = 'Technology is required';
        return validationErrors;
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const courseSave = (event) => {
        event.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            updateCourse(course).then(() => {
                alert('Course updated successfully!');
                navigate('/admin-course-list');
            });
        }
    };

    return (
        <>
            <style>{`
                .update-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(to bottom right, #f0f4ff, #fdf2f8);
                    padding: 2rem;
                }

                .update-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 2rem;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .update-card h2 {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    color: #4c1d95;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .form-group input {
                    width: 100%;
                    padding: 0.75rem;
                    font-size: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #6366f1;
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
                }

                .error-text {
                    color: #dc2626;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }

                .button-group {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .btn-save, .btn-return {
                    flex: 1;
                    padding: 0.75rem;
                    font-size: 1rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .btn-save {
                    background-color: #10b981;
                    color: white;
                }

                .btn-save:hover {
                    background-color: #059669;
                }

                .btn-return {
                    background-color: #6366f1;
                    color: white;
                }

                .btn-return:hover {
                    background-color: #4f46e5;
                }
            `}</style>

            <div className="update-container">
                <div className="update-card">
                    <h2>Update Course</h2>
                    <form onSubmit={courseSave}>
                        <div className="form-group">
                            <label>Course ID</label>
                            <input
                                name="courseId"
                                value={course.courseId}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label>Course Name</label>
                            <input
                                name="courseName"
                                value={course.courseName}
                                onChange={onChangeHandler}
                                placeholder="Enter course name"
                            />
                            {errors.courseName && <div className="error-text">{errors.courseName}</div>}
                        </div>

                        <div className="form-group">
                            <label>Hours</label>
                            <input
                                name="hours"
                                value={course.hours}
                                onChange={onChangeHandler}
                                placeholder="Enter course hours"
                            />
                            {errors.hours && <div className="error-text">{errors.hours}</div>}
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                                name="price"
                                value={course.price}
                                onChange={onChangeHandler}
                                placeholder="Enter course price"
                            />
                            {errors.price && <div className="error-text">{errors.price}</div>}
                        </div>

                        <div className="form-group">
                            <label>Technology</label>
                            <input
                                name="technology"
                                value={course.technology}
                                onChange={onChangeHandler}
                                placeholder="Enter technology name"
                            />
                            {errors.technology && <div className="error-text">{errors.technology}</div>}
                        </div>

                        <div className="button-group">
                            <button className="btn-save" type="submit">Save</button>
                            <button className="btn-return" type="button" onClick={() => navigate('/admin-course-list')}>Return</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CourseUpdate;
