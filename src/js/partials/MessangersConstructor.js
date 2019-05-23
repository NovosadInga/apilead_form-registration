function MessangersConstructor(bl){
	this.BlockConstructorWrap = $('.messangers-constructor')
	this.BlockConstructor = $(bl);
	this.counter = null;
	this.ActiveBlockConstructor = null;
	this.BlockConstructorButtons = $(bl).find('.messangers-bl__button');
	this.Select = new MessangersSelect(this.BlockConstructor.find('.messangers'));
	this.MessangersBlockTemplate = 
		'\<div class="messangers-bl">\
			<div class="messangers-bl__button" data-state="add"></div>\
			<div class="input-bl messangers-wrap">\
					<div class="messangers">\
						<div class="messanger-active">\
						</div>\
						<div class="messangers-list">\
							<i class="messangers-list__icon"></i>\
						</div>\
					</div>\
					<input type="text" placeholder="">\
			</div>\
		</div>';
	this.initConstructor();
};

MessangersConstructor.prototype = {
	initConstructor: function(){
		var thas = this;
		this.BlockConstructorButtons.hide();
		this.BlockConstructorButtons.on('click', function(e) {
			var state = $(this).attr('data-state');
			if(state === 'add'){
				thas.BlockConstructor.after(thas.MessangersBlockTemplate);
				
				thas.BlockConstructor.find('.messangers-list').hide();
				var number = thas.addCounter();
				thas.ActiveBlockConstructor = thas.BlockConstructorWrap.children().last(); //новый блок

				var messanger = thas.BlockConstructor.find('.messangers-list .messanger').clone();
				thas.ActiveBlockConstructor.find('.messanger-active').append(messanger.eq(0));
				thas.ActiveBlockConstructor.find('input').attr('placeholder', messanger.eq(0).attr('data-placeholder'));
				if(messanger.length == 1 ){ //если один мессенджер
					thas.ActiveBlockConstructor.find('.messangers-list').hide(); // скрываем список мессенджеров
					thas.ActiveBlockConstructor.find('.messangers-bl__button').attr('data-state', 'delete'); // переворачиваем кнопку
				} else( //если мессенджеров несколько
					thas.ActiveBlockConstructor.find('.messangers-list').append(messanger.not(':first')) //добавляем все мессенджеры, кроме первого, в список мессенджеров
					)

				thas.ActiveBlockConstructor.addClass('messangers-bl_'+ number);
				new MessangersConstructor('.'+'messangers-bl_'+number);
				$(this).attr('data-state', 'delete');


			}
			if(state === 'delete'){
					thas.ActiveBlockConstructor = thas.BlockConstructorWrap.children().last(); // блок
					var a = thas.BlockConstructor.find('.messanger').eq(0);
					
					thas.ActiveBlockConstructor.find('.messangers-list').append(a);
					thas.BlockConstructor.remove();

			}
		
		}),
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

	},
	addCounter: function(){
		this.counter = this.BlockConstructorWrap.children().length
		return this.counter
	}
}
new MessangersConstructor('.messangers-bl')