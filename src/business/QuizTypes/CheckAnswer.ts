import { Question } from "./Question";

import MongoQuizData from "../../data/dbconnection";


var mongoQuizData = new MongoQuizData();

export class CheckAnswer extends Question {
    private _options: string[];

    constructor(qid:number,question: string, answer: string, subject: string, type: string, options: string[]) {
        super(qid,question, answer, subject, type);
        this._options = options;
    }

    public get options(): string[] {
        return this._options;
    }

    public set options(options: string[]) {
        this._options = options;
    }

    public isCorrect(answer: string): boolean {


        this._type = mongoQuizData.findQuestionType(this._qid);
        this._answer = mongoQuizData.findQuestionAnswer(this._qid);

        if (this._type === "MultipleChoice"){

            return this._options.includes(answer) && answer === this._answer;
        }

        else if(this._type === "MultipleAnswer"){
        
            const correctAnswers = this._answer.split(',').map(answer => answer.trim());

            return correctAnswers.every(correctAnswer => this._options.includes(correctAnswer));
        }

        else{

            return answer === this._answer;
        }
        
      }
}