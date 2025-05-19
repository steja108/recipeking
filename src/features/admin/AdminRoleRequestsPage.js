// src/features/admin/AdminRoleRequestsPage.js
import React from 'react';
import AdminRoleRequests from '../roleRequests/AdminRoleRequests';
import useTitle from '../../hooks/useTitle';

const AdminRoleRequestsPage = () => {
    useTitle('RecipeStar: Role Requests');
    
    return (
        <div className="admin-page">
            <AdminRoleRequests />
        </div>
    );
};

export default AdminRoleRequestsPage;