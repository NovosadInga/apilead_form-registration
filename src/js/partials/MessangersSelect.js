function MessangersSelect(el){
	this.messangersBlock = el;
	this.messangersSelectArrow = null;
	this.messangersSelectElement = null;
	this.messangersList = null;
	this.messangerActive = null;
	this.inputMessanger = null;
	this.initMessanger();
}
MessangersSelect.prototype.getPropertysMessangersBL = function(el){
	this.messangersSelectArrow = el.find('.messangers-list__icon');
	this.messangersSelectElement = el.find('.messanger');
	this.messangersList = el.find('.messangers-list');
	this.messangerActive = el.find('.messanger-active');
	this.inputMessanger = el.siblings('input');
}
MessangersSelect.prototype.initMessanger = function(){
	var thas = this;
	//получаем значение свойств блока мессенджеров
	this.getPropertysMessangersBL(this.messangersBlock);
	//клик на кнопку, для показания/скрытия списка мессенджеров
	this.messangersSelectArrow.on('click', function(e) {
		thas.switchClassToMessangersList();
	});
	//клик на иконку мессенджера
	this.messangersSelectElement.on('click', function(e) {
		thas.checkMessangersElement(this, thas);
	});
}
MessangersSelect.prototype.checkMessangersElement = function(el, thas){
	//если клик на активный мессенджер и
	if($(el).parent().hasClass('messanger-active')){
		//блок с мессенджерами не скрыты
		if(thas.messangersBlock.hasClass('messangers_show')){
			//то скрываем его
			thas.switchClassToMessangersList();
		} else{
			//иначе ничего не делаем
			return false;
		}
		//если клик на не активный мессенджер
	} else{
		thas.selectMessanger(el, thas)
	};
}
MessangersSelect.prototype.selectMessanger = function(el, thas){
	thas.changeMessangerActive(el, thas); //изменяем активный месенджер
	thas.switchClassToMessangersList(); // скрываем блок с мессенджерами
}
MessangersSelect.prototype.setMessangerInputDate = function(el, thas){
	var placeholderValue = $(el).attr('data-placeholder');
	var nameValue = $(el).attr('data-name');
		thas.inputMessanger.attr('placeholder', placeholderValue);
		thas.inputMessanger.attr('name', nameValue);
		thas.inputMessanger.val("");
}
MessangersSelect.prototype.changeMessangerActive = function(el, thas){
	thas.setMessangerInputDate(el, thas); //устанавливаем нужный прейсхолдер и очищаем value
	thas.messangersList.append(thas.messangerActive.children().first());
	thas.messangerActive.append($(el));
}
MessangersSelect.prototype.switchClassToMessangersList = function(){
	this.messangersBlock.toggleClass('messangers_show');
}


