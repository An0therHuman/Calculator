function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1/num2;
}

function operate(num1, num2, operator){
    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;   
        case '/':
            return divide(num1,num2);
        default:
            console.log('Something went wrong!')        
    }
}

const buttons = document.querySelectorAll('button');
for (i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', isOperator);
}
const input = document.querySelector('#input');
const ans = document.querySelector('#ans')
let userInput = '';
let answer;
let noMultiDivide = [];
let temp;
let text;
function isOperator(e){
    // console.log(e.target.textContent);
    if (e.target.textContent == '.'){
        if (input.textContent.length == 0){
            userInput = '0.'
            input.textContent = userInput;
        }else{
            text = userInput.split(' ');
            // console.log(text)
            // console.log(text[text.length-1].indexOf('.'))
            if (text[text.length-1].indexOf('.') == -1){
                if (text[text.length-1] ==''){
                    userInput += '0.';
                    input.textContent = userInput;
                }else{
                    userInput += '.';
                    input.textContent = userInput;
                }
            }
        }
    }else if (!e.target.classList.contains('noDisplay') && !e.target.classList.contains('operator')){
        // input.textContent += e.target.textContent;
            userInput += e.target.textContent;
            input.textContent = userInput;
    }else if (!e.target.classList.contains('noDisplay')){
        // input.textContent += ` ${e.target.textContent} `
        if (input.textContent.length != 0){
            if (userInput.charAt(userInput.length-1) != ' '){
                userInput += ` ${e.target.textContent} `;
                input.textContent = userInput;
            }else{
                userInput = userInput.slice(0,userInput.length-3);
                userInput += ` ${e.target.textContent} `;
                input.textContent = userInput;
            }
        }
    }else if(e.target.id == 'equal'){
        text = userInput.split(' ')
        // console.log(userInput)
        // console.log(text)
        let start;
        let previousValue;
        // if (text[1] != '×'){
        //     start = Number(text[i-1]);
        // }
        for(i = 0; i < text.length; i++){
            switch(text[i]){
                case '×':
                    if (text[i-2]!= '×'){
                        start = Number(text[i-1]);
                        temp = multiply(start, Number(text[i+1]));
                        previousValue = temp;
                    }else{
                        start = previousValue;
                        temp = multiply(start, Number(text[i+1]));
                        previousValue = temp;
                    }
                    noMultiDivide.pop()
                    noMultiDivide.push(temp);
                    i++
                    break;   
                case '÷':
                    if (Number(text[i+1]) != 0){
                        if (text[i-2]!= '÷'){
                            start = Number(text[i-1]);
                            temp = divide(start, Number(text[i+1]));
                            previousValue = temp;
                        }else{
                            start = previousValue;
                            temp = divide(start, Number(text[i+1]));
                            previousValue = temp;
                        }
                        noMultiDivide.pop()
                        noMultiDivide.push(temp);
                        i++
                    }else{
                        noMultiDivide.push('Calculation failed.');
                        i = text.length;
                    }
                    break;
                default:
                    noMultiDivide.push(text[i]);       
            }  
        }
        start = Number(noMultiDivide[0]);
        if (!noMultiDivide.includes('Calculation failed.')){
            for(i =0; i<noMultiDivide.length; i++){
                if (noMultiDivide.includes('+') || noMultiDivide.includes('-')){
                    switch(text[i]){
                        case '+':
                            answer = add(start,Number(noMultiDivide[i+1]));
                            start = answer;
                            break;
                        case '-':
                            answer = subtract(start,Number(noMultiDivide[i+1]));
                            start = answer;
                            break;
                    }
                }else{
                    answer = noMultiDivide[0];
                }
            }
        }else{
            answer = 'Calculation failed.';
        }
        // console.log(noMultiDivide)
        ans.textContent = answer;
        // console.log(answer)
    }else if(e.target.id == 'clear'){
        userInput = '';
        input.textContent = '';
        answer = null;
        ans.textContent = answer;
        noMultiDivide = [];
        temp = null;
        text = null;
    }else if(e.target.id == 'backspace'){
        if (input.textContent.charAt(input.textContent.length -1) == ' '){
            input.textContent = input.textContent.slice(0,-3);
            userInput = userInput.slice(0,-3);
        }else{
            input.textContent = input.textContent.slice(0,-1);
            userInput = userInput.slice(0,-1);
        }
    }
    
}