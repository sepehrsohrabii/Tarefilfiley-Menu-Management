import axios from "axios";

const handleSignup = async ({ name, email, password, setError }) => {
  try {
    const response = await axios.post("https://api.tarefilfiley.me/signup", {
      name,
      email,
      password,
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      setError(error.response.data.errors[0].msg);
    } else {
      setError(error.message);
    }
  }
};
export default handleSignup;
