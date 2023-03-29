import { MongoClient } from "mongodb";
import Quiz, { UserQuiz } from "../business/models/Quiz";
import Question from "../business/models/Question";
import Student from "../business/models/Student";
import IGetQuizData from "../business/interfaces/IGetQuizData";
import IGetQuestionData from "../business/interfaces/IGetQuestionData";

/*
 * Concrete class that implements IGetQuizData and serves up data from MongoDB
 */
export default class MongoQuizData implements IGetQuizData, IGetQuestionData {
  async findQuiz(id: string) {
    const client = new MongoClient(this.uri);
    var quiz: Quiz | null = null;
    try {
      await client.connect();

      const database = client.db("test");
      const quizzes = database.collection("quizes");

      const query = { subject: id };

      const result = await quizzes.findOne(query);
      quiz = JSON.parse(JSON.stringify(result));
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return quiz;
    }
  }

  async findAllQuizzes() {
    const client = new MongoClient(this.uri);
    var quizzes: Quiz[] | null = null;
    try {
      await client.connect();

      quizzes = await client
        .db("test")
        .collection<Quiz>("quizes")
        .find({})
        .toArray();
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return quizzes;
    }
  }

  async findQuizzesTakenByUser(name: string) {
    const client = new MongoClient(this.uri);
    //use an array to populate UserQuizes
    var userQuizzes = Array<UserQuiz>();

    try {
      await client.connect();

      //first get the quiz subjects that the user has taken. Refer: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/project/
      var dummyUser = {
        id: 0,
        name: "dummyname",
        lastname: "dummylastname",
        username: "dummyusername",
        email: "dummyemail",
        password: "dummypassword",
        role: "dummyrole",
        quizzes: [{ subject: "Math", marks: 101 }],
      };

      var dummyQuiz = {
        id: 0,
        name: "DummyMathQuiz",
        subject: "Math",
        type: "DummyType",
        maxMarks: 0,
        time: 0,
      };
      var user: Student =
        (await client
          .db("test")
          .collection<Student>("users")
          .findOne({ name: name })) ?? dummyUser;
      for (let q in user.quizzes) {
        var quiz: Quiz =
          (await this.findQuiz(user.quizzes[q].subject)) ?? dummyQuiz;
        userQuizzes.push({
          id: quiz.id,
          subject: quiz.subject,
          name: quiz.name,
          marks: user.quizzes[q].marks,
        } as UserQuiz);
      }
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return userQuizzes;
    }
  }

  async findQuestion(qid: number) {
    const client = new MongoClient(uri);
    var question: Question | null = null;
    try {
      await client.connect();

      const database = client.db("test");
      const questions = database.collection("questions");

      const query = { qid: qid };

      const result = await questions.findOne(query);
      question = JSON.parse(JSON.stringify(result));
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return question;
    }
  }

  async findQuestionAnswer(qid: number) {
    const client = new MongoClient(uri);
    var question: Question | null = null;
    var answer: string;
    try {
      await client.connect();

      const database = client.db("test");
      const questions = database.collection("questions");

      const query = { subject: qid };

      const result = await questions.findOne(query);
      question = JSON.parse(JSON.stringify(result));
      answer = question?.answer;

    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return answer;
    }
  }

  async findQuestionType(qid: number) {
    const client = new MongoClient(uri);
    
    var question: Question | null = null;
    var type: string;
    try {
      await client.connect();

      const database = client.db("test");
      const questions = database.collection("questions");

      const query = { subject: qid };

      const result = await questions.findOne(query);
      question = JSON.parse(JSON.stringify(result));
      type = question?.type;
      
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return type;
    }
  }
}
