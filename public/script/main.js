
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
    let dateError = document.querySelector('#dateError')
    const button = document.querySelector('#button')
  
    if (selectedDate < dateNow) {
        dateError.textContent = "Veuillez programmer une date postérieure à aujourd'hui";
        button.classList.add('disable');
    } else {
       
            dateError.textContent = ''
        button.classList.remove('disable');
    }
};


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