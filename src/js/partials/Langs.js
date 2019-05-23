/*begin конструктор переключения стран*/
function Langs(){
	this.LangsBlock = $('.js-langs');
	this.initLangs();
}
Langs.prototype ={
	initLangs: function(){
		this.changeCountry();
	},
	changeCountry: function(){
		this.LangsBlock.on("click", function(e) {
			$(this).toggleClass('langs-active')
		})
	}
}
var langs = new Langs
/*end конструктор переключения стран*/