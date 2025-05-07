import React, { useEffect, useState } from 'react';
import api from '../../../lib/api'; // Ensure this points to your axios instance

const AppliedPost = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        if (!user_id) {
            setError('User not logged in.');
            setLoading(false);
            return;
        }

        const fetchApplications = async () => {
            try {
                const res = await api.get(`/applied-posts/${user_id}`);
                setApplications(res.data);
            } catch (err) {
                console.error('Failed to fetch applied posts:', err);
                setError('Failed to load applications.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Your Applied Posts</h1>
            {applications.length === 0 ? (
                <p>You have not applied to any jobs yet.</p>
            ) : (
                <ul className="space-y-4">
                    {applications.map((app, index) => {
                        let testResult = {};
                        try {
                            testResult = app.test_result ? JSON.parse(app.test_result) : {};
                        } catch (e) {
                            console.error(`Invalid JSON for app at index ${index}`, e);
                        }

                        return (
                            <li key={index} className="p-4 border rounded gap-2 text-[18px]">
                                <p><strong>Job Title:</strong> {app.job_title}</p>
                                <div className='flex flex-row gap-4'>
                                    <p><strong>Company:</strong> {app.company_name}</p>
                                    <p><strong>Score:</strong> {testResult.overall_score ?? 'N/A'}</p>
                                </div>
                                <p><strong>Feedback:</strong> {testResult.evaluation_summary ?? 'N/A'}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default AppliedPost;
