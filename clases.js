export class User{
    constructor(login,pass){
        this.login=login
        this.pass=pass
    }
    validar = (usuario,password) =>{
        return (usuario===this.login && password === this.pass)
    }
}

/*
class zona {
        constructor(region, valor) {
            this.region = region.toUpperCase();
            this.valor = parseFloat(valor);
            this.provincia = [];
        }
        agregarProvincia(provincias) {
            this.provincia.push(provincias);
        }
    }
*/