function removeChildOfDiv(myDiv){
      var holder = document.getElementById(myDiv);//the holder div
      while(holder.hasChildNodes()){
      holder.removeChild(holder.lastChild);
      }
}//function
// Documento JavaScript
// Esta función cargará las paginas
function llamarasincrono(url, id_contenedor){
	var pagina_requerida = false
	if (window.XMLHttpRequest) {// Si es Mozilla, Safari etc
		pagina_requerida = new XMLHttpRequest()
	} else if (window.ActiveXObject){ // pero si es IE
			try {
				pagina_requerida = new ActiveXObject("Msxml2.XMLHTTP")
			} 
			catch (e){ // en caso que sea una versión antigua
			try{
				pagina_requerida = new ActiveXObject("Microsoft.XMLHTTP")
			}
			catch (e){}
		}
	}
	else
		return false
	
	pagina_requerida.onreadystatechange=function(){ // función de respuesta
		cargarpagina(pagina_requerida, id_contenedor)
	}
	
	pagina_requerida.open('GET', url, true) // asignamos los métodos open y send
	pagina_requerida.send(null)
}
// todo es correcto y ha llegado el momento de poner la información requerida
// en su sitio en la pagina xhtml
function cargarpagina(pagina_requerida, id_contenedor){
if (pagina_requerida.readyState == 4 && (pagina_requerida.status==200 || window.location.href.indexOf("http")==-1))
document.getElementById(id_contenedor).innerHTML=pagina_requerida.responseText
}


function mensaje()
{
	alert("cambiando");
}

function verificaSeleccionRespuesta(numResp,myitem) {
var values="";
var element;
var form = document.encuesta;
//alert("llegando no.repsp = "+numResp);
var noclicked=1;
for (var i=0;i<numResp-1;i++) {
if (document.encuesta.respuesta[i].checked) { noclicked=0; }
}
if (noclicked==1) {alert('Selecciona una respuesta'); } 
else 
{	
	for(var i=0; i<form.elements.length; i++){
		for (var j=0;j<numResp-1;j++) 
		{
			if (document.encuesta.respuesta[j].checked)
						values+=form.elements[j].name+'='+URLEncode(form.elements[j].value)+'&';    
}//alert("objeto :"+form.elements[i].name+" valor: "+form.elements[i].value);
		values+=form.elements[i].name+'='+URLEncode(form.elements[i].value)+'&';    
}
	llamarasincrono('hola.php?id=2&'+values,myitem);}                                     
}


function URLEncode(str){
	var nocodify = "0123456789"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"abcdefghijklmnopqrstuvwxyz" +"-_.!~*'()";
	var HEX = "0123456789ABCDEF";
	var codified = "";
	for (var i = 0; i < str.length; i++ ) {
		var ch = str.charAt(i);
	    if(ch == " ")
			codified+="+";
		else if (nocodify.indexOf(ch) != -1)
		    codified += ch;
		else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255)
				codified += "+";
			else {
				codified += "%";
				codified += HEX.charAt((charCode >> 4) & 0xF);
				codified += HEX.charAt(charCode & 0xF);
			}//if
		}//if
	}//for
	return codified;
}//function


/*function changeSize(number,number) 
{ if (document.all) 
	{ element = document.all['textbody']; } 
 else { element = document.getElementById('textbody'); } 
 var startSize = 12; 
 var rateSize = 3; 
 var numRate = 5; 
 var startSizeLine = 15; 
 var rateSizeLine = 3; 
 var numRateLine = 5; 
 var strActual = element.style.fontSize; 
 var strLineActual = element.style.lineHeight; 
 var intActual = parseInt(strActual.substring(0, strActual.indexOf("px"))); 
 var intLineActual = parseInt(strLineActual.substring(0, strLineActual.indexOf("px"))); intActual += number; intLineActual += number; 
 if (intActual < (startSize + ( (numRate + 1) * rateSize) ) && intActual > startSize-1){ element.style.fontSize = intActual + "px"; } 
 if (intLineActual < (startSizeLine + ( (numRateLine + 1) * rateSizeLine) ) && intLineActual > startSizeLine-1){ element.style.lineHeight = intLineActual + "px"; } } */

