import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api";
import { Card, Typography, Row, Col, Input, Switch } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import "./feedPage.css";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import { useTheme } from "../themeContext";
const { Search } = Input;

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const fetchInitialPosts = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchMorePosts = async ({ startIndex, stopIndex }) => {
    setIsLoading(true);
    try {
      const nextPage = Math.ceil((stopIndex + 1) / 8) + 1;
      const response = await fetchPosts(nextPage, 8);
      const newData = response.data.filter(
        (newPost) =>
          !posts.some((existingPost) => existingPost.id === newPost.id)
      );

      setPosts((prevPosts) => [...prevPosts, ...newData]);
    } catch (error) {
      console.error("Error fetching more posts:", error);
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
          <Row>
            <Col span={6}>
              <Link to={`/postDetailPage/${post.id}`}>
                <Card style={{height : "170px"}}>
                  <p>{post.text}</p>
                  <p>Posted by {post.author.name}</p>
                  <p>
                    Created At:
                    {moment(post.createdAt).format("DD/MM/YY, HH:mm:ss")}
                  </p>
                </Card>
              </Link>
            </Col>
          </Row>
        )}
      </div>
    );
  };

  const onSearch = async (e) => {
    const searchValue = e.target.value.toLowerCase();
    let filteredValue = [];

    if (searchValue) {
      filteredValue = posts.filter((post) =>
        post.author.name.toLowerCase().includes(searchValue)
      );
    } else {
      try {
        const response = await fetchPosts();
        filteredValue = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    setPosts(filteredValue);
  };

  return (
    <section className={`feedPage ${theme}`}>
      <Row>
        <Col span={12}>
          <Typography className="heading">All Posts</Typography>
        </Col>
        <Col span={6} className="switch-col">
          <Switch checked={theme === "dark"} onChange={toggleTheme} className="switch"/>
        </Col>
        <Col span={6} align="end">
          <Search placeholder="Search by Name" onChange={onSearch} />
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
