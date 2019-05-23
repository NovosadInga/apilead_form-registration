function MessangersConstructor(bl){
	this.BlockConstructorWrap = $('.messangers-constructor')
	this.BlockConstructor = bl;
	this.BlockConstructorButtons = $(bl).find('.messangers-bl__button');
	this.Select = new MessangersSelect(this.BlockConstructor.find('.messangers'));
	this.MessangersBlockTemplate = '<div class="messangers-bl">'+this.BlockConstructor.html() +'</div>'
	this.initConstructor();
};

MessangersConstructor.prototype = {
	initConstructor: function(){
		var thas = this;
		this.BlockConstructorButtons.hide();
		this.BlockConstructor.on('click',this.BlockConstructorButtons, function(e) {
			var state = $(this).attr('data-state');
			
			if(state === 'add'){
				thas.BlockConstructor.after(thas.MessangersBlockTemplate);
				thas.BlockConstructor.find('.messangers').removeClass('messangers_show');
				thas.BlockConstructor.find('.messangers-list');
				$(this).attr('data-state', 'delete');
				var active = thas.BlockConstructorWrap.children().last(); //новый блок
				var firstEl = active.find('.messanger-active').children();
				var El = active.find('.messangers-list .messanger').first();

				active.find('.messangers-list').append(firstEl);
				firstEl.hide();
				active.find('.messanger-active').append(El);
				active = new MessangersConstructor(active);
				counter =+ 1;
				
			}
			if(state === 'delete'){
			var a = thas.BlockConstructor.find('.messanger-active .messanger').attr('data-placeholder');
			console.log(a)
			thas.BlockConstructorWrap.children().last().find('[data-placeholder = '+a+']').show();
			console.log(thas.BlockConstructorWrap.children().last().find('data-placeholder', a));
			thas.BlockConstructor.remove();
			thas.initConstructor();
			}
		
		});
		this.BlockConstructor.on('input blur', function (e){
			//если в input есть хотябы один символ или блок не последний
			if($(this).find('input').val()||$(this).next().length != 0){ 
				//показываем кнопку
				thas.BlockConstructorButtons.show(400);
			} else {
				//скрываем кнопку
				thas.BlockConstructorButtons.hide(400);
			}
		})
	}
}
new MessangersConstructor($('.messangers-bl_1'))