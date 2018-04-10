<? 
include_once("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
if (!$aut->revisar()){

	header("Location: index.php?msg=5");

}


function permisos($a,$b){
		/////////////////////////////////////////////////// P E R M I S O S ////////////////////////////////////////////
	$myvar = new db_mysql;
	$myvar->conectarBd();
//$query=new sp_consultas;


		//id_pantall $a, 
		//$b=status permiso 
		//0 alta
		//1 Modificar
		//2 Cobnsultar
		//3 elminar
		$sql="SELECT p.permiso FROM usuarios u, roles_has_pantallas p where u.id_usuario=".$_SESSION[id_usuario]." and u.id_rol=p.id_rol and id_pantalla=".$a."";
		$usuario=$myvar->get_arreglo($sql);
		
		if($usuario[0][permiso][$b]==0){ // no hay permiso
			return 0;
		}else{
			return 1;
		}
		/////////////////////////////////////////////////// P E R M I S O S ////////////////////////////////////////////
		
		
 }?>