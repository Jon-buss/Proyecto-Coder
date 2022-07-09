import * as data from './data.js'
import * as funciones from './utils.js'

window.addEventListener('load', () => {
    let form = document.getElementById('login')
    form[2].addEventListener('click', (e) => {
        funciones.inicioLogin(e, data.usuarios, form);
    })
})
