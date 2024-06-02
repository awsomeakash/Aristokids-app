const questionTypeSelect = ['Multiplication','Addition-Subtraction','Division','Playgorund'] 

const questionTypeSelectMapper:{[key: string]: string } = {
    'Multiplication': 'Multiplication',
    'Addition-Subtraction': 'Addition-Subtraction',
    'Division': 'Division',
    'Playgorund': 'PlaygroundHome',
}

export { questionTypeSelect, questionTypeSelectMapper }