import { Container, Text } from "@chakra-ui/react";

function NotFound() {
    return (
        <Container mx="auto" w="96">
            <Text textColor="white" textAlign="center" mt="4" fontSize="2xl">
                Error 404: Page not found
            </Text>
        </Container>
    );
}

export default NotFound;
