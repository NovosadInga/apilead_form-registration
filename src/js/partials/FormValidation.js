function FormValidation(bl){
	this.form = $(bl);
	this.inputsBl = $(bl).find('.input-bl');
	this.formBtn = $(bl).find('.btn');
	this.sucessBtn = $(bl).find('.js-success');
	this.inputs = $(bl).find('input');
	this.tabs == null;

	this.initForm();
}
FormValidation.prototype = {
	initForm: function(){
		var thas = this;
		this.inputs.not('[type=radio]').val('');
		this.formBtn.attr('disabled', true);

		this.checkInput(thas);
		this.submitForm(thas);
		if(this.form.attr('id') == 'form-registration'){
			this.tabs = new RegistrationTabs('.registration-tabs'); 
			this.tabs.BtnTabs.on('click', function(){
				if($("#webmoney").attr('disabled')&& thas.inputs.not(":last").val()){
					thas.sucessBtn.attr('disabled', false);
				}
			}) 

		};


	},
	sucessForm: function(wrap){
		var counter = 0,
			 el = wrap.find('.input-bl'),
			 btn = wrap.find('.btn');

		el.each(function(el, i){
			if ($(this).hasClass("input-success") || $(this).hasClass("valid-ok")){
				return;
			} else{
				counter += 1;
			}
		});
		if(!counter){
			btn.attr('disabled', false);
		} else{
			btn.attr('disabled', true);
		}
	},
	checkValidation: function(input, thas){
		var value = input.val(),
			block = input.parents('.input-bl'),
			name = input.attr('name'),
			wrap = input.parents('.input-wrap');


				if(name === "account-name"){
					thas.formBtn.eq(0).attr('disabled', false);
					if(value === 'advertiser'){
						$("#webmoney").parents('.input-bl').hide();
						$("#webmoney").attr('disabled', true);
					};
					if(value === 'webmaster'){
						$("#webmoney").parents('.input-bl').show();
						$("#webmoney").attr('disabled', false);
					}
					return false;
				}
				else if(name === "skype" || name === "vk" || name === "telegram" || name === "phone"){
					return false;
				}

				else{
					var message = thas.getTextError(value,name)
					thas.claerErrorBlock(block);
						if(message){
							block.removeClass('input-success');
							thas.addErrorBlock(message, block);
						} else{
							thas.claerErrorBlock(block);
							block.addClass('input-success');
						};
					thas.sucessForm(wrap);
				};
	},
	checkInput: function(thas){
		this.inputs.each(function(el, i){

			$(this).on('input blur', function(e){
				thas.checkValidation($(this), thas);
			});
			$(this).on('focus', function(e){
				thas.inputsBl.removeClass('input-focus');
				var block = $(this).parents('.input-bl');
				block.addClass('input-focus');
				thas.sucessForm($(this).parents('.input-wrap'));
			})

	});
	},

	addErrorBlock: function(message, block){
		var errorBl = '<div class="input-error__message">'+message+'</div>'

		block.addClass('input-error');
		block.append(errorBl);
	},
	claerErrorBlock: function(block){
		block.removeClass('input-error');
		$('.input-error__message').remove();
	},
	getTextError: function(value, name){

		if(!value){
			return 'Это поле обязательно';
		};

		if(name === "login-name" || name === "restore-email" || name === "email"){
			var patternMail = /.+@.+\..+/i;
			if(patternMail.test(value)){
				//Если соответствует строка формату email адреса - валидно, подчеркиваем белой рамкой
				return false;
			} else {
				return 'Адрес электронной почты должен быть в формате "name@domain.com"';
			}
		};

		if(name === "login-password" || name === "password"){
			if(value.length >= 6){
				return false;
			} else{
				return 'Не менее 6 символов';
			}
		}

		if(name === "password-confirm"){
			var nameLogin = $('#password').val();
			if(value === nameLogin){
				return false;
			} else{
				return 'Пароли не совпадают';
			}
		}

		if(name === "webmoney"){
			var patternWebmoney = /^[Rr]\d{12}$/;
				if(patternWebmoney.test(value)){
					return false;
			} else {
				return 'Кошелек должен иметь символ "R" + 12 цифр';
			}
		}
	},
	submitForm: function(thas){
		thas.sucessBtn.click(function(e) {
			e.preventDefault();

			var form_id = 'form_id=' + thas.form.attr('id');
			var form_message = form_id+'&'+thas.form.serialize();

			console.log(form_message);

			if (thas.sucessBtn.attr('disabled') == 'disabled') return;
			var data = {
				"status": "error",
				"form_id": "form-registration",
				"error": {
					"email": "В этом поле ошибка",
					"password": "В этом поле ошибка",
					"webmoney": "В этом поле ошибка"
				}
			};
			var answer = $.parseJSON(JSON.stringify(data));
					if(answer.status === 'ok') {
						if(answer.form_id === 'form-restore'){
							$(location).attr('href','success.html');
						}else{
							$(location).attr('href','index.html');
						}
					} else if(answer.status === 'error'){
						var number = $('.form-tabs__item').last().index();  //индекс последнего таба
						$.each(answer.error, function( key, value ) {
							thas.inputs.each(function(el, i){
								if($(this).attr('name') === key){
									var block = $(this).parents('.input-bl');
									
									if(answer.form_id === 'form-registration'){
										var el = $(this).parents('.form-tabs__item'); //таб с ошибкой
										var tabs = thas.tabs;
										var numberNew = $('.form-tabs__item').index(el); //индек таба, на котором ошибка


										if(numberNew < number){ //если индекс последнего таба менье индекса текущего
											number = numberNew; //меняем индекс 
										}
										tabs.number = number;
										tabs.installTab(tabs.number);
									}
									block.removeClass('input-success');
									block.parents('.input-wrap').find('.btn').attr('disabled', true);
									thas.addErrorBlock(value, $(this).parents('.input-bl'));
								} else{

								}
							})
						});
					}
				/*$.ajax({
				url: '###',
				type: 'POST',
				data: form_message,
				success: function (data, textStatus, jqXHR) {
					
				},
				error: function (jqXHR, textStatus, errorThrown) {

				}
			})*/
		})
	}
}

	var AutorisationForm = new FormValidation('#form-login');
	var RestoreForm = new FormValidation('#form-restore');
	var RestoreForm = new FormValidation('#form-registration');


