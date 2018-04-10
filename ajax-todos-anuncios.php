
<? 
session_start();

include_once('sad/funciones-bd.php');
include_once('sad/funciones.php');
$myvar = new db_mysql;
$myvar->conectarBd();
$urlprincipal="http://lofers.club/"; 
if($_GET['paginas-desp-bus']){
	
	if($_POST[buscar]==1){
		if($_POST[id_tipoAnuncio]){
				$b=" or id_tipoAnuncio=".$_POST[id_tipoAnuncio];
			}
		
		if($_POST[titulo]){
				$b.=" or titulo '%".$_POST[titulo]."%'";
			}
		if($_POST[nombre]){
				$b.=" or nombre '%".$_POST[nombre]."%'";
			}
		if($_POST[fechaSuceso]){
				$b.=" or fechaSuceso=".$_POST[fechaSuceso];
			}
		if($_POST[id_estado]){
				$b.=" or id_estado=".$_POST[id_estado];
			}
		if($_POST[lugarSuceso]){
				$b.=" or  lugarSuceso '%".$_POST[lugarSuceso]."%'";
			}
		if($_POST[ubicacion]){
				$b.=" or ubicacion '%".$_POST[ubicacion]."%'";
			}
		if($_POST[id_tipoPago]){
				$b.=" or id_tipoPago=".$_POST[id_tipoPago];
			}
		if($_POST[monto]){
				$b.=" or monto=".$_POST[monto];
			}
			
			
		
	}else{
			if($_GET[id_cliente]){
				$b=" and id_cliente=".$_GET[id_cliente];
			}
	
	
		
	}
	
	
			include "arrayAnuncios.php";
		
$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  
	and ".$caaa." and id_cliente!=".$_SESSION[id_clienteLof4]."  and (titulo like '%".$_GET[palabra]."%' or 
		caracteristicas like '%".$_GET[palabra]."%') order by id_anuncio desc "; 
$anuncios1=$myvar->get_arreglo($sql);

	// SE ANEXO
	$b='';
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



			echo "<div class='paginacion'>";
						
			if($_GET['_pagi_pg']==1 ){
				  echo "";
			 }else{?>
           	
            
            
           
            <a href="javascript:void(0);" onclick="cambiarPaginaBusqueda(<?php echo $menos; ?>);" class="btop gr">Anterior</a>
            
			<?php
   			 }
	
			if(empty($anuncios)){ echo ""; }else{
				echo  $_GET['_pagi_pg']." de ".$max.""; ?> 
          
           
           
           
           
            <?php
   			 }
				  
			if($_GET['_pagi_pg']==$max || empty($anuncios)){
					echo "";
			}else{?>
            
            	<a href='javascript:void(0);'  onclick="cambiarPaginaBusqueda(<?php echo $mas; ?>);" class="btop gr"> Siguiente </a>
            
			
			<?php }	 
			?>
             </div>               
			
							
 	<? 
	if(count($anuncios)>0){
 	for($i=0; $i<count($anuncios); $i++){ 
	   
	?>
             
        
       <? for($a=0; $a<3; $a++){
		   
		  if($i<count($anuncios)){
			
	  		$sql2=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$anuncios[$i][id_anuncio]." limit 1";
			 $anuncio=$myvar->get_arreglo($sql2);
			
				$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
			 
			 $sql2=" select * from clientes where activo=1 and id_cliente=".$anuncio[0][id_cliente]." limit 1";
			 $cliente=$myvar->get_arreglo($sql2);
		
		?>
         
         
	<div class="unAnun">
    <a href="<? echo $urlprincipal?><? echo $anuncio[0][id_anuncio]?>/anuncio">
    	<div class="imAn" style="background-image:url(
        <? if($imagen[0][imagen]!=''){?>
            <? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>
            <? }else{?>
            <? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg
            <? }//else?>
        );">
        	
		</div>
     </a>
        <div class="txAn">
            
            <p><strong> <? echo $anuncio[0][titulo]?></strong></p>
            <p>Publicado por: <strong><? 
			if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	echo $cliente[0][nick];
	}?></strong></p>
            </div>
                        </div>
           
                   
       <?
	  //	 }//if ban
		}//if
	    if($a!=2)
		$i++; 
	   }// for a?>
<? 		
   }//for
   
   }else{//if ?>
   No hay anuncios disponibles
   <? }?>
<div class="paginacion">  
<? 		
   
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
							
}
//Gel?>  </div>