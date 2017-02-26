$(function(){
	$('#slider0').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 0,
			val: ev.value,
		});
	});
	$('#slider1').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 1,
			val: ev.value,
		});
	});
	$('#slider2').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 2,
			val: ev.value,
		});
	});
	$('#slider3').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 3,
			val: ev.value,
		});
	});
	$('#slider4').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 4,
			val: ev.value,
		});
	});
	$('#slider5').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 5,
			val: ev.value,
		});
	});
	$('#slider6').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 6,
			val: ev.value,
		});
	});
	$('#slider7').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 7,
			val: ev.value,
		});
	});
	$('#slider8').slider().on('slideStop', function(ev){
		$.post( "/set", {
			channel: 8,
			val: ev.value,
		});
	});
});
