import axios from "axios";

const baseUrl = 'http://localhost:3003/api/login';

const loginService = async (req) => {
  try {
    const res = await axios.post(baseUrl, req);
    return res.data;
  } catch(error) {
    console.log(`Error trying to login: ${error}`);
  }
};

export default loginService;