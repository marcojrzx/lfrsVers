<?

class nxs_auth{
 
 	
	var $expira = 1440;			// Minutos de Inactividad
	var $paranoico = true;	// Modo Paranoico


	function nxs_auth(){
		session_start();
	}
 
	
	function login($user, $pass){
		if ($myrow = $this->validar($user, $pass)){
			$_SESSION[authLof4] = session_id();
			$_SESSION[ipLof4] = $_SERVER['REMOTE_ADDR'];
			$_SESSION[hostLof4] = $_SERVER['REMOTE_HOST'];
			$_SESSION[userLof4] = $user;
			$_SESSION[passLof4] = $pass;
			$_SESSION[time] = time();
			$_SESSION['id_tipoClienteLof4'] = $myrow->id_tipoCliente;
			$_SESSION['id_clienteLof4'] = $myrow->id_cliente;
			
			return true;
		}
		return false;
	}

	
	function logout(){
		//$sql = "INSERT INTO tbl_logs (id, id_user, accion, fecha) VALUES ('', '{$_SESSION[id_cliente]}', 'Salida del Sistema', NOW())";
		//$result = mysqli_query($GLOBALS['conexion'], $sql );
		unset($_SESSION[authLof4]);
		unset($_SESSION[ipLof4]);
		unset($_SESSION[hostLof4]);
		unset($_SESSION[userLof4]);
		unset($_SESSION[passLof4]);
		unset($_SESSION[time]);
		unset($_SESSION['id_tipoClienteLof4']);
		unset($_SESSION['id_clienteLof4']);
		
		session_destroy();
	}
	
	
	function revisar(){
		if ($_SESSION[authLof4] == session_id() && isset($_SESSION[userLof4]) && isset($_SESSION[passLof4]) && $_SESSION[ipLof4] == $_SERVER['REMOTE_ADDR']){
			if ( ($_SESSION[time] + ($this->expira * 60)) >= time() ) {
				$_SESSION[time] = time();
				return true;
			}
			//$this->logout();
			$_SESSION[error] = "tiempo";
			return false;
		}
		return false;
	}
	
	
	 
	function validar($user, $pass){
		
		$sql = "SELECT * FROM clientes WHERE email='$user' and id_statusCliente=1 and activo=1 LIMIT 1;";
		$result = mysqli_query($GLOBALS['conexion'], $sql );
	$myrow = mysqli_fetch_object($result);
		if ($myrow->email == $user){
			
			if ($myrow->password == ($pass)){
						return $myrow;
			}
			else{
						$_SESSION[error] = "Password   Incorrecto";
			}
						

				
		}
		$_SESSION[error] = "Nombre de Usuario Incorrecto";
		return false;
	}
}
?>