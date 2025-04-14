import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { getSubscriptionById, updateSubscription } from '../../Services/SubscriptionService';
import { displayAllCourses } from '../../Services/CourseService';

const SubscriptionUpdate = () => {
    const [subscription, setSubscription] = useState({
        subscriptionId: '',
        studentId: '',
        courseId: ''
    });
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { subscriptionId } = useParams();

    useEffect(() => {
        getSubscriptionById(subscriptionId).then(response => {
            setSubscription(response.data);
        }).catch(error => {
            console.error("Error fetching subscription details:", error);
        });

        displayAllCourses().then(response => {
            setCourses(response.data);
        }).catch(error => {
            console.error("Error fetching courses:", error);
        });
    }, [subscriptionId]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setSubscription(prev => ({ ...prev, [name]: value }));
    };

    const subscriptionSave = (event) => {
        event.preventDefault();
        updateSubscription(subscription).then(() => {
            alert("Subscription successfully updated!");
            navigate('/StudentMenu');
        }).catch(error => {
            console.error("Error updating subscription:", error);
            alert("Update failed! Please try again.");
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-12">
                    <div className="card-body">
                        <h2 className="text-center"><u>Update Subscription</u></h2>
                        <br />
                        <form>
                            <div className="form-group">
                                <label>Subscription ID:</label>
                                <input className="form-control" value={subscription.subscriptionId} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Student ID:</label>
                                <input className="form-control" value={subscription.studentId} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Select Course:</label>
                                <select name="courseId" className="form-control" value={subscription.courseId} onChange={onChangeHandler}>
                                    <option value="">--Select Course--</option>
                                    {courses.map(course => (
                                        <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="btn btn-success" onClick={subscriptionSave}>Save</button>
                            &nbsp;
                            <button className="btn btn-secondary" onClick={() => navigate('/StudentMenu')}>Return</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionUpdate;