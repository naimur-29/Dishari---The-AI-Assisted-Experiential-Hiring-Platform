import { useNavigate } from 'react-router-dom';
const CompanyDashboard = () => {
    const navigate=useNavigate();
    return (
        <div>
            <button onClick={()=>navigate('/user/profile')}>Profile</button>
            <button onClick={()=>navigate('/user/browse-post')}>Browse Post</button>
            <button onClick={()=>navigate('/user/applied-post')}>Appied Post</button>
        </div>
    );
}

export default CompanyDashboard;
