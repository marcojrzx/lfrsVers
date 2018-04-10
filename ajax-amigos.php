<? 
session_start();

include_once('sad/funciones-bd.php');
include_once('sad/funciones.php');
$myvar = new db_mysql;
$myvar->conectarBd();
$urlprincipal="http://lofers.club/"; 
if($_GET['paginas-desp-bus']){

$sql=" (select cc.id_clienteCliente, cc.id_cliente1 as id_clienteF from clientes_has_clientes cc, clientes c 
 where  cc.id_cliente=".$_SESSION[id_clienteLof4]." and cc.id_statusSolicitud=1 and cc.id_cliente1=c.id_cliente and  
 (nombre like '%".$_GET[palabra]."%' or apellidos like '%".$_GET[palabra]."%'
  or nick like '%".$_GET[palabra]."%'
   or url like '%".$_GET[palabra]."%'
   ) and activo=1 and id_statusCliente=1) UNION (select cc.id_clienteCliente, cc.id_cliente as id_clienteF from clientes_has_clientes cc, clientes c  where  cc.id_cliente1=".$_SESSION[id_clienteLof4]." and cc.id_statusSolicitud=1 and cc.id_cliente=c.id_cliente and  (nombre like '%".$_GET[palabra]."%' or apellidos like '%".$_GET[palabra]."%') and activo=1 and id_statusCliente=1)"; 

					    
						$amigos1=$myvar->get_arreglo($sql);
						if(!empty($amigos1)){
						$max=ceil(count($amigos1)/20);
						}
						$mas=$_GET['_pagi_pg']+1;
						$menos=$_GET['_pagi_pg']-1;

			
						$_pagi_sql = $sql;
						$_pagi_cuantos =20;

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
									$amigos[$i]['id_clienteCliente']=$resultados['id_clienteCliente'] ;
									$amigos[$i]['id_cliente']=$resultados['id_clienteF'] ;
										
									$i++;
							}




						
			if($_GET['_pagi_pg']==1 ){
				  echo "&nbsp;";
			 }else{?>
           		 <a href="javascript:void(0);" onclick="cambiarPaginaBusqueda(<?php echo $menos; ?>);" class="btop gr">Anterior</a>
            
			<?php
   			 }
	
			if(empty($amigos)){ echo "&nbsp;"; }else{
				echo  $_GET['_pagi_pg']." de ".$max.""; ?> 
            <?php
   			 }
				  
			if($_GET['_pagi_pg']==$max || empty($amigos)){
					echo "&nbsp;";
			}else{?>
            	<a href='javascript:void(0);'  onclick="cambiarPaginaBusqueda(<?php echo $mas; ?>);" class="btop gr"> Siguiente </a>
            <?php }	 
							?>
							
<? for($i=0; $i<count($amigos); $i++){ 
	   
	   		$sql2=" select * from clientes where activo=1 and id_statusCliente=1 and id_cliente=".$amigos[$i][id_cliente]."  limit 1";
			 $cli=$myvar->get_arreglo($sql2);
	   ?>
             
          <div class="unAmigo">
            	<img src="<? echo $urlprincipal?>imagenes/clientes/<? echo $cli[0][foto]?>" />
            	<?
			 		 if($cli[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cli[0][nombre]." ".$cli[0][apellidos];
	$ur=$cli[0][nombre]."-".$cli[0][apellidos];
	}else{
	echo $cli[0][nick];
		$ur=$cli[0][nick];

	}
	
	
	if(trim($cli[0][url])==''){
		$cli[0][url]=$ur;
	}
		
			 	?>
             <div id="dialog2<? echo $amigos[$i][id_clienteCliente];?>" class="dialogo"> 
            <a href="<? echo $amigos[$i][id_clienteCliente];?>"  class="btop cf eliminarServicio">Rechazar</a></div>
             
            <a href="<? echo $urlprincipal?><? echo $cli[0][id_cliente]?>/muro-de-anuncios/<? echo titulo($cli[0][url])?>"  class="btop cf ">Ver sus anuncios</a>
             
</div>
             
<br><br><br>
<? }//for?>
<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
<script>

//////ELIMINAR SERVICIOS
		     var href2;
 
        $('.eliminarServicio').click(function(e) {
          e.preventDefault();
          href2 = $(this).attr('href');
          $('#dialog2'+href2).fadeIn(200, function() {
            $(this).html('¿Realmente desea eliminar este registro?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso2' value='Aceptar'>");
            $(this).append("<input type='button' id='cerrar_dialogo2' value='Cancelar'>");
          });
			
        $('#dialog2'+href2).on("click", "#ejecutar_proceso2", function(event) {
    ejecutar2(href2);
});
        $('#dialog2'+href2).on("click", "#cerrar_dialogo2", function(event) {
    cerrar2(href2);
});
 });
		
		
        function cerrar2(href2) {
          $('#dialog2'+href2).fadeOut();
        }
 
        function ejecutar2(href2) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?borrar-anuncio=1&id="+href2, 
            success: function(data) {
				 $('#dialog2'+href2).html(data);
            }
          });
          $(".unica2"+href2).remove();
        }
		
		
</script>
<? 
exit();
 
}
//Gel?>