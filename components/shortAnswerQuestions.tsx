/**
 * Creating the component for displaying short answer quiz with pagination
 */
import { useState } from "react"; //for pagination
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
/**
 * to load css styles to the page since there are no default pagination in Chakra UI
 */
import GlobalStyles from "./globalStyles"

type Question = {
  id: string;
  text: string;
};

/**
 * Adding sample data to the quiz, this will be replaced by the database data
 */
const questions: Question[] = [
  {
    id: "1",
    text: "What is your name before the marriage if you are married ?",
  },
  {
    id: "2",
    text: "What is your favorite color?",
  },
  {
    id: "3",
    text: "What is your favorite food?",
  },
  {
    id: "4",
    text: "What is your favorite animal?",
  },
  {
    id: "5",
    text: "What is your favorite book?",
  },
  {
    id: "6",
    text: "What is your favorite book when you were in high school and still willing to read?",
  },
  {
    id: "7",
    text: "What is your favorite animal?",
  },
  {
    id: "8",
    text: "What is your favorite book?",
  },
  {
    id: "6",
    text: "What is your favorite food?",
  },
  {
    id: "9",
    text: "What is your favorite animal?",
  },
  {
    id: "10",
    text: "What is your favorite book?",
  },
];

/**
 * define question items per page for pagination
 */
const ITEMS_PER_PAGE = 3;

/**
 * 
 * @returns returns a UI with short answer quizz containing quiz items(question and input for ander) and pagination for easy navigation
 */
export default function shortAnswerQuestions() {
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * Determining number of pages in total for pagination
   */
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  /**
   * Define other necessary values for pagination
   * Adding global css with react emotion since chakra ui does not provide default pagination styles
   * maping quizitems with form items
   * And display data with pagination
   */
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);
  return (
    
    <Flex>
      <GlobalStyles/>
      <VStack spacing={10} align={"stretch"} justify={"center"}>
        <form>
          {currentQuestions.map((q) => (
            <Box
              key={q.id}
              bg="#F2F2E4"
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              marginTop={"3"}
            >
              <FormControl>
                <FormLabel>
                  Question {q.id}: {q.text}
                </FormLabel>
              </FormControl>
            </Box>
          ))}
          <Flex justifyContent="center" mt={10}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={totalPages}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </Flex>
          <Flex justifyContent="center" mt={10}>
            <Button type="submit" colorScheme="orange" mt={4}>
              Submit
            </Button>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
}
