import React, { useState, useEffect } from 'react';
import { fetchPosts } from "../api";
import { Card, Typography, Row, Col } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const fetchInitialPosts = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchMorePosts = async ({ startIndex, stopIndex }) => {
    setIsLoading(true);
    try {
      const nextPage = Math.ceil((stopIndex + 1) / 8) + 1; 
      const response = await fetchPosts(nextPage, 8); 
      setPosts(prevPosts => [...prevPosts, ...response.data]);
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
    setIsLoading(false);
  };
  

  const isRowLoaded = ({ index }) => !!posts[index];

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    if (!isLoading) {
      fetchMorePosts({ startIndex, stopIndex });
    }
  };

  const rowRenderer = ({ key, index, style }) => {
    const post = posts[index];
    return (
      <div key={key} style={style}>
        {post && (
          <Link to={`/postDetailPage/${post.id}`}>
            <Card>
              <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                {post.text}
              </Typography.Paragraph>
              <p>Posted by {post.author.name}</p>
              <p>Created At: {moment(post.createdAt).format('DD/MM/YY, HH:mm:ss')}</p>
            </Card>
          </Link>
        )}
      </div>
    );
  };

  return (
    <section>
      <Row>
        <Col span={24}>
          <Typography>All Posts</Typography>
        </Col>
      </Row>
      <AutoSizer disableHeight>
        {({ width }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={1000} 
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                width={width}
                height={600} 
                rowCount={posts.length}
                rowHeight={200} 
                rowRenderer={rowRenderer}
                onRowsRendered={onRowsRendered}
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
      {isLoading && <p>Loading more posts...</p>}
    </section>
  );
};

export default FeedPage;
