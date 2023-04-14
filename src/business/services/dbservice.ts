import MongoQuizData from "../../../src/data/dbconnection";
import IHandleQuizData from "../../business/interfaces/IHandleQuizData";
import IGetQuestionData from "../../business/interfaces/IGetQuestionData";
import IGetUserData from "../../business/interfaces/IGetUserData";

class QuizDataService
  implements IHandleQuizData, IGetQuestionData, IGetUserData
{
  #instance: QuizDataService;
  #mongoQuizData: MongoQuizData;
  constructor() {
    this.#mongoQuizData = new MongoQuizData();
  }
  get instance(): QuizDataService {
    return this.#instance;
  }
  set instance(i: QuizDataService) {
    this.#instance = i;
  }

  static getInstance(): QuizDataService {
    if (!QuizDataService.instance) {
      QuizDataService.instance = new QuizDataService();
    }
    return QuizDataService.instance;
  }

  public async findQuiz(id: string) {
    return this.#mongoQuizData.findQuiz(id);
  }

  public async deleteQuiz(subject: string) {
    return this.#mongoQuizData.deleteQuiz(subject);
  }

  async findAllQuizzes() {
    return this.#mongoQuizData.findAllQuizzes();
  }

  public async findAllQuizzesWithQuizTakersCount() {
    return this.#mongoQuizData.findAllQuizzesWithQuizTakersCount();
  }

  async findQuizzesTakenByUser(name: string) {
    return this.#mongoQuizData.findQuizzesTakenByUser(name);
  }

  async findQuestion(qid: number) {
    return this.#mongoQuizData.findQuestion(qid);
  }

  async unlinkQuestionFromQuiz(subject: string) {
    return this.#mongoQuizData.unlinkQuestionFromQuiz(subject);
  }

  async findQuestionAnswer(qid: number) {
    return this.#mongoQuizData.findQuestionAnswer(qid);
  }

  async findQuestionType(qid: number) {
    return this.#mongoQuizData.findQuestionType(qid);
  }

  async findUser(email: string) {
    return this.#mongoQuizData.findUser(email);
  }

  async addUser(name: string, email: string, password: string, role: string) {
    return this.#mongoQuizData.addUser(name, email, password, role);
  }

  async checkQuesAns(subject: string, question: string, userAns: string) {
    return this.#mongoQuizData.checkQuesAns(subject, question, userAns);
  }
}

export const QuizDataServiceInstance = QuizDataService.getInstance();
