MVC.Controller = class Controller {
    constructor(props) {
        this.model = new props.model(props.endpoint);
        this.view = new props.view(props.contentElem);
    }

    login() {
        var nombre_usuario = document.getElementById('nombre_usuario').value;
        var password = document.getElementById('password').value;
        if(nombre_usuario != '' && password != '') {
            this.model.getDataUsertByName(nombre_usuario)
                .then(data => {
                    if (data != undefined) {
                        //this.view.status();
                        setTimeout(function(){ location.href = "index.html"; }, 1000);
                    } else {
                        console.log("Tus credenciales no son validas")
                    }
                })
                .catch(console.log);
        } else {
            console.log("Debes ingresar Usuario y contraseña");
        }
    }

    getAllContacts() {
        this.model.getDataAllContacts()
            .then(data => {
                this.view.allContacts(data);
            })
            .catch(console.log);
    }

    searchContact(e) {

        var nombre_contacto = document.getElementById('nombre_contacto').value;

        if (nombre_contacto != "") {

            this.model.getDataContactByName(nombre_contacto)
                .then(data => {
                    if (data != undefined) {
                        this.view.searchContacts(data);
                    } else {
                        this.view.searchContacts(data);
                    }
                })
                .catch(console.log);
        } else {
            this.model.getDataAllContacts()
                .then(data => {
                    this.view.allContacts(data);
                })
                .catch(console.log);
        }
    }

    getContactById() {

        const id = this.view.getViewIdContact();

        this.model.getDataContactById(id)
            .then(data => {
                if (data != undefined) {
                    this.view.contactById(data);
                } else {
                    this.view.errorNoFound();
                    this.view.showMessage("No existe este Usuario en la BD");
                }

            })
            .catch(console.log);
    }

    saveData(e) {

        const json = this.view.getViewData();

        var nombre_contacto = json.nombre_contacto;

        this.model.getDataContactByName(nombre_contacto)
            .then(data => {
                if (data != undefined) {

                    var r = confirm(`Ya existe ${nombre_contacto} lo quieres actualizar?`);
                    if (r == true) {
                        location.href = `editar.html?id=${data.id}`;
                    }

                } else {

                    var r = confirm(`Quieres guardar a ${nombre_contacto} como contacto?`);
                    if (r == true) {
                        this.model.saveContacto(json)
                            .then(res => {
                                if (res) {
                                    var r = confirm(`Se guardo a ${nombre_contacto} exitosamente, quieres crear un nuevo contacto?`);
                                    if (r == true) {
                                        this.view.elem.reset();
                                    } else {
                                        this.view.elem.reset();
                                        location.href = "index.html";
                                        return;
                                    }

                                }
                            })
                            .catch(error => {
                                this.view.showMessage(error);
                            });
                    }

                }
            })
            .catch(console.log);


    }

    updateData(e) {

        var r = confirm("Estas seguro de actualizar?");
        if (r == true) {

            const json = this.view.getViewData();

            this.model.updateContactoById(json)
                .then(res => {
                    if (res) {
                        this.view.showMessage("Se guardó tu información, gracias");
                        location.reload();
                        return;
                    }
                    this.view.showMessage("Algo sucedio, no se guardó correctamente");
                })
                .catch(error => {
                    this.view.showMessage(error);
                });

        }

    }

    deleteContactById(id) {

        this.model.getDataContactById(id)
            .then(data => {
                var r = confirm(`Estas seguro de eliminar ${data.nombre_contacto.toUpperCase()}?`);

                if (r == true) {
                    this.model.deleteContactById(data.id)
                        .then(res => {
                            if (res) {
                                this.view.showMessage("Contacto elimindo correctamente!!");
                                location.reload();
                            }
                        })
                        .catch(console.log);

                }
            })
            .catch(console.log);
    }
};