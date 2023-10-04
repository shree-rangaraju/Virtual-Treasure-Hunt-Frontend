import { useState, useEffect, useContext } from "react";
import { serverURL } from "../../url";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NUM_DICE = 25;
const TIME_LIMIT = 60;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
};

const diceStyle = {
  fontSize: "24px",
  width: "50px",
  height: "50px",
  margin: "5px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const heldDiceStyle = {
  ...diceStyle,
  backgroundColor: "#b3e0ff",
};

export default function E523() {
  const URL = useContext(serverURL);
  const navigate = useNavigate();
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [heldDice, setHeldDice] = useState(Array(NUM_DICE).fill(false));
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT);
  function completed() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios.post(`${URL}updateLevel`, { ...res, level: 7 }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }
  useEffect(() => {
    const initialDiceValues = Array.from(
      { length: NUM_DICE },
      () => Math.floor(Math.random() * 20) + 1
    );
    setDiceValues(initialDiceValues);
    startTimer();

    return stopTimer;
  }, []);

  let timerId: number;

  const startTimer = () => {
    timerId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerId);
          setDiceValues(() =>
            Array.from(
              { length: NUM_DICE },
              () => Math.floor(Math.random() * 20) + 1
            )
          );
          setTimeRemaining(TIME_LIMIT);
          setHeldDice(Array(NUM_DICE).fill(false));
          startTimer();
          return TIME_LIMIT;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId);
  };

  const toggleHoldDice = (index: number) => {
    if (timeRemaining === 0) {
      return;
    }
    const newHeldDice = [...heldDice];
    newHeldDice[index] = !newHeldDice[index];
    setHeldDice(newHeldDice);
  };

  const rollDice = () => {
    if (isGameWon) {
      alert(
        "You have sucessfully completed the level.\nClue: A digit I be, the rings' amount,In Olympics grand, their colors count."
      );
      completed();
    }
    if (timeRemaining === 0) {
      return;
    }
    const newDiceValues = diceValues.map((value, index) => {
      if (heldDice[index]) {
        return value;
      }
      return Math.floor(Math.random() * 20) + 1;
    });
    setDiceValues(newDiceValues);
  };

  const isGameWon = diceValues.every((value) => value === diceValues[0]);
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
  }`;
  return (
    <>
      <style>{style}</style>
      <div className="container">
        <h2>Selectivity.</h2>
        <p>
          Make us all same, you shall pass.
          <br />
          For thus, I shall obey.
          <br />
          Fail to do so, face the consequences.
        </p>
        <div style={gridStyle}>
          {diceValues.map((value, index) => (
            <button
              key={index}
              style={heldDice[index] ? heldDiceStyle : diceStyle}
              onClick={() => toggleHoldDice(index)}
            >
              {value}
            </button>
          ))}
        </div>
        <p>Time Remaining: {timeRemaining} seconds</p>
        <button onClick={rollDice}>Shuffle</button>
      </div>
    </>
  );
}
