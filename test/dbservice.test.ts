import * as sinon from "sinon";
import * as chai from "chai";
import * as sinonChai from "sinon-chai";
const { expect } = chai;

import MongoQuizData from "../src/data/dbconnection";
import QuizDataService from "../src/business/services/dbservice";
import Quiz, { AdminQuizList } from "../src/business/models/Quiz";

chai.use(sinonChai);

// // configure Sinon to work with Mocha
// sinon.defaultConfig = { ...sinon.defaultConfig, useFakeTimers: false };
// sinon.assert.expose(expect, { prefix: "" });

describe("QuizDataService", () => {
  let quizDataService: QuizDataService;
  let mongoQuizDataStub: sinon.SinonStubbedInstance<MongoQuizData>;

  beforeEach(() => {
    // Create a stub for the MongoQuizData class methods
    mongoQuizDataStub = sinon.createStubInstance(MongoQuizData);

    // Create a new instance of the QuizDataService class with the stubbed MongoQuizData instance
    quizDataService = new QuizDataService();
    quizDataService["mongoQuizData"] = mongoQuizDataStub; // use a private accessor to assign the stub instance
  });

  describe("findQuiz", () => {
    it("should call findQuiz with the correct ID", async () => {
      const id = "Math";
      const expectedResult = { name: "Quiz1", subject: "Math" } as Quiz;

      // Stub the findQuiz method and return a predefined result
      mongoQuizDataStub.findQuiz.resolves(expectedResult);

      // Call the method under test
      const result = await quizDataService.findQuiz(id);

      // Assert that the findQuiz method was called once with the expected argument
      expect(mongoQuizDataStub.findQuiz).to.have.been.calledWithExactly(id);

      // Assert that the result of the method call is equal to the predefined result
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe("deleteQuiz", () => {
    it("should call deleteQuiz with the correct subject", async () => {
      // Stub the deleteQuiz method and return a predefined result
      mongoQuizDataStub.deleteQuiz.resolves();

      const subject = "test";
      await quizDataService.deleteQuiz(subject);

      expect(mongoQuizDataStub.deleteQuiz.calledWith(subject)).to.be.true;
    });
  });

  describe("findAllQuizzes", () => {
    it("should call findAllQuizzes", async () => {
      const mockResult = [
        { name: "Quiz1", subject: "Math" },
        { name: "Quiz2", subject: "Science" },
      ] as Array<Quiz>;

      // Stub the findAllQuizzes method and return a predefined result
      mongoQuizDataStub.findAllQuizzes.resolves(mockResult);

      await quizDataService.findAllQuizzes();
      expect(mongoQuizDataStub.findAllQuizzes.called).to.be.true;
    });
  });

  describe("findAllQuizzesWithQuizTakersCount", () => {
    it("should call findAllQuizzesWithQuizTakersCount", async () => {
      const mockResult = new Array<AdminQuizList>();

      // Stub the findAllQuizzes method and return a predefined result
      mongoQuizDataStub.findAllQuizzesWithQuizTakersCount.resolves(mockResult);

      await quizDataService.findAllQuizzesWithQuizTakersCount();
      expect(mongoQuizDataStub.findAllQuizzesWithQuizTakersCount.called).to.be
        .true;
    });
  });

  //   describe("findQuizzesTakenByUser", () => {
  //     it("should call findQuizzesTakenByUser with the correct name", async () => {
  //       const name = "John Doe";
  //       await quizDataService.findQuizzesTakenByUser(name);
  //       expect(mongoQuizData.findQuizzesTakenByUser.calledWith(name)).to.be.true;
  //     });
  //   });

  //   describe("findQuestion", () => {
  //     it("should call findQuestion with the correct qid", async () => {
  //       const qid = 123;
  //       await quizDataService.findQuestion(qid);
  //       expect(mongoQuizData.findQuestion.calledWith(qid)).to.be.true;
  //     });
  //   });
});
