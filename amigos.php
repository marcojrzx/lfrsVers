<? 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
$urlprincipal="http://lofers.club/"; 

if (!$aut->revisar()){
	header("Location: ".$urlprincipal."index.html?msg=3");
}
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();
$html = new html;
$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";



include "funciones-arriba.php";

$sql=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where  id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION (select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1)"; 
					     $amigos1=$myvar->get_arreglo($sql);
	
						if(!empty($amigos1)){
							$maximo=ceil(count($amigos1)/20);
						}
			
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
									$amigos[$i]['id_cliente']=$resultados['id_cliente'] ;
									
									$i++;
							}




							
							?>
							
<script>
function cambiarPaginaBusqueda(pag){
	var parametros = {
                "palabra" : document.getElementById('palabra').value,
                "paginas-desp-bus" : 1,
				"_pagi_pg" : pag
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>ajax-amigos.php',
                type:  'get',
                beforeSend: function () {
                        $("#losproductos").html("<div class='cargandoinfo'><img src='<? echo $urlprincipal?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                        $("#losproductos").html(response);
                }
        });
	
	
}

</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<? include "menu2Aux.php";?>	 


<center><br>

Buscar entre mis amigos: 
  <input name="palabra" id="palabra" type="text" placeholder="nombre o nick o url" onchange="cambiarPaginaBusqueda(1)" style="width: 200px!important;"/><div class="lupa"><img src="<? echo $urlprincipal?>imagenes/lupa.png"></div>
  <div id="losproductos">
  
  	<div class="paginacion">
	<? if(empty($amigos)){  echo "&nbsp;"; }else{
							?>
								<?php echo "1 de ".$maximo;?>
								<?php
							}
							if($maximo > 1){
							?>
								<a href="javascript:void(0)" onclick="cambiarPaginaBusqueda(2);" class="btop gr"> Siguiente</a>
								<?php
							}?>
                            
          </div>            
       <? for($i=0; $i<count($amigos); $i++){ 
	   
	   		$sql2=" select * from clientes where activo=1 and id_statusCliente=1 and id_cliente=".$amigos[$i][id_cliente]."  limit 1";
			 $cli=$myvar->get_arreglo($sql2);
	   ?>
           
            <div class="unAmigo">
            <? if($cli[0][foto]!=''){?>
            	<img src="<? echo $urlprincipal?>imagenes/clientes/<? echo $cli[0][foto]?>" />
             <? }else{?>
             		<img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" />
            <? }?>
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
			
             
			<? }//for?>
            
         <div class="paginacion">
	<? if(empty($amigos)){  echo "&nbsp;"; }else{
							?>
								<?php echo "1 de ".$maximo;?>
								<?php
							}
							if($maximo > 1){
							?>
								<a href="javascript:void(0)" onclick="cambiarPaginaBusqueda(2);" class="btop gr"> Siguiente</a>
								<?php
							}?>
                            
          </div>    
            	

</div>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
  <script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
<script>

//////ELIMINAR SERVICIOS
		     var href2;
 
        $('.eliminarServicio').click(function(e) {
          e.preventDefault();
          href2 = $(this).attr('href');
          $('#dialog2'+href2).fadeIn(200, function() {
            $(this).html('¿Realmente desea eliminar a éste amigo?<br><br>');
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
            url: "<? echo $urlprincipal?>eliminar-datos.php?borrar-solicitud=1&id="+href2, 
            success: function(data) {
				$('#dialog2'+href2).html(data);
            }
          });
          $(".unica2"+href2).remove();
        }
		
		
</script>