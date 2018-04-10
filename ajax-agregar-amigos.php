<? 
session_start();

include_once('sad/funciones-bd.php');
include_once('sad/funciones.php');
$myvar = new db_mysql;
$myvar->conectarBd();
$urlprincipal="http://lofers.club/"; 

if($_GET['paginas-desp-bus']){


$sql="SELECT c.*
FROM clientes as c
LEFT OUTER JOIN ((SELECT cc1.id_cliente1 AS id_cliente FROM clientes_has_clientes AS cc1
 WHERE id_cliente =".$_SESSION[id_clienteLof4]." AND cc1.id_statusSolicitud =1 ) UNION (SELECT cc2.id_cliente 
 FROM clientes_has_clientes as cc2 WHERE cc2.id_cliente1 =".$_SESSION[id_clienteLof4]." AND cc2.id_statusSolicitud =1))
 AS cc3 ON c.id_cliente = cc3.id_cliente  where  c.id_cliente!=".$_SESSION[id_clienteLof4]." 
 and (c.nombre like '%".$_GET[palabra]."%' or c.apellidos like '%".$_GET[palabra]."%' 
   or c.nick like '%".$_GET[palabra]."%'
   or c.url like '%".$_GET[palabra]."%'
 
 ) 
 and cc3.id_cliente IS NULL  order by c.nombre desc"; 
					$amigos1=$myvar->get_arreglo($sql);
					
						if(!empty($amigos1)){
						$max=ceil(count($amigos1)/9);
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
									$amigos[$i]['id_cliente']=$resultados['id_cliente'] ;
									$amigos[$i]['nombre']=$resultados['nombre'] ;
									$amigos[$i]['apellidos']=$resultados['apellidos'] ;
									$amigos[$i]['foto']=$resultados['foto'] ;
									$amigos[$i]['nick']=$resultados['nick'] ;
									$amigos[$i]['ocultarNom']=$resultados['ocultarNom'] ;
										
									$i++;
							}



?>
		    <div class="paginacion">
	<?			
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
		</div>
							
<? 
   for($i=0; $i<count($amigos); $i++){ 
	
$sql="SELECT *
 FROM clientes_has_clientes 
 WHERE id_cliente =".$_SESSION[id_clienteLof4]."
 AND id_cliente1=".$amigos[$i][id_cliente];
 $a=$myvar->get_arreglo($sql); // tu mandaste la info

$sql="SELECT *
 FROM clientes_has_clientes 
 WHERE id_cliente1 =".$_SESSION[id_clienteLof4]."
 AND id_cliente=".$amigos[$i][id_cliente];
$b=$myvar->get_arreglo($sql); // te mandaron la info


$sql="SELECT *
 FROM reportesCliente 
 WHERE id_cliente =".$_SESSION[id_clienteLof4]."
 AND id_clienteReportado=".$amigos[$i][id_cliente]."  and activo=1";
$c=$myvar->get_arreglo($sql); // te mandaron la info


?>
             <div class="unAmigo">
             <img src="<? echo $urlprincipal?>imagenes/clientes/<? echo $amigos[$i][foto]?>" />
              <p>
                <?
			    if($amigos[$i][ocultarNom]==1){// si lo quiere ocultar
	echo $amigos[$i][nombre]." ".$amigos[$i][apellidos];
	$ur=$amigos[$i][nombre]."-".$amigos[$i][apellidos];
	}else{
	echo $amigos[$i][nick];
		$ur=$amigos[$i][nick];

	}
	
	
	if(trim($amigos[$i][url])==''){
		$amigos[$i][url]=$ur;
	}
			
			?>
			 <a href="<? echo $urlprincipal?><? echo $amigos[$i][id_cliente]?>/muro-de-anuncios/<? echo titulo($amigos[$i][url])?>"  class="btop cf ">Ver sus anuncios</a>
     
			
			<?
			if(count($a)>0 and $a[0][id_statusSolicitud]==3){// yo le mande solicitud
				echo "<p>Solicitud pendiente</p>";
			}elseif(count($b)>0 and $b[0][id_statusSolicitud]==3){// me mandaron soliciut
				?>
                
		      <div id="dialog3<? echo $b[0][id_clienteCliente];?>" class="dialogo"> <a href="<? echo $b[0][id_clienteCliente];?>"  
                class="btop cf aceptarSolicitud">Aceptar o rechazar solicitud</a> Descuida no se lo diremos.</a></div>
			 	
                <? if(count($c)<=0){?>
                <div id="dialog4<? echo $amigos[$i][id_cliente];?>" class="dialogo"> <a href="<? echo $amigos[$i][id_cliente];?>"  class="btop cf reportarCliente">Denunciar usuario</a></div>
            	<? }else{?>
                	Usuario denunciado
				<? }?>
			<? }else{ ?>
             <div id="dialog2<? echo $amigos[$i][id_cliente];?>" class="dialogo"> 
             <a href="<? echo $amigos[$i][id_cliente];?>"  
             class="btop cf eliminarServicio">Enviar solicitud</a></div>
              <? if(count($c)<=0){?>
                <div id="dialog4<? echo $amigos[$i][id_cliente];?>" class="dialogo"> 
                <a href="<? echo $amigos[$i][id_cliente];?>"  class="btop cf reportarCliente">
                Denunciar usuario</a></div>
            	<? }else{?>
                	Usuario denunciado
				<? }?>
			<? }?>
             </p>
			</div>
             
			<? }//for?>
             
			
<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
<script>

//////ELIMINAR SERVICIOS
		     var href2;
 
        $('.eliminarServicio').click(function(e) {
          e.preventDefault();
          href2 = $(this).attr('href');
          $('#dialog2'+href2).fadeIn(200, function() {
            $(this).html('¿Realmente desea mandar solicitud?<br><br>');
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
				$('#dialog2'+href2).html('<a href="'+href2+'"  class="eliminarServicio">MANDAR SOLICITUD</a>');
        }
 
        function ejecutar2(href2) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?mandar-solicitud=1&id="+href2, 
            success: function(data) {
				 $('#dialog2'+href2).html(data);
            }
          });
          $(".unica2"+href2).remove();
        }
		


// ACEPTAR SOLICITUD
//////ELIMINAR SERVICIOS
		     var href3;
 
        $('.aceptarSolicitud').click(function(e) {
          e.preventDefault();
          href3 = $(this).attr('href');
          $('#dialog3'+href3).fadeIn(200, function() {
            $(this).html('¿Realmente desea aceptar solicitud?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso2' value='Aceptar'>");
            $(this).append("<input type='button' id='cerrar_dialogo2' value='Rechazar'>");
          });
			
        $('#dialog3'+href3).on("click", "#ejecutar_proceso2", function(event) {
    ejecutar3(href3);
});
        $('#dialog3'+href3).on("click", "#cerrar_dialogo2", function(event) {
    cerrar3(href3);
});
 });
		
		
        function cerrar3(href3) {
           $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?aceptar-solicitud=2&id="+href3, 
            success: function(data) {
				 $('#dialog3'+href3).html(data);
            }
          });
          $(".unica3"+href3).remove();
        }
       
 
        function ejecutar3(href3) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?aceptar-solicitud=1&id="+href3, 
            success: function(data) {
				 $('#dialog3'+href3).html(data);
            }
          });
          $(".unica3"+href3).remove();
        }
		
	//////REPORTAR CLIENTE
		     var href4;
 
        $('.reportarCliente').click(function(e) {
          e.preventDefault();
          href4 = $(this).attr('href');
          $('#dialog4'+href4).fadeIn(200, function() {
            $(this).html('¿Realmente desea Denunciar al Cliente?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso4' value='Si'>");
            $(this).append("<input type='button' id='cerrar_dialogo4' value='Cancelar'>");
          });
			
        $('#dialog4'+href4).on("click", "#ejecutar_proceso4", function(event) {
    ejecutar4(href4);
});
        $('#dialog4'+href4).on("click", "#cerrar_dialogo4", function(event) {
    cerrar4(href4);
});
 });
		
		
		 function cerrar4(href4) {
				$('#dialog4'+href4).html('<a href="'+href4+'"   class="reportarCliente">Denunciar Cliente</a>');
        }
 
        function ejecutar4(href4) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?reportar-cliente=1&id="+href4,
            success: function(data) {
				 $('#dialog4'+href4).html(data);
            }
          });
          $(".unica4"+href4).remove();
        }
		
		
		
	// ACEPTAR SOLICITUD

	
</script>
<? exit();

}
//Gel?>