function RegistrationTabs(bl){
	this.RegistrationTabsBlock = $(bl);
	this.BtnTabs = $(bl).find('.js-tab');

	this.BlSteps = $(bl).find('.steps-tabs');
	this.BlStepsElements = this.BlSteps.children('.step');

	this.BlHelp = $(bl).find('.help-tabs');
	this.BlHelpElements = this.BlHelp.children();

	this.BlForm = $(bl).find('.form-tabs');
	this.BlFormElements = this.BlForm.children();
	this.number = 0;
	
	this.initTabsRegistration();
}
RegistrationTabs.prototype = {
	initTabsRegistration: function(){
		var thas = this;
		this.installTab(this.number);
		this.BtnTabs.on('click', function(e) {
			e.preventDefault();
			thas.number = thas.number+1;
			thas.installTab(thas.number);
			thas.BlSteps.children('.step').eq(thas.number-1).addClass('step-completed');
		});
		$(document).on('click','.step-completed', function(e) {
			thas.number = $(this).index('.step');
			thas.changeTab(thas.number, thas);
		});
	},
	changeTab: function(number, thas){
		thas.installTab(number);
			for(var i = number; i <= thas.BlSteps.children('.step').length; i++){
				thas.BlSteps.children('.step').eq(i).removeClass('step-completed');
			}
	},
	installTab: function(number){

	this.removeClassActiveAllTabs(this.BlStepsElements, this.BlHelpElements, this.BlFormElements);

		var tabSpet = this.BlStepsElements.eq(number);
		var tabHelp = this.BlHelpElements.eq(number);
		var tabForm = this.BlFormElements.eq(number);
		this.addClassActiveTab(tabSpet, tabHelp, tabForm);
	},
	addClassActiveTab: function(el1, el2, el3){
		$(el1).addClass('tab-active');
		$(el2).addClass('tab-active');
		$(el3).addClass('tab-active');
	},
	removeClassActiveAllTabs: function(tabs1, tabs2, tabs3){
		tabs1.removeClass('tab-active');
		tabs2.removeClass('tab-active');
		tabs3.removeClass('tab-active');
	}
}
