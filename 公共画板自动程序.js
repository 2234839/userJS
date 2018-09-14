var cav_=document.querySelector('canvas')
function huizhi(x,y){
	cav_.dispatchEvent(new MouseEvent('click',{
		clientX:x,
		clientY:y,
		bubbles: true,
		cancelable: true,
		view: window})
	)
}
var c_={x:10,y:123}

setInterval(function(){
	huizhi((c_.x+=10),c_.y)
	console.log(c_)
},5500)