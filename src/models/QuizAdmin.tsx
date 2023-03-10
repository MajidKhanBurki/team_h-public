/**
 * Defining types for the fields of a Quiz of Admins
 */
export interface Quiz {
    id: number;
    name: string;
    subject: string;
    type: string;
    marks:string;
    time:string;
    quizTakers:number;
    Attempts:number;
}