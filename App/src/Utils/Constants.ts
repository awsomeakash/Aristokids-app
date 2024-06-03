const questionTypeSelect = ['Multiplication','Addition-Subtraction','Division','Playgorund'] 

const questionTypeSelectMapper:{[key: string]: string } = {
    'Multiplication': 'MultiplicationHome',
    'Addition-Subtraction': 'AddSubHome',
    'Division': 'Division',
    'Playgorund': 'PlaygroundHome',
}

export { questionTypeSelect, questionTypeSelectMapper }