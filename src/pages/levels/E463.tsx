import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { serverURL } from "../../url";
import { useNavigate } from "react-router-dom";

export default function E463() {
  const navigate = useNavigate();
  const URL = useContext(serverURL);
  const generateRandomDate = () => {
    const minDate = new Date(2000, 0, 1).getTime();
    const maxDate = new Date().getTime();
    const randomDate = new Date(minDate + Math.random() * (maxDate - minDate));
    return randomDate.toISOString().split("T")[0];
  };
  const [targetDate, setTargetDate] = useState(generateRandomDate());
  const [inputDate, setInputDate] = useState("");
  const [timer, setTimer] = useState(60);
  const [feedbackMessage, setFeedbackMessage] = useState("I will help you :)");
  function completed() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios.post(`${URL}updateLevel`, { ...res, level: 4 }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }
  useEffect(() => {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios.post(`${URL}updateLevel`, { ...res, level: 3 });
    }
  }, []);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer === 0) {
        resetGame();
      } else {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputDate === targetDate) {
      setFeedbackMessage("Congratulations! You won!");
      alert(
        "You have sucessfully completed the level.\nClue: I am a digit, my sole companion be zero, in the realm of Computers."
      );
      completed();
    } else {
      const inputDateObj = new Date(inputDate);
      const targetDateObj = new Date(targetDate);
      const difference = inputDateObj.getTime() - targetDateObj.getTime();
      let targetMessage = "";
      if (difference > 1000 * 60 * 60 * 24 * 365 * 10) {
        targetMessage = "Too far away! (You are in Future)";
      } else if (difference > 1000 * 60 * 60 * 24 * 365) {
        targetMessage = "Far away! (You are in Future)";
      } else if (difference > 1000 * 60 * 60 * 24 * 30) {
        targetMessage = "Near! (You are in Future)";
      } else if (difference > 1000 * 60 * 60 * 24 * 7) {
        targetMessage = "Very near! (You are in Future)";
      } else if (difference > 1) {
        targetMessage = "Very Very near! (You are in Future)";
      } else if (difference < -1000 * 60 * 60 * 24 * 365 * 10) {
        targetMessage = "Too far away! (You are in Past)";
      } else if (difference < -1000 * 60 * 60 * 24 * 365) {
        targetMessage = "Far away! (You are in Past)";
      } else if (difference < -1000 * 60 * 60 * 24 * 30) {
        targetMessage = "Near! (You are in Past)";
      } else if (difference < -1000 * 60 * 60 * 24 * 7) {
        targetMessage = "Very near! (You are in Past)";
      } else if (difference < -1) {
        targetMessage = "Very Very near! (You are in Past)";
      }
      setFeedbackMessage(targetMessage);
      if (targetMessage !== "") {
        alert(targetMessage);
      }
    }
  };

  const resetGame = () => {
    setTargetDate(generateRandomDate());
    setInputDate("");
    setTimer(60);
    setFeedbackMessage("Try Again");
  };
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
          <h2>Timed Perfection</h2>
          <p>The day, find the day. Before you loose everything.</p>
          <p>Time left: {timer} seconds</p>
          <input type="date" value={inputDate} onChange={handleInputChange} />
          <button type="submit">Guess</button>
          {feedbackMessage && (
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "red",
                marginTop: "20px",
              }}
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
