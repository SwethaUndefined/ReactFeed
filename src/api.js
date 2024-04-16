import axios from 'axios';

export const fetchPosts = async (limit = 8, page = 1, query = '') => {
  try {
    const response = await axios.get(`https://rigi-react-assignment-ii-server-production.up.railway.app/api/posts?limit=${limit}&page=${page}&query=${query}`, {
      headers: {
        'accept': 'application/json',
        'Authorization': 'XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; 
  }
};

export const fetchPostById = async (postId) => {
    try {
        const response = await axios.get(`https://rigi-react-assignment-ii-server-production.up.railway.app/api/posts/${postId}`,{
            headers: {
                'accept': 'application/json',
                'Authorization': 'XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS'
              }
        },
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; 
    }
};


