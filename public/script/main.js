
let togglePopup = () =>{
    const popup = document.querySelector('#popup-overlay')
    popup.classList.toggle('open')
    // popup.classList.add('open')

}
let wateringTogglePopup = () =>{
    const popup = document.querySelector('#watering-popup-overlay')
    popup.classList.toggle('open')
    // popup.classList.add('open')

}
const wateringPopup = document.querySelector('.notif')
wateringPopup.addEventListener('click', () =>{
    const nextWateringsDrop = document.querySelector('.nextWaterings')
    nextWateringsDrop.classList.add('nextWaterings-open')

})
const closedWateringPopup = document.querySelector('#popup-exit')
closedWateringPopup.addEventListener('click', () =>{
    nextWateringsDrop = document.querySelector('.nextWaterings')
    nextWateringsDrop.classList.remove('nextWaterings-open')
})