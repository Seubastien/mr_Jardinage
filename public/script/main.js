
const togglePopup = () => {
    const popup = document.querySelector('#popup-overlay')
    popup.classList.toggle('open')
    // popup.classList.add('open')

}
const wateringTogglePopup = () => {
    const popup = document.querySelector('#watering-popup-overlay')
    popup.classList.toggle('open')
}
const checkDateWatering = (setDate) => {
    console.log("onchange");
    const dateNow = new Date()
    const selectedDate = new Date(setDate)
    const addWateringFormContent = document.querySelector('#addWateringFormContent')
    const dateError = document.createElement('p')
    const button = document.querySelector('#button')
    dateError.classList.add('dateError')
    if (selectedDate < dateNow) {
        addWateringFormContent.appendChild(dateError)
        dateError.textContent = "Veuillez programmer une date postérieure à aujourd'hui"
        button.classList.add('disable')

    } else {
        dateError.textContent = ""
        button.classList.remove('disable')
        
        
    }
    // addWateringFormContent.removeChild(dateError)
    // dateError.textContent = ""
}

const wateringPopup = document.querySelector('.notif')
wateringPopup.addEventListener('click', () => {
    const nextWateringsDrop = document.querySelector('.nextWaterings')
    nextWateringsDrop.classList.add('nextWaterings-open')

})
const closedWateringPopup = document.querySelector('#popup-exit')
closedWateringPopup.addEventListener('click', () => {
    nextWateringsDrop = document.querySelector('.nextWaterings')
    nextWateringsDrop.classList.remove('nextWaterings-open')
})