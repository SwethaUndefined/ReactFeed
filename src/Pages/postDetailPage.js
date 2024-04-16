import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api";
import "./postDetailPage.css";
import { Typography, Row, Col } from "antd";
import moment from "moment";
import { useTheme } from "../themeContext"; // Import useTheme hook


const LazyImage = lazy(() => import("../lazyImage"));
const LazyVideo = lazy(() => import("../lazyVideo"));

const PostDetailPage = () => {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetchPostById(postId);
        setPostDetail(response);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
<section className={`postDetailPage ${theme}`}>
        <Row>
        <Col span={24}>
          <Typography className="heading">Post Details</Typography>
        </Col>
        {postDetail && (
          <>
            <Col span={8} className="profile">
              <Row>
                <Col span={24}>
                  <img
                    src={postDetail.author.profilePictureUrl}
                    alt="Author Avatar"
                    className="profileImg"
                  />
                </Col>
                <Col span={24}>
                  <Typography>
                    Created At:
                    {moment(postDetail.createdAt).format("DD/MM/YY, HH:mm:ss")}
                  </Typography>
                  <Typography>Posted by {postDetail.author.name}</Typography>
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={24}>
                  <Typography className="text">Post is about : {postDetail.text}</Typography>
                </Col>
              </Row>
              <Row>
                {postDetail.attachments && postDetail.attachments.length > 0 ? (
                  postDetail.attachments.map((attachment, index) => (
                    <Col span={24} key={index}>
                      {attachment.type === "video" && (
                        <Suspense fallback={<div>Loading video...</div>}>
                          <LazyVideo src={attachment.url} />
                        </Suspense>
                      )}
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div>No video attachments for this post</div>
                  </Col>
                )}
              </Row>
              <Row className="image-row">
                {postDetail.attachments && postDetail.attachments.length > 0 ? (
                  postDetail.attachments.map(
                    (attachment, index) =>
                      attachment.type === "image" && (
                        <Col
                          span={12}
                          key={index}
                        >
                          <Suspense fallback={<div>Loading image...</div>}>
                            <LazyImage src={attachment.url} />
                          </Suspense>
                        </Col>
                      )
                  )
                ) : (
                  <Col span={24}>
                    <div>No image attachments for this post</div>
                  </Col>
                )}
              </Row>
            </Col>
          </>
        )}
      </Row>
    </section>
  );
};

export default PostDetailPage;
