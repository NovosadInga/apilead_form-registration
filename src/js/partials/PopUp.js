function PopUp(){
	this.PopUpLink = $('.js-open-popup'); //кнопка/линк для открытия попапа
	this.PopUpClose = $('.js-popup-close');//кнопка закрытия попапа
	this.ParentLink = null; //родительский блок с которого открыли попап
	this.ParentClose = null;//родительский блок с которого закрыти попап

	this.initPoPup();
}
PopUp.prototype = {
	initPoPup: function(){
		var thas = this;
		this.openPopUp(thas);
		this.closePopUp(thas);

	},
	openPopUp: function(thas){
		this.PopUpLink.on('click', function(e){
			e.preventDefault();
			var id = '#'+$(this).attr('data-popup');
				thas.ParentLink = $(this).parents('.popup-parent');
			if(thas.ParentLink.hasClass('show-popup')){
				thas.ParentLink.removeClass('show-popup');
			}
			thas.ParentLink.addClass('hide-bl');
			$(id).addClass('show-popup');
		})
	},
	closePopUp: function(thas){
		this.PopUpClose.on('click', function(e){
			thas.ParentClose = $(this).parents('.popup-parent');
			thas.ParentLink.removeClass('hide-bl');
			thas.ParentClose.removeClass('show-popup');
		})
	}

}
new PopUp();