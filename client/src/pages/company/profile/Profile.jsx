import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import LoadingSpinner from '../../../lib/LoadingSpinner';

const CompanyProfile = () => {
    const [id, setId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        industry_type: '',
        address: ''
    });

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const role = localStorage.getItem('user_role');
        if (role === 'industry' && userId) {
            setId(userId);
            fetchIndustry(userId);
        }
    }, []);

    const fetchIndustry = async (userId) => {
        try {
            const res = await api.get(`/industry/profile/${userId}`);
            //console.log('Fetched Profile:', res.data.profile);
            const profile = res.data.profile;

            // Ensure no undefined values (prevent controlled input issues)
            setFormData({
                name: profile.name || '',
                email: profile.email || '',
                industry_type: profile.industry_type || '',
                address: profile.address || ''
            });
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/industry/profile/${id}`, formData);
            if (res.status === 201 || res.status === 200) {
                alert('Profile updated successfully!');
            } else {
                alert('Update failed.');
            }
        } catch (err) {
            console.error('Update error:', err);
            alert(err.response?.data?.message || 'Update failed');
        }
    };

    return (
        <>
            {id ? (
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
                    <h2 className="text-xl font-bold mb-4 text-center">Update Company Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full p-2 border rounded"
                        />

                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                        />

                        <input
                            name="industry_type"
                            type="text"
                            value={formData.industry_type}
                            onChange={handleChange}
                            placeholder="Industry Type"
                            className="w-full p-2 border rounded"
                        />

                        <input
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full p-2 border rounded"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
};

export default CompanyProfile;
