import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { getCurrentSubscriptions } from '../../Services/SubscriptionService'; // Assuming this service exists

const SubscriptionCurrent = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getCurrentSubscriptions()
            .then((response) => {
                setSubscriptions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching subscriptions:", error);
            });
    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <div className="text-center">
            <h2 className="text-center text-primary">Current Subscriptions List</h2>
            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Subscription ID</th>
                            <th>User Name</th>
                            <th>Subscription Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.length > 0 ? (
                            subscriptions.map((subscription, index) => (
                                <tr key={index}>
                                    <td>{subscription.subscriptionId || "N/A"}</td>
                                    <td>{subscription.username || "N/A"}</td>
                                    <td>{subscription.subscriptionType || "N/A"}</td>
                                    <td>{subscription.startDate || "N/A"}</td>
                                    <td>{subscription.endDate || "N/A"}</td>
                                    <td>{subscription.status ? "Active" : "Inactive"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No subscription data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-danger" onClick={returnBack}>Back</button>
        </div>
    );
};

export default SubscriptionCurrent;