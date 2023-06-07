export function getAllPagesPoints (){ 
    const pointsElement = document.getElementById('user-points')

    const localStorageValues = Object.keys(localStorage)


    const allPointsPath = localStorageValues.filter(element => {
        return element.includes('quizzPoints')
    })

    const allPointsValues = allPointsPath.map(element => {
        return parseInt(localStorage[element])
    }) 

    let sum = allPointsValues.reduce((partialSum, a) => partialSum + a, 0)
    pointsElement.innerHTML = sum + ' pts'
    return sum
}

function settingYourPoints(){

    const yourPoints = document.getElementById('your-points')

    let sum = getAllPagesPoints()

    yourPoints.innerHTML = 'Seus pontos: ' + sum

}

const pageName = window.location.pathname
if (pageName.includes('pageFive.html')){
    settingYourPoints()
}

getAllPagesPoints()
