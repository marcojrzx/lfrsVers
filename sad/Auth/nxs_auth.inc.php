<?

class nxs_auth{
 
 	
	var $expira = 1440;			// Minutos de Inactividad
	var $paranoico = true;	// Modo Paranoico


	function nxs_auth(){
		session_start();
	}
 
	
	function login($user, $pass){
		if ($myrow = $this->validar($user, $pass)){
			$_SESSION[auth] = session_id();
			$_SESSION[ip] = $_SERVER['REMOTE_ADDR'];
			$_SESSION[host] = $_SERVER['REMOTE_HOST'];
			$_SESSION[user] = $user;
			$_SESSION[pass] = $pass;
			$_SESSION[time] = time();
			$_SESSION['id_tipousuario'] = $myrow->id_tipousuario;
			$_SESSION['id_usuario'] = $myrow->id_usuario;
			
			return true;
		}
		return false;
	}

	
	function logout(){
		$sql = "INSERT INTO tbl_logs (id, id_user, accion, fecha) VALUES ('', '{$_SESSION[id]}', 'Salida del Sistema', NOW())";
		$result = mysqli_query($GLOBALS['conexion'], $sql );
		unset($_SESSION[auth]);
		unset($_SESSION[ip]);
		unset($_SESSION[host]);
		unset($_SESSION[user]);
		unset($_SESSION[pass]);
		unset($_SESSION[time]);
		unset($_SESSION['id_tipousuario']);
		unset($_SESSION['id_usuario']);
		
		session_destroy();
	}
	
	
	function revisar(){
		if ($_SESSION[auth] == session_id() && isset($_SESSION[user]) && isset($_SESSION[pass]) && $_SESSION[ip] == $_SERVER['REMOTE_ADDR']){
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
		
		$sql = "SELECT * FROM usuarios WHERE user='$user' and activo=1 LIMIT 1;";
		$result = mysqli_query($GLOBALS['conexion'], $sql );
	$myrow = mysqli_fetch_object($result);
		if ($myrow->user == $user){
			
			if ($myrow->pass == ($pass)){
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