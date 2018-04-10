<?php

//

//////////////////////////////////////////////////////////////////////
//clase de db
/////////////////////////////////////////////////////////////////////////
class db_mysql {

function concatena($bd){

			$nueva['bd']="lofers";
			$nueva['usuario']= "lofers";
			$nueva['pass'] = "lof4rs!123";
		
		
	
	return $nueva;
}

function conectarBd($baseDatos="lofers" ){
	$nueva= $this -> concatena($baseDatos);
	$baseDatos=$nueva['bd'];
	$db_host = "localhost";
	$db_name = $baseDatos;
	$db_user = $nueva['usuario'];
	$db_pass = $nueva['pass'];
	$GLOBALS['conexion'] = @mysqli_connect($db_host, $db_user, $db_pass) or die ("No puedo conectar a el Servidor de Base de Datos en $db_host");
	mysqli_select_db($GLOBALS['conexion'],$db_name) or die ("No existe la Base de Datos $db_name");
}

//	Regresa un objeto que contiene los campos de un query
function get_field( $sql ){
	$result = mysqli_query($GLOBALS['conexion'], $sql );
	if( $result ){
		$myrow = mysqli_fetch_object( $result );
		return $myrow;			
	}else{
		//SOLO ES PARA GUARDAR EL LOG DE ERRORES
		debug( "SQL ejecutada:<BR>" . $sql . "<BR><BR><BR>Error MySQL dice:<br>" . mysqli_error(), "Error en MySQL o resultado nulo" );
	}
}



function get_arreglo($sql){
$count=0;
//echo $sql;
	$resultado = mysqli_query($GLOBALS['conexion'],$sql);
	if( !empty( $resultado ) ){
		if ($myrow = mysqli_fetch_array($resultado)){
			do{
				$myvar[$count] = $myrow;
				$count++;
			} while($myrow = mysqli_fetch_array($resultado));
			return $myvar;
		}
		else
		{
			return $myvar;
		}
	}
}

	function execute( $sql, $db="lofers" ){
				mysqli_query($GLOBALS['conexion'], $sql );
//mysql_db_query( $db, $sql ) or die(	
	//		debug( "Line: " . __LINE__ . "<BR>File:" . __FILE__ . "<BR><BR><BR>SQL ejecutada:<BR>" . $sql . "<BR><BR><BR>Error MySQL dice:<br>" . mysql_error(), "Error en MySQL" )
		//	);
	}

function regCount($sql){
	$RunSQL=mysqli_query($GLOBALS['conexion'],$sql) or die(mysqli_error());
	$encontrados = mysqli_num_rows($RunSQL);	
	return $encontrados;
}

}//class
?>