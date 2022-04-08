import axios from "axios";

// Axios Instance를 생성:: 인스턴스를 이용하면 코드 중복을 최소화 할 수 있다.
const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;
