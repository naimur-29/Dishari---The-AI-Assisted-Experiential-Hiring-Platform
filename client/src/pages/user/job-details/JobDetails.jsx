import { useState, useEffect } from 'react';
import api from '../../../lib/api';  // Adjust the import path according to your project structure
import { useNavigate, useParams } from 'react-router-dom'; // For accessing the job id from URL params

const JobDetails = () => {
    const { id } = useParams();  // Extract job id from URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()

    // Fetch job details by ID
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await api.get(`/job-details/${id}`);
                setJob(res.data.job);  // Assuming response contains a `job` object
                setLoading(false);
            } catch (err) {
                console.error("Error fetching job details", err);
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold text-center mb-4">{job.title}</h1>
            
            <p className="text-gray-700 font-medium mb-2">
                <strong>Industry:</strong> {job.industry_id}
            </p>

            <p className="text-gray-700 font-medium mb-2">
                <strong>Problem Statement:</strong> {job.problem_statement}
            </p>

            <p className="text-gray-700 font-medium mb-2">
                <strong>Evaluation Criteria:</strong> {job.evaluation_criteria}
            </p>

            <p className="text-gray-700 font-medium mb-2">
                <strong>Submission Guideline:</strong> {job.submission_guideline}
            </p>

            <p className="text-gray-700 font-medium mb-2">
                <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
            </p>

            {job.is_hiring ? (
                <p className="text-green-600 font-semibold">We are hiring for this position!</p>
            ) : (
                <p className="text-red-600 font-semibold">This job is no longer accepting applications.</p>
            )}

            <div className="mt-6">
                <button onClick={()=>navigate(`/user/job-apply/${id}`)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobDetails;
