<?php
function titulo($a){
				$temp=explode(chr(32),trim($a));
				
				for($l=0;$l<count($temp);$l++){
					
					if($temp[$l]!=''){
					if($l==0){
					$titulo=sanear_string($temp[$l]);
					}else{
					$titulo=$titulo."-".sanear_string($temp[$l]);
					}
					}
				}
				/*$tofind = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\"";
				$replac = "AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn ";
				
				
				//$tituloa = str_replace($tofind, $replac, ($titulo));
				//$titulo=strtr("gonzález",$tofind,$replac);
				
				$titulo=sanear_string($titulo);*/
				
				return $titulo; 
				
}


function sanear_string($string)
{
				
    $string = trim($string);
    $string = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
        $string
    );

    $string = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
        $string
    );

    $string = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
        $string
    );

    $string = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
        $string
    );

    $string = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
        $string
    );

    $string = str_replace(
        array('ñ', 'Ñ', 'ç', 'Ç'),
        array('n', 'N', 'c', 'C',),
        $string
    );

    //Esta parte se encarga de eliminar cualquier caracter extraño
    $string = str_replace(
        array("\\", "¨", "º",  "~",
             "#", "@", "|", "!", "\"",
             "·", "$", "%",  "/",
             "(", ")", "?", "'", "¡",
             "¿", "[", "^", "`", "]",
             "+", "}", "{", "¨", "´",
             ">", "< ", ";", ",", ":",
             ".", " "),
        '',
        $string
    );


    return $string;
}
 function limitarPalabras($cadena, $longitud, $elipsis = "...")
 {    
 $palabras = explode(' ', $cadena);
     if (count($palabras) > $longitud)
	     return implode(' ', array_slice($palabras, 0, $longitud)) . $elipsis;
	 else    return $cadena;
 }


function obtenerhora($hora){
	$hora = strtotime($hora);
return date("h:i a", $hora); //06:23 pm
	}

function obtenerfechacorta($fecha){
	if($fecha=="")
	return false;
	$guardar=explode("-",$fecha);
	$dia=$guardar[2];
	$mes=$guardar[1];
	$anio=$guardar[0];
	switch($mes){
	case 1: $mesl="Enero"; break;
	case 2: $mesl="Febbrero"; break;
	case 3: $mesl="Marzo"; break;
	case 4: $mesl="Abril"; break;
	case 5: $mesl="Mayo"; break;
	case 6: $mesl="Junio"; break;
	case 7: $mesl="Julio"; break;
	case 8: $mesl="Agosto"; break;
	case 9: $mesl="Septiembre"; break;
	case 10: $mesl="Octubre"; break;
	case 11: $mesl="Noviembre"; break;
	case 12: $mesl="Diciembre"; break;
	}
	$imp=$dia." de ".$mesl." de ". $anio;
	return $imp;
}
function obtenerfecha($fecha){
	if($fecha=="")
	return false;
	$guardar=explode("-",$fecha);
	$dia=$guardar[2];
	$mes=$guardar[1];
	$anio=$guardar[0];
	switch($mes){
	case 1: $mesl="Ene"; break;
	case 2: $mesl="Feb"; break;
	case 3: $mesl="Mar"; break;
	case 4: $mesl="Abr"; break;
	case 5: $mesl="May"; break;
	case 6: $mesl="Jun"; break;
	case 7: $mesl="Jul"; break;
	case 8: $mesl="Ago"; break;
	case 9: $mesl="Sep"; break;
	case 10: $mesl="Oct"; break;
	case 11: $mesl="Nov"; break;
	case 12: $mesl="Dic"; break;
	}
	$anio=substr($anio, 2);
	//$anio=$anio - 2000;
	$imp=$dia." ".$mesl." ". $anio;
	return $imp;
}

function fixStrings( $value ){
	$signs = array( '�', '�', '�', '�', '�', '#', '\'', "'", '"', ' ', '.', "\"", "\\" );
	$value = html_entity_decode( $value );
	foreach ($signs as $sinlgysing){
		$value = str_replace( $sinlgysing, '', $value );
	}
	return strtolower($value);
}

function debug( $element, $comentario=null, $line=null, $file=null, $return=null ){
		echo "<br><center>########################################## I N I C I O ##########################################</center>";
	if( $comentario ){
		echo "<br><center>--------------------------------------------------------";
		echo "<br>". $comentario;
		echo "<br>--------------------------------------------------------</center>";
	}
	
	echo "<br><table align='center' width='75%'><tr><td><pre>";
	if( $line )
		echo "<br>Line: ". $line;
	if( $file )
		echo "<br>File: ". $file;
	else
		echo "<br>Source: " . $_SERVER['PHP_SELF'] . "<br><br><br>" ;
	echo "<br><center>-------------------------------------------------------------------------------------------------------------------</center>";
	if( is_array( $element ) ){
		var_export ( ( ( $element ) ? $element : "Empty!!!" ) );
		echo "</pre></td></tr></table>";
	}else{
		echo "<br>" . ( ( $element ) ? $element : "Empty!!!" ) . "</pre></td></tr></table>";
	}

		echo "<br><center>############################################ F I N ############################################</center><br>";
	
	if( $return==1 ){
		echo "<br><br><center><a href=\"javascript:window.history.back();\">Regresar</a></center><br><br>";
	}
}

class security{
  function encrypt( $decrypted_password ) {
    $password = '';
    $key = 'fW8a2h0E2a34d@g50ds8P:Q(2N&Mm$`I~Shakurasystems!';
    
    for( $i = 0; $i < strlen( $decrypted_password ); $i++ )
  		$password .= $key{ $i % strlen( $key ) } ^ $decrypted_password{$i};
    
    return base64_encode( $password );
  }
  
  function decrypt( $encrypted_password ) {
    $encrypted_password = base64_decode( $encrypted_password );
    $password = '';
    $key = 'fW8a2h0E2a34d@g50ds8P:Q(2N&Mm$`I~Shakurasystems!';
    
    for( $i = 0; $i < strlen( $encrypted_password ); $i++ )
  		$password .= $key{ $i % strlen( $key ) } ^ $encrypted_password{$i};
    
    return $password;
  }
}


  
class html{
	function html(){
		$javaScript = "";
		echo $javaScript;
	}	
#	Genera un drop-down ( select-one o select)
#	$info - Puede ser una cadena para ejecutar una instruccion SQL o bien un arreglo con los datos que se desean mostrar
function select( $info, $name, $width, $request=null, $xtra=null, $multiple=null ){
	$select = 
		"<select name='" . $name . "' id='" . $name . "' class='tahoma-11-gris-claro' style='width:" . $width . "px' onfocus='removeStyle( this );' " . $xtra . " " . ( ( $multiple ) ? "multiple='multiple'" : "" ). ">" . ( ( !$multiple ) ? "<option value=''> --Seleccionar-- </option>" : "");

	if( is_array( $info ) ){
		foreach( $info as $valor ){
			$select .= "<option value=\"$valor\" " . ( ( $request==$valor ) ? "selected" : "" ) . ">$valor</option>";
		}
	}else{
		$myvar = new db_mysql;	
		$myvar->conectarBd();
		$arreglo = $myvar->get_arreglo( $info );
		if( !empty( $arreglo ) ){
			foreach( $arreglo as $registro ){
				$select .= "<option value=\"" . $registro[0] . "\" " . ( ( $request==$registro[0] ) ? "selected" : "" ) . ">" . htmlentities( ucfirst( $registro[1] )) . "</option>";
			}			
		}
	}

	$select .=
		"</select>";
	echo $select;
}
	
	function radioCheck( $sql, $name, $type, $request=null, $xtra=null ){
		$radioCheck = "<p>";

		if( is_array( $sql ) ){
			foreach( $sql as $dato ){
				if( is_array( $request ) ){
					$check = ( in_array( $dato, $request ) ) ? "checked='checked'" : "";				
				}else{
					$check = ( $request==$dato ) ? "checked='checked'" : "";
				}				
				$radioCheck .= "<label>
									<span class='tahoma-11-azul2'>
										<input type='" . $type . "' name='" . $name . ( ( $type=="checkbox") ? "[]" : "" ) . "' value='" . $dato . "' " . $check . " " . $xtra . "/>" . $dato . "
									</span>
							  </label>
							  <br />";
				$i++;						  
			}
		}else{
			$myvar = new db_mysql;	
			$myvar->conectarBd();
			$arreglo = $myvar->get_arreglo( $sql );
			$i = 0;
			foreach( $arreglo as $registro ){
				if( is_array( $request ) ){
					$check = ( in_array( $registro[0], $request ) ) ? "checked='checked'" : "";				
				}else{
					$check = ( $request==$registro[0] ) ? "checked='checked'" : "";
				}			
				$radioCheck .= "<label>
							<span class='tahoma-11-azul2'>
								<input type='" . $type . "' name='" . $name . ( ( $type=="checkbox") ? "[]" : "" ) . "' value='" . $registro[0] . "' " . $check . " " . $xtra . "/>" . htmlentities( $registro[1] ) . "
							</span>
						  </label>
						  <br />";
				$i++;						  
			}
		}
		$radioCheck .= "</p>";
		echo $radioCheck;
/*		if( $type=="checkbox" ){
			echo "<input type='hidden' name='" . $name . "Count' value='" . $i . "'>";
		}	*/	
	}
/*	
	function calendar( $name, $request=null ){

		$calendar = "<input name='BfechaI_evento' type='button' class='tahoma-10-gris-claro' onclick=\"popUpCalendar( this, document.getElementById('" . $name . "'), &quot;yyyy-mm-dd&quot; )\" value='Calendario' />
			 <input name='" . $name . "' id='" . $name . "' class='tahoma-10-gris-claro'  readonly  style='width:160px' value='" . $request . "'/>";
		echo $calendar;
	}
*/
	function calendar( $name, $request=null, $object_focus=null ){
		$calendar = "<a name='BfechaI_evento' onclick=\"popUpCalendar( this, document.getElementById('" . $name . "'), &quot;yyyy-mm-dd&quot; ,'$object_focus' )\" style='FONT-SIZE: 8pt; FONT-FAMILY: Verdana; BACKGROUND-COLOR: RGB(200,200,200)'><img src='img/show-calendar.gif' width='24' height='22'></a>		
			 		<input name='" . $name . "' id='" . $name . "' style='FONT-SIZE: 8pt; FONT-FAMILY: Verdana;' readonly='readonly' value='" . ( ( $request ) ? $request : date( "Y-m-d" ) ) . "'/>";
		
		return $calendar;
	}
	function print_calendar( $name, $request=null, $object_focus=null ){
		echo $this->calendar( $name, $request, $object_focus );
	}
	/**
	 * Enter description here...
	 *
	 * @param string $name - Nombre
	 * @param string $type - Tipo: empty, int, float, string=ancho_cadena
	 * @param string $class - Class de estilos.css
	 * @param string $request - Valor esperado por GET o por POST
	 * @param string $xtra - Valores de cadena adicionales para el conrol
	 * @return string
	 */
	function input( $name, $type, $class=null, $request=null, $xtra ){
		if( isset( $name ) && isset( $type ) ){
			$validar = explode( "=", $type );
			if( count( $validar)>1 )
				$type = "'$validar[0]', '$validar[1]'";
			else
				$type = "'$type'";
			if( !$width )
				$width=200;
			if( !$class )
				$class="tahoma-11-gris-claro";
			if( $request )
				$request = "value='$request'";
			return "<input type='text' name='$name' id='$name' class='$class' $request onblur=\"valida(this,$type)\" onkeypress=\"removeStyle(this)\" $xtra >";
		}else{
			debug( "Los parametros ingresados no son suficientes para usar este control" );
		}
	}
	/**
	 * Escribe un input con las validaciones del proyecto Nitobi
	 *
	 * @param string $name - Nombre
	 * @param string $type - Tipo: empty, int, float, string=ancho_cadena
	 * @param string $class - Class de estilos.css
	 * @param string $request - Valor esperado por GET o por POST
	 * @param string $xtra - Valores de cadena adicionales para el conrol
	 */
	function print_input( $name, $type, $class=null, $request=null, $xtra=null ){
		echo $this->input( $name, $type, $class, $request, $xtra );
	}	
}

?>