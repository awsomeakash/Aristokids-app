import { questionTypeSelectMapper, storageKeyType } from './Constants';

function naviagateToSelectedQuestionTypePage(questionCategory: string): string {
    return questionTypeSelectMapper[questionCategory];
}

export function getStorageKey(questionCategory: string): string {
    console.log('getStorageKey :::::: ', storageKeyType[questionCategory]);
    return storageKeyType[questionCategory];
}
export default naviagateToSelectedQuestionTypePage;
