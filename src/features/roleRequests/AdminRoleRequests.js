// src/features/roleRequests/AdminRoleRequests.js
import React, { useState } from 'react';
import { useGetRoleRequestsQuery, useProcessRoleRequestMutation } from './roleRequestsApiSlice';
import { formatDistanceToNow } from 'date-fns';
import './RoleRequest.css';

const AdminRoleRequests = () => {
    const { 
        data: requests, 
        isLoading, 
        isError, 
        error 
    } = useGetRoleRequestsQuery();
    
    const [activeRequest, setActiveRequest] = useState(null);
    const [adminNote, setAdminNote] = useState('');
    const [processRoleRequest, { isLoading: isProcessing }] = useProcessRoleRequestMutation();
    
    const handleProcessRequest = async (id, status) => {
        try {
            await processRoleRequest({
                id,
                status,
                adminNote
            }).unwrap();
            
            // Reset states after successful processing
            setActiveRequest(null);
            setAdminNote('');
        } catch (err) {
            console.error('Error processing request:', err);
        }
    };
    
    if (isLoading) return <div className="admin-role-requests-loading">Loading requests...</div>;
    if (isError) return <div className="admin-role-requests-error">Error: {error?.data?.message || 'Could not load requests'}</div>;
    if (!requests?.length) return <div className="admin-role-requests-empty">No role upgrade requests found.</div>;
    
    // Filter for pending requests first
    const pendingRequests = requests.filter(req => req.status === 'pending');
    const processedRequests = requests.filter(req => req.status !== 'pending');
    
    return (
        <div className="admin-role-requests">
            <h2 className="admin-role-requests-title">Role Upgrade Requests</h2>
            
            {pendingRequests.length > 0 && (
                <div className="admin-role-requests-section">
                    <h3 className="admin-role-requests-subtitle">Pending Requests</h3>
                    
                    <div className="admin-role-requests-list">
                        {pendingRequests.map(request => (
                            <div key={request._id} className="admin-role-request-card pending">
                                <div className="admin-role-request-header">
                                    <h4>
                                        {request.user.username} requested to become a Writer
                                    </h4>
                                    <span className="admin-role-request-date">
                                        {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                
                                <div className="admin-role-request-reason">
                                    <strong>Reason:</strong> {request.reason}
                                </div>
                                
                                {activeRequest === request._id ? (
                                    <div className="admin-role-request-actions-expanded">
                                        <textarea
                                            className="admin-role-request-note-input"
                                            value={adminNote}
                                            onChange={(e) => setAdminNote(e.target.value)}
                                            placeholder="Add a note about your decision (optional)..."
                                            rows="3"
                                        />
                                        
                                        <div className="admin-role-request-buttons">
                                            <button 
                                                className="admin-role-request-button approve"
                                                onClick={() => handleProcessRequest(request._id, 'approved')}
                                                disabled={isProcessing}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="admin-role-request-button reject"
                                                onClick={() => handleProcessRequest(request._id, 'rejected')}
                                                disabled={isProcessing}
                                            >
                                                Reject
                                            </button>
                                            <button 
                                                className="admin-role-request-button cancel"
                                                onClick={() => {
                                                    setActiveRequest(null);
                                                    setAdminNote('');
                                                }}
                                                disabled={isProcessing}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="admin-role-request-actions">
                                        <button 
                                            className="admin-role-request-button"
                                            onClick={() => setActiveRequest(request._id)}
                                        >
                                            Review Request
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {processedRequests.length > 0 && (
                <div className="admin-role-requests-section">
                    <h3 className="admin-role-requests-subtitle">Processed Requests</h3>
                    
                    <div className="admin-role-requests-list">
                        {processedRequests.map(request => (
                            <div 
                                key={request._id} 
                                className={`admin-role-request-card ${request.status}`}
                            >
                                <div className="admin-role-request-header">
                                    <h4>
                                        {request.user.username}'s writer request was {request.status}
                                    </h4>
                                    <span className="admin-role-request-date">
                                        {formatDistanceToNow(new Date(request.updatedAt), { addSuffix: true })}
                                    </span>
                                </div>
                                
                                <div className="admin-role-request-reason">
                                    <strong>Reason:</strong> {request.reason}
                                </div>
                                
                                {request.adminNote && (
                                    <div className="admin-role-request-note">
                                        <strong>Your note:</strong> {request.adminNote}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRoleRequests;