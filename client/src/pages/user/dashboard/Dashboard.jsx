import { useNavigate } from 'react-router-dom';
const CompanyDashboard = () => {
    const navigate=useNavigate();
    return (
        <div>
            <button onClick={()=>navigate('/user/profile')}>Profile</button>
            <button>Browse Post</button>
            <button>Appied Post</button>
        </div>
    );
}

export default CompanyDashboard;
