import {getAllPagesPoints} from "./pointsScript.js"


class QuizzRanger {
    constructor(index, input, value, arrowElement, rightValue, button, pageName){
        this.index = index
        this.input = input
        this.value = value
        this.arrowElement = arrowElement
        this.rightValue = rightValue
        this.button = button
        this.pageName = pageName
    }

    blockPerPage(){
        getAllPagesPoints()
        let value = localStorage.getItem(pageName + '/quizzValue' + `/${this.index}`)
        if (value){
            this.input.disabled = true
            this.button.disabled = true
            this.value.innerHTML = value
            this.input.value = 1500
            this.arrowElement.style.display = 'inline'
            this.rightValue.style.display = 'inline'
        }
    }

    constructInputChangeEvent(){
        this.input.addEventListener('change', () => {
            this.value.innerHTML = this.input.value < 1000 ? this.input.value + ' Mi' : (this.input.value / 1000) + ' Bi'            
        })
    }

    constructButtonClickEvent(){

        this.button.addEventListener('click', () => {
            this.input.disabled = true
            this.button.disabled = true
            this.arrowElement.style.display = 'inline'
            this.rightValue.style.display = 'inline'
            

            const rightValue = this.rightValue.innerHTML.split(' ')
            const test = rightValue[1] === 'Bi' ? parseInt(rightValue[0] * 1000) : parseInt(rightValue[0])
    
            let difference = this.input.value - test
            let positiveDifference = difference < 0 ? difference * -1 : difference

            let maxValue = parseInt(this.input.max) + parseInt(this.input.min) 

            if(positiveDifference <= maxValue * 0.10){
                this.computingPoint(10)
            } 
            else if (positiveDifference <= maxValue * 0.20){
                this.computingPoint(5)
            }
            else{
                this.computingPoint(0)
            }
        })
    }

    computingPoint(points){
        localStorage.setItem(pageName + '/quizzValue' + `/${this.index}`, this.value.innerHTML)
        localStorage.setItem(pageName + '/quizzPoints' + `/${this.index}`, points)
        getAllPagesPoints()
    }
}

const pageName = window.location.pathname

let input = document.getElementsByClassName('quizz-range-slider')
let value = document.getElementsByClassName('quizz-range-value')
let arrowElement = document.getElementsByClassName('quizz-range-arrow')
let rightValue = document.getElementsByClassName('quizz-range-right-value')
let button = document.getElementsByClassName('quizz-button')

function getQuizzes(range){
    let arry = [...Array(range).keys()]
    let elements = arry.map(element => {
        let newQuizz = new QuizzRanger(element, input[element], value[element], arrowElement[element], rightValue[element], button[element], pageName)
        newQuizz.blockPerPage()
        newQuizz.constructInputChangeEvent()
        newQuizz.constructButtonClickEvent()
        return newQuizz
    });
}

getQuizzes(2)


