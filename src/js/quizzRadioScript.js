import {getAllPagesPoints} from "./pointsScript.js"


class QuizzRadio{
    constructor(index, button, pageName, correctAnswerShow, rightAnswer, radioOptions){
        this.index = index
        this.button = button
        this.pageName = pageName
        this.rightAnswer = rightAnswer
        this.radioOptions = radioOptions
        this.checkedOption = null
        this.correctAnswerShow = correctAnswerShow
    }

    blockPerPage(){
        getAllPagesPoints()
        let value = localStorage.getItem(pageName + '/quizzPoints' + `/${this.index}`)
        if (value){
            this.correctAnswerShow.style.display = 'inline'
            this.button.disabled = true
        }
    }

    constructButtonEventClick(){
        console.log(this.button)
        this.button.addEventListener('click', () => {
            console.log(this.button)
            this.button.disabled = true
            this.getCheckedOption()
            this.correctAnswerShow.style.display = 'inline'
            this.checkIfAnswerIsCorrect()
        })
    }

    checkIfAnswerIsCorrect(){
        if (this.checkedOption === this.rightAnswer){
            this.computingPoint(10)
        }
        else{
            this.computingPoint(0)
        }
    }

    getCheckedOption (){
        let arry = [...this.radioOptions]
        

        let test = arry.filter(elem => {
            return elem.checked === true
        })

        this.checkedOption = test[0].value
    }

    computingPoint(points){
        localStorage.setItem(pageName + '/quizzPoints' + `/${this.index}`, points)
        getAllPagesPoints()
    }
}

const pageName = window.location.pathname

let radioOptions1 = document.getElementsByClassName('options')
let correctAnswerShow = document.getElementsByClassName('correct-answer')
let radioOptions2 = document.getElementsByClassName('options-2')
let button = document.getElementsByClassName('quizz-button')


const QuizzOneRadio = new QuizzRadio(0, button[0], pageName, correctAnswerShow[0], 'option3', radioOptions1)
const QuizzTwoRadio = new QuizzRadio(1, button[1], pageName, correctAnswerShow[1], 'option1', radioOptions2)

QuizzOneRadio.blockPerPage()
QuizzOneRadio.constructButtonEventClick()


QuizzTwoRadio.blockPerPage()
QuizzTwoRadio.constructButtonEventClick()
