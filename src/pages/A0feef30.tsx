import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { serverURL } from "../url";

interface Player {
  name: string;
  rollno: string;
  levels: {
    level1: boolean;
    level2: boolean;
    level3: boolean;
    level4: boolean;
    level5: boolean;
    level6: boolean;
    level7: boolean;
    level8: boolean;
  };
  duration: {
    level1: Date;
    level2: Date;
    level3: Date;
    level4: Date;
    level5: Date;
    level6: Date;
    level7: Date;
    level8: Date;
  };
  start: Date;
  end: Date;
  totalDuration: Date;
}

export default function A0feef30() {
  const tableStyles: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyles: React.CSSProperties = {
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
    border: "1px solid #ccc",
  };

  const tdStyles: React.CSSProperties = {
    padding: "8px",
    textAlign: "left",
    border: "1px solid #ccc",
  };
  const greenBackground: React.CSSProperties = {
    backgroundColor: "#90EE90",
    color: "black",
  };

  const redBackground: React.CSSProperties = {
    backgroundColor: "#FFC0CB",
    color: "black",
  };

  const getCellStyle = (value: boolean, normalStyle: React.CSSProperties) => {
    return value
      ? { ...normalStyle, ...greenBackground }
      : { ...normalStyle, ...redBackground };
  };

  const URL = useContext(serverURL);
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    setInterval(() => {
      axios
        .post(`${URL}admin`)
        .then((res) => {
          setPlayers(res.data);
        })
        .catch((err) => alert(`An error occured: ${err}`));
    }, 5000);
  }, []);
  return (
    <div>
      <h1>Players:</h1>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Roll No</th>
            <th style={thStyles}>Level 1</th>
            <th style={thStyles}>Level 2</th>
            <th style={thStyles}>Level 3</th>
            <th style={thStyles}>Level 4</th>
            <th style={thStyles}>Level 5</th>
            <th style={thStyles}>Level 6</th>
            <th style={thStyles}>Level 7</th>
            <th style={thStyles}>Level 8</th>
            <th style={thStyles}>Start</th>
            <th style={thStyles}>End</th>
            <th style={thStyles}>Duration</th>
          </tr>
        </thead>
        <tbody style={{ border: "1px solid black" }}>
          {players.map((player, index) => (
            <tr key={index}>
              <td style={tdStyles}>{player.name}</td>
              <td style={tdStyles}>{player.rollno}</td>
              <td style={getCellStyle(player.levels.level1, tdStyles)}>
                {player.levels.level1 ? "Yes" : "No"}
                <br />
                {player.duration.level1 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level1).getHours() -
                      new Date(player.start).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level1).getMinutes() -
                      new Date(player.start).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level1).getSeconds() -
                      new Date(player.start).getSeconds()
                  )}s
                  `}
              </td>
              <td style={getCellStyle(player.levels.level2, tdStyles)}>
                {player.levels.level2 ? "Yes" : "No"}
                <br />
                {player.duration.level2 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level2).getHours() -
                      new Date(player.duration.level1).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level2).getMinutes() -
                      new Date(player.duration.level1).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level2).getSeconds() -
                      new Date(player.duration.level1).getSeconds()
                  )}s
                  `}
              </td>
              <td style={getCellStyle(player.levels.level3, tdStyles)}>
                {player.levels.level3 ? "Yes" : "No"}
                <br />
                {player.duration.level3 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level3).getHours() -
                      new Date(player.duration.level2).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level3).getMinutes() -
                      new Date(player.duration.level2).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level3).getSeconds() -
                      new Date(player.duration.level2).getSeconds()
                  )}s
                  `}
              </td>
              <td style={getCellStyle(player.levels.level4, tdStyles)}>
                {player.levels.level4 ? "Yes" : "No"}
                <br />
                {player.duration.level4 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level4).getHours() -
                      new Date(player.duration.level3).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level4).getMinutes() -
                      new Date(player.duration.level3).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level4).getSeconds() -
                      new Date(player.duration.level3).getSeconds()
                  )}s
                  `}
              </td>
              <td style={getCellStyle(player.levels.level5, tdStyles)}>
                {player.levels.level5 ? "Yes" : "No"}
                <br />
                {player.duration.level5 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level5).getHours() -
                      new Date(player.duration.level4).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level5).getMinutes() -
                      new Date(player.duration.level4).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level5).getSeconds() -
                      new Date(player.duration.level4).getSeconds()
                  )}s
                  `}
              </td>
              <td style={getCellStyle(player.levels.level6, tdStyles)}>
                {player.levels.level6 ? "Yes" : "No"}
                <br />
                {player.duration.level6 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level6).getHours() -
                      new Date(player.duration.level5).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level6).getMinutes() -
                      new Date(player.duration.level5).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level6).getSeconds() -
                      new Date(player.duration.level5).getSeconds()
                  )}s
                  `}
              </td>
              <td style={getCellStyle(player.levels.level7, tdStyles)}>
                {player.levels.level7 ? "Yes" : "No"}
                <br />
                {player.duration.level7 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level7).getHours() -
                      new Date(player.duration.level6).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level7).getMinutes() -
                      new Date(player.duration.level6).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level7).getSeconds() -
                      new Date(player.duration.level6).getSeconds()
                  )}s
                  `}
              </td>
              <td style={getCellStyle(player.levels.level8, tdStyles)}>
                {player.levels.level8 ? "Yes" : "No"}
                <br />
                {player.duration.level8 &&
                  `
                  ${Math.abs(
                    new Date(player.duration.level8).getHours() -
                      new Date(player.duration.level7).getHours()
                  )}h:${Math.abs(
                    new Date(player.duration.level8).getMinutes() -
                      new Date(player.duration.level7).getMinutes()
                  )}m:${Math.abs(
                    new Date(player.duration.level8).getSeconds() -
                      new Date(player.duration.level7).getSeconds()
                  )}s
                  `}
              </td>
              <td style={tdStyles}>
                {player.start && `${new Date(player.start).toLocaleString()}`}
              </td>
              <td style={tdStyles}>
                {player.end && `${new Date(player.end).toLocaleString()}`}
              </td>
              <td style={tdStyles}>
                {player.totalDuration &&
                  `
              ${new Date(player.totalDuration).getUTCHours()}h:${new Date(
                    player.totalDuration
                  ).getUTCMinutes()}m:${new Date(
                    player.totalDuration
                  ).getUTCSeconds()}s
              `}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
