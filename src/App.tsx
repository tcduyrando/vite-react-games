import { Box, Container, Flex, theme } from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Navigate,
    NavLink,
    Route,
    Routes,
} from "react-router-dom";
import NotFound from "./pages/404";

import Home from "./pages/Home";
import Sudoku from "./pages/sudoku/Sudoku";
import TicTacToe from "./pages/tic-tac-toe/TicTacToe";

function App() {
    const navBtnStyle = "font-semibold hover-underline-animation";

    const underlineStyle = {
        textDecoration: "underline",
        textDecorationThickness: "0.2rem",
        textUnderlineOffset: "0.18rem",
    };

    return (
        <Box p="5" className="text-slate-800">
            <Router>
                <Flex
                    pb="5"
                    justifyContent={"center"}
                    className="text-white text-3xl text-serif"
                >
                    <NavLink
                        to="/home"
                        style={({ isActive }) => {
                            return isActive ? underlineStyle : {};
                        }}
                        className={`mr-8 ${navBtnStyle}`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/tic-tac-toe"
                        style={({ isActive }) => {
                            return isActive ? underlineStyle : {};
                        }}
                        className={`mx-8 ${navBtnStyle}`}
                    >
                        Tic Tac Toe
                    </NavLink>
                    <NavLink
                        to="/sudoku"
                        style={({ isActive }) => {
                            return isActive ? underlineStyle : {};
                        }}
                        className={`ml-8 ${navBtnStyle}`}
                    >
                        Sudoku
                    </NavLink>
                </Flex>
                <Routes>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="tic-tac-toe" element={<TicTacToe />} />
                    <Route path="sudoku" element={<Sudoku />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
