$(document).ready(function() {
	
	$chatbox = $("#chatbox");
	function init(){
		$.ajaxSetup({  
		    async : false
		});
		$chatbox.load("/robot/list",{});
	};
	
	init();
});