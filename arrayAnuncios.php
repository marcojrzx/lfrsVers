<?
session_start();
$urlprincipal="http://lofers.club/"; 

if($b!=''){
	$adfa=" and ".$b;
}
$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  
	".$adfa." and id_cliente!=".$_SESSION[id_clienteLof4]."  order by id_anuncio desc "; 
	
$anunciosREP=$myvar->get_arreglo($sql);
	
$_SESSION['id_clienteLof4ANUNCIOS']='';

$iban=0;

for($i=0; $i<count($anunciosREP); $i++){ 
	 
	   if($anunciosREP[$i][id_aquienComparte]==0){ // si para el solo
	   }elseif($anunciosREP[$i][id_aquienComparte]==1){ // si es poblico general
	   		$_SESSION['id_clienteLof4ANUNCIOS'][$iban]=$anunciosREP[$i][id_anuncio];
			$iban++;
	   }elseif($anunciosREP[$i][id_aquienComparte]==2){ // amigos
	   			$sql=" select id_clienteCliente from clientes_has_clientes where id_statusSolicitud=1 
				 and  ((id_cliente=".$anunciosREP[$i]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].") or 
				 (id_cliente1=".$anunciosREP[$i]['id_cliente']." and id_cliente=".$_SESSION[id_clienteLof4].")) limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

	   			if(count($siesamigo)>0){
				$_SESSION['id_clienteLof4ANUNCIOS'][$iban]=$anunciosREP[$i][id_anuncio];
				$iban++;
				
				}
				
	   }elseif($anunciosREP[$i][id_aquienComparte]==3){ // un amigo
	   			$sql=" select id_compartidoA from compartidoA where id_anuncio=".$anunciosREP[$i][id_anuncio]."
				and id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

				  if(count($siesamigo)>0){
					 $_SESSION['id_clienteLof4ANUNCIOS'][$iban]=$anunciosREP[$i][id_anuncio];
					 $iban++;
				  }
							
	   }elseif($anunciosREP[$i][id_aquienComparte]==4){ // amigos Estado
	   			$sql=" select id_estado from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_estado]==$anunciosREP[$i][id_estado]){
				 	$_SESSION['id_clienteLof4ANUNCIOS'][$iban]=$anunciosREP[$i][id_anuncio];
					$iban++;
				}
				 
	   }elseif($anunciosREP[$i][id_aquienComparte]==5){ // Amigos Municipio
	   			$sql=" select id_municipio from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_municipio]==$anunciosREP[$i][id_municipio]){
				 	$_SESSION['id_clienteLof4ANUNCIOS'][$iban]=$anunciosREP[$i][id_anuncio];
					$iban++;
				}
	   }
	   
 }//for
 
 if($iban>0){
 for($ss=0;$ss<$iban; $ss++){
				//if($ss==0)
					//$caaa=" and (";
				if($ss==0)
					$caaa=" (";
					
				$caaa=$caaa." id_anuncio=".$_SESSION[id_clienteLof4ANUNCIOS][$ss];
				
				if($ss<count($_SESSION[id_clienteLof4ANUNCIOS])-1)
					$caaa.=" or ";
					
				if($ss==count($_SESSION[id_clienteLof4ANUNCIOS])-1)
					$caaa.=" ) ";
						
				
		}
 }else{
	 
	 $caaa=" ( 1=0 )";
 }

 ?>