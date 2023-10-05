import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import { serverURL } from "../../url";
import { useNavigate } from "react-router-dom";
interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
}

interface MemoryGameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number[];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function E6e3() {
  const navigate = useNavigate();
  const URL = useContext(serverURL);
  const symbols = useMemo(
    () => [
      "🌟",
      "🍎",
      "🌺",
      "🍕",
      "🚀",
      "🎈",
      "🍦",
      "🌞",
      "🚲",
      "🎁",
      "🌼",
      "🐶",
    ],
    []
  );

  const allCards = useMemo(() => symbols.concat(symbols), [symbols]);

  const [gameState, setGameState] = useState<MemoryGameState>({
    cards: shuffleArray(
      allCards.map((symbol, index) => ({
        id: index,
        symbol: symbol,
        isFlipped: false,
      }))
    ),
    flippedCards: [],
    matchedPairs: [],
  });

  const [isGameComplete, setIsGameComplete] = useState(false);
  const [timer, setTimer] = useState(60);

  const resetGame = useCallback(() => {
    setTimer(60);
    setIsGameComplete(false);
    setGameState({
      cards: shuffleArray(
        allCards.map((symbol, index) => ({
          id: index,
          symbol: symbol,
          isFlipped: false,
        }))
      ),
      flippedCards: [],
      matchedPairs: [],
    });
  }, [allCards]);

  function completed() {
    const localStorageItem = localStorage.getItem("e417");
    const res: object | null =
      localStorageItem !== null ? JSON.parse(localStorageItem) : null;
    if (res != null) {
      axios.post(`${URL}updateLevel`, { ...res, level: 2 }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [card1, card2] = gameState.flippedCards;
      if (gameState.cards[card1].symbol === gameState.cards[card2].symbol) {
        setGameState({
          ...gameState,
          matchedPairs: [...gameState.matchedPairs, card1, card2],
          flippedCards: [],
        });
      } else {
        setTimeout(() => {
          setGameState({
            ...gameState,
            flippedCards: [],
          });
        }, 1000);
      }
    }

    if (gameState.matchedPairs.length === symbols.length * 2) {
      setIsGameComplete(true);
      alert(
        "You have sucessfully completed the level.\nClue: I am a digit, often symbolized by index finger."
      );
      completed();
    }
  }, [gameState, symbols, resetGame]);

  useEffect(() => {
    if (timer > 0 && !isGameComplete) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timer === 0) {
      resetGame();
    }
  }, [timer, isGameComplete, resetGame]);

  const handleCardClick = (index: number) => {
    if (
      gameState.flippedCards.length === 2 ||
      gameState.matchedPairs.includes(index)
    ) {
      return;
    }

    if (!gameState.flippedCards.includes(index)) {
      setGameState({
        ...gameState,
        flippedCards: [...gameState.flippedCards, index],
      });
    }
  };

  const renderCard = (symbol: string, index: number) => {
    const isFlipped =
      gameState.flippedCards.includes(index) ||
      gameState.matchedPairs.includes(index);

    const cardStyle: React.CSSProperties = {
      width: "70px",
      height: "70px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      backgroundColor: isFlipped ? "#fff" : "#007bff",
      cursor: isFlipped ? "default" : "pointer",
      userSelect: "none",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.3s",
    };

    if (!isFlipped) {
      cardStyle.transform = "rotate(3deg)";
      cardStyle.transition = "transform 0.3s";
    }

    const cardContent = isFlipped ? symbol : "🎁";

    return (
      <div key={index} style={cardStyle} onClick={() => handleCardClick(index)}>
        {cardContent}
      </div>
    );
  };

  const containerStyle: React.CSSProperties = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const cardsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 70px)",
    gap: "10px",
    marginTop: "20px",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle} className="memory-game">
      <h2>Where are you?</h2>
      <p>Find pairs, before they get lost..again.</p>
      {isGameComplete ? (
        <div>
          <h2>Congratulations! You've won!</h2>
          <p>Game will automatically reset.</p>
        </div>
      ) : (
        <div>
          <div>
            <p>Time left: {timer} seconds</p>
          </div>
          <div style={cardsGridStyle} className="cards">
            {gameState.cards.map((card, index) =>
              renderCard(card.symbol, index)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
