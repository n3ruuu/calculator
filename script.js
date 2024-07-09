let initialDisplay = '0'
let firstOperand = ''
let secondOperand = ''
let currentOperator = ''

const display = document.querySelector('#text')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('#clear')
const equal = document.querySelector('#equal')
const posNeg = document.querySelector('#pos-neg')
const percent = document.querySelector('#percentage')

equal.addEventListener('click', () => compute())
posNeg.addEventListener('click', () => toggleSign())
clear.addEventListener('click', () => clearAll())
percent.addEventListener('click', () => applyPercentage())

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        const value = e.target.textContent
        let currentText = display.textContent

        if (currentText.length < 9) {
            if (currentText === "-0" && value === '.') {
                display.textContent += value
            } else if (currentText === "0" && value !== '.') {
                display.textContent = value 
            } else if (value === '.') {
                if (!currentText.includes('.')) {
                    display.textContent += value
                }
            } else {
                display.textContent += value
            }
        }
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {      
        const sign = e.target.textContent
        if (firstOperand === '') {
            firstOperand = display.textContent
            display.textContent = initialDisplay 
        } else {
            display.textContent = initialDisplay
        }
        currentOperator = sign

        operators.forEach((op) => op.classList.remove('active'))  

        operator.classList.add('active')
    })
})


const toggleSign = () => {
    const textElement = document.getElementById('text')

    let currentValue = textElement.textContent
    if (currentValue.charAt(0) === '-') {
        textElement.textContent = currentValue.substr(1)
    } else {
        textElement.textContent = '-' + currentValue
    }
}

const operate = (num1, operator, num2) => {
    let answer
    switch (operator) {
        case '+': answer = parseFloat(num1) + parseFloat(num2); break
        case '-': answer = parseFloat(num1) - parseFloat(num2); break
        case 'x': answer = parseFloat(num1) * parseFloat(num2); break
        case '÷': answer = parseFloat(num1) / parseFloat(num2); break
        default: return
    }
    display.textContent = answer
    firstOperand = answer.toString()
    secondOperand = ''
    currentOperator = ''
}

const compute = () => {
    const num1 = firstOperand
    const num2 = display.textContent
    if (num1 !== '' && currentOperator !== '' && num2 !== '') {
        operate(num1, currentOperator, num2)
    }
    operators.forEach((op) => op.classList.remove('active'))
}

const applyPercentage = () => {
    let currentValue = parseFloat(display.textContent)
    currentValue = currentValue / 100
    display.textContent = currentValue.toString()
}

const clearAll = () => {
    display.textContent = (initialDisplay)
    firstOperand = ''
    secondOperand = ''
    currentOperator = ''
    operators.forEach((op) => op.classList.remove('active'))
}

const init = () => {
    display.textContent = (initialDisplay)
}

init()