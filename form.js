document.addEventListener("DOMContentLoaded", () => {

    // Creo un elemento input para que el usuario ingrese su Email.
    let correoE = document.getElementById("email");
    let nuevaLi = document.createElement('li');
    let nuevoLabel = document.createElement('label');
    nuevoLabel.for = "correoElectronico";
    nuevoLabel.innerText = "Ingrese su Email:";
    let nuevoInput = document.createElement('input');
    nuevoInput.name = "correoElectronico";
    nuevoInput.type = "email";
    nuevoInput.id = "correo";
    nuevaLi.appendChild(nuevoLabel);
    nuevaLi.appendChild(nuevoInput);
    correoE.appendChild(nuevaLi);

    let fechaSalida = document.querySelector("#fechaSalida");
    let fechaRegreso = document.querySelector("#fechaRegreso");

    // Se declara la función que emplea un condicional para obtener los días correspondientes de acuerdo a la fecha de salida y regreso.
    function diasDeViaticos() {
        let diaSalida = Number((fechaSalida.value.toString()).substring(8, 10));
        let diaRegreso = Number((fechaRegreso.value.toString()).substring(8, 10));
        let mesSalida = Number((fechaSalida.value.toString()).substring(5, 7));
        let mesRegreso = Number((fechaRegreso.value.toString()).substring(5, 7));
        let hourSalida = Number((fechaSalida.value.toString()).substring(11, 13));
        let hourRegreso = Number((fechaRegreso.value.toString()).substring(11, 13));
        let noCorresponde = () => {
            swal.fire({
                title: "No te corresponde el pago de viáticos",
                text: `Si la comisión duró más de 5 días, debes tramitar el viático por el Ministerio solicitando la autorización del Ministro.`,
                icon: "warning",
            })
        }
        if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida) && (hourSalida < 12 && hourRegreso > 18)) {
            return 0.5;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 1) && (hourSalida >= 12 && hourRegreso < 12)) {
            return 1;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 1) && ((hourSalida < 12 && hourRegreso < 12) || (hourSalida >= 12 && hourRegreso >= 12))) {
            return 1.5;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 1) && (hourSalida < 12 && hourRegreso >= 12)) {
            return 2;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 2) && (hourSalida >= 12 && hourRegreso < 12)) {
            return 2;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 2) && ((hourSalida < 12 && hourRegreso < 12) || (hourSalida >= 12 && hourRegreso >= 12))) {
            return 2.5;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 2) && (hourSalida < 12 && hourRegreso >= 12)) {
            return 3;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 3) && (hourSalida >= 12 && hourRegreso < 12)) {
            return 3;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 3) && ((hourSalida < 12 && hourRegreso < 12) || (hourSalida >= 12 && hourRegreso >= 12))) {
            return 3.5;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 3) && (hourSalida < 12 && hourRegreso >= 12)) {
            return 4;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 4) && (hourSalida >= 12 && hourRegreso < 12)) {
            return 4;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 4) && ((hourSalida < 12 && hourRegreso < 12) || (hourSalida >= 12 && hourRegreso >= 12))) {
            return 4.5;
        } else if ((mesSalida === mesRegreso) && (diaRegreso === diaSalida + 4) && (hourSalida < 12 && hourRegreso >= 12)) {
            return 5;
        } else {
            noCorresponde();
            deshabilitarBoton();
        }
    }

    // Se define la función para ocultar el botón liquidar cuando no corresponda el pago del viático.
    function deshabilitarBoton() {
        let borrarB = document.querySelector("#bt");
        let bot = 0;
        if (borrarB != null) {
            borrarB.disabled = bot == 0
        }
    }

    fetch('assets/dataProv.json')
        .then((resp) => resp.json())
        .then((data) => {
            const guardarObjRegiones = (clave, valor) => {
                localStorage.setItem(clave, valor);
            }
            guardarObjRegiones("noroeste", JSON.stringify(data[0]));
            guardarObjRegiones("noreste", JSON.stringify(data[1]));
            guardarObjRegiones("cuyo", JSON.stringify(data[2]));
            guardarObjRegiones("centro", JSON.stringify(data[3]));
            guardarObjRegiones("sur", JSON.stringify(data[4]));
            guardarObjRegiones("metropolitana", JSON.stringify(data[5]));
        })

    // Obtengo objeto del storage
    let noroesteString = localStorage.getItem("noroeste");
    let noresteString = localStorage.getItem("noreste");
    let cuyoString = localStorage.getItem("cuyo");
    let centroString = localStorage.getItem("centro");
    let surString = localStorage.getItem("sur");
    let metropolitanaString = localStorage.getItem("metropolitana");
    // Transformo string a objeto
    const noroeste = JSON.parse(noroesteString);
    const noreste = JSON.parse(noresteString);
    const cuyo = JSON.parse(cuyoString);
    const centro = JSON.parse(centroString);
    const sur = JSON.parse(surString);
    const metropolitana = JSON.parse(metropolitanaString);

    let lugarComision = document.querySelector("#provinciaComision");
    let montoViatico;

    // Se declara la función que emplea un condicional para obtener el monto de viático de acuerdo a los días y el valor según la región.
    function valorViatico() {
        let malLugar = () => {
            swal.fire({
                title: `Lugar de comisión \n Incorrecto!`,
                text: `Debes ingresar el nombre de la provincia o CABA`,
                icon: "warning",
                confirmButtonText: "Volver"
            })
        }
        let diasViaticos = diasDeViaticos();
        if ((noroeste.provincia.find(element => element === (lugarComision.value).toUpperCase())) === (lugarComision.value).toUpperCase()) {
            montoViatico = noroeste.valor * diasViaticos;
            return montoViatico;
        } else if ((noreste.provincia.find(element => element === (lugarComision.value).toUpperCase())) === (lugarComision.value).toUpperCase()) {
            montoViatico = noreste.valor * diasViaticos;
            return montoViatico;
        } else if ((cuyo.provincia.find(element => element === (lugarComision.value).toUpperCase())) === (lugarComision.value).toUpperCase()) {
            montoViatico = cuyo.valor * diasViaticos;
            return montoViatico;
        } else if ((centro.provincia.find(element => element === (lugarComision.value).toUpperCase())) === (lugarComision.value).toUpperCase()) {
            montoViatico = centro.valor * diasViaticos;
            return montoViatico;
        } else if ((sur.provincia.find(element => element === (lugarComision.value).toUpperCase())) === (lugarComision.value).toUpperCase()) {
            montoViatico = sur.valor * diasViaticos;
            return montoViatico;
        } else if ((metropolitana.provincia.find(element => element === (lugarComision.value).toUpperCase())) === (lugarComision.value).toUpperCase()) {
            montoViatico = metropolitana.valor * diasViaticos;
            return montoViatico;
        } else {
            malLugar();
        }
    }

    // Se crea la función sumar para obtener el total a pagar.
    function sumar(val1, val2, val3, val4, val5) {
        let resultado;
        resultado = val1 + val2 + val3 + val4 + val5;
        return resultado;
    }

    let gasto1 = document.getElementById("gasto1");
    let gasto2 = document.getElementById("gasto2");
    let gasto3 = document.getElementById("gasto3");
    let gasto4 = document.getElementById("gasto4");
    let botonMonto = document.getElementById("MontoTotal");
    let agentes = document.querySelector("#username");
    let motivoComision = document.querySelector("#motivoComision");
    let valorInput = document.getElementById("valueInput")

    // Se agrega el evento al botón "Total a pagar", el cual completará el monto y ejecutará la función "crearBoton()" siempre y cuando el resultado no sea NaN.
    botonMonto.addEventListener("click", () => {
        let montoAPagar = valorViatico();
        let total = sumar(Number(gasto1.value), Number(gasto2.value), Number(gasto3.value), Number(gasto4.value), montoAPagar);
        if (isNaN(total)) {
        } else {
            completarMotivo();
            valorInput.innerHTML = `$ ${total}`;
            console.log(`Hay que pagarle a ${agentes.value} la suma de ${total}`);
            crearBoton();
        }
    })

    // Mediante esta función se solicita al usuario que escriba el motivo de la comisión, si elige "Otro".
    const completarMotivo = () => {
        let motivoEnObs = () => {
            Swal.fire({
                text: 'Debes escribir el motivo de la comisión en \"Observaciones"',
                width: 400,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
        let otroMotivo = document.querySelector("#msg")
        if (motivoComision.value === "Otro") {
            otroMotivo.placeholder = "Debes ingresar el motivo de la Comisión"
            motivoEnObs();
            setTimeout(()=>{
                otroMotivo.placeholder = " ";
            },8000)
        }
    }

    let nuevoBoton = document.createElement("div")

    // El botón "Liquidar Viático" se crea si la sintaxis del correo electrónico es valida (según el patrón establecido).
    const crearBoton = () => {
        let errorEmail = () => {
            swal.fire({
                title: "Error",
                text: "La dirección de email no es valida",
                icon: "error",
            })
        }
        let email = document.getElementById("correo");
        let patron = new RegExp('^[a-zA-Z\.-_]{1,25}[@]{1}[a-zA-Z]{1,20}[\.]{1}[a-z.A-Z]{2,6}$')
        if (email.value.match(patron)) {
            nuevoBoton.innerHTML = "<button id=bt>Imprimir</button>"
            document.getElementById("botonLiquidar").appendChild(nuevoBoton);
        } else {
            errorEmail();
        }
    }

    // Creo eventos para que ante cada cambio en los valores ingresados por el usuario deshabilite el botón imprimir.
    fechaSalida.addEventListener('change', () => {
        deshabilitarBoton();
    })
    fechaRegreso.addEventListener('change', () => {
        deshabilitarBoton();
    })
    lugarComision.addEventListener('change', () => {
        deshabilitarBoton();
    })
    gasto1.addEventListener('change', () => {
        deshabilitarBoton();
    })
    gasto2.addEventListener('change', () => {
        deshabilitarBoton();
    })
    gasto3.addEventListener('change', () => {
        deshabilitarBoton();
    })
    gasto4.addEventListener('change', () => {
        deshabilitarBoton();
    })

    // Se crea el evento que imprime el formulario.
    let form = document.getElementById("formulario");
    form.addEventListener("submit", (x) => {
        x.preventDefault();
        window.print();
    })
})


