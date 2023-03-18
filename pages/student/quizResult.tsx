import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../components/ResultHeader";
import Footer from "../../components/Footer";
import Result from "../../components/Result";
import { Box, Container, Card, Text, Button, Stack} from "@chakra-ui/react";
import clientPromise from "../../src/lib/mongodb";
import Quiz from "../../src/models/Quiz";
// export async function getServerSideProps() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("test");

//     const quizzes = await db
//       .collection("quizes")
//       .find({})
//       .sort({ marks: -1 })
//       .toArray();

//     return {
//       props: { quizzes: JSON.parse(JSON.stringify(quizzes)) },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// }

export default function QuizResult() {
    let value='100'
  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Quiz App Home for students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <NavBar />
          <Box justifyContent="center">
            <Result/>
            <Container maxWidth='64vw' minHeight="20vh">
                    <Card bgColor='#D9D9D9'
                    maxWidth='100vw' minHeight="30vh"
                    borderRadius={'10px'} 
                    marginStart={16}
                    >
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Your Final Score: {value}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Maximum Score: {value}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Correct Questions: {value}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Total Questions: {value}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Time Taken: {value}</Text>
                    </Card>
                </Container>
          </Box>
          <Box flex="1"  mx="auto" justifyContent="center">
                 <Stack  spacing={20} mt={14}  direction='row'>
                            <Button colorScheme="orange" >Attempt Again </Button>
                            <Button colorScheme="orange" >Main Menu </Button>
                            <Button colorScheme="orange" >Leaders Board </Button>
                        </Stack>
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
}
