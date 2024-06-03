
export function makeQuestionPage(formData:any) {
    // console.log("Make Question formData",formData)
    if(formData.QuestionCategory === 'pla') {
       return PlaygorundLogic(formData)
    }
    if(formData.QuestionCategory ==='mul') {
       return MultiplicationLogic(formData)
    }
}

function PlaygorundLogic(formData:any) {
    const nums = [`+ ${Math.floor(Math.random() * (10 ** parseInt(formData.numberOfDigits))).toString()}`];
    const operations = convertOperatorSymbol(formData.operations);
    let total = parseInt(nums[0].split(' ')[1]);

    for (let i = 1; i <= parseInt(formData.numberOfRows)-1; i++) {
        let operation = operations.length !== 0 ? operations[Math.floor(Math.random() * operations.length)] : '+';
        let number = Math.floor(Math.random() * (10 ** parseInt(formData.numberOfDigits)));
        
        if (operation === '÷') {
            // Ensure number divides total fully
            while (total % number !== 0) {
                number = Math.floor(Math.random() * (10 ** parseInt(formData.numberOfDigits)));
            }
        }

        nums.push(`${operation} ${number.toString()}`);
        
        // Update total based on operation and number
        switch (operation) {
            case '+':
                total += number;
                break;
            case '-':
                total -= number;
                break;
            case 'X':
                total *= number;
                break;
            case '÷':
                total /= number;
                break;
        }
    }

    const questionArr = [{
        Question: nums,
        Answer: total
    }];

    console.log(questionArr);
    return questionArr;
}

function MultiplicationLogic(formData:any) {
    const multiplicand = Math.floor(Math.random() * (10 ** parseInt(formData.numberOfdigitMultiplicand)))
    const multiplier = Math.floor(Math.random() * (10 ** parseInt(formData.numberOfdigitMultiplier)))
    const answer = multiplicand * multiplier;
    const questionArr = [{
        Question: `${multiplicand} X ${multiplier}`,
        Answer: answer
    }];
    console.log("Question Array is ",questionArr);
    return questionArr;
}

function convertOperatorSymbol(operations:[string]) {
    return operations.map((item) => {
        switch (item.toLowerCase()) {
            case 'addition':
                return '+';
            case 'subtraction':
                return '-';
            case 'multiplication':
                return 'X';
            case 'division':
                return '÷';
            default:
                return item;
        }
    });
}

export function showQuestionTime(questionPaperArr:any, index:any) {
    return questionPaperArr[index];
}

