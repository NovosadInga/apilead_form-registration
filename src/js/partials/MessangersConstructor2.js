function MessangersConstructor(bl){
	this.BlockConstructorWrap = $('.messangers-constructor')
	this.BlockConstructor = bl;
	this.BlockConstructorButtons = $(bl).find('.messangers-bl__button');
	this.Select = new MessangersSelect(this.BlockConstructor.find('.messangers'));
	this.InputBl = $(bl).find('input');
	this.initConstructor();
};

MessangersConstructor.prototype = {
	initConstructor: function(){
		var thas = this;
		/*console.log(this.Select.messangersBlock);*/
		this.checkInpur(this.InputBl, this.BlockConstructorButtons);
		this.controlBlocksConstructor(thas);
		this.BlockConstructor.on('input blur', function (e){
			thas.checkInpur(thas.InputBl, thas.BlockConstructorButtons);
		})


	},
	checkInpur: function(InputBl, btn){
		//если в input есть хотябы один символ или блок не последний
		if(InputBl.val() || InputBl.next().length != 0){ 
			//показываем кнопку
			btn.show();
		} else {
			//скрываем кнопку
			btn.hide();
			}
	},

	controlBlocksConstructor: function(thas){
		$('body').on('click', '.messangers-bl', function(e){
			if(thas.Select.messangersBlock.hasClass('messangers_show')){
				thas.BlockConstructorButtons.hide()
			} else{
				thas.checkInpur(thas.InputBl, thas.BlockConstructorButtons)
			}
		});
		$('body').on('click','.messangers-bl__button', function(e) {
			var state = $(this).attr('data-state');

			if(state === 'add'){ //если нажато кнопку добавить
				thas.addNewBlock(thas, false); //добавляем новый блок

				//firstMessanger - первый видимый месенджер со списка
				var firstMessanger = thas.Select.messangersList.find('.messanger:visible').first();
				// делаем firstMessanger активным мессенджером блока конструктора
				thas.Select.changeMessangerActive(firstMessanger, thas.Select);
				// скрыываем последний мессенджер
				thas.Select.messangersList.find('.messanger').last().hide();


				//если в блоке конструкторе остался один выдимый мессенджер
				if(thas.BlockConstructor.find('.messanger:visible').length === 1){
					thas.addLastNewBlock(thas);
				}
				thas.InputBl.val(''); //стираем value в блоке конструкторе
				thas.BlockConstructorButtons.hide(); //скрываем кнопку дабавать/удалить
			}

			if(state === 'delete'){//если нажато кнопку удалить
				thas.BlockConstructor.show();

				//если в блоке конструкторе остался один выдимый мессенджер
				if(thas.BlockConstructor.find('.messanger:visible').length === 1){
					thas.removeLastAddedBlock(thas);
				};

				var btn = $(this)
				thas.removeAddedBlock(btn, thas);
			}
		});
	},

	addNewBlock: function(thas, number){ //функция добавления нового блока конструктора
		var newBlock = thas.BlockConstructor.clone(); //клонируем блок конструктора
		var	newInput = newBlock.find('inut');

			newBlock.find('.messangers-list').remove();//удаляем из него список мессенджеров
			newBlock.find('.messangers-bl__button').attr('data-state', 'delete');//кнопка удалить блок
			if(number){
				newBlock.find('.messangers-bl__button').hide();
			}
			thas.BlockConstructor.before(newBlock); //добавляем новый элемент перед блоком конструктора
			

	},
	addLastNewBlock: function(thas){
		thas.addNewBlock(thas, true);//добавляем еще один новый блок
		thas.BlockConstructor.hide(); //и скрываем блок конструктор
	},

	removeAddedBlock: function(btn,thas){
		// deletedMessanger - удаляемый мессенджер
		var deletedMessanger = btn.parent().find('.messanger').attr('data-placeholder');

		btn.parent().remove(); //удаляем блок с мессенджером, на котором нажато
		//делаем видимым удаленный мессенджер в блоке конструкторе
		thas.BlockConstructor.find('[data-placeholder = '+ deletedMessanger +']').show();
	},

	removeLastAddedBlock: function(thas){
		var value = thas.BlockConstructor.prev().find('input').val();
		//если блок перед блоком конструктором содержи value
		if(value){
			thas.InputBl.val(value);
			thas.checkInpur(thas.InputBl, this.BlockConstructorButtons);
		}
		thas.BlockConstructor.prev().remove();
	}
}
new MessangersConstructor($('.messangers-bl'))