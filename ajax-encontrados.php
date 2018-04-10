<? 
session_start();

include_once('sad/funciones-bd.php');
include_once('sad/funciones.php');
$myvar = new db_mysql;
$myvar->conectarBd();
$urlprincipal="http://lofers.club/"; 
if($_GET['paginas-desp-bus']){

if($_GET[t]){
	$b="  and a.id_tipoCliente==".$_GET[t];
}else{
	$b='';
}

$sql=" select a.* from quienencuentra q, clientes a where q.id_cliente=".$_SESSION[id_clienteLof4]." and  q.activo=1 and 
 and (c.titulo like '%".$_GET[palabra]."%' or c.caracteristicas like '%".$_GET[palabra]."%') q.id_cliente=a.id_cliente and a.activo=1 and a.id_statusCliente=1 ".$b.""; 

						$anuncios1=$myvar->get_arreglo($sql);
						if(!empty($anuncios1)){
						$max=ceil(count($anuncios1)/9);
						}
						$mas=$_GET['_pagi_pg']+1;
						$menos=$_GET['_pagi_pg']-1;

			
						$_pagi_sql = $sql;
						$_pagi_cuantos =9;

						include("Pag/paginator.inc.php");
						$primera= "<a href=".$_pagi_primera . ">";
							if ($_pagi_anterior=="no hay mas"){
								$anterior= " ";
							}else{
								$anterior= "<a href=".$_pagi_anterior.">";
							}
							
							if ($_pagi_siguiente=="no hay mas"){
								$siguiente= " ";
							}else{
								$siguiente= "<a href=".$_pagi_siguiente.">";
							}

							$ultimo= "<a href=".$_pagi_ultimo .">";
							$i=0;

							while($resultados = mysqli_fetch_array($_pagi_result)){
									$anuncios[$i]['id_anuncio']=$resultados['id_anuncio'] ;
									$anuncios[$i]['id_cliente']=$resultados['id_cliente'] ;
									$anuncios[$i]['id_aquienComparte']=$resultados['id_aquienComparte'] ;
									$anuncios[$i]['id_estado']=$resultados['id_estado'] ;
									$anuncios[$i]['id_municipio']=$resultados['id_municipio'] ;
									
									$i++;
							}




						
			if($_GET['_pagi_pg']==1 ){
				  echo "&nbsp;";
			 }else{?>
           		 <a href="javascript:void(0);" onclick="cambiarPaginaBusqueda(<?php echo $menos; ?>);" class="btop gr">Anterior</a>
            
			<?php
   			 }
	
			if(empty($anuncios)){ echo "&nbsp;"; }else{
				echo  $_GET['_pagi_pg']." de ".$max.""; ?> 
            <?php
   			 }
				  
			if($_GET['_pagi_pg']==$max || empty($anuncios)){
					echo "&nbsp;";
			}else{?>
            	<a href='javascript:void(0);'  onclick="cambiarPaginaBusqueda(<?php echo $mas; ?>);" class="btop gr"> Siguiente </a>
            <?php }	 
							?>
							
 <? for($i=0; $i<count($anuncios); $i++){ 
	   
	   $ban=0;
	   if($anuncios[$i][id_aquienComparte]==1){ // si es poblico general
	   $ban=1;
	   }elseif($anuncios[$i][id_aquienComparte]==2){ // amigos
	   			$sql=" select id_clienteCliente from cliente_has_clientes where id_statusSolicitud=1 
				 and  ((id_cliente=".$anuncios[$i]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].") or 
				 (id_cliente=".$anuncios[$i]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].")) limit 1 "; 
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
				 
	   }elseif($anuncios[$i][id_aquienComparte]==6){ // Amigos Municipio
	   			$sql=" select id_municipio from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_municipio]==$anuncios[$i][id_municipio])
				 $ban=1;
	   }
	   
	   
	   
	   if($ban==1){
	   		 ?>
             
           <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateColumns">
    
    <tr>
       <? for($a=0; $a<3; $a++){
		if($i<count($anuncios)){
			$sql2=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$anuncios[$i][id_anuncio]." limit 1";
			 $anuncio=$myvar->get_arreglo($sql2);
			
				$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
			 
			 $sql2=" select * from clientes where activo=1 and id_cliente=".$anuncio[0][id_cliente]." limit 1";
			 $cliente=$myvar->get_arreglo($sql2);
		?>
         <td align="center" valign="top"  class="templateColumnContainer">
            <table border="0" cellpadding="10" cellspacing="0" width="100%">
                <tr>
                    <td align="center" valign="middle" class="leftColumnContent">
                    <a href="<? echo $urlprincipal?><? echo $anuncio[0][id_anuncio]?>/anuncio">
                    <? if($imagen[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" />
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" />
            <? }//else?>
              <p>Categoria:
                <?
			 $sql2=" select * from categoriasAnuncio where activo=1 and id_categoriaAnuncio=".$anuncio[0][id_categoriaAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_categoriaAnuncio];
			 ?>
             </p>
			<p>Tipo de Anuncio:
                <?
			 $sql2=" select * from tiposAnuncio where activo=1 and id_tipoAnuncio=".$anuncio[0][id_tipoAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_tipoAnuncio];
			 ?>
             </p>
            
            
            <p>Titulo:<? echo $anuncio[0][titulo]?></p>
 			<p>FechaIngreso:<? echo date("Y-m-d",$anuncio[0][fechaIngreso]);?></p>
            <p>Cliente:<? 
			if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	echo $cliente[0][nick];
	}?></p></a>
                    </td>
                </tr>
                <tr>
                    <td height="30">
                    </td>
                </tr>
            </table>
        </td>
       <?
		}//if
	    $i++; 
	   }// for a?>
    </tr>
</table>
             
<br><br><br>
<? 		}//if ban
   }//for
}
//Gel?>  