import axios from "axios";
import { useContext, useState } from "react";
import { serverURL } from "../../url";
import { useNavigate } from "react-router-dom";

export default function E24a2() {
  const [cypher, setCypher] = useState("");
  const navigate = useNavigate();
  const URL = useContext(serverURL);
  const passcodeMessages = [
    "Oops, wrong password! Did you forget your morning coffee too?",
    "Wrong password! Maybe try '12345' like in the movies.",
    "Password incorrect! Did you consult your pet for advice?",
    "Hmmm, wrong password. Your secret decoder ring must be malfunctioning.",
    "Incorrect password! Are you sure you're not a robot trying to blend in?",
    "Wrong password! You must have left your cat in charge of security.",
    "Password incorrect! Did you try 'password123' as a joke?",
    "Nope, that's not it! Maybe you're secretly a ninja with a secret code.",
    "Wrong password! Try 'OpenSesame' next time - it might just work!",
    "Password incorrect! Have you been taking lessons from a toddler?",
    "Oops, wrong password! You're not trying to hack into the secret cookie stash, are you?",
    "Incorrect password! It's not 'admin' unless you're an admin of silliness.",
    "Wrong password! Are you sure you're not a cat trying to log in with your paw?",
    "Password incorrect! Did you try 'Igiveup123' as a backup?",
    "Nope, not quite! But you're getting closer to the secrets of the universe.",
    "Wrong password! Did you consult the Magic 8-Ball for guidance?",
    "Incorrect password! You're not trying '0000' as a safety code, right?",
    "Oops, wrong password! Did you put on your lucky socks today?",
    "Password incorrect! It's not '12345678,' even though it's memorable.",
    "Hmmm...try shifting each letters by some same value...Hmm...",
  ];
  function getRandomPasscodeMessage() {
    const randomIndex = Math.floor(Math.random() * passcodeMessages.length);
    return passcodeMessages[randomIndex];
  }
  function completed() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios.post(`${URL}updateLevel`, { ...res, level: 5 }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCypher(() => {
      const { value } = event.target;
      return value;
    });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post(`${URL}passCode`, { level: 5 })
      .then((res) => {
        if (res.data == cypher) {
          alert(
            "You have sucessfully completed the level.\nClue: Count the number of shifts you have chosen to decypher."
          );
          completed();
        } else {
          const randomMessage = getRandomPasscodeMessage();
          alert(randomMessage);
        }
      })
      .catch((err) => console.log(err));
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
          <h1 style={{ textAlign: "center" }}>Et tu, Brute?</h1>
          <img src="/icons8-julius-caesar-64.png" alt="caesar" />
          <h3>G seyzkxouay urj huuq ut znk jayze ynkrl.</h3>
          <p>Looks confusing right? correct number might bring secrets out..</p>
          <input
            type="text"
            name="cypher"
            placeholder="Decypher me"
            value={cypher}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
