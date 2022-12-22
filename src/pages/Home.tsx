import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Container,
    Heading,
    Image,
    Stack,
    Text,
    theme,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import ticTacToeImg from "../assets/tic-tac-toe.jpg";
import sudokuImg from "../assets/sudoku.png";

const fontLobster = {
    fontFamily: "Lobster",
};

function Home() {
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
                    Hello There
                </Heading>
            </Container>

            {/* using tailwindcss */}
            {/* <div className="text-center mx-auto w-96 text-2xl">
                <p className="text-white mt-5">Choose a game!</p>
            </div> */}
            <Container mx="auto" w="96">
                <Text
                    textColor="white"
                    textAlign="center"
                    mt="4"
                    fontSize="2xl"
                >
                    Choose a game!
                </Text>
            </Container>

            <Container my="4" maxW={{ lg: "50%", md: "75%", sm: "100%" }}>
                <Card
                    direction={{ base: "column", sm: "row" }}
                    mx="auto"
                    maxW="100%"
                    my="4"
                    overflow="hidden"
                    variant="outline"
                    bgColor="blue.100"
                    borderColor="pink.300"
                    borderWidth="2px"
                    borderRadius="16"
                    transition="all .25s ease"
                    _hover={{
                        bgColor: "blue.200",
                        borderColor: "#ff4dd8",
                    }}
                >
                    <Image
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "250px" }}
                        alt="Tic Tac Toe"
                        src={ticTacToeImg}
                    />
                    <Stack>
                        <CardBody>
                            <Heading size="md">Tic Tac Toe</Heading>
                            <Text py="2">
                                Got a friend? Got time to kill? Waste your
                                precious time and kill your brain cells with a
                                classic mind-numbing game of Tic Tac Toe! Go toe
                                to toe with your friend as you question why
                                you're even playing it in the first place!
                            </Text>
                        </CardBody>
                        <CardFooter>
                            <Link to="/tic-tac-toe">
                                <Button
                                    fontWeight="bold"
                                    bgGradient="linear(to-r, purple.300, pink.300)"
                                    _hover={{
                                        bgGradient:
                                            "linear(to-r, purple.400, pink.400)",
                                    }}
                                    _active={{
                                        bgGradient:
                                            "linear(to-r, purple.400, pink.400)",
                                    }}
                                >
                                    Play game
                                </Button>
                            </Link>
                        </CardFooter>
                    </Stack>
                </Card>
                <Card
                    direction={{ base: "column", sm: "row" }}
                    mx="auto"
                    maxW="100%"
                    my="4"
                    overflow="hidden"
                    variant="outline"
                    bgColor="blue.100"
                    borderColor="pink.300"
                    borderWidth="2px"
                    borderRadius="16"
                    transition="all .25s ease"
                    _hover={{
                        bgColor: "blue.200",
                        borderColor: "#ff4dd8",
                    }}
                >
                    <Image
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "250px" }}
                        alt="Sudoku"
                        src={sudokuImg}
                    />
                    <Stack>
                        <CardBody>
                            <Heading size="md">Sudoku</Heading>
                            <Text py="2">
                                Want to challenge yourself? Want to prove that
                                you're not some dumb simpleton? Well then, put
                                that smooth tofu brain of yours to the test with
                                a good old game of Sudoku!
                            </Text>
                        </CardBody>
                        <CardFooter>
                            <Link to="/sudoku">
                                <Button
                                    fontWeight="bold"
                                    bgGradient="linear(to-r, purple.300, pink.300)"
                                    _hover={{
                                        bgGradient:
                                            "linear(to-r, purple.400, pink.400)",
                                    }}
                                    _active={{
                                        bgGradient:
                                            "linear(to-r, purple.400, pink.400)",
                                    }}
                                >
                                    Play game
                                </Button>
                            </Link>
                        </CardFooter>
                    </Stack>
                </Card>
            </Container>
        </>
    );
}

export default Home;
