// src/features/roleRequests/AdminRoleRequestsNotification.js
import React from 'react';
import { useGetUnreadRequestsCountQuery } from './roleRequestsApiSlice';
import { Link } from 'react-router-dom';
import './RoleRequest.css';

const AdminRoleRequestsNotification = () => {
    const { 
        data,
        isSuccess
    } = useGetUnreadRequestsCountQuery();
    
    if (!isSuccess || !data || data.count === 0) {
        return null;
    }
    
    return (
        <Link to="/dash/admin/role-requests" className="admin-notification-link">
            <div className="admin-notification">
                <span className="admin-notification-count">{data.count}</span>
                <span className="admin-notification-text">
                    New Role {data.count === 1 ? 'Request' : 'Requests'}
                </span>
            </div>
        </Link>
    );
};

export default AdminRoleRequestsNotification;