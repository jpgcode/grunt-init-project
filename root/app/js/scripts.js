"use strict";

var message = "JS up and running";

var project = {
	init: function(){
		console.log(message);
	}
}

//jQuery init
$(function(){
	project.init();
});
