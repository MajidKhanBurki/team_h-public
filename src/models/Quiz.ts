/**
 * Contains fields pertaining to all kinds of quizzes
 */
export default interface Quiz {
  id: number;
  name: string;
  subject: string;
}

/**
 * An extension of the Quiz interface that adds a marks attribute specific to the user who took that quiz
 */
export interface UserQuiz extends Quiz {
  marks: number;
}
