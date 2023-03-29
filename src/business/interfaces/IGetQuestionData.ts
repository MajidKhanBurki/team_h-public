/**
 * The interface that all question data sources will adhere to
 */

import IQuestion from "../models/IQuestion";

export default interface IGetQuestionData {
    findQuestion: (qid: number) => Promise<IQuestion | null>;
    findQuestionType: (qid: number) => Promise<string | null>;
    findQuestionAnswer:(qid:number)=> Promise<string | null>; 
     }
  