import './index-start-element/index-start-element'  

const indexTop = document.getElementById('body')

document.addEventListener('DOMContentLoaded', async (e) => {
    indexTop.insertAdjacentHTML('afterbegin', `
        <index-start></index-start>
    `)
})