import axios from "axios";

export default axios.create({
    baseURL: "https://backend.parthbhattad.in/api",
    withCredentials: true,
});