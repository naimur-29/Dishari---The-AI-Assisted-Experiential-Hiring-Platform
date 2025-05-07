import { useState, useEffect } from 'react';
import api from '../../../lib/api'; // your axios instance
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../lib/LoadingSpinner';

const Profile = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        graduation_year: '',
        university: '',
        skills: '',
        linkedin_url: ''
    });

    useEffect(() => {
        const fetchUser = async (userId) => {
            try {
                const res = await api.get(`/user/profile/${userId}`);
                setFormData(res.data.user);
            } catch (err) {
                console.error('Error fetching user data', err);
            }
        };

        const userId = localStorage.getItem('user_id');
        if (localStorage.getItem('user_role') === 'user' && userId) {
            setId(userId);
            fetchUser(userId);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/user/profile/${id}`, formData);
            if (res.status === 201) {
                alert('Profile updated successfully!');
            }
        } catch (err) {
            console.error('Update error:', err);
            alert(err.response?.data?.message || 'An error occurred during update');
        }
    };

    return (
        <>
            {id ? (
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
                    <h2 className="text-xl font-bold mb-4 text-center">Update Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" />

                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />

                        <input name="graduation_year" type="number" value={formData.graduation_year} onChange={handleChange} placeholder="Graduation Year" className="w-full p-2 border rounded" />

                        <input name="university" type="text" value={formData.university} onChange={handleChange} placeholder="University/College" className="w-full p-2 border rounded" />

                        <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="List of skills" className="w-full p-2 border rounded" rows={4} />

                        <input name="linkedin_url" type="url" value={formData.linkedin_url} onChange={handleChange} placeholder="LinkedIn Profile URL" className="w-full p-2 border rounded" />

                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update Profile</button>
                    </form>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
};

export default Profile;
