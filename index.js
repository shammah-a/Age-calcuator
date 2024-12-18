let form = document.getElementById("form")
let dayInput = document.getElementById("day")
let monthInput = document.getElementById("month")
let yearInput = document.getElementById("year")
let dayAlert = document.getElementById("day-alert")
let monthAlert = document.getElementById("month-alert")
let yearAlert = document.getElementById("year-alert")
let inactiveModal = document.getElementById("inactive")
let activeContainer = document.getElementById("active-container")
let ageContainer = document.getElementById("bottom")


let ageDetails = []


//form validation
function validateInput(input, alert, max, message) {
    let value = input.value
    if (value.length === 0) {
        alert.style.visibility = "visible"
        alert.textContent = `Put in your birth ${message}`
        input.style.border = "2px solid #e80000"
    } else if (value.match(/[^\d.%]/g)) {
        alert.style.visibility = "visible"
        alert.textContent = "Only numbers allowed"
        input.style.border = "2px solid #e80000"
    } else if (value > max) {
        alert.style.visibility = "visible"
        alert.textContent = `${message.charAt(0).toUpperCase() + message.slice(1)} can't exceed ${max}`
        input.style.border = "2px solid #e80000"
    } else {
        alert.style.visibility = "hidden"
        input.style.border = "2px solid #38b000"
    }
}

//validation to keyup
dayInput.addEventListener("keyup", () => validateInput(dayInput, dayAlert, 31, "day"))
monthInput.addEventListener("keyup", () => validateInput(monthInput, monthAlert, 12, "month"))
yearInput.addEventListener("keyup", () => validateInput(yearInput, yearAlert, 2024, "year"))


//submit form
form.addEventListener("submit", function(event){
    getAgeValues(event)
})

function getAgeValues(event){
    event.preventDefault()

    let dayValue = dayInput.value
    let monthValue = monthInput.value
    let yearValue = yearInput.value

    const ageOL = {
        userDay : dayValue,
        userMonth : monthValue,
        userYear : yearValue
    }

    ageDetails.push(ageOL)
    localStorage.setItem("userDetails", JSON.stringify(ageDetails))
    form.reset()
    fetchString()
    
}

function fetchString(){
    if(localStorage.getItem("userDetails")){
        ageDetails = JSON.parse(localStorage.getItem("userDetails"))
    }
    displayAge()
}

fetchString()


function displayAge(){
     activeContainer.innerHTML = ""
     
    if(ageDetails.length > 0){
        inactiveModal.style.display = "none"
    }

    let latestAge = ageDetails[ageDetails.length - 1] 

    let currentDay = new Date().getDate() 
    let currentMonth = new Date().getMonth() + 1 
    let currentYear = new Date().getFullYear()

    let dayDisplay = currentDay - latestAge.userDay
    let monthDisplay = currentMonth - latestAge.userMonth
    let yearDisplay = currentYear - latestAge.userYear
      
    
    if (dayDisplay < 0) {
            monthDisplay--
            dayDisplay += 30
    }
    if (monthDisplay < 0) {
            yearDisplay--
            monthDisplay += 12
    }

    let activeDiv = document.createElement("div")
    activeDiv.classList.add("active")

    let yearPara = document.createElement("p")
    yearPara.innerHTML = `<span class="highlight">${yearDisplay}</span> years`

    let monthPara = document.createElement("p")
    monthPara.innerHTML = `<span class="highlight">${monthDisplay}</span> months`

    let dayPara = document.createElement("p")
    dayPara.innerHTML = `<span class="highlight">${dayDisplay}</span> days`


    activeDiv.append(yearPara, monthPara, dayPara)
    activeContainer.append(activeDiv)
    ageContainer.append(activeContainer)


}
