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

  const calculateTimeDifference = (start: Date, end: Date) => {
    const hours = Math.abs(
      new Date(end).getHours() - new Date(start).getHours()
    );
    const minutes = Math.abs(
      new Date(end).getMinutes() - new Date(start).getMinutes()
    );
    const seconds = Math.abs(
      new Date(end).getSeconds() - new Date(start).getSeconds()
    );
    return `${hours}h:${minutes}m:${seconds}s`;
  };

  const renderLevelCell = (
    player: Player,
    level: boolean,
    duration: Date | undefined
  ) => {
    const cellStyle = getCellStyle(level, tdStyles);
    return (
      <td style={cellStyle}>
        {level ? "Yes" : "No"}
        <br />
        {duration && calculateTimeDifference(player.start, duration)}
      </td>
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .post(`${URL}admin`)
        .then((res) => {
          setPlayers(res.data);
        })
        .catch((err) => console.error(`An error occurred: ${err.message}`));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Players:</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {[
              "Name",
              "Roll No",
              "Level 1",
              "Level 2",
              "Level 3",
              "Level 4",
              "Level 5",
              "Level 6",
              "Level 7",
              "Level 8",
              "Start",
              "End",
              "Duration",
            ].map((header, index) => (
              <th key={index} style={thStyles}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ border: "1px solid black" }}>
          {players.map((player, index) => (
            <tr key={index}>
              <td style={tdStyles}>{player.name}</td>
              <td style={tdStyles}>{player.rollno}</td>
              {renderLevelCell(
                player,
                player.levels.level1,
                player.duration.level1
              )}
              {renderLevelCell(
                player,
                player.levels.level2,
                player.duration.level2
              )}
              {renderLevelCell(
                player,
                player.levels.level3,
                player.duration.level3
              )}
              {renderLevelCell(
                player,
                player.levels.level4,
                player.duration.level4
              )}
              {renderLevelCell(
                player,
                player.levels.level5,
                player.duration.level5
              )}
              {renderLevelCell(
                player,
                player.levels.level6,
                player.duration.level6
              )}
              {renderLevelCell(
                player,
                player.levels.level7,
                player.duration.level7
              )}
              {renderLevelCell(
                player,
                player.levels.level8,
                player.duration.level8
              )}
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
