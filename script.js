//Get calculator_display from dom;
let calculator = document.querySelector('.calculator');
let display = calculator.querySelector('.calculator_display');

let keys = calculator.querySelector('.calculator_keys')
// let keys = document.querySelectorAll("[data-type='number']");
keys.addEventListener('click', event=>{

    if (!event.target.closest('button')) return;

    let keyPressed = event.target;
    const keyValue = keyPressed.textContent;
    const displayValue = display.textContent;
    const { key, type } = keyPressed.dataset;
    const { previousKeyType } = calculator.dataset;
    //console.log(previousKeyType);
    let lastKey = displayValue[displayValue.length-1];
    // console.log(lastKey, key, type);
    if(type === 'number'){
        if(displayValue === '0' || 
        previousKeyType === 'operator')
            display.textContent = keyValue;
        else {
            display.textContent = displayValue + keyValue;
        }
    }
    //change the data-first-number and data-operator
    if(type === 'operator' && keyValue !== '=' && keyValue !== 'C' && keyValue !== 'AC' && keyValue !== 'MS' && keyValue !== 'MC' && keyValue !=='MR'){
        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key;
    }
    //when the user presses '=' key, calculate the result using data-first-number, operator, and display value as second number.
    if(keyValue === '='){
        let firstNumber = calculator.dataset.firstNumber;
        let secondNumber = displayValue;
        let operator = calculator.dataset.operator;
        display.textContent = calculate(firstNumber, operator, secondNumber);
    }
    //when the user presses AC clear every data in the calculator except the memory storage
    if(keyValue === 'AC'){
        display.textContent = '0';
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.operator;
    }
    //delete one charachter from the currently displayed value.
    if(keyValue === 'C'){
        if(displayValue.length === 1){
            display.textContent = '0';
        }else{
            let secondNumber = displayValue;
            display.textContent = displayValue.substring(0, displayValue.length -1);
        }
    }
    //when user presses 'MS', save the value on the display onto local-storage
    if(keyValue === 'MS'){
        let numberToStore = displayValue;
        localStorage.setItem('storedNum', numberToStore);
    }
    //when user presses 'MR', read the saved number from memory(local-storage) and show on the display.
    if(keyValue === 'MR'){
        let storedNum = localStorage.getItem('storedNum');
        if(storedNum)
            display.textContent = storedNum;
        else
            display.textContent = '0';
    }
    //when user presses 'MC', delete number from memory(local-storage).
    if(keyValue === 'MC'){
        localStorage.removeItem('storedNum');
    }


    calculator.dataset.previousKeyType = type;
})

let calculate = (firstNumber, operator, secondNumber) => {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if(operator === '+') return (firstNumber + secondNumber);
    if(operator === '-') return (firstNumber - secondNumber);
    if(operator === '&times;') return (firstNumber * secondNumber);
    if(operator === '÷') return (firstNumber / secondNumber);
    if(operator === '%') return (firstNumber % secondNumber);
}


document.addEventListener('keypress',(e)=>{
    if(!Number.isInteger(parseInt(e.key)) && e.key !== '.'){
        alert("Not a Number");
    } else{
        let numCurr = parseInt(display.innerText + e.key)
        display.innerText = numCurr;
    }
})