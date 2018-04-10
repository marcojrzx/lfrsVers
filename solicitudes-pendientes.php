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

$sql=" select * from clientes_has_clientes where id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=3 "; 
$solicitudes=$myvar->get_arreglo($sql);
	
						
							?>



<? include "menu-interno.php";?>	 
<? include "menu2Aux.php";?>	 


<center><br>

  	<? for($i=0; $i<count($solicitudes); $i++){ 
	
	$sql=" select * from clientes where id_cliente=".$solicitudes[$i][id_cliente]." and activo=1 and id_statusCliente=1 limit 1 "; 
$cli=$myvar->get_arreglo($sql);

	?>
	 
         <div class="unAnun">
           <div class="txAn">
            	<p>Amigo: <strong><? if($cli[0][ocultarNom]==1){// si lo quiere ocultar
				echo $cli[0][nombre]." ".$cli[0][apellidos];
				}else{
				echo $cli[0][nick];
				}?></strong></p>
 				<p>Fecha de solicitud: <strong><? echo $solicitudes[$i][fechaSolicitud];?></strong></p>
                 <div id="dialog3<? echo $solicitudes[$i][id_clienteCliente];?>" class="dialogo"> <a href="<? echo $solicitudes[$i][id_clienteCliente];?>"  
                class="btop cf aceptarSolicitud">Aceptar solicitud</a></div>
			 	
                
            </div>
           
            </div>    
<br><br><br>
<? }//for?>

</div>
</center> 


<? include "funciones-abajo.php";?>
  <script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
<script>

//////ELIMINAR SERVICIOS
				     var href3;
 
        $('.aceptarSolicitud').click(function(e) {
			
          e.preventDefault();
          href3 = $(this).attr('href');
          $('#dialog3'+href3).fadeIn(200, function() {
            $(this).html('¿Realmente desea aceptar solicitud?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso2' value='Aceptar'>");
            $(this).append("<input type='button' id='cerrar_dialogo2' value='Eliminar'>");
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
		
		
	
</script>