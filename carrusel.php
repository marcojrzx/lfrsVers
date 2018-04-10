<? session_start();
$urlprincipal="http://lofers.club/"; ?>
<!-- EMPIEZA SLIDER (CARRUSEL DE IMAGENES) -->
		<div class="carruselP">
            <ul class="bxslider">
                <?
			//	 include("sad/funciones-bd.php");
$myvar = new db_mysql;
$myvar->conectarBd();
?>
            
            <? if($_SESSION[id_clienteLof4]){
				
				include "arrayAnuncios.php";
				$sql=" select * from anuncios where activo=1 and ".$caaa." and id_statusAnuncio=1  
				order by  RAND() limit 5"; 
				
				
				 }else{// no esta registrado
				 
						$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  
					and id_aquienComparte=1 order by id_anuncio desc ";  // solo los publicos
				
				 }
				 
				  $anuncios=$myvar->get_arreglo($sql);
				
				
				
				for($i=0; $i<count($anuncios); $i++){
					
					/*
					 $ban=0;
	   if($anuncios[$i][id_aquienComparte]==0){ // si es poblico general
	   }elseif($anuncios[$i][id_aquienComparte]==1){ // si es poblico general
	   $ban=1;
	   }elseif($anuncios[$i][id_aquienComparte]==2){ // amigos
	   			$sql=" select id_clienteCliente from clientes_has_clientes where id_statusSolicitud=1 
				 and  ((id_cliente=".$anuncios[$i]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].") or 
				 (id_cliente1=".$anuncios[$i]['id_cliente']." and id_cliente=".$_SESSION[id_clienteLof4].")) limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

	   			if(count($siesamigo)>0)
				$ban=1;
				
	   }elseif($anuncios[$i][id_aquienComparte]==3){ // un amigo
	   			$sql=" select id_compartidoA from compartidoA where id_anuncio=".$anuncios[$i][id_anuncio]."
				and id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

				  if(count($siesamigo)>0)
							$ban=1;
							
	   }elseif($anuncios[$i][id_aquienComparte]==4){ // amigos Estado
	   			$sql=" select id_estado from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_estado]==$anuncios[$i][id_estado])
				 $ban=1;
				 
	   }elseif($anuncios[$i][id_aquienComparte]==5){ // Amigos Municipio
	   			$sql=" select id_municipio from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_municipio]==$anuncios[$i][id_municipio])
				 $ban=1;
	   }
	   
		   
		 if($ban==1){*/
					
					
					$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncios[$i]['id_anuncio']." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
			  $sql2=" select * from estados where activo=1 and id_estado=".$anuncios[$i]['id_estado']." limit 1";
			 $es=$myvar->get_arreglo($sql2);
			 $sql2=" select * from municipios where activo=1 and id_municipio=".$anuncios[$i]['id_municipio']." limit 1";
			 $mun=$myvar->get_arreglo($sql2);?>
                <li><div class="fdoPback unPback<? echo $i;?>">
                               <? if($imagen[0][imagen]!=''){
				   $imbn=$imagen[0][imagen];
             }else{ $imbn="sf.jpg";}//else?>

				
				<style>.unPback<? echo $i;?> {
    background-image: url("<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imbn;?>");
}</style>
                <div class="txPback"><p><? echo $anuncios[$i]['titulo']?></p>
                <p>
				<? echo $mun[0]['nombre'].", ".$es[0]['nombre']."  ".obtenerfecha($anuncios[$i]['fechaSuceso'])?>
                </p></div>
                
                
                <div class="infoPback">
				<? if($_SESSION[id_clienteLof4]){?><a href="<? echo $urlprincipal?><?  echo $anuncios[$i]['id_anuncio']?>/anuncio">
                Si tienes info click aquí</a>
                <? }else{?>
                <a href="<? echo $urlprincipal?><?  echo $anuncios[$i]['id_anuncio']?>/autenticacion">
                Si tienes info click aquí</a>
                <? }?></div></div></li>
                <? //}//if
				}//for?>
            </ul>
        </div>
	<!-- TERMINA SLIDER (CARRUSEL DE IMAGENES) -->


	<?php include("traductor.php"); ?>