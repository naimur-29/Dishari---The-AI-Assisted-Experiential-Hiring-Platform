import React, { useState } from 'react';
import api from '../../../lib/api'; // Make sure your API file is correctly imported
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../../lib/LoadingSpinner';

const JobApply = () => {
    // State for form data
    const [link, setLink] = useState('');
    const [images, setImages] = useState([null, null, null]); // For optional image uploads
    const [textarea, setTextarea] = useState('');
    const [formError, setFormError] = useState('');
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    // Handle file changes
    const handleFileChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0];
        setImages(newImages);
    };

    // Handle link change
    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    // Handle textarea change
    const handleTextareaChange = (e) => {
        setTextarea(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        // Validate that the textarea is filled
        if (!textarea) {
            setFormError('Textarea is required.');
            return;
        }

        // Prepare form data to send to the API
        const formData = new FormData();

        if (link) formData.append('link', link); // Append link if available
        formData.append('explanation', textarea); // Append textarea
        formData.append('job_id', id);
        formData.append('user_id', localStorage.getItem('user_id'));

        // Append images if available
        images.forEach((image) => {
            if (image) formData.append('images[]', image); // <-- correct key
        });


        try {
            const res = await api.post('/apply-job', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set correct header for file uploads
                },
            });

            if (res.status === 200) {
                const req = {
                    "model": "gemma3:4b",
                    "messages": [
                        {
                            "role": "user",
                            "content": `You are an AI Assistant acting as an initial reviewer for company challenges submitted by fresh graduates. Your primary task is to evaluate a student's submission, which details their approach to building a web platform as per the challenge. You will provide an **Overall Score (out of 100)**, a **Detailed Score Overview** (string explaining how the overall score was derived from individual criteria), and an **Extended Evaluation Summary (5-7 sentences)** highlighting key strengths and weaknesses of their described solution and process.\n**[CHALLENGE INFORMATION START]**\ntitle: ${res.data.job.title}, problem description:${res.data.job.problem_statement}, evaluation criteria:${res.data.job.evaluation_criteria}\n**[CHALLENGE INFORMATION END]**\n**[STUDENT SUBMISSION START]**\n${textarea}\n**[STUDENT SUBMISSION END]**\n**[INSTRUCTIONS FOR EVALUATION AND OUTPUT]**\n1.\u00a0 **Internally assess** the Student Submission against each point in the **Detailed Evaluation Criteria**, considering the specified weightings.\n\u00a0 \u00a0 *\u00a0 \u00a0Evaluate the completeness and clarity of the feature list.\n\u00a0 \u00a0 *\u00a0 \u00a0Critically assess the chosen technologies, data models, and described user flows for suitability and justification.\n\u00a0 \u00a0 *\u00a0 \u00a0Review the descriptions of the UI/UX mockups/wireframes (and the screenshots themselves if your model can process them, otherwise rely heavily on the student's textual description of the visuals and captions).\n\u00a0 \u00a0 *\u00a0 \u00a0Consider the overall structure and clarity of the document.\n2.\u00a0 Based on your internal assessment and the criteria weightings, determine an **Overall Score (0-100)**.\n3.\u00a0 Generate a **Score Overview** string. This string should briefly explain how the overall score was achieved by mentioning the performance in each of the four evaluation criteria areas (Feature Definition, Technical Approach, UI/UX Design, Professionalism), ideally giving an indicative performance level or score contribution for each. For example: \"Score breakdown: Strong on Feature Definition (approx. 22/25 pts) and Technical Approach (approx. 30/35 pts); Good on UI/UX Design (approx. 20/30 pts); and Excellent Professionalism (approx. 9/10 pts).\"\n4.\u00a0 Craft an **Extended Evaluation Summary (5-7 concise sentences)**. This summary should provide a more in-depth qualitative assessment, capturing the essence of the submission's quality. It should elaborate on key strengths across different criteria and discuss specific areas for improvement or weaknesses observed in their described solution and process.\n**[REQUESTED OUTPUT FORMAT - JSON]**\nProvide your evaluation in the following JSON format:\njson\n{\n\u00a0 \"overall_score\": <integer_between_0_and_100>,\n\u00a0 \"score_overview\": \"<string_detailing_the_breakdown_of_scores_by_criteria_contributing_to_the_overall_score (no approximations, exact numbers)>\",\n\u00a0 \"evaluation_summary\": \"<string_containing_a_5_to_7_sentence_summary_with_more_detailed_qualitative_feedback>\"\n}\n"`,
                            "images": res.data.images || []
                        }
                    ],
                    "stream": false
                }
                console.log(res.data.images);
                //
                try {
                    const response = await axios.post(`https://278e-34-127-66-141.ngrok-free.app/api/chat`, req)
                    //console.log(response.data.message.content.split("```json")[1].split("```")[0]);
                    //console.log(response);
                    if (response.status === 200) {
                        try {
                            const up = await api.put(`/apply-job/update/${id}`, {
                                data: response.data.message.content.split("```json")[1].split("```")[0]
                                ,id:localStorage.getItem('user_id')
                            })
                            console.log(up);
                            if (up.status === 200) {
                                alert('Application submitted successfully!');
                                setLink('');
                                setTextarea('');
                                setImages([null, null, null]);
                            }
                        } catch (errors) {
                            console.log(errors);
                        }
                    }
                    setLoading(false)
                } catch (error) {
                    console.log(error);
                }
                // console.log(res);

            }
        } catch (err) {
            console.error('Error submitting the application', err);
            alert('Failed to submit application.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10 relative">
            {
                loading && <LoadingSpinner />
            }
            <h1 className="text-3xl font-bold text-center mb-4">Job Application</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Link Input (Optional) */}
                <div>
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">Enter your Link (Optional)</label>
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={handleLinkChange}
                        placeholder="https://example.com"
                        className="w-full p-2 border rounded mt-1"
                    />
                </div>

                {/* Image Upload Inputs (Optional, up to 3 images) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Images (Optional)</label>
                    {images.map((image, index) => (
                        <div key={index} className="mt-2">
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, index)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}
                </div>

                {/* Textarea Input (Required) */}
                <div>
                    <label htmlFor="textarea" className="block text-sm font-medium text-gray-700">Explain what you have done(Required)</label>
                    <textarea
                        id="textarea"
                        value={textarea}
                        onChange={handleTextareaChange}
                        placeholder="Enter additional details here"
                        className="w-full p-2 border rounded mt-1"
                        rows="4"
                    />
                </div>

                {/* Form Error */}
                {formError && <div className="text-red-600 text-sm">{formError}</div>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default JobApply;
