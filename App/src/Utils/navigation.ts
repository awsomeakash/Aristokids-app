import { questionTypeSelectMapper } from "./constants";

function naviagateToSelectedQuestionTypePage(questionCategory: string): string {
    console.log("Objedct comming form constant:: ", questionTypeSelectMapper);
    console.log("Sending to navigate::", questionTypeSelectMapper[questionCategory])
  return questionTypeSelectMapper[questionCategory];
}

export default naviagateToSelectedQuestionTypePage;