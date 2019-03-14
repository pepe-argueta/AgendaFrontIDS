MVC.controllerInst = new MVC.Controller({
	model: MVC.Model,
	view: MVC.View,
	contentElem: document.querySelector('#contact_form'),
	endpoint: 'https://agenda-digital-ids.herokuapp.com/api'
})
