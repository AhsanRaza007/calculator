function dom(){
    //get body from the DOM
    let container = document.querySelector('.container');



    //calculator div holds the calcutor components such as keys and display.
    let calculator = document.createElement('div');
    calculator.className = 'calculator';

    container.appendChild(calculator);

    //calculator display
    let display = document.createElement('div');
    display.className = 'calculator_display';
    display.innerHTML = '0';

    //container holds calculator buttons
    let calculatorKeys = document.createElement('div');
    calculatorKeys.className = 'calculator_keys'


    
    calculator.append(display, calculatorKeys)

    //function to create keys.
    let createkey = (dataKey, dataType) => {
        let key = document.createElement('button');
        key.setAttribute('data-key', dataKey);
        key.setAttribute('data-type', dataType);

        return key;
    }
    let operators = ['MS', 'MC', 'MR', '+', '-', '&times;', '÷', '%', 'C', 'AC', '='];


    //creating and appending key elemants onto the calculator-keys div
    operators.forEach((op)=>{
        let operator = createkey(op, 'operator')
        operator.innerHTML = op;
        calculatorKeys.appendChild(operator);
    })

    let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

    //creating and appending key elemants onto the calculator-keys div
    keys.forEach((n)=>{
        let key = createkey(n, 'number');
        key.innerHTML = n;
        calculatorKeys.appendChild(key);
    })
}

dom();