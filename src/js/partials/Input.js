function InputBlock(bl){
	this.InputBl = $(bl);
	this.Input = this.InputBl.find('input');

	this.initInputBlock();
}
InputBlock.prototype = {
	initInputBlock: function(){
		var thas = this;
		this.focusInput(this.InputBl);
	},
	focusInput: function(bl){
		$(document).on('focus','.input-bl input' ,function(e){
			$(this).parents('.input-bl').addClass('input-focus');
		});
		$(document).on('blur','.input-bl input' ,function(e){
			$(this).parents('.input-bl').removeClass('input-focus');
		})
	}
}


