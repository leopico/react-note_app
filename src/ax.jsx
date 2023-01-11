import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost/note-app-api/api",
});

export default ax;
