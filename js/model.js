MVC.Model = class Persona {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.modelData = {};
    }

    getDataUsertByName(nombre_usuario) {

        return fetch(`${this.endpoint}/usuarios/buscar/${nombre_usuario}`)
            .then(resp => {
                if (resp.status == 200) {
                    return resp.json();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    getDataAllContacts() {
        return fetch(`${this.endpoint}/contactos`)
            .then(resp => {
                return (resp.ok) ? resp.json() : Error("No se pudieron obtener los datos");
            })
    }

    getDataContactByName(nombre_contacto) {

        return fetch(`${this.endpoint}/contactos/buscar/${nombre_contacto}`)
            .then(resp => {
                if (resp.status == 200) {
                    return resp.json();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    getDataContactById(id) {
        return fetch(`${this.endpoint}/contactos/${id}`)
            .then(resp => {
                if (resp.status == 200) {
                    return resp.json();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    saveContacto(data) {

        return fetch(`${this.endpoint}/contactos`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },

        });
    }
    updateContactoById(data) {

        return fetch(`${this.endpoint}/contactos/${data.id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },

        });
    }

    deleteContactById(id) {

        return fetch(`${this.endpoint}/contactos/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },

        });
    }




};