const questionTypeSelect = [
    'Multiplication',
    'Addition-Subtraction',
    'Division',
    'Playgorund',
];

const questionTypeSelectMapper: { [key: string]: string } = {
    Multiplication: 'MultiplicationHome',
    'Addition-Subtraction': 'AddSubHome',
    Division: 'DivisionHome',
    Playgorund: 'PlaygroundHome',
};

const storageKeyType: { [key: string]: string } = {
    Multiplication: 'mulFormData',
    'Addition-Subtraction': 'addSubFormData',
    Division: 'divFormData',
    Playgorund: 'formData',
};

export { questionTypeSelect, questionTypeSelectMapper, storageKeyType };
