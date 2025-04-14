import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCourseId, saveCourse } from '../../Services/CourseService';

const CourseAddition = () => {
    const [course, setCourse] = useState({
        courseId: 0,
        courseName: '',
        hours: '',
        price: '',
        technology: ''
    });
    const [newId, setNewId] = useState(0);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        generateCourseId().then((response) => {
            setNewId(response.data);
        });
    }, []);

    const validate = () => {
        const validationErrors = {};
        if (!course.courseName.trim()) validationErrors.courseName = 'Course name is required';
        if (!course.hours || isNaN(course.hours) || course.hours <= 0)
            validationErrors.hours = 'Enter valid hours';
        if (!course.price || isNaN(course.price) || course.price < 0)
            validationErrors.price = 'Enter valid price';
        if (!course.technology.trim()) validationErrors.technology = 'Technology is required';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const courseSave = (event) => {
        event.preventDefault();
        if (!validate()) return;
        course.courseId = newId;
        saveCourse(course).then(() => {
            alert("New Course is saved");
            navigate('/AdminMenu');
        });
    };

    const goBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <>
            <style>{`
                .course-add-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(to bottom right, #c084fc, #7dd3fc);
                    padding: 2rem;
                }
                .course-add-box {
                    background-color: #ffffff;
                    padding: 2.5rem;
                    border-radius: 1.5rem;
                    max-width: 500px;
                    width: 100%;
                    box-shadow: 0 0 20px rgba(160, 120, 255, 0.3);
                    border: 1px solid #d8b4fe;
                }
                .course-add-box h2 {
                    font-size: 2rem;
                    font-weight: bold;
                    text-align: center;
                    color: #6d28d9;
                    margin-bottom: 2rem;
                }
                .input-group {
                    margin-bottom: 1.25rem;
                }
                .input-group label {
                    display: block;
                    color: #374151;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }
                .input-group input {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    background-color: #f9fafb;
                    transition: border-color 0.3s;
                }
                .input-group input:focus {
                    border-color: #9333ea;
                    outline: none;
                }
                .error-message {
                    color: #dc2626;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }
                .button-group {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1.5rem;
                }
                .btn-save {
                    background-color: #22c55e;
                    color: #ffffff;
                    padding: 0.5rem 1.25rem;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: background 0.3s;
                    border: none;
                }
                .btn-save:hover {
                    background-color: #16a34a;
                }
                .btn-return {
                    background-color: #3b82f6;
                    color: #ffffff;
                    padding: 0.5rem 1.25rem;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: background 0.3s;
                    border: none;
                }
                .btn-return:hover {
                    background-color: #2563eb;
                }
            `}</style>

            <div className="course-add-container">
                <div className="course-add-box">
                    <h2>New Course Addition</h2>
                    <form onSubmit={courseSave}>
                        <div className="input-group">
                            <label>Course ID:</label>
                            <input
                                name="courseId"
                                value={newId}
                                readOnly
                            />
                        </div>
                        <div className="input-group">
                            <label>Course Name:</label>
                            <input
                                name="courseName"
                                value={course.courseName}
                                onChange={onChangeHandler}
                            />
                            {errors.courseName && <p className="error-message">{errors.courseName}</p>}
                        </div>
                        <div className="input-group">
                            <label>Hours:</label>
                            <input
                                name="hours"
                                type="number"
                                value={course.hours}
                                onChange={onChangeHandler}
                            />
                            {errors.hours && <p className="error-message">{errors.hours}</p>}
                        </div>
                        <div className="input-group">
                            <label>Price:</label>
                            <input
                                name="price"
                                type="number"
                                value={course.price}
                                onChange={onChangeHandler}
                            />
                            {errors.price && <p className="error-message">{errors.price}</p>}
                        </div>
                        <div className="input-group">
                            <label>Technology:</label>
                            <input
                                name="technology"
                                value={course.technology}
                                onChange={onChangeHandler}
                            />
                            {errors.technology && <p className="error-message">{errors.technology}</p>}
                        </div>
                        <div className="button-group">
                            <button type="button" onClick={goBack} className="btn-return">Return</button>
                            <button type="submit" className="btn-save">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CourseAddition;
