import * as sinon from "sinon";
import * as chai from "chai";
import * as sinonChai from "sinon-chai";
const { expect } = chai;

import MongoQuizData from "../src/data/dbconnection";
import { QuizDataServiceInstance } from "../src/business/services/dbservice";
import Quiz, { AdminQuizList, UserQuiz } from "../src/business/models/Quiz";

chai.use(sinonChai);

// // configure Sinon to work with Mocha
// sinon.defaultConfig = { ...sinon.defaultConfig, useFakeTimers: false };
// sinon.assert.expose(expect, { prefix: "" });

describe("QuizDataServiceInstance", () => {
  let mongoQuizDataStub: sinon.SinonStubbedInstance<MongoQuizData>;

  beforeEach(() => {
    // Create a stub for the MongoQuizData class methods
    mongoQuizDataStub = sinon.createStubInstance(MongoQuizData);

    QuizDataServiceInstance["_mongoQuizData"] = mongoQuizDataStub; // use a private accessor to assign the stub instance
  });

  describe("findQuiz", () => {
    it("should call findQuiz with the correct ID", async () => {
      const id = "Math";
      const expectedResult = { name: "Quiz1", subject: "Math" } as Quiz;

      // Stub the findQuiz method and return a predefined result
      mongoQuizDataStub.findQuiz.resolves(expectedResult);

      // Call the method under test
      const result = await QuizDataServiceInstance.findQuiz(id);

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
      await QuizDataServiceInstance.deleteQuiz(subject);

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

      await QuizDataServiceInstance.findAllQuizzes();
      expect(mongoQuizDataStub.findAllQuizzes.called).to.be.true;
    });
  });

  describe("findAllQuizzesWithQuizTakersCount", () => {
    it("should call findAllQuizzesWithQuizTakersCount", async () => {
      const mockResult = new Array<AdminQuizList>();

      // Stub the findAllQuizzes method and return a predefined result
      mongoQuizDataStub.findAllQuizzesWithQuizTakersCount.resolves(mockResult);

      await QuizDataServiceInstance.findAllQuizzesWithQuizTakersCount();

      expect(mongoQuizDataStub.findAllQuizzesWithQuizTakersCount.called).to.be
        .true;
    });
  });

  describe("findQuizzesTakenByUser", () => {
    it("should call findQuizzesTakenByUser with the correct name", async () => {
      const name = "John Doe";
      const mockResult = new Array<UserQuiz>();
      // Stub the findQuizzesTakenByUser method and return a predefined result
      mongoQuizDataStub.findQuizzesTakenByUser.resolves(mockResult);

      await QuizDataServiceInstance.findQuizzesTakenByUser(name);

      expect(mongoQuizDataStub.findQuizzesTakenByUser.calledWith(name)).to.be
        .true;
    });
  });

  describe("findQuestion", () => {
    it("should call findQuestion with the correct qid", async () => {
      const qid = 123;
      const mockResult = {
        qid: 0,
        question: "string",
        answer: "string",
        subject: "string",
        type: "string",
      };
      // Stub the findQuestion method and return a predefined result
      mongoQuizDataStub.findQuestion.resolves(mockResult);

      await QuizDataServiceInstance.findQuestion(qid);

      expect(mongoQuizDataStub.findQuestion.calledWith(qid)).to.be.true;
    });
  });

  describe("unlinkQuestionFromQuiz", () => {
    it("should call unlinkQuestionFromQuiz", async () => {
      const subject: string = "Math";
      // Stub the unlinkQuestionFromQuiz method and return a predefined result
      mongoQuizDataStub.unlinkQuestionFromQuiz.resolves();

      await QuizDataServiceInstance.unlinkQuestionFromQuiz(subject);

      expect(mongoQuizDataStub.unlinkQuestionFromQuiz.calledWith(subject)).to.be
        .true;
    });
  });
});
