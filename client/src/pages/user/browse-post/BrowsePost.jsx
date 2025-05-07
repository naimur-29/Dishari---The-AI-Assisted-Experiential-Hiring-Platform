import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { Link } from 'react-router-dom';  // For navigating to the details page

const BrowsePost = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Function to fetch job posts
    const fetchPosts = async (page = 1) => {
        try {
            const response = await api.get(`/job-list?page=${page}`);
            setPosts(response.data.data); 
            setCurrentPage(response.data.current_page);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error("Error fetching job posts:", error);
        }
    };

    // Fetch posts when the component mounts or when the page changes
    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    return (
        <div className="browse-post-container">
            <h2 className="text-center text-xl font-bold mb-6">Browse Job Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="border p-4 mb-2">
                        <h3 className="font-semibold text-lg">
                            <Link to={`/user/job-details/${post.id}`}>{post.title}</Link>
                        </h3>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-l"
                >
                    Previous
                </button>
                
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>

                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-r"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BrowsePost;
