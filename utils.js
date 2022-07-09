export const inicioLogin = (e, usuarios, elementoDOM) => {
    e.preventDefault()
    let user = usuarios.find((usuario) => {
        return (usuario.login).includes(elementoDOM[0].value)
    })
    let error1 = () => {
        swal.fire({
            title: "Error",
            text: "Usuario no registrado",
            icon: "error",
        })
    }
    let error2 = () => {
        swal.fire({
            title: "Error",
            text: "Usuario o contrasena incorrecta",
            icon: "error",
        })
    }
    user == undefined ? error1() :
        user.validar(elementoDOM[0].value, elementoDOM[1].value) ? window.open("formulario.html") :
            error2();
}