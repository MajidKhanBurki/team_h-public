/**
 * The interface that all question data sources will adhere to
 */

import Question from "../models/Question";

export default interface IGetQuestionData {
    findQuestion: (qid: number) => Promise<Question | null>;
    findQuestionType: (qid: number) => Promise<string>;
    findQuestionAnswer:(qid:number)=> Promise<string>; 
     }
  