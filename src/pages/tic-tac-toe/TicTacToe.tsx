import {
    Button,
    ButtonGroup,
    Container,
    Grid,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import Square from "./Square";

type Scores = {
    [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };

const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const fontLobster = {
    fontFamily: "Lobster",
};

function TicTacToe() {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [scores, setScores] = useState(INITIAL_SCORES);

    useEffect(() => {
        const storedScores = localStorage.getItem("scores");
        if (storedScores) {
            setScores(JSON.parse(storedScores));
        }
    }, []);

    useEffect(() => {
        if (gameState === INITIAL_GAME_STATE) {
            return;
        }
        checkForWinner();
    }, [gameState]);

    const resetBoard = () => setGameState(INITIAL_GAME_STATE);

    const resetScores = () => {
        setScores(INITIAL_SCORES);
        localStorage.setItem("scores", JSON.stringify(INITIAL_SCORES));
    };

    const handleWin = () => {
        window.alert(`Congrats player ${currentPlayer}! You are the winner!`);

        const newPlayerScore = scores[currentPlayer] + 1;
        const newScores = { ...scores };
        newScores[currentPlayer] = newPlayerScore;
        setScores(newScores);
        localStorage.setItem("scores", JSON.stringify(newScores));

        resetBoard();
    };

    const handleDraw = () => {
        window.alert("The game has ended in a draw :(");
        resetBoard();
    };

    const checkForWinner = () => {
        let roundWon = false;

        for (let i = 0; i < WINNING_COMBOS.length; i++) {
            const winCombo = WINNING_COMBOS[i];

            let a = gameState[winCombo[0]];
            let b = gameState[winCombo[1]];
            let c = gameState[winCombo[2]];

            if ([a, b, c].includes("")) {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setTimeout(() => handleWin(), 300);

            return;
        }

        if (!gameState.includes("")) {
            setTimeout(() => handleDraw(), 300);
            return;
        }

        changePlayer();
    };

    const changePlayer = () => {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const handleCellClick = (event: any) => {
        const cellIndex = Number(event.target.getAttribute("data-cell-index"));

        const currentValue = gameState[cellIndex];
        if (currentValue) {
            return;
        }

        const newValues = [...gameState];
        newValues[cellIndex] = currentPlayer;
        setGameState(newValues);
    };

    return (
        <>
            <Container w={"fit-content"}>
                <Heading
                    size="2xl"
                    fontWeight="normal"
                    style={fontLobster}
                    bgGradient="linear(to-r, purple.500, #ff4dd8)"
                    bgClip={"text"}
                >
                    Tic Tac Toe
                </Heading>
            </Container>
            <Container className="mt-5">
                {/* <div className="grid grid-cols-3 gap-3 mx-auto w-96"> */}
                <SimpleGrid columns={3} gap="3" mx="auto" w="96">
                    {gameState.map((player, index) => (
                        <Square
                            key={index}
                            onClick={handleCellClick}
                            {...{ index, player }}
                        />
                    ))}
                </SimpleGrid>
                {/* </div> */}
            </Container>

            <Container mx="auto" w="96" fontSize="2xl" className="text-serif">
                {/* <div className="mx-auto w-96 text-2xl text-serif"> */}
                <p className="text-white mt-5">
                    Current player's turn: <span>{currentPlayer}</span>
                </p>
                <p className="text-white mt-5">
                    Player X wins: <span>{scores["X"]}</span>
                </p>
                <p className="text-white mt-5">
                    Player O wins: <span>{scores["O"]}</span>
                </p>
                {/* </div> */}
            </Container>

            <Container
                mt="5"
                mx="auto"
                w={"fit-content"}
                justifyContent="center"
            >
                <ButtonGroup spacing="8">
                    <Button
                        size="lg"
                        border="2px"
                        borderColor={"red.500"}
                        bgColor={"white"}
                        _hover={{ bg: "red.100" }}
                        onClick={() => resetBoard()}
                    >
                        Reset Board
                    </Button>
                    <Button
                        size="lg"
                        colorScheme="red"
                        onClick={() => resetScores()}
                    >
                        Reset Scores
                    </Button>
                </ButtonGroup>
            </Container>
        </>
    );
}

export default TicTacToe;
