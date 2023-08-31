class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.placeHolder = ''
        this.clear()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.placeHolder = ''
        this.operator = undefined

        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        this.currentOperandTextElement.innerText = this.currentOperand
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.split(/\+|\-|\*|\÷/).slice(-1)[0].includes('.')) return
        this.currentOperand = (number.toString() === ".") ? this.currentOperand.toString() + number.toString() : (this.currentOperand.toString() === "0") 
        ? number.toString() : this.currentOperand.toString() + number.toString()
        this.currentOperandTextElement.innerText = this.currentOperand
    }

    chooseOperator(operator){
        if (this.currentOperand.toString() === '0') return
        // if (this.currentOperand.split("").slice(-1)[0] === "-" && operator.match(/\+|\-|\*|\÷/)) return
        // if (this.currentOperand.split("").slice(-1)[0].match(/\+|\*|\÷/) && operator.match(/\+|\*|\÷/)) return
    
        let computation
        const current = parseFloat(this.currentOperand.split(/\+|\-|\*|\÷/).slice(-1)[0])
        const placeHolder = parseFloat(this.placeHolder)
        console.log(this.currentOperand.split("").slice(-3))
        if (this.currentOperand.split("").slice(-3)[0].match(/\+|\-|\*|\÷/)) {
            console.log("hi")
            if (this.currentOperand.split("").slice(-2)[0] === "-") {
                this.currentOperand = this.currentOperand + operator
                switch (this.operator){
                    case '+':
                        computation = this.placeHolder + - current
                        break
                    case '-':
                        computation = this.placeHolder - - current
                        break
                    case '*':
                        computation = this.placeHolder * - current
                        break
                    case '÷':
                        computation = this.placeHolder / - current
                        break
                    default:
                        return
                }
            } else {
                this.operator = this.currentOperand.split("").slice(-2)[0].toString()
                this.currentOperand = this.currentOperand + operator
                switch (this.operator){
                    case '+':
                        computation = this.placeHolder + current
                        break
                    case '-':
                        computation = this.placeHolder - current
                        break
                    case '*':
                        computation = this.placeHolder * current
                        break
                    case '÷':
                        computation = this.placeHolder / current
                        break
                    default:
                        console.log("pass")
                        return
                    }
                }
            }   
        else if (this.currentOperand.split(/\+|\-|\*|\÷/).slice(-1)[0] === "") {
            console.log("why")
            this.currentOperand = this.currentOperand + operator
            computation = this.placeHolder
            operator = this.operator
        }
        else {
            console.log("how")
            this.currentOperand = this.currentOperand + operator
            if (isNaN(placeHolder)) {computation = current}
            else {
                switch (this.operator){
                    case '+':
                        computation = this.placeHolder + current
                        break
                    case '-':
                        computation = this.placeHolder - current
                        break
                    case '*':
                        computation = this.placeHolder * current
                        break
                    case '÷':
                        computation = this.placeHolder / current
                        break
                    default:
                        return
                }
            }
        }
        this.currentOperandTextElement.innerText = this.currentOperand
        this.placeHolder = computation
        this.operator = operator
    }

    reset() {
        this.currentOperand = this.placeHolder.toString()
        this.currentOperandTextElement.innerText = this.placeHolder
        this.previousOperandTextElement.innerText = this.placeHolder
        this.placeHolder = ''
        this.operator = undefined
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
    })
})

equalsButton.addEventListener('click', button => {
    calculator.chooseOperator(button.innerText)
    calculator.reset()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
})