import { useContext, useState } from "react";
import axios from "axios";
import { serverURL } from "../../url";
import { useNavigate } from "react-router-dom";

export default function E7a3() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  const passcodeMessages = [
    "Oops, wrong password! Did you forget your morning coffee too?",
    "Wrong password! Maybe try '12345' like in the movies.",
    "Oops, wrong password! Did you put on your lucky socks today?",
    "Password incorrect! It's not '12345678,' even though it's memorable.",
    "Maybe, Try using only the first letter, Maybe...",
    "Perhaps, give it a shot to use capital letters and punctuation when it's necessary.",
  ];

  function getRandomPasscodeMessage() {
    const randomIndex = Math.floor(Math.random() * passcodeMessages.length);
    return passcodeMessages[randomIndex];
  }
  const URL = useContext(serverURL);
  const [passCode, setPassCode] = useState("");
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post(`${URL}passCode`, { level: 4 })
      .then((res) => {
        if (res.data == passCode) {
          alert(
            "You have sucessfully completed the level.\nClue: I am a numeral, the tally of nature's fundamental elements."
          );
          completed();
        } else {
          const randomMessage = getRandomPasscodeMessage();
          alert(randomMessage);
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function completed() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios.post(`${URL}updateLevel`, { ...res, level: 1 }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassCode(() => {
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
  .modal{
    position: fixed;
    width: 330px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .modalInner{
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  `;

  return (
    <>
      <style>{style}</style>
      <div className="container">
        <form action="/Rune.jpg" method="get" onSubmit={handleSubmit}>
          <h2>Before your eyes.</h2>
          <img
            src="/RuneCode.png"
            alt="RuneCode"
            style={{ borderRadius: "5px", width: "250px" }}
          />
          <p>Have you ever seen runes before?</p>
          {isModalOpen && (
            <div className="modal">
              <div className="modalInner">
                <img
                  src="/Rune.jpg"
                  alt="Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                />

                <button
                  className="Linkbutton"
                  onClick={closeModal}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <input
            type="text"
            placeholder="I think yes.."
            className="passCode"
            name="passCode"
            value={passCode}
            onChange={handleChange}
          />
          <section>
            <button className="Linkbutton" onClick={openModal} type="button">
              Show me
            </button>
            <button type="submit">Check!</button>
          </section>
        </form>
      </div>
    </>
  );
}
