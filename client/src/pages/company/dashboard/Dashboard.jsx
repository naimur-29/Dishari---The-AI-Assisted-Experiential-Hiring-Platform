import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate()
    return (
        <div>
            <button onClick={()=>navigate('/company/profile')}>Profile</button>
            <button onClick={()=>navigate('/company/make-post')}>Create Post</button>
            <button onClick={()=>navigate('/company/post-list')}>Create Post</button>
        </div>
    );
}

export default Dashboard;
