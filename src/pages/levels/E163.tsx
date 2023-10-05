import { useState, useEffect } from "react";
import { serverURL } from "../../url";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
export default function E163() {
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false);
  const [isConfetti, setIsConfetti] = useState(false);

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
        setTimeout(() => {
          setIsExploding(true);
        }, 1000);
      }, 1000);
    }
  }, [isExploding]);
  const URL = useContext(serverURL);
  const [input, setInput] = useState<string>("");
  function completed() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios
        .post(`${URL}updateLevel`, { ...res, level: 8 })
        .catch((err) => alert(`Error: ${err}`));
      axios
        .post(`${URL}endGame`, { ...res })
        .catch((err) => alert(`Error: ${err}`));
    }
  }
  function handleSubmit() {
    axios.post(`${URL}passCode`, { level: 8 }).then((res) => {
      if (res.data == input) {
        completed();
        setIsExploding(true);
        setIsConfetti(true);
        alert("Congragulations! You have found the treasure.");
      } else {
        alert("I wish you were right...but not.");
      }
    });
  }
  const handleKeyPress = (key: string) => {
    if (key == "Submit") {
      handleSubmit();
      return;
    }
    setInput((prevInput) => prevInput + key);
  };
  function handleLogout() {
    localStorage.clear();
    navigate("/", { replace: true });
  }
  const style = `
  .container,.miniContainer{
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

.miniContainer{
  width: 250px;
  padding: 30px 30px 30px 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 9px;
  text-align: center;
}

  .keyboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
  }

  .keyboard button {
    font-size: 15px;
    padding: 10px 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .keyboard button:hover {
    background-color: #f0f0f0;
  }

  input {
    width: 100%;
    font-size: 18px;
    padding: 10px;
    margin-bottom: 10px;
  }
}`;
  return (
    <>
      <style>{style}</style>
      <div className="container">
        {isExploding && <ConfettiExplosion />}
        <div className="miniContainer">
          {isConfetti && (
            <>
              <h1>You have Completed!</h1>
              <img src="/icons8-treasure-64.png" alt="TreasureBoxOpened"></img>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {!isConfetti && (
            <>
              <h1>The Final destination.</h1>
              <img src="/icons8-treasure-64-closed.png" alt="TreasureBox" />
              <p>Use those wise words here.</p>
              <input
                type="text"
                value={input}
                readOnly
                placeholder="Treasure Code"
              />
              <div className="keyboard">
                <button onClick={() => handleKeyPress("1")}>1</button>
                <button onClick={() => handleKeyPress("2")}>2</button>
                <button onClick={() => handleKeyPress("3")}>3</button>
                <button onClick={() => handleKeyPress("4")}>4</button>
                <button onClick={() => handleKeyPress("5")}>5</button>
                <button onClick={() => handleKeyPress("6")}>6</button>
                <button onClick={() => handleKeyPress("7")}>7</button>
                <button onClick={() => handleKeyPress("8")}>8</button>
                <button onClick={() => handleKeyPress("9")}>9</button>
                <button onClick={() => handleKeyPress("0")}>0</button>
                <button onClick={() => handleKeyPress("Submit")}>Submit</button>
                <button onClick={() => setInput("")}>Clear</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
