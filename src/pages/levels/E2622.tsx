import { useState } from "react";
import QRCode from "qrcode.react";

export default function E2622() {
  const [text, setText] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState(
    "Code: E463 , Clue: A factor to myself, none else do I engage. I usually show up, when numbers divide itself."
  );

  const gibberishArray = [
    "Zippity-zappity-boopity-bop!",
    "Flippity-floppity-floopity-flop!",
    "Wobble-dobble-doo-wop-wop!",
    "Gibber-gabber-doodle-doo!",
    "Higgledy-piggledy-hoopla!",
    "Bibbity-bobbity-boo!",
    "Mumbo-jumbo-gibberish-goo!",
    "Ding-dong-doodle-dandy!",
    "Zigzag-zoodle-zippity-zoo!",
    "Razzle-dazzle-fizzle-fazzle!",
  ];

  const generateQRCode = () => {
    const message =
      gibberishArray[Math.floor(Math.random() * gibberishArray.length)];
    setQRCodeValue(message);
  };
  const style = `
  .container,
  .miniContainer{
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
  
  .miniContainer{
    width: 240px;
    padding: 30px 30px 30px 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border-radius: 9px;
  }
  `;
  return (
    <>
      <style>{style}</style>
      <div className="container">
        <div className="miniContainer">
          <h2>Another one.</h2>
          {qrCodeValue && (
            <>
              <p>???</p>
              <QRCode value={qrCodeValue} />
              <p>
                Go beyond the boundaries...explore new addresses...my friend
                here will guide you.
              </p>
            </>
          )}
          <input
            type="text"
            placeholder="Secret"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={generateQRCode}>Let me in!</button>
        </div>
      </div>
    </>
  );
}
