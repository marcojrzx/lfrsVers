//	Variables usadas para los class de los objetos
var InvalidInput = "#FF8080";
var validInput = "#FFFFFF";

/*		Inicio de validacion de formularios		*/
function checkData1(formulario){
var f1 = document.forms[0];
var wm = "Ocurrieron los siguientes Errores :\n\r\n";
var noerror = 1;
/*		Inicio de validacion nueva-cita.php	
	if( formulario=="AltaCita" ){
	  var t1 = f1.medico;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar un medico\r\n";
	    noerror = 0;
		document.getElementById("medico").style.backgroundColor = InvalidInput;
	  }else{
		document.getElementById("medico").style.backgroundColor = validInput;
	  }
	  var t1 = f1.cliente;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar un paciente\r\n";
	    noerror = 0;
		document.getElementById("cliente").style.backgroundColor = InvalidInput;
	  }else{
		document.getElementById("cliente").style.backgroundColor = validInput;
	  }	  
	  var t1 = f1.fechaCita;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar la fecha de la cita\r\n";
	    noerror = 0;
		celda=document.getElementById("fechaCita");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("fechaCita");
		celda.className="validInput";
	  }
	  var t1 = f1.horaini;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar la hora de la cita\r\n";
	    noerror = 0;
		document.getElementById("horaini").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("horaini").style.backgroundColor=validInput;
	  }
	  var t1 = f1.minini;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar los minutos de la cita\r\n";
	    noerror = 0;
		document.getElementById("minini").style.backgroundColor = InvalidInput;
	  }else{
		document.getElementById("minini").style.backgroundColor = validInput;
	  }
	var t1 = document.getElementsByName("Radio");
	  if ( !t1[0].checked && !t1[1].checked ) {
	    wm += "Debe seleccionar AM o PM\r\n";
	    noerror = 0;
		  
		for(i=0;i<t1.length;i++){
			t1[i].style.backgroundColor = InvalidInput;
		}		
	  }else{
		for(i=0;i<t1.length;i++){
			t1[i].style.backgroundColor = validInput;
		}
	  }
	}
		Termino de validacion nueva-cita.php	*/
/*		Inicio de validacion nuevo-paciente.php		
	if( formulario=="AltaPaciente" || formulario=="EditarPaciente" ){
	  var t1 = f1.nombre;
	  if ( isBlank( t1.value ) ) {	  	
	    wm += "Debe ingresar el nombre del paciente\r\n";
	    noerror = 0;
		celda=document.getElementById("nombre");
		celda.className= "invalidInput";
	  }else{
		celda=document.getElementById("nombre");
		celda.className="validInput";
	  }
	  var t1 = f1.apellidos;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar los apellidos del paciente\r\n";
	    noerror = 0;
		celda=document.getElementById("apellidos");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("apellidos");
		celda.className="validInput";	  	
	  }
	  var t1 = f1.telefono;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar el numero telefonico\r\n";
	    noerror = 0;
		celda=document.getElementById("telefono");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("telefono");
		celda.className="validInput";	  	
	  }
	  var t1 = f1.celular;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "El celular debe ser numerico\r\n";
			noerror = 0;
			celda=document.getElementById("celular");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("celular");
			celda.className="validInput";	  	
		  }	  	  
	  }
	  var t1 = f1.direccion;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar la direccion\r\n";
	    noerror = 0;
		celda=document.getElementById("direccion");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("direccion");
		celda.className="validInput";	  	
	  }
	  var t1 = f1.fechaNacimiento;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar la fecha de nacimiento\r\n";
	    noerror = 0;
		celda=document.getElementById("fechaNacimiento");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("fechaNacimiento");
		celda.className="validInput";	  	
	  }
	  var t1 = document.getElementsByName("genero");
	  if ( !t1[0].checked && !t1[1].checked ) {
	    wm += "Debe seleccionar el genero\r\n";
	    noerror = 0;
		for(i=0;i<t1.length;i++){
			t1[i].style.backgroundColor = InvalidInput;
		}
	  }else{
		for(i=0;i<t1.length;i++){
			t1[i].style.backgroundColor = validInput;
		}
	  }
	}
		Fin de validacion nuevo-paciente.php		*/	
/*		Inicio de validacion nuevo_usuario.php y editar-usuario.php		*/	
	if( formulario=="AltaUsuario" || formulario=="EditarUsuario" ){
	  var t1 = f1.nombre;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar el nombre de usuario\r\n";
	    noerror = 0;
		celda=document.getElementById("nombre");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("nombre");
		celda.className="validInput";	  	
	  }
	  var t1 = f1.apellidos;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar el(los) apellido(s) del usuario\r\n";
	    noerror = 0;
		celda=document.getElementById("apellidos");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("apellidos");
		celda.className="validInput";	  	
	  }	  
	  var t1 = f1.tipoUser;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar el tipo de usuario\r\n";
	    noerror = 0;
		celda=document.getElementById("tipoUser");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("tipoUser");
		celda.className="validInput";	  	
	  }
	  var t1 = f1.celular;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "El celular debe ser numerico\r\n";
			noerror = 0;
			celda=document.getElementById("celular");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("celular");
			celda.className="validInput";	  	
		  }	  	  
	  }
	  var t1 = f1.usuario;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe ingresar un nombre de usuario al sistema\r\n";
	    noerror = 0;
		celda=document.getElementById("usuario");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("usuario");
		celda.className="validInput";	  	
	  }
	  var t1 = f1.password;
	  var t2 = f1.passwordConfirm;	  
	  if ( ( isBlank( t1.value ) || isBlank( t2.value ) ) && formulario=="AltaUsuario" ) {
	    noerror = 0;
		if( isBlank( t1.value ) && isBlank( t2.value ) ){
		    wm += "Debe ingresar la contrase�a y confirmarla\r\n";			
			celda=document.getElementById("password");
			celda.className="invalidInput";
			celda=document.getElementById("passwordConfirm");
			celda.className="invalidInput";			
		}else if( isBlank( t1.value ) ){
		    wm += "Debe ingresar una contrase�a\r\n";
			celda=document.getElementById("password");
			celda.className="invalidInput";
			t2.className="validInput";
		}else{	
		    wm += "Debe confirmar la contrase�a\r\n";		
			celda=document.getElementById("passwordConfirm");
			celda.className="invalidInput";			
			t1.className="validInput";			
		}
	  }else{
		if( t1.value!=f1.passwordConfirm.value){
			wm += "La contrase�as no son coincidentes, favor de verificarlo \r\n";
			noerror = 0;
			celda=document.getElementById("password");
			celda.className="invalidInput";
			celda=document.getElementById("passwordConfirm");
			celda.className="invalidInput";
		}else{
			celda=document.getElementById("password");
			celda.className="validInput";			
		}
	  }	  
	}
/*		Fin de validacion nuevo_usuario.php y editar-usuario.php		*/	
/*		Inicio de validacion receta.php - Agregar medicamento				*/
	if( formulario=="AgregarMedicamento" ){
	  var t1 = f1.medicinaDesc;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe elegir un medicamento\r\n";
	    noerror = 0;
		celda=document.getElementById("medicinaDesc");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("medicinaDesc");
		celda.className="validInput";
	  }
	  var t1 = f1.viaAdmon;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar la via de administracion\r\n";
	    noerror = 0;
		document.getElementById("viaAdmon").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("viaAdmon").style.backgroundColor=validInput;
	  }
//	Todo esto es una validacion tanto para el text como el drop-down que estan juntos	  
	  var t1 = f1.indicacionesQty;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "La indicacion debe ser numerica\r\n";
			noerror = 0;
			celda=document.getElementById("indicacionesQty");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("indicacionesQty");
			celda.className="validInput";	  	
		  }	  	  
	  }else{
			wm += "La indicacion no debe ser un campo vacio\r\n";
			noerror = 0;
			celda=document.getElementById("indicacionesQty");
			celda.className="invalidInput";		  
	  }
	  var t1 = f1.indicacionPresentacion;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar el tipo de indicacion\r\n";
	    noerror = 0;
		document.getElementById("indicacionPresentacion").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("indicacionPresentacion").style.backgroundColor=validInput;
	  }
//	Termina validacion para este par
//	Todo esto es una validacion tanto para el text como el drop-down que estan juntos	  
	  var t1 = f1.intervaloQty;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "El intervalo debe ser numerico\r\n";
			noerror = 0;
			celda=document.getElementById("intervaloQty");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("intervaloQty");
			celda.className="validInput";	  	
		  }	  	  
	  }else{
			wm += "Debe ingresar cada cuanto se ingiera el medicamento\r\n";
			noerror = 0;
			celda=document.getElementById("intervaloQty");
			celda.className="invalidInput";		  
	  }
	  var t1 = f1.intervaloTime;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar el tipo de intervalo\r\n";
	    noerror = 0;
		document.getElementById("intervaloTime").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("intervaloTime").style.backgroundColor=validInput;
	  }
//	Termina validacion para este par
//	Todo esto es una validacion tanto para el text como el drop-down que estan juntos	  
	  var t1 = f1.duracionQty;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "La duracion debe ser numerica\r\n";
			noerror = 0;
			celda=document.getElementById("duracionQty");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("duracionQty");
			celda.className="validInput";	  	
		  }	  	  
	  }else{
			wm += "La duracion no debe ser un campo vacio\r\n";
			noerror = 0;
			celda=document.getElementById("duracionQty");
			celda.className="invalidInput";		  
	  }
	  var t1 = f1.duracionTime;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar el intervalo de duracion\r\n";
	    noerror = 0;
		document.getElementById("duracionTime").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("duracionTime").style.backgroundColor=validInput;
	  }
//	Termina validacion para este par
//		if( !document.getElementById('editar') ) alert("no existe");
	  if( noerror == 1 && !document.getElementById('editar') ){
		  
		  //alert("esta en editar medicamento");
		  
		cargarContenido( "medicamentos", document.getElementById('Agregar') , "receta.php?id_Consulta=" + document.getElementById( 'id_Consulta' ).value + "&id_Cliente=" + document.getElementById('id_Cliente').value + "&medicinaId=" + document.getElementById('medicinaId').value + "&viaAdmon=" + document.getElementById('viaAdmon').value + "&indicacionesQty=" + document.getElementById('indicacionesQty').value + "&indicacionPresentacion=" + document.getElementById('indicacionPresentacion').value + "&intervaloQty=" + document.getElementById('intervaloQty').value + "&intervaloTime=" + document.getElementById('intervaloTime').value + "&duracionQty=" + document.getElementById('duracionQty').value + "&duracionTime=" + document.getElementById('duracionTime').value + "&infoExtra=" + document.getElementById('infoExtra').value  + "&Agregar=" );

		eval( parent.location="receta.php" );
				
	  }


/*		Inicio de funciones de Ajax		*/
//	Cuenta con los siguientes parametros de entrada:
//		elementToChance - Es el id del elemento a actualizar
//		element - Es el objeto que llama a la funcion de ajax. Regularmente llamado por un this. Utilizado tambien para mandar el valor de rotacion para el caso de imagenes_comparar_dos.php
//		origenPHP - Es el nombre del archivo que contiene la instruccion que devolvera el query a asignar al nuevo elemento
//	  cargarContenido( elementToChance, element , origenPHP )
//	  cargarContenido( 'medicamentos', this , 'receta.php' +  )  
//	  self.location='agenda.php';
	}
/*		Fin de validacion receta.php - Agregar medicamento				*/	
/*		Inicio de validacion resumen-clinico.php		*/

///////////////////////////////////////////////////////////////////////////////////////////////
if( formulario=="AgregarMedicamento2" ){
	  var t1 = f1.medicinaDesc;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe elegir un medicamento\r\n";
	    noerror = 0;
		celda=document.getElementById("medicinaDesc");
		celda.className="invalidInput";
	  }else{
		celda=document.getElementById("medicinaDesc");
		celda.className="validInput";
	  }
	  var t1 = f1.viaAdmon;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar la via de administracion\r\n";
	    noerror = 0;
		document.getElementById("viaAdmon").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("viaAdmon").style.backgroundColor=validInput;
	  }
//	Todo esto es una validacion tanto para el text como el drop-down que estan juntos	  
	  var t1 = f1.indicacionesQty;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "La indicacion debe ser numerica\r\n";
			noerror = 0;
			celda=document.getElementById("indicacionesQty");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("indicacionesQty");
			celda.className="validInput";	  	
		  }	  	  
	  }else{
			wm += "La indicacion no debe ser un campo vacio\r\n";
			noerror = 0;
			celda=document.getElementById("indicacionesQty");
			celda.className="invalidInput";		  
	  }
	  var t1 = f1.indicacionPresentacion;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar el tipo de indicacion\r\n";
	    noerror = 0;
		document.getElementById("indicacionPresentacion").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("indicacionPresentacion").style.backgroundColor=validInput;
	  }
//	Termina validacion para este par
//	Todo esto es una validacion tanto para el text como el drop-down que estan juntos	  
	  var t1 = f1.intervaloQty;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "El intervalo debe ser numerico\r\n";
			noerror = 0;
			celda=document.getElementById("intervaloQty");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("intervaloQty");
			celda.className="validInput";	  	
		  }	  	  
	  }else{
			wm += "Debe ingresar cada cuanto se ingiera el medicamento\r\n";
			noerror = 0;
			celda=document.getElementById("intervaloQty");
			celda.className="invalidInput";		  
	  }
	  var t1 = f1.intervaloTime;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar el tipo de intervalo\r\n";
	    noerror = 0;
		document.getElementById("intervaloTime").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("intervaloTime").style.backgroundColor=validInput;
	  }
//	Termina validacion para este par
//	Todo esto es una validacion tanto para el text como el drop-down que estan juntos	  
	  var t1 = f1.duracionQty;
	  if ( !isBlank( t1.value ) ) {	  
		  if ( !isNumeric( t1.value ) ) {
			wm += "La duracion debe ser numerica\r\n";
			noerror = 0;
			celda=document.getElementById("duracionQty");
			celda.className="invalidInput";
		  }else{
			celda=document.getElementById("duracionQty");
			celda.className="validInput";	  	
		  }	  	  
	  }else{
			wm += "La duracion no debe ser un campo vacio\r\n";
			noerror = 0;
			celda=document.getElementById("duracionQty");
			celda.className="invalidInput";		  
	  }
	  var t1 = f1.duracionTime;
	  if ( isBlank( t1.value ) ) {
	    wm += "Debe seleccionar el intervalo de duracion\r\n";
	    noerror = 0;
		document.getElementById("duracionTime").style.backgroundColor=InvalidInput;
	  }else{
		document.getElementById("duracionTime").style.backgroundColor=validInput;
	  }
//	Termina validacion para este par
//		if( !document.getElementById('editar') ) alert("no existe");
	  if( noerror == 1 && !document.getElementById('editar') ){
		  
		 // alert("esta el el nuevo medicamento");
		  
		cargarContenido( "medicamentos", document.getElementById('Agregar') , "receta-libre.php?id_Consulta=" + document.getElementById( 'id_Consulta' ).value + "&id_Cliente=" + document.getElementById('id_Cliente').value + "&medicinaId=" + document.getElementById('medicinaId').value + "&viaAdmon=" + document.getElementById('viaAdmon').value + "&indicacionesQty=" + document.getElementById('indicacionesQty').value + "&indicacionPresentacion=" + document.getElementById('indicacionPresentacion').value + "&intervaloQty=" + document.getElementById('intervaloQty').value + "&intervaloTime=" + document.getElementById('intervaloTime').value + "&duracionQty=" + document.getElementById('duracionQty').value + "&duracionTime=" + document.getElementById('duracionTime').value + "&infoExtra=" + document.getElementById('infoExtra').value  + "&Agregar=" );

		eval( parent.location="receta-libre.php" );
				
	  }


/*		Inicio de funciones de Ajax		*/
//	Cuenta con los siguientes parametros de entrada:
//		elementToChance - Es el id del elemento a actualizar
//		element - Es el objeto que llama a la funcion de ajax. Regularmente llamado por un this. Utilizado tambien para mandar el valor de rotacion para el caso de imagenes_comparar_dos.php
//		origenPHP - Es el nombre del archivo que contiene la instruccion que devolvera el query a asignar al nuevo elemento
//	  cargarContenido( elementToChance, element , origenPHP )
//	  cargarContenido( 'medicamentos', this , 'receta.php' +  )  
//	  self.location='agenda.php';
	}
/*		Fin de validacion receta.php - Agregar medicamento				*/	
/*		Inicio de validacion resumen-clinico.php		*/

///////////////////////////////////////////////////////////////////////////////////////////////////


	if( formulario=="ResumenClinico" ){
	  var observaciones = "El paciente presenta:\n\r\n";		
	  var obser = 1;  
	  var arreglo = [ 'peso', 'altura', 'glucosa', 'tasistolica', 'tadiastolica', 'frecuenciacardiaca', 'frecuenciarespiratoria', 'temperatura' ];
	  var desc = [ 'Peso', 'Talla', 'Glucosa', 'Tasistolica', 'Tadiastolica', 'Frecuencia Cardiaca', 'Frecuencia Respiratoria', 'Temperatura' ];	  
	  for( var i in arreglo ){ 
		  var t1 = document.getElementById( arreglo[i] );

		  if( arreglo[i]=="frecuenciacardiaca" || arreglo[i]=="frecuenciarespiratoria" ){
			  if( t1.value!=0 ){
//				  alert( isDigit( t1.value ) );
				if( isInteger( t1.value ) ){
					celda=document.getElementById( arreglo[i] );
					celda.className="validInput";
					/*switch( arreglo[i] ){
					case "frecuenciacardiaca":
						if( t1.value<=60 ){
							obser=0;
							observaciones += "Bradicardia\r\n";
						}else if( t1.value>=100 ){
							obser=0;						
							observaciones += "Taquicardia\r\n";
						}
					break;
					case "frecuenciarespiratoria":
						if( t1.value<=14 ){
							obser=0;						
							observaciones += "Bradiprea\r\n";
						}else if( t1.value>=26 ){
							obser=0;						
							observaciones += "Taquiprea\r\n";
						}
					break;
					}*/
				}else{
					wm += desc[i] + " debe ser un numero valido o debe ser un entero\r\n";
					noerror = 0;
					celda=document.getElementById( arreglo[i] );
					celda.className= "invalidInput";				
				}
			  }else{
				celda=document.getElementById( arreglo[i] );
				celda.className="validInput";				  
			  }
		  }else if( arreglo[i]=="temperatura" ){
			if( t1.value!=0 ){			  
				if( isNumeric( t1.value ) ){
					/*if( t1.value<36 ){
						obser=0;						
						observaciones += "Hipotermia\r\n";
					}else if( t1.value > 38 ){
						obser=0;						
						observaciones += "Hipertermia\r\n";					
					}	*/			
					celda=document.getElementById( arreglo[i] );
					celda.className="validInput";
				}else{
					wm += desc[i] + " debe ser un numero valido\r\n";
					noerror = 0;
					celda=document.getElementById( arreglo[i] );
					celda.className= "invalidInput";								
				}
			}else{
				celda=document.getElementById( arreglo[i] );
				celda.className="validInput";				
			}
		  }else if( arreglo[i]=="peso" ){
			if( t1.value!=0 ){			  
				if( isNumeric( t1.value ) ){
					/*if( t1.value<2.5 || t1.value>130 ){
							wm += desc[i] + " debe ser un numero valido entre 2.5 y 130 kg.\r\n";
							noerror = 0;
							celda=document.getElementById( arreglo[i] );
							celda.className= "invalidInput";
					}else{
							celda=document.getElementById( arreglo[i] );
							celda.className="validInput";					
					}*/
				}else{
					wm += desc[i] + " debe ser un numero valido\r\n";
					noerror = 0;
					celda=document.getElementById( arreglo[i] );
					celda.className= "invalidInput";
				}
		  	}else{
				celda=document.getElementById( arreglo[i] );
				celda.className="validInput";					
			}				
		  }else if( arreglo[i]=="altura" ){
			if( isNumeric( t1.value ) || t1.value=="" ){
				if( t1.value!=0 ){
					/*if( t1.value<.5 || t1.value>2.5 ){
						wm += desc[i] + " debe ser un numero valido entre .5 y 2.5 mts\r\n";
						noerror = 0;
						celda=document.getElementById( arreglo[i] );
						celda.className= "invalidInput";
					}else{
						celda=document.getElementById( arreglo[i] );
						celda.className="validInput";				
					}*/
				}else{
						celda=document.getElementById( arreglo[i] );
						celda.className="validInput";						
				}
			}else{
				wm += desc[i] + " debe ser un numero valido\r\n";
				noerror = 0;
				celda=document.getElementById( arreglo[i] );
				celda.className= "invalidInput";
			}
		  }else if( arreglo[i]=="glucosa" ){
				if( t1.value!=0 ){			  
					if( isNumeric( t1.value ) ){
						/*if( t1.value<40 ){
							obser=0;					
							observaciones += "Baja glucosa\r\n";
						}else if( t1.value>=126 ){
							obser=0;						
							observaciones += "AGA\r\n";					
						}
						celda=document.getElementById( arreglo[i] );
						celda.className="validInput";	*/			
					}else{
						wm += desc[i] + " debe ser un numero valido\r\n";
						noerror = 0;
						celda=document.getElementById( arreglo[i] );
						celda.className= "invalidInput";
					}
				}else{
					celda=document.getElementById( arreglo[i] );
					celda.className="validInput";									
				}
		  }else if( arreglo[i]=="tasistolica" ){
			if( isNumeric( t1.value ) || t1.value=="" ){
				if( t1.value!=0 ){
					
					/*if( t1.value<90 || t1.value>140 ){
						wm += desc[i] + " debe ser un numero valido entre 90 y 140\r\n";
						noerror = 0;
						celda=document.getElementById( arreglo[i] );
						celda.className= "invalidInput";
					}else{
						celda=document.getElementById( arreglo[i] );
						celda.className="validInput";
					}*/
				
				
				}else{
					celda=document.getElementById( arreglo[i] );
					celda.className="validInput";					
				}
				
			}else{
				wm += desc[i] + " debe ser un numero valido\r\n";
				noerror = 0;
				celda=document.getElementById( arreglo[i] );
				celda.className= "invalidInput";
			}
		  }else if( arreglo[i]=="tadiastolica" ){
			if( t1.value!=0 ){			  
				if( isNumeric( t1.value ) ){
					/*if( t1.value<50 ){
						obser=0;						
						observaciones += "Hipertension\r\n";
					}else if( t1.value > 90 ){
						obser=0;						
						observaciones += "Hipotension\r\n";					
					}	*/			
					celda=document.getElementById( arreglo[i] );
					celda.className="validInput";
				}else{
					wm += desc[i] + " debe ser un numero valido\r\n";
					noerror = 0;
					celda=document.getElementById( arreglo[i] );
					celda.className= "invalidInput";
				}
			}else{
				celda=document.getElementById( arreglo[i] );
				celda.className="validInput";				
			}
		  }
	  }
	  if( obser == 0 && noerror==1 ) {
		alert( observaciones );
	  }
	}
/*		Fin de validacion resumen-clinico.php		*/	
/*		Inicio de validacion peticion-lab.php		*/
	if( formulario=="PeticionLab" ){
	  var arreglo = [ 'tipo', 'subtipo', 'motivo' ];
	  var desc = [ 'Servicio', 'Tipo de estudio', 'Motivo' ];	  
	  for( var i in arreglo ){ 
		  var t1 = document.getElementById( arreglo[i] );
		  if ( isBlank( t1.value ) || t1.value==0 ) {			  
			wm += desc[i] + " es un campo requerido\r\n";
			noerror = 0;
			if( t1.type == "select-one" ){
				t1.style.backgroundColor = InvalidInput;
			}else{
				t1.className= "invalidInput";
			}

		  }else{
			if( t1.type == "select-one" ){
				t1.style.backgroundColor = validInput;
			}else{
				t1.className= "validInput";			
			}
		  }
	  }
	}
/*		Fin de validacion peticion-lab.php		*/
/*		Inicio de validacion resultados-lab.php		*/
	if( formulario=="ResultadosLab" ){
	  var arreglo = [ 'resultado' ];
	  var desc = [ 'Descripcion' ];	  
	  for( var i in arreglo ){ 
		  var t1 = document.getElementById( arreglo[i] );
		  if ( isBlank( t1.value ) ) {			  
			wm += desc[i] + " es un campo requerido\r\n";
			noerror = 0;
			t1.className= "invalidInput";

		  }else{
			t1.className= "validInput";
		  }
	  }
	}
/*		Fin de validacion resultados-lab.php		*/	
/*		Inicio de validacion nuevo-antecedente-heredo.php		*/
	if( formulario=="NuevoAntecedenteHeredo" ){
	  var arreglop = [ 'padecimientop[]', 'checkatopicosp', 'checkotrosp' ];

	  marcarp = 1;
	  for( var i in arreglop ){
		  elements = document.getElementsByName( arreglop[i] );
		  for(j=0;j<elements.length;j++){
			  if( elements[j].checked )
				marcarp = 0;
		  }
	  }

	  var arreglom = [ 'padecimiento[]', 'checkatopicos', 'checkotros' ];
	  var desc = [ 'Padecimiento', 'Padecimiento', 'Padecimiento', 'Padecimiento', 'Padecimiento', 'Padecimiento', 'Linea', 'Status' ];

	  marcarm = 1;
	  for( var i in arreglom ){
		  elements = document.getElementsByName( arreglom[i] );
		  for(j=0;j<elements.length;j++){
			  if( elements[j].checked )
				marcarm = 0;
		  }
	  }
	  
	  
	  if( marcarp==1 && marcarm==1 ){
		    for( var i in arreglop ){
			    elements = document.getElementsByName( arreglop[i] );
			    for(j=0;j<elements.length;j++){
					elements[j].style.backgroundColor = InvalidInput;
			    }
		    }
		    for( var i in arreglom ){
			    elements = document.getElementsByName( arreglom[i] );
			    for(j=0;j<elements.length;j++){
					elements[j].style.backgroundColor = InvalidInput;
			    }
		    }
			wm += "Debe seleccionar al menos un padecimiento \npara poder guardar los cambios\r\n";
		    noerror = 0;			
	  }else if( marcarp==0 && marcarm==0 ){
		  var arreglo = [ 'alertap', 'alerta' ];
		  faltanp = 1;
		  elements = document.getElementsByName( 'alertap' );
		  for(j=0;j<elements.length;j++){
			  if( elements[j].checked )
				faltanp = 0;
		  }
		  if( faltanp==1 ){
			wm += "Debe seleccionar el status del padecimiento paterno\r\n";
		    noerror = 0;		  	
		  }
		  faltanm = 1;
		  elements = document.getElementsByName( 'alerta' );
		  for(j=0;j<elements.length;j++){
			  if( elements[j].checked )
				faltanm = 0;
		  }
		  if( faltanm==1 ){
			wm += "Debe seleccionar el status del padecimiento materno\r\n";
		    noerror = 0;
		  }
	  }else if( marcarp==0 ){
		  faltanp = 1;
		  elements = document.getElementsByName( 'alertap' );
		  for(j=0;j<elements.length;j++){
			  if( elements[j].checked )
				faltanp = 0;
		  }
		  if( faltanp==1 ){
			wm += "Debe seleccionar el status del padecimiento paterno\r\n";
		    noerror = 0;
		  }	  	
	  }else if( marcarm==0 ){
		  faltanm = 1;
		  elements = document.getElementsByName( 'alerta' );
		  for(j=0;j<elements.length;j++){
			  if( elements[j].checked )
				faltanm = 0;
		  }
		  if( faltanm==1 ){
			wm += "Debe seleccionar el status del padecimiento materno\r\n";
		    noerror = 0;
		  }	  	
	  }
	}
/*		Fin de validacion nuevo-antecedente-heredo.php		*/	
/*		Inicio de validacion nuevo-antecedente-quirurgico.php		*/
	if( formulario=="NuevoAntecedenteQuirurgico" ){
	  var arreglo = [ 'quirurgicostipo', 'edad', 'Radio2' ];
	  var desc = [ 'Tipo de cirugia', 'Edad', 'Status' ];
	  for( var i in arreglo ){
		  var t1 = document.getElementById( arreglo[i] );
			switch( t1.type ){
				case "select-one":
					  if ( isBlank( t1.value ) ) {
						  wm += "Debe seleccionar " + arreglo[i] + "\r\n";
						  noerror = 0;
						  t1.style.backgroundColor = InvalidInput;
					  }else{
						t1.style.backgroundColor = validInput;
					  }				
				break;
				case "radio":
					  marcar = 1;
					  elements = document.getElementsByName( t1.name );
					  for(j=0;j<elements.length;j++){
						  if( elements[j].checked )
							marcar = 0;
					  }
					  if( marcar==1 ){
						for(j=0;j<elements.length;j++){
							elements[j].style.backgroundColor = InvalidInput;
						}
						wm += desc[i] + " es un campo requerido\r\n";
						noerror = 0;
					  }
				break;
				case "text":
					  if ( isBlank( t1.value ) ) {
						  wm += "Debe seleccionar " + arreglo[i] + "\r\n";
						  noerror = 0;						  
						  t1.className = "invalidInput";
					  }else{
						t1.className = "validInput";
					  }				
				break;
			}
	  }
	}
/*		Fin de validacion nuevo-antecedente-quirurgico.php		*/
/*		Inicio de validacion nuevo-antecedente-alergia.php		*/
	if( formulario=="NuevoAntecedenteAlergia" ){
	  var arreglo = [ 'tipoalergia', 'descripcion', 'Radio2' ];
	  var desc = [ 'Tipo de alergia', 'Descripcion', 'Status' ];
	  for( var i in arreglo ){
		  var t1 = document.getElementById( arreglo[i] );
			switch( t1.type ){
				case "select-one":
					  if ( isBlank( t1.value ) ) {
						  wm += "Debe seleccionar " + arreglo[i] + "\r\n";
						  noerror = 0;
						  t1.style.backgroundColor = InvalidInput;
					  }else{
						t1.style.backgroundColor = validInput;
					  }				
				break;
				case "radio":
					  marcar = 1;
					  elements = document.getElementsByName( t1.name );
					  for(j=0;j<elements.length;j++){
						  if( elements[j].checked )
							marcar = 0;
					  }
					  if( marcar==1 ){
						for(j=0;j<elements.length;j++){
							elements[j].style.backgroundColor = InvalidInput;
						}
						wm += desc[i] + " es un campo requerido\r\n";
						noerror = 0;
					  }
				break;
				case "text":
					  if ( isBlank( t1.value ) ) {
						  wm += "Debe seleccionar " + arreglo[i] + "\r\n";
						  noerror = 0;						  
						  t1.className = "invalidInput";
					  }else{
						t1.className = "validInput";
					  }				
				break;
			}
	  }
	}
/*		Fin de validacion nuevo-antecedente-alergia.php		*/
/*		Inicio de validacion nuevo-antecedente-traumatico.php		*/
	if( formulario=="NuevoAntecedenteTraumatico" ){
	  var arreglo = [ 'traumaticostipo', 'descripcion', 'Radio2' ];
	  var desc = [ 'Tipo de alergia', 'Descripcion', 'Status' ];
	  for( var i in arreglo ){
		  var t1 = document.getElementById( arreglo[i] );
			switch( t1.type ){
				case "select-one":
					  if ( isBlank( t1.value ) ) {
						  wm += "Debe seleccionar " + arreglo[i] + "\r\n";
						  noerror = 0;
						  t1.style.backgroundColor = InvalidInput;
					  }else{
						t1.style.backgroundColor = validInput;
					  }				
				break;
				case "radio":
					  marcar = 1;
					  elements = document.getElementsByName( t1.name );
					  for(j=0;j<elements.length;j++){
						  if( elements[j].checked )
							marcar = 0;
					  }
					  if( marcar==1 ){
						for(j=0;j<elements.length;j++){
							elements[j].style.backgroundColor = InvalidInput;
						}
						wm += desc[i] + " es un campo requerido\r\n";
						noerror = 0;
					  }
				break;
				case "text":
					  if ( isBlank( t1.value ) ) {
						  wm += "Debe seleccionar " + arreglo[i] + "\r\n";
						  noerror = 0;						  
						  t1.className = "invalidInput";
					  }else{
						t1.className = "validInput";
					  }				
				break;
			}
	  }
	}
/*		Fin de validacion nuevo-antecedente-traumatico.php		*/
/*		Inicio de validacion nuevo-antecedente-nopatologico.php y editar-antecedente-nopatologico.php		
	if( formulario=="NuevoAntecedenteNoPatologic" ){
	  elements = document.getElementsByName( 'anid_Statusantecedente' );
	  marcar = 1;
	  for(j=0;j<elements.length;j++){
		  if( elements[j].checked )
			marcar = 0;
	  }
	  if( marcar==1 ){
		for(j=0;j<elements.length;j++){
			elements[j].style.backgroundColor = InvalidInput;
		}
		wm += "Status es un campo requerido\r\n";
		noerror = 0;
	  }
	}
		Fin de validacion nuevo-antecedente-heredo.php		*/
/*		Inicio de validacion nuevo-antecedente-gineco.php		
	if( formulario=="NuevoAntecedenteGineco" ){
	  var arreglo = [ 'agMenarca', 'agGesta', 'agCesarea', 'agParto', 'agAborto', 'agLegrado', 'agid_Statusantecedente' ];
	  var desc = [ 'Menarca', 'Gesta', 'Cesarea', 'Parto', 'Aborto', 'Legrado', 'Status' ];
	  for( var i in arreglo ){
		  var t1 = document.getElementById( arreglo[i] );
		  switch( t1.type ){
		 	case "text":
				  if ( !isBlank( t1.value ) ) {
					if( !isInteger( t1.value ) ){
						wm += desc[i] + " debe ser un numero valido\r\n";
						noerror = 0;
						t1.className= "invalidInput";
						//t1.style.backgroundColor = InvalidInput;
					}else{
						t1.className= "validInput";						
					}
				  }else{
					t1.className= "validInput";
				  }			
			break;			  
		 	case "select-one":
				  if ( isBlank( t1.value ) ) {			  
					wm += desc[i] + " es un campo requerido\r\n";
					noerror = 0;
					t1.style.backgroundColor = InvalidInput;
				  }else{
					t1.style.backgroundColor = validInput;
				  }
			break;
			case "radio":
				  marcar = 1;
				  elements = document.getElementsByName( t1.name );
				  for(j=0;j<elements.length;j++){
					  if( elements[j].checked )
						marcar = 0;
				  }
				  if( marcar==1 ){
				  	for(j=0;j<elements.length;j++){
						elements[j].style.backgroundColor = InvalidInput;
					}
			    	wm += desc[i] + " es un campo requerido\r\n";
					noerror = 0;					
				  }
			break;
		  }
	  }
	}
		Fin de validacion nuevo-antecedente-gineco.php		*/
/*		Inicio de validacion nuevo-antecedente-padecimiento.php		*/
	if( formulario=="NuevoAntecedentePadecimiento" ){
	  var arreglo = [ 'amEstadomorbido', 'amTomamedicamento', 'amid_Statusantecedente' ];
	  var desc = [ 'Estado morbido', 'Medicamentos', 'Status' ];
	  for( var i in arreglo ){
//		  var t1 = document.getElementById( arreglo[i] );
		  marcar = 1;
		  //alert( t1.value );
		  elements = document.getElementsByName( arreglo[i] );
		  for(j=0;j<elements.length;j++){
			  if( elements[j].checked==true )
				marcar = 0;
		  }
		  if( marcar==1 ){
			for(j=0;j<elements.length;j++){
				elements[j].style.backgroundColor = InvalidInput;
			}
			wm += desc[i] + " es un campo requerido\r\n";					
			noerror = 0;			
		  }else{
			switch( arreglo[i] ){
				case "amEstadomorbido":
					if( elements[0].checked==true ){
						  t1 = document.getElementById( "otro" );
						  if ( isBlank( t1.value ) ) {
							wm += "Debe ingresar una descripion para el Estado Morbido\r\n";
							noerror = 0;
							t1.className = "invalidInput";
						  }else{
							t1.className = "validInput";
						  }
					}
				break;
				case "amTomamedicamento":
					if( elements[1].checked==true ){
						  t1 = document.getElementById( "infoExtra" );
						  if ( isBlank( t1.value ) ) {
							wm += "Debe ingresar una descripion para los medicamentos\r\n";
							noerror = 0;
							t1.className = "invalidInput";
						  }else{
							t1.className = "validInput";
						  }
					}				
				break;
			}
		  }
	  }
	}
/*		Fin de validacion nuevo-antecedente-padecimiento.php		*/	
/*		Inicio de validacion imagenes_agregar.php		*/
	if( formulario=="AgregarImagenes" ){
	  /*var arreglo = [ 'padecimiento', 'linea', 'alerta' ];
	  var desc = [ 'Padecimiento', 'Linea', 'Status' ];
	  for( var i in arreglo ){
		  var t1 = document.getElementById( arreglo[i] );
		  switch( t1.type ){
		 	case "select-one":
				  if ( isBlank( t1.value ) ) {			  
					wm += desc[i] + " es un campo requerido\r\n";
					noerror = 0;
					t1.style.backgroundColor = InvalidInput;
				  }else{
					t1.style.backgroundColor = validInput;
				  }			
			break;
			case "radio":
				  marcar = 1;
				  elements = document.getElementsByName( t1.name );
				  for(j=0;j<elements.length;j++){
					  if( elements[j].checked )
						marcar = 0;
				  }
				  if( marcar==1 ){
				  	for(j=0;j<elements.length;j++){
						elements[j].style.backgroundColor = InvalidInput;
					}
			    	wm += desc[i] + " es un campo requerido\r\n";					
				  }
			break;
		  }
	  }*/
	}
/*		Fin de validacion imagenes_agregar.php		*/	

	if (noerror == 0) {
		alert(wm);
		return false;
	}
	else
		return true;
}

function removeStyle( element ){
	switch ( element.tagName )
	{
	case "SELECT":
	  element.style.backgroundColor=validInput;
	  break;
	case "INPUT":
	  if( element.type == "radio" || element.type == "checkbox" ){
		  elements = document.getElementsByName( element.name );
		  
		  for(i=0;i<elements.length;i++){
			  elements[i].style.backgroundColor = validInput;
		  }
	  }else{
		  element.className= "tahoma-10-gris-claro";
		  element.style.backgroundColor = validInput;
	  }
	  break;
	}
}
/**
 * Selecciona uno de varios elementos como si se tratara de un radio, pero con elementos como imagenes.
 * Nombre del elemento afin radio adjunto
 * Posicion a representar en el arreglo - Al igual que un array, debe uniciar desde 0 y deben ser consecutivos ascendentes o descendentes
 */
function checkValue( element, position ){
	valueChecked = document.getElementsByName( element )[position].value;
  	elements = document.getElementsByName( element );
	for(j=0;j<elements.length;j++){
		if( elements[j].value == valueChecked )
			elements[j].checked = true;
		else
			elements[j].checked = false;
		elements[j].style.backgroundColor = validInput;
	}
}

function validaRadio( element ){
//	var wm = "Ocurrieron los siguientes Errores :\n\r\n";
	var noerror = 1;
	
	  marcar = 1;
	  elements = document.getElementsByName( element.name );
	  for(j=0;j<elements.length;j++){
		  if( elements[j].checked )
			marcar = 0;
	  }
	  if( marcar==1 ){
		for(j=0;j<elements.length;j++){
			elements[j].style.backgroundColor = InvalidInput;
		}
		wm += desc[i] + " es un campo requerido\r\n";
		noerror = 0;
	  }
	  arreglo = [ wm, noerror ]
	  return arreglo;
}
/*		Fin de validacion de formularios		*/
/*		Inicio de funciones generales de formularios		*/
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
/*		Fin de funciones generales de formularios		*/
/*		Inicio de validaciones comunes			*/
//-------------------------------------------------------------------
//Verifica que un valor sea de tipo numerico
function isNumeric(val){
	return(parseFloat(val,10)==(val*1));
}
//-------------------------------------------------------------------
//Verifica que no haya campos en blanco
function isBlank(val){
	if(val==null){return true;}
	for(var i=0;i<val.length;i++) {
		if ((val.charAt(i)!=' ')&&(val.charAt(i)!="\t")&&(val.charAt(i)!="\n")&&(val.charAt(i)!="\r")){return false;}
		}
	return true;
}
//-------------------------------------------------------------------
//Verifica que el campo sea de tipo numero. Contempla tanto enteros como flotantes
function isDigit(num) {
	if (num.length>1){return false;}
	var string="1234567890";
	if (string.indexOf(num)!=-1){return true;}
	return false;
}
//-------------------------------------------------------------------
//Verifica que el campo sea de tipo numerico entero exclusivamente
function isInteger(val){
	if (isBlank(val)){return false;}
	for(var i=0;i<val.length;i++){
		if(!isDigit(val.charAt(i))){return false;}
		}
	return true;
}

function ucfirst( string ){
	// the first character
	first = string.substring(0,1);

	// the rest of the value
	rest = string.substring(1);

	// convert first character to uppercase
	first = first.toUpperCase();

	// concatenate the uppercase with the rest
	newString = first + rest;

	// store the result in a new property
	return newString;
}

/*		Fin de validaciones comunes			*/

/*		Inicio de Popup en layer		*/

/* Script by: www.jtricks.com
 * Version: 20060314
 * Latest version:
 * www.jtricks.com/javascript/window/box.html
 */
// Moves the box object to be directly beneath an object.

function move_box( an, box , left, top )
{
    var cleft = left;
    var ctop = top;
    var obj = an;

    while (obj.offsetParent)
    {
        cleft += obj.offsetLeft;
        ctop += obj.offsetTop;
        obj = obj.offsetParent;
    }

    box.style.left = cleft + 'px';

    ctop += an.offsetHeight + 8;

    // Handle Internet Explorer body margins,
    // which affect normal document, but not
    // absolute-positioned stuff.
    if (document.body.currentStyle &&
        document.body.currentStyle['marginTop'])
    {
        ctop += parseInt(
            document.body.currentStyle['marginTop']);
    }

    box.style.top = ctop + 'px';
}

// Shows a box if it wasn't shown yet or is hidden
// or hides it if it is currently shown
function show_hide_box(an, width, height, borderStyle, left, top )
{
    var href = an.href;
    var boxdiv = document.getElementById(href);
	
    if (boxdiv != null)
    {
        if (boxdiv.style.display=='none')
        {
            // Show existing box, move it
            // if document changed layout
            move_box( an, boxdiv, left, top );
            boxdiv.style.display='block';
        }
        else
            // Hide currently shown box.
            boxdiv.style.display='none';
        return false;
    }

    // Create box object through DOM
    boxdiv = document.createElement('div');

    // Assign id equalling to the document it will show
    boxdiv.setAttribute('id', href);

    boxdiv.style.display = 'block';
    boxdiv.style.position = 'absolute';
    boxdiv.style.width = width + 'px';
    boxdiv.style.height = height + 'px';
    boxdiv.style.border = borderStyle;
    boxdiv.style.textAlign = 'right';
    boxdiv.style.padding = '4px';
    boxdiv.style.background = validInput;
    document.body.appendChild(boxdiv);

    var offset = 0;

    // Remove the following code if 'Close' hyperlink is not needed.
    var close_href = document.createElement('a');
    close_href.href = 'javascript:void(0);';
    close_href.onclick = function()
        { show_hide_box(an, width, height, borderStyle); }
    close_href.appendChild(document.createTextNode('Cerrar'));
    boxdiv.appendChild(close_href);
    offset = close_href.offsetHeight;
    // End of 'Close' hyperlink code.

    var contents = document.createElement('iframe');
    //contents.scrolling = 'no';
    contents.overflowX = 'hidden';
    contents.overflowY = 'scroll';
    contents.frameBorder = '0';
    contents.style.width = width + 'px';
    contents.style.height = (height - offset) + 'px';

    boxdiv.appendChild(contents);

    move_box( an, boxdiv, left, top );

    if (contents.contentWindow)
        contents.contentWindow.document.location.replace(
            href);
    else
        contents.src = href;
    // The script has successfully shown the box,
    // prevent hyperlink navigation.
    return false;
}

/*	Pasa los datos del layer de medicamentos al layer padre (Receta.php)	*/
/*
index - valor que pasara al indice
value - valor que pasara como descripcion
id - nombre del textBox tipo hidden
desc - nombre de textBox que se muestra. Si no se encuentra disponible la descripcion, se asumira que es un drop-down
*/
function pasarDatos(index,id){
		alert("ya esta en el pasar datos");
		alert("este es el id="+id+" y este es el index="+index);
		
		parent.document.getElementById(id).options[2].selected;
		//parent.document.getElementById( id ).options[].value = index;
		//parent.document.getElementById('fechaCita').value=index;
		
}

function pasarDatos2( index, value1, value2, id, name, desc ){
	if( desc ){
		parent.document.getElementById( id ).value = index;
		parent.document.getElementById( name ).value = value1;		
		parent.document.getElementById( desc ).value = value2;
	}else{
//		parent.document.getElementById( id ).options[ parent.document.getElementById( id ).options.selectedIndex ].value = index;
//		parent.document.getElementById( id ).options[ parent.document.getElementById( id ).options.selectedIndex ].text = value;
		parent.document.getElementById( id ).options.value = index;
	}
		alert( index );
}

/*		Termino de Popup en Layer		*/
/*		Inicio de funciones de Ajax		*/
//	Cuenta con los siguientes parametros de entrada:
//		elementToChance - Es el id del elemento a actualizar
//		element - Es el objeto que llama a la funcion de ajax. Regularmente llamado por un this. Utilizado tambien para mandar el valor de rotacion para el caso de imagenes_comparar_dos.php
//		origenPHP - Es el nombre del archivo que contiene la instruccion que devolvera el query a asignar al nuevo elemento
function cargarContenido( elementToChance, element , origenPHP ){
	if( element ){
		var d1,contenedor, ajaxResponse;
		ajaxResponse = 1;
		contenedor = document.getElementById( elementToChance );
	//	alert( element.type );
		if( element.type=="hidden" ){
			d1 = element.value;
			element.value = ( d1=="H" ) ? "V" : "H";
		}else if( element.type=="select-one" ){
			
			if(element.options[element.selectedIndex].value==0){
				elementToChance.disabled=true;
			}else{
			d1 = element.options[element.selectedIndex].value;
			}
			
		
		}else{
			if( element.value )
				d1 = element.value;
			else
				d1 = element;
			ajaxResponse = 0;
		}
	
		ajax=nuevoAjax();
		ajax.open( "GET", origenPHP + d1, true );
			ajax.onreadystatechange=function(){
				if (ajax.readyState==4) {
				   contenedor.innerHTML = ajax.responseText
				}
			}
			ajax.send(null)
	}
}

// JavaScript Document
function nuevoAjax(){
	var xmlhttp=false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");  		// Creaci�n del objeto ajax para navegadores diferentes a Explorer
	} catch (e) {
		try {								// o bien
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");		// Creaci�n del objet ajax para Explorer
		} catch (E) {
			xmlhttp = false;
		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function show_otro( selObj, valor, divName, inputType ){
	switch( selObj.type ){
		case "radio":
			if( selObj.checked && selObj.value==valor ){
				if( inputType=="text" ){
					htmlString="<input name='otro' id='otro' class='tahoma-10-gris-claro' style='width:300px' />";					
				}else{
					htmlString="<textarea  name='infoExtra' id='infoExtra' rows='5' cols='32' class='tahoma-11-gris-claro'></textarea>";
				}
			}else{
				htmlString="";		
			}		
		break;
		case "select-one":
			if( selObj.options[selObj.selectedIndex].value==valor ){
				htmlString="<input name='otro' class='tahoma-10-gris-claro' style='width:300px' />";
			}else{
				htmlString="";
			}		
		break;
	}

	if(document.getElementById){
		document.getElementById( divName ).innerHTML=htmlString;
	}else if(document.all){
		document.all[ divName ].innerHTML=htmlString;
	}else if(document.layers){
		with(document.layers[ divName ].document){
			open();
			write(htmlString);
			close();
		}
	}
}

/*		Fin de funciones de Ajax		*/
/*		Inicio de nuevo-antecedente-nopatologico.php	*/
function verifyRadioCheck( element ){
	elements = document.getElementsByName( element.name );	
	if( element.value==1 ){
		  for(i=1;i<elements.length;i++){
			  elements[i].checked = false;
		  }
		  cargarContenido( 'div_drogo', 'del', 'nuevo-antecedente-nopatologico.php?DescDrogo=' );
	}else if( element.value>=2 || element.value<=4 ){
		elements[0].checked = false;
		switch( element.value ){
			case "2":
				elements[2].checked = false;
				elements[3].checked = false;
			break;
			case "3":
				elements[1].checked = false;
				elements[3].checked = false;
			break;
			case "4":
				elements[1].checked = false;
				elements[2].checked = false;
			break;			
		}
	}
}
/*		Fin de nuevo-antecedente-nopatologico.php	*/
/*		Inicio de imagenes_comparar.php	*/
function preview( divName, imgName ){
	element = document.getElementById( divName );
	element.innerHTML = "<img src='imgConsultas/" + imgName + "' width='280' height='280' />";
}
function removePrev( divName ){
	element = document.getElementById( divName );
	element.innerHTML = "";
}
/*		Fin de imagenes_comparar.php	*/
/*		Inicio de imagenes_comparar_dos.php	*/
//	divName	- Nombre del div donde ira la tabla
//	actual	- Valor actual Horizontal o Vertical ( H o V )
function rotar( divName, orientacion, foto1, foto2 ){
	if( orientacion=="H" ){
		document.getElementById( 'orientacion' ).value = "V";
		element = document.getElementById( divName );
		element.innerHTML = "<table width='200' border='1'><tr><td>&nbsp;</td><td><img src='imgConsultas/" + foto1 + "' width='360' height='350' /></td><td>&nbsp;</td><td><img src='imgConsultas/" + foto2 + "' width='360' height='350' /></td><td>&nbsp;</td></tr></table>";
	}else{
		document.getElementById( 'orientacion' ).value = "H";
		element = document.getElementById( divName );
		element.innerHTML = "<table width='200' border='1'><tr><td>&nbsp;</td><td><img src='imgConsultas/" + foto1 + "' alt='sd' width='360' height='350' /></td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td><img src='imgConsultas/" + foto2 + "' alt='sd' width='360' height='350' /></td><td>&nbsp;</td></tr></table>";	
	}
}
/*		Fin de imagenes_comparar_dos.php	*/

function ajax_action( urlSrc ){
	this.url = urlSrc;
	this.param = "";
	this.funcion = "";
	this.ajax = ajax_function;
	function ajax_function(){
		if( this.url ){
			new Ajax.Request(
				this.url,
				{
					method: ( ( this.param=="" ) ? 'get' : 'post' ),
					parameters: this.param,
					onComplete: function(){ ocultar_loading() },
					onSuccess: ( ( this.funcion ) ? ( this.funcion ) : function(transport) {
										eval(transport.responseText);
										$('lightLoading').style.display='none';
									}
								),
					onLoading: muestraLoading
				}
			);			
		}else{
			alert( "Falta especificar la URL de ejecucion de AJAX" );
		}
	}
}
function ajax_action_script( url, parametros ){
	if( !parametros ){
		tmp = url.split("?");
		parametros = tmp[1];
	}
	new Ajax.Request(
		url,
		{
			method: 'post',
			parameters: parametros,
			onComplete:function(transport) {
				$('lightLoading').style.display='none';
				eval(transport.responseText);
			}
		}
	);
}

function cargarContenido( elementToChange, origenPHP, element ){

	var d1,contenedor;
	contenedor = document.getElementById( elementToChange );
	if( element.type ){
		if( element.type=="text" || element.type=="radio" ){
			d1 = element.name + "=" + element.value;
		}else if( element.type=="select-one" ){
			d1 = element.name + "=" + element.options[element.selectedIndex].value;
		}	
	}else{
		d1 = element;
	}

	elementToChange=nuevoAjax();
	elementToChange.open( "GET", origenPHP + d1, true );
		elementToChange.onreadystatechange=function(){
			if (elementToChange.readyState==4) {
			   	contenedor.innerHTML = elementToChange.responseText;
			   }
		}
		elementToChange.send(null)
}
function nuevoAjax(){
	var xmlhttp=false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");  		// Creacion del objeto ajax para navegadores diferentes a Explorer
	} catch (e) {
		try {								// o bien
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");		// Creacion del objet ajax para Explorer
		} catch (E) {
			xmlhttp = false;
		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}