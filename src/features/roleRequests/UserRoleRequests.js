// src/features/roleRequests/UserRoleRequests.js
import React from 'react';
import { useGetUserRoleRequestsQuery, useMarkRequestAsReadMutation } from './roleRequestsApiSlice';
import { formatDistanceToNow } from 'date-fns';
import './RoleRequest.css';

const UserRoleRequests = () => {
    const { 
        data: requests,
        isLoading,
        isError,
        error
    } = useGetUserRoleRequestsQuery();
    
    const [markAsRead] = useMarkRequestAsReadMutation();
    
    const handleMarkAsRead = async (id) => {
        try {
            await markAsRead(id);
        } catch (err) {
            console.error('Error marking request as read:', err);
        }
    };
    
    if (isLoading) return <div className="role-requests-loading">Loading your requests...</div>;
    if (isError) return <div className="role-requests-error">Error: {error?.data?.message || 'Could not load requests'}</div>;
    if (!requests?.length) return null;
    
    // Get only requests that have been processed (approved/rejected) and not read
    const processedRequests = requests.filter(req => 
        (req.status === 'approved' || req.status === 'rejected') && !req.isRead
    );
    
    if (!processedRequests.length) return null;
    
    return (
        <div className="user-role-requests">
            <h3>Role Request Updates</h3>
            
            <div className="user-role-requests-list">
                {processedRequests.map(request => (
                    <div 
                        key={request._id} 
                        className={`user-role-request-card ${request.status}`}
                    >
                        <div className="user-role-request-header">
                            <h4>
                                Your writer role request has been {request.status}
                            </h4>
                            <button 
                                className="mark-read-button"
                                onClick={() => handleMarkAsRead(request._id)}
                                title="Dismiss notification"
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="user-role-request-details">
                            <div className="user-role-request-date">
                                {formatDistanceToNow(new Date(request.updatedAt), { addSuffix: true })}
                            </div>
                            
                            {request.adminNote && (
                                <div className="user-role-request-note">
                                    <strong>Admin note:</strong> {request.adminNote}
                                </div>
                            )}
                            
                            {request.status === 'approved' && (
                                <div className="user-role-request-success-message">
                                    You now have writer privileges! You can create and publish your own recipes.
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRoleRequests;