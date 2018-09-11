var divs=document.querySelectorAll(".p_content_nameplate")
var body=document.createElement('div')
for (var i = 0; i < divs.length; i++) {
	body.appendChild(divs[i])
}
document.write(body.innerHTML)