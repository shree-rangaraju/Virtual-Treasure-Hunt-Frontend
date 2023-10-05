import React, { useState, useContext } from "react";
import axios from "axios";
import { serverURL } from "../../url";
import { useNavigate } from "react-router-dom";

export default function E25e2() {
  const passcodeMessages = [
    "Incorrect password! It's not 'admin' unless you're an admin of silliness.",
    "Wrong password! Are you sure you're not a cat trying to log in with your paw?",
    "Password incorrect! Did you try 'Igiveup123' as a backup?",
    "Password incorrect! It's not '12345678,' even though it's memorable.",
    "Maybe...try opening the image in google photos...maybe...",
    "I usually won't check the metadata, usually...",
  ];
  function getRandomPasscodeMessage() {
    const randomIndex = Math.floor(Math.random() * passcodeMessages.length);
    return passcodeMessages[randomIndex];
  }

  const navigate = useNavigate();
  const URL = useContext(serverURL);
  const [password, setPassword] = useState("");

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/OnePiece.jpg";
    link.target = "_blank";
    link.download = "OnePiece.jpg";
    link.click();
  };
  function completed() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios.post(`${URL}updateLevel`, { ...res, level: 6 }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post(`${URL}passCode`, { level: 6 })
      .then((res) => {
        if (res.data == password) {
          alert(
            "You have sucessfully completed the level.\nClue: Indians, with their ingenious wit, birthed me, a pivotal player in the grand tapestry of mathematics."
          );
          completed();
        } else {
          const randomMessage = getRandomPasscodeMessage();
          alert(randomMessage);
        }
      })
      .catch((err) => alert(`Error: ${err}`));
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(() => {
      const { value } = event.target;
      return value;
    });
  }
  const style = `
  .container,form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    textAlign: center;
  }

  .container{
    min-height: 100vh;
    background-color: #f0f0f0;
  }
  
  form{
    width: 250px;
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
          <h2>The one who knew too much.</h2>
          <img src="/icons8-detective-85.png" alt="Detective" />
          <p>
            Accept the one, I shall offer. explore deeply, search thorougly. In
            unimaginable places. find me, and I will guide you.
          </p>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <div>
            <button type="button" onClick={handleDownload}>
              I'll Accept
            </button>
            <button type="submit">Check</button>
          </div>
        </form>
      </div>
    </>
  );
}
