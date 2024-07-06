// script du menu burger//
const burger = document.querySelector('#burger')
const newMenu = document.querySelector('.newMenu')
burger.addEventListener('click', ()=>{
   burger.style.display = 'none'
   newMenu.style.display = 'flex'

   let background = document.createElement('div')
   background.classList.add('backgroundDim')
   document.querySelector('body').appendChild(background)
   background.addEventListener('click', () => {
       background.remove()
       burger.style.display = 'flex'
       newMenu.style.display = 'none'
   })
})