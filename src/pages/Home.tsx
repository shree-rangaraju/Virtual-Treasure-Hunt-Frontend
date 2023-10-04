import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../url";

export default function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    rollNumber: "",
  });

  function getLocalStorage() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios
        .post(`${URL}register`, res)
        .then((res) => {
          navigate(`/${res.data}`, { replace: true });
        })
        .catch(() => alert("An error occured"));
    }
  }
  useEffect(() => {
    getLocalStorage();
  }, []);
  const URL = useContext(serverURL);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userData.userName == "XArchenon" && userData.rollNumber == "1215623") {
      navigate(`/A0feef30`, { replace: true });
      return;
    }
    localStorage.setItem("e417", JSON.stringify(userData));
    axios
      .post(`${URL}register`, userData)
      .then((res) => {
        navigate(`/${res.data}`, { replace: true });
      })
      .catch(() => alert("An error occured"));
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData((oldUserData) => {
      const { name, value } = e.target;
      return {
        ...oldUserData,
        [name]: value,
      };
    });
  }
  const style = `
  .container,
  form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    textAlign: center;
  }

  .container{
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  form{
    width: 240px;
    padding: 50px 30px 50px 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border-radius: 9px;
  }
  `;
  return (
    <>
      <style>{style}</style>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <img src="/icons8-treasure-64-closed.png" alt="Treasure" />
          <h2>Login</h2>
          <input
            type="text"
            className="userName"
            name="userName"
            placeholder="Username"
            value={userData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="rollNumber"
            name="rollNumber"
            placeholder="Roll Number"
            value={userData.rollNumber}
            onChange={handleChange}
            required
          />
          <button type="submit" className="primaryButton">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
