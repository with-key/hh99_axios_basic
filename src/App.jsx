import axios from "axios";
import React, { useEffect, useState } from "react";
import AddPost from "./components/AddPost";
import styled from "styled-components";

const App = () => {
  // useState를 이용해서 네트워크 요청에 대한 상태를 관리합니다.
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // App.js에 들어오자마자 실행 할 함수를 작성합니다.
  // 이 함수에서는 Posts를 서버에서 가져오는 기능입니다.
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:3001/posts");
      setPosts(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Post를 지웠을 때 기능을 함수로 작성합니다.
  const onDeletePostHandler = async (id) => {
    try {
      setDeleteIsLoading(true);
      await axios.delete(`http://localhost:3001/posts/${id}`);
      alert(`${id} 번 post가 삭제되었어요!`);
    } catch (error) {
      setDeleteError(error);
      alert(`네트워크 오류로 삭제가 실패했습니다.`);
    } finally {
      setDeleteIsLoading(false);
    }
  };

  // useEffect를 이용해서 posts를 Fetching 합니다.
  useEffect(() => {
    getPosts();
  }, []);

  // 각각의 상태에 따라서 렌더링을 달리 합니다.
  if (isLoading) return <div>로딩 중....</div>;
  if (!!error) return <div>에러발생..!</div>;
  return (
    <>
      <AddPost setPosts={setPosts} posts={posts} />
      <StContainer>
        {posts.map((post) => (
          <StPostContainer key={post.id}>
            <div>{post.id}</div>
            <div>{post.title}</div>
            <div>{post.desc}</div>
            <div>
              <button
                onClick={() => {
                  onDeletePostHandler(post.id);
                }}
              >
                ❌
              </button>
            </div>
          </StPostContainer>
        ))}
      </StContainer>
    </>
  );
};

export default App;

const StContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
  padding: 50px;
`;

const StPostContainer = styled.div`
  border: 1px solid #ddd;
  width: 100px;
  height: 100px;
`;
