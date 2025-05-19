// src/features/roleRequests/RoleRequestButton.js
import React, { useState } from 'react';
import { useCreateRoleRequestMutation } from './roleRequestsApiSlice';
import useAuth from '../../hooks/useAuth';
import './RoleRequest.css';

const RoleRequestButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const { roles } = useAuth();
    const [createRoleRequest, { isLoading }] = useCreateRoleRequestMutation();
    
    // Don't show button if user is already a Writer or Admin
    if (roles.includes('Writer') || roles.includes('Admin')) {
        return null;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!reason.trim()) {
            setError('Please provide a reason for your request');
            return;
        }
        
        try {
            await createRoleRequest({ reason }).unwrap();
            setSuccess('Your request has been submitted. You will be notified when an admin reviews it.');
            setReason('');
            
            // Close modal after successful submission, but with a small delay so the user can see the success message
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        } catch (err) {
            setError(err?.data?.message || 'Failed to submit request. Please try again.');
        }
    };
    
    return (
        <>
            <button 
                className="role-request-button"
                onClick={() => setShowModal(true)}
            >
                Request Writer Role
            </button>
            
            {showModal && (
                <div className="role-request-modal-overlay">
                    <div className="role-request-modal">
                        <div className="role-request-modal-header">
                            <h3>Request Writer Role</h3>
                            <button 
                                className="role-request-close-button"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="role-request-modal-body">
                            {error && <div className="role-request-error">{error}</div>}
                            {success && <div className="role-request-success">{success}</div>}
                            
                            <p>
                                Writer privileges allow you to create and publish your own recipes on RecipeStar.
                                Please provide a brief explanation of why you'd like to become a writer.
                            </p>
                            
                            <form onSubmit={handleSubmit} className="role-request-form">
                                <textarea
                                    className="role-request-textarea"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Tell us why you want to become a recipe writer..."
                                    rows="5"
                                    disabled={isLoading || success}
                                    required
                                />
                                
                                <button 
                                    type="submit" 
                                    className="role-request-submit-button"
                                    disabled={isLoading || success}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RoleRequestButton;