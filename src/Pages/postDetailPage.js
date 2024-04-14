import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchPostById } from "../api"; 

const PostDetailPage = () => {
  const { postId } = useParams(); 
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetchPostById(postId);
        setPostDetail(response); 
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]); 

  return (
    <div>
      <h1>Post Detail Page</h1>
      {postDetail && (
        <div>
          <h2>{postDetail.text}</h2>
          <p>Created At: {postDetail.createdAt}</p>
          <p>Posted by {postDetail.author.name}</p>
          <img src={postDetail.author.profilePictureUrl} alt="Author Avatar" /> {/* Display author profile picture */}
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;

