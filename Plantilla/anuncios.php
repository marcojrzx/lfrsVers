<? 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();

if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}

include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();
$html = new html;

include "funciones-arriba.php";

$sql=" select * from anuncios where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." order by id_anuncio desc "; 
					     $anuncios1=$myvar->get_arreglo($sql);
	
						if(!empty($anuncios1)){
							$maximo=ceil(count($anuncios1)/9);
						}
			
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
									$anuncios[$i]['id_categoriaAnuncio']=$resultados['id_categoriaAnuncio'] ;
									$anuncios[$i]['id_tipoAnuncio']=$resultados['id_tipoAnuncio'] ;
									$anuncios[$i]['titulo']=$resultados['titulo'] ;
									$anuncios[$i]['fechaIngreso']=$resultados['fechaIngreso'] ;
									
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
                url:   'ajax-anuncios.php',
                type:  'get',
                beforeSend: function () {
                        $("#losproductos").html("<div class='cargandoinfo'><img src='imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                        $("#losproductos").html(response);
                }
        });
	
	
}

function editar(id){
	 location.href = "editar-anuncio.php?id="+id;
}

function compartir(id){
	 location.href = "compartir-anuncio.php?id="+id;
}

function comentarios(id){
	 location.href = "comentarios-anuncio.php?id="+id;
}


		
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<center><br>

Buscar anuncio: <input name="palabra" id="palabra" type="text" placeholder="Titulo o caracteristicas" onchange="cambiarPaginaBusqueda(1)"/>
  <div id="losproductos">
  
  <? if(empty($anuncios)){  echo "&nbsp;"; }else{
							?>
								<?php echo "1 de ".$maximo;?>
								<?php
							}
							if($maximo > 1){
							?>
								<a href="javascript:void(0)" onclick="cambiarPaginaBusqueda(2);" class="btop gr"> Siguiente</a>
								<?php
							}?>
       <? for($i=0; $i<count($anuncios); $i++){ 
	   
	   			$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncios[$i][id_anuncio]." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
	   ?>
             
           
           
<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateColumns">
    
    <tr>
       <? for($a=0; $a<3; $a++){
		if($i<count($anuncios)){
		?>
         <td align="center" valign="top"  class="templateColumnContainer">
            <table border="0" cellpadding="10" cellspacing="0" width="100%">
                <tr>
                    <td align="center" valign="middle" class="leftColumnContent">
                        <img src="imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" width="173" style="max-width:173px;" class="columnImage" />
                         <p>Categoria:
                <?
			 $sql2=" select * from categoriasAnuncio where activo=1 and id_categoriaAnuncio=".$anuncios[$i][id_categoriaAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_categoriaAnuncio];
			 ?>
             </p>
			<p>Tipo de Anuncio:
                <?
			 $sql2=" select * from tiposAnuncio where activo=1 and id_tipoAnuncio=".$anuncios[$i][id_tipoAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_tipoAnuncio];
			 ?>
             </p>
            
            
            <p>Titulo:<? echo $anuncios[$i][titulo]?></p>
 			<p>FechaIngreso:<? echo date("Y-m-d",$anuncios[$i][fechaIngreso]);?></p>
            
            
            
            
            <a href="javascript:void(0);" onclick="editar(<?php echo $anuncios[$i][id_anuncio]; ?>);">MODIFICAR</a>
            <a href="javascript:void(0);" onclick="compartir(<?php echo $anuncios[$i][id_anuncio]; ?>);">COMPARTIR</a>
          	
          	<a href="<? echo $anuncios[$i][id_anuncio];?>"  class="eliminarServicio">ELIMINAR</a><div id="dialog2<? echo $anuncios[$i][id_anuncio];?>" class="dialogo"></div>
            <a href="javascript:void(0);" onclick="comentarios(<?php echo $anuncios[$i][id_anuncio]; ?>);">COMENTARIOS</a>
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
<? }//for?>

</div>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
  <script src="js/jquery.validate.js" type="text/javascript"></script>
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
            url: "eliminar-datos.php?borrar-anuncio=1&id="+href2, 
            success: function(data) {
				  location.href = "anuncios.php"
              //$('#dialog2'+href2).html(data);
            }
          });
          $(".unica2"+href2).remove();
        }
		
		
</script>