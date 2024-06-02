import { questionTypeSelectMapper } from "./constants";

function naviagateToSelectedQuestionTypePage(questionCategory: string): string {
  return questionTypeSelectMapper[questionCategory];
}

export default naviagateToSelectedQuestionTypePage;