import axios from "axios";
import React, { useState } from "react";
import api from "../api";

const AddPost = ({ setPosts, posts }) => {
  // Network 요청에 대한 상태관리
  const [post, setPost] = useState({
    title: "",
    desc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // async/await과 try..catch..finally 방식을 이용해서 Error Handling 하기
  const onSubmitPostHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // 일반적인 Axios 사용 방식
      const { data } = await axios.post("http://localhost:3001/posts", post);

      // Axios Instance를 이용하는 방식 👇 -- 둘중에 편한 방식으로 사용하세요.
      // const { data } = await api.post("/posts", post);

      // 서버에서 가져온 post를 posts에 넣어야 합니다.
      // 만약 넣지 않으면 화면상에서 새롭게 추가한 post를 볼 수 없겠죠?
      setPosts([...posts, data]);
    } catch (error) {
      // Error가 발생한다면, Alert를 띄움
      alert("Error가 발생했습니다.");
      setError(error);
    } finally {
      // 요청이 실패를 해도, 성공을 해도 실행되는 부분.
      // 로딩상태를 false로 변경해준다.
      setIsLoading(false);
    }
  };

  // Input 상태관리
  const onChangeInputHandler = (event) => {
    const { value, name } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitPostHandler}>
        <input type="text" name="title" onChange={onChangeInputHandler} />
        <input type="text" name="desc" onChange={onChangeInputHandler} />
        {/* Post 추가요청에 대한 상태를 통해 유저에게 진행상황을 표시해준다.  */}
        <button>{isLoading ? "추가 중... " : "추가하기"}</button>
      </form>
    </div>
  );
};

export default AddPost;
