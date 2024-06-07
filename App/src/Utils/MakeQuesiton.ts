
export function makeQuestionPage(formData: any) {
    // console.log("Make Question formData",formData)
    if (formData.QuestionCategory === 'pla') {
        return PlaygorundLogic(formData)
    }
    if (formData.QuestionCategory === 'mul') {
        return MultiplicationLogic(formData)
    }
    if (formData.QuestionCategory === 'div') {
        return DivisionLogic(formData)
    }
}

function PlaygorundLogic(formData: any) {
    const nums = [`+ ${Math.floor(Math.random() * (10 ** parseInt(formData.numberOfDigits))).toString()}`];
    const operations = convertOperatorSymbol(formData.operations);
    let total = parseInt(nums[0].split(' ')[1]);

    for (let i = 1; i <= parseInt(formData.numberOfRows) - 1; i++) {
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
            case 'x':
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

function MultiplicationLogic(formData: any) {
    const multiplicand = Math.floor(Math.random() * (10 ** parseInt(formData.numberOfdigitMultiplicand)))
    const multiplier = Math.floor(Math.random() * (10 ** parseInt(formData.numberOfdigitMultiplier)))
    const answer = multiplicand * multiplier;
    const questionArr = [{
        Question: `${multiplicand} X ${multiplier}`,
        Answer: answer
    }];
    console.log("Question Array is ", questionArr);
    return questionArr;
}

function DivisionLogic(formData: any) {
    const numberOfQuestions = parseInt(formData.numberOfQuestions);
    const numberOfdigitDividend = parseInt(formData.numberOfdigitDividend);
    const numberOfdigitDivisor = parseInt(formData.numberOfdigitDivisor);
    const questionArr = [];

    for (let i = 0; i < numberOfQuestions; i++) {
        let divisor, dividend;
        let attempts = 0;
        
        // Generate a random divisor with the specified number of digits or less
        do {
            divisor = Math.floor(Math.random() * (10 ** numberOfdigitDivisor));
        } while (divisor < 1 || divisor >= 10 ** numberOfdigitDivisor);

        // Calculate the range for the multiple to ensure the dividend has the specified number of digits
        const minMultiple = Math.ceil(10 ** (numberOfdigitDividend - 1) / divisor);
        const maxMultiple = Math.floor((10 ** numberOfdigitDividend - 1) / divisor);

        // Generate a random multiple within the valid range
        let multiple;
        do {
            multiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple;
            dividend = divisor * multiple;
            attempts++;
            if (attempts > 100) {
                console.error("Unable to find valid dividend after 100 attempts. Skipping question.");
                break;
            }
        } while (dividend.toString().length !== numberOfdigitDividend);

        if (attempts > 100) continue; // Skip this iteration if the loop broke due to too many attempts

        const answer = dividend / divisor;
        questionArr.push({
            Question: `${dividend} ÷ ${divisor}`,
            Answer: answer
        });
    }

    console.log("Question Array is", questionArr);
    return questionArr;
}




function convertOperatorSymbol(operations: [string]) {
    return operations.map((item) => {
        switch (item.toLowerCase()) {
            case 'addition':
                return '+';
            case 'subtraction':
                return '-';
            case 'multiplication':
                return 'x';
            case 'division':
                return '÷';
            default:
                return item;
        }
    });
}

export function showQuestionTime(questionPaperArr: any, index: any) {
    return questionPaperArr[index];
}

