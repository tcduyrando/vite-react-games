import {
    Button,
    ButtonGroup,
    Container,
    Heading,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSudoku } from "sudoku-gen";
import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";

import SudokuBoard from "./SudokuBoard";
import { SBoard, SRow, SCell } from "./Types";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";

const fontLobster = {
    fontFamily: "Lobster",
};

function Sudoku() {
    const [puzzleBoard, setPuzzleBoard] = useState<SBoard>();
    const [currentBoard, setCurrentBoard] = useState<SBoard>();
    const [solutionBoard, setSolutionBoard] = useState<SBoard>();
    const [isSolved, setIsSolved] = useState<Boolean | undefined>(undefined);

    const generateBoard = (diff: Difficulty) => {
        if (!isSolved) {
            if (currentBoard !== undefined && currentBoard !== puzzleBoard) {
                const isConfirmed = confirm(
                    "You are about to generate a new Sudoku puzzle and will lose all your progress on solving the current one. Do you wish to continue?"
                );
                if (!isConfirmed) {
                    return;
                }
            }
        }

        setIsSolved(false);
        localStorage.setItem("isSolved", JSON.stringify(false));

        const raw = getSudoku(diff);
        const difficulty =
            raw.difficulty.charAt(0).toUpperCase() + raw.difficulty.slice(1);

        const puzzle: SBoard = { difficulty: difficulty, rows: [] };
        for (let i = 0; i < 9; i++) {
            const row: SRow = { rowNum: i, cells: [] };
            for (let j = 0; j < 9; j++) {
                const value = raw.puzzle.charAt(i * 9 + j);
                const cell: SCell = {
                    rowNum: i,
                    colNum: j,
                    value: value !== "-" ? value : "",
                    readonly: value !== "-",
                };
                row.cells.push(cell);
            }
            puzzle.rows.push(row);
        }
        setCurrentBoard(puzzle);
        localStorage.setItem("currentBoard", JSON.stringify(puzzle));
        setPuzzleBoard(puzzle);
        localStorage.setItem("puzzleBoard", JSON.stringify(puzzle));

        const solution: SBoard = { difficulty: difficulty, rows: [] };
        for (let i = 0; i < 9; i++) {
            const row: SRow = { rowNum: i, cells: [] };
            for (let j = 0; j < 9; j++) {
                const value = raw.solution.charAt(i * 9 + j);
                const pValue = raw.puzzle.charAt(i * 9 + j);
                const cell: SCell = {
                    rowNum: i,
                    colNum: j,
                    value: value,
                    readonly: pValue !== "-",
                };
                row.cells.push(cell);
            }
            solution.rows.push(row);
        }
        setSolutionBoard(solution);
        localStorage.setItem("solutionBoard", JSON.stringify(solution));

        const result = { puzzle, solution };

        return;
    };

    useEffect(() => {
        const storedCurrentBoard = localStorage.getItem("currentBoard");
        if (storedCurrentBoard) {
            setCurrentBoard(JSON.parse(storedCurrentBoard));
        }
        const storedPuzzleBoard = localStorage.getItem("puzzleBoard");
        if (storedPuzzleBoard) {
            setPuzzleBoard(JSON.parse(storedPuzzleBoard));
        }
        const storedSolutionBoard = localStorage.getItem("solutionBoard");
        if (storedSolutionBoard) {
            setSolutionBoard(JSON.parse(storedSolutionBoard));
        }
        const storedIsSolved = localStorage.getItem("isSolved");
        if (storedIsSolved) {
            setIsSolved(JSON.parse(storedIsSolved));
        }
    }, []);

    useEffect(() => {
        if (currentBoard === undefined) {
            return;
        }

        checkWin();
    }, [currentBoard]);

    const handleCellChange = (rowNum: number, colNum: number, event: any) => {
        const newValue: string = event.target.value;
        if (newValue !== "" && Number.isNaN(parseInt(newValue))) {
            return;
        }

        const newBoard = cloneDeep(currentBoard);

        if (newBoard != undefined) {
            newBoard.rows[rowNum].cells[colNum].value = newValue;
            setCurrentBoard(newBoard);
            localStorage.setItem("currentBoard", JSON.stringify(newBoard));
        }
    };

    const checkWin = () => {
        if (isEqual(currentBoard, solutionBoard) && !isSolved) {
            setIsSolved(true);
            localStorage.clear();
            setTimeout(() => {
                handleWin(), 800;
            });
        }
    };

    const handleWin = () => {
        window.alert("Congratulations! You solved the Sudoku puzzle!");
    };

    const resetBoard = () => {
        const isConfirmed = confirm(
            "You are about to restart this sudoku puzzle from the beginning. Do you wish to continue?"
        );
        isConfirmed &&
            (setCurrentBoard(puzzleBoard),
            localStorage.setItem("currentBoard", JSON.stringify(puzzleBoard)),
            setIsSolved(false),
            localStorage.setItem("isSolved", JSON.stringify(false)));
    };

    const autoSolve = () => {
        const isConfirmed = confirm(
            "This will automatically solve the puzzle for you. Do you wish to continue?"
        );
        isConfirmed &&
            (setCurrentBoard(solutionBoard),
            localStorage.setItem("currentBoard", JSON.stringify(solutionBoard)),
            setIsSolved(true),
            localStorage.setItem("isSolved", JSON.stringify(true)));
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
                    Sudoku
                </Heading>
            </Container>

            <Container mt="5" mx="auto" w={"fit-content"}>
                <ButtonGroup spacing="5">
                    <Button
                        colorScheme={"green"}
                        onClick={() => generateBoard("easy")}
                    >
                        Easy
                    </Button>
                    <Button
                        colorScheme={"yellow"}
                        onClick={() => generateBoard("medium")}
                    >
                        Medium
                    </Button>
                    <Button
                        colorScheme={"pink"}
                        onClick={() => generateBoard("hard")}
                    >
                        Hard
                    </Button>
                    <Button
                        colorScheme={"purple"}
                        onClick={() => generateBoard("expert")}
                    >
                        Expert
                    </Button>
                </ButtonGroup>
            </Container>

            <Container
                mt="5"
                mx="auto"
                w={"fit-content"}
                justifyContent="center"
            >
                <Text
                    fontSize="2xl"
                    textColor="white"
                    mb="2"
                    textAlign="center"
                >
                    {!isSolved ? "" : "Choose difficulty to create a new game!"}
                </Text>
                <Text
                    fontSize="2xl"
                    textColor="white"
                    mb="5"
                    textAlign="center"
                >
                    {!currentBoard
                        ? "Choose a difficulty!"
                        : `Current difficulty: ${currentBoard?.difficulty}`}
                </Text>
                <SudokuBoard
                    currentBoard={currentBoard ? currentBoard : null}
                    handleCellChange={handleCellChange}
                ></SudokuBoard>
                <Text
                    fontSize="2xl"
                    textColor="white"
                    mt="5"
                    textAlign="center"
                >
                    {isSolved !== undefined
                        ? isSolved
                            ? "Status: Solved!"
                            : "Status: Unsolved"
                        : ""}
                </Text>
            </Container>
            {currentBoard ? (
                <Container
                    mt="5"
                    mx="auto"
                    w={"fit-content"}
                    justifyContent="center"
                >
                    <ButtonGroup spacing="5">
                        <Button
                            size="lg"
                            border="2px"
                            borderColor={"red.500"}
                            bgColor={"white"}
                            _hover={{ bg: "red.100" }}
                            onClick={resetBoard}
                        >
                            Reset Board
                        </Button>
                        <Button
                            size="lg"
                            colorScheme={"red"}
                            onClick={autoSolve}
                        >
                            Auto Solve
                        </Button>
                    </ButtonGroup>
                </Container>
            ) : (
                <></>
            )}
        </>
    );
}

export default Sudoku;
