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







							?>

<script>
$.ajax({
	type:"POST",
	url:"<? echo $urlprincipal?>miembro-grupo.php",
	data:{test:2},
	success: function(data){
		$("#divAmigos").html("");
		$("#divAmigos").html(data);
		 var x = "<button id='nwG'> Nuevo Grupo </button>"
		 $("#divAmigos").append(x);
		 $("#exampleModal").modal("hide");
		 $("#nwG").on("click", function(){
			$("#exampleModal").modal("show")
			$.ajax({
							 type: "POST",
							url:"<? echo $urlprincipal?>combo-amigos2.php",
							 data: dataString,
							 success: function(data){
								 if(!$(".modal-body").html().includes("Amigos")){
									 $(".modal-body").append(data);
									 }

							 }
	});
		 })
	}
})
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>
<? include "menu2Aux.php";?>

<div class="modal fade" id="modalEl" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Eliminar grupo</h5>

      </div>
      <div class="modal-body" style="color:black">
        <h4>Si eliminas este grupo las publicaciones asociadas a el tambien se eliminaran</h4>
				<h4>¿Quieres eliminar este grupo?</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button id="eli" style="background-color:rgb(251, 63, 63)"type="button" class="btn btn-primary">Eliminar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar grupo</h5>

      </div>
      <div id="mEdit" class="modal-body" style="color:black">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button id="guardarE" style="background-color:rgb(197, 63, 251)"type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>

<center>

	<table id="divAmigos">

	</table>
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
<script type="text/javascript">
	function polo(eit){
		var idee  = eit;
		$.ajax({
			type:"POST",
			url:"<? echo $urlprincipal?>edit-grupo.php",
			data:{idGrupo:idee},
			success:function(data){
				console.log(data);
				$("#mEdit").html("");
				$("#mEdit").append(data);

				$("#modalEdit").modal("show");
				$("#guardarE").attr("onclick", "guardarE("+idee+")");
			}
		})
	}

	function modalE(id) {
		var ide = id;
		$("#modalEl").modal("show");

		$("#eli").on("click", function(){
			console.log("es el ide "+ide);
			$.ajax({
				type:"POST",
				url:"<? echo $urlprincipal?>delete-grupo.php",
				data:{idGrupo:ide},
				success:function(data){
					$("#modalEl").modal("hide");
					$("#"+ide).remove();
				}
			})
		})
	}

	function eliminarBotonMiembro(idU, idG){
  $.ajax({
		type:"POST",
		url:"<? echo $urlprincipal?>eliminar-miembro.php",
		data:{idGrupo:idG ,idCliente:idU},
		success: function(data){
			$("#"+idU).remove();
		}
	})

	}

	 function guardarE(idEd){
		 console.log("guardarE");
		var nombre = $("#newNombre").val();
		var ides = [];
		$("input:checkbox[name=check_listEdit]:checked").each(function(){
			 var x = $(this).val();
			 console.log(x);
			 ides.push(x);
		})
		console.log(ides);

		$.ajax({
			type:"POST",
			url:"<? echo $urlprincipal?>edits-grupo.php",
			data:{nombre:nombre, idGrupoE:idEd, arreglo:ides},
			succes: function(){

			}
		})


	}


	//eliminarBotonMiembro(1,92
</script>
