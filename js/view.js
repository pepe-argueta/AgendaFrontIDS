MVC.View = class View {
    constructor(elem) {
        this.elem = elem;
        this.handlerAllContacts();
        this.handlerContactById();
        this.handlerSearchContactByName();
    }

    allContacts(data) {
        const onLoadDataContacts = new CustomEvent("onLoadDataContacts", { detail: data, bubbles: true });
        this.elem.dispatchEvent(onLoadDataContacts);
    }

    handlerAllContacts() {

        document.body.addEventListener('onLoadDataContacts', (event) => {
            var contacts = event.detail;
            var tbody = document.getElementById('tbody-contacts');
            tbody.innerHTML = '';
            for (let key in contacts) {
                var row = tbody.insertRow(key);
                var fields = Object.keys(contacts[key]);
                fields.forEach(field => {
                    if (field != 'id') {
                        const cell = row.insertCell();
                        cell.innerHTML = contacts[key][field].toUpperCase();
                    }

                });

                var cell = row.insertCell();
                cell.innerHTML = `<a href="editar.html?id=${contacts[key]['id']}" class="waves-effect waves-light btn-small blue"><i class=" large material-icons">edit</i></a>`;
                var cell = row.insertCell();
                cell.innerHTML = `<a onclick=MVC.controllerInst.deleteContactById(${contacts[key]['id']}); class="waves-effect waves-light btn-small red"><i class=" large material-icons">delete</i></a>`;
            }
        });

    }

    searchContacts(data) {
        const onLoadSearchDataContacts = new CustomEvent("onLoadSearchDataContacts", { detail: data, bubbles: true });
        this.elem.dispatchEvent(onLoadSearchDataContacts);
    }

    handlerSearchContactByName() {

        document.body.addEventListener('onLoadSearchDataContacts', (event) => {

            var contacts = event.detail;
            var tbody = document.getElementById('tbody-contacts');

            if (contacts) {
                tbody.innerHTML = '';
                var row = tbody.insertRow();
                var fields = Object.keys(contacts);
                fields.forEach(field => {
                    if (field != 'id') {
                        const cell = row.insertCell();
                        cell.innerHTML = contacts[field].toUpperCase();
                    }
                });
                var cell = row.insertCell();
                cell.innerHTML = `<a href="editar.html?id=${contacts['id']}" class="waves-effect waves-light btn-small blue"><i class=" large material-icons">edit</i></a>`;
                var cell = row.insertCell();
                cell.innerHTML = `<a onclick=MVC.controllerInst.deleteContactById(${contacts['id']}); class="waves-effect waves-light btn-small red"><i class=" large material-icons">delete</i></a>`;
            } else {
                tbody.innerHTML = '<tr><td class="text-center" colspan="8">No se encontraron datos</td></tr>';
            }
        });

    }

    getViewIdContact() {

        const cadVariables = location.search.substring(1, location.search.length);
        const arrVariables = cadVariables.split("&");
        const id = arrVariables[0].substring(3, 6);
        return id;

    }

    contactById(data) {
        const onLoadDataContactById = new CustomEvent("onLoadDataContactById", { detail: data, bubbles: true });
        this.elem.dispatchEvent(onLoadDataContactById);

    }

    handlerContactById() {

        document.body.addEventListener('onLoadDataContactById', (event) => {

            var datos = event.detail;
            for (let key in datos) {
                this.setDataInputsForm(key, datos, function(value, elem, prop) {
                    elem[prop] = value;
                }, 'key');
            }

        });
    }

    setDataInputsForm(key, model, callbackResult, valueField) {

        const nodeFields = this.elem.querySelectorAll(`[name='${key}']`);

        if (nodeFields.length > 0) {

            let value = nodeFields[0].value;

            if (valueField === 'key') {
                value = (key == 'id') ? model[key] : model[key].toUpperCase();
            }

            callbackResult(value, nodeFields[0], "value");
        }
    }

    getViewData() {

        var myForm = document.getElementById('contact_form');
        const formEntries = new FormData(myForm).entries();
        const json = Object.assign(...Array.from(formEntries, ([x, y]) => ({
            [x]: y
        })));

        return json;
    }

    errorNoFound() {
        var body = document.getElementById('contenido-contacto');
        body.innerHTML = `
				<my-error></my-error>
  			`;
    }

    status() {
        var body = document.getElementById('status');
        body.innerHTML = `
				<my-status-login></my-status-login>
  			`;
    }

    showMessage(msg) {
        alert(msg);
    }
};