<? session_start();
$urlprincipal="http://lofers.club/";

$myvar = new db_mysql;
$myvar->conectarBd();

?>

<div class="infoPback" style="position:unset;cursor:pointer">Si tienes info click aquí</div>


<!-- EMPIEZA SLIDER (CARRUSEL DE IMAGENES) -->
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
	<!-- Indicators -->
	<!-- Wrapper for slides -->
	<div class="carousel-inner" role="listbox" >

            <? if($_SESSION[id_clienteLof4]){

				include "arrayAnuncios.php";
				$sql=" select * from anuncios where activo=1 and ".$caaa." and id_statusAnuncio=1
				order by  RAND() limit 5";


				 }else{// no esta registrado

						$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1
					and id_aquienComparte=1 order by id_anuncio desc ";  // solo los publicos

				 }

				  $anuncios=$myvar->get_arreglo($sql);


					$sql2=" select * from Grupo where id_owner=".$_SESSION[id_clienteLof4]." ";
					$anuncios2=$myvar->get_arreglo($sql2);

				for($i=0; $i<count($anuncios); $i++){


					$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncios[$i]['id_anuncio']." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
			  $sql2=" select * from estados where activo=1 and id_estado=".$anuncios[$i]['id_estado']." limit 1";
			 $es=$myvar->get_arreglo($sql2);
			 $sql2=" select * from municipios where activo=1 and id_municipio=".$anuncios[$i]['id_municipio']." limit 1";
			 $mun=$myvar->get_arreglo($sql2);?>
        <? if($i == 0){  ?>
	      <div class="item active  unPback<? echo $i;?>" id="<? echo $anuncios[$i]['id_anuncio'];?>">
        <? }else{ ?>
					<div class="item  unPback<? echo $i;?>" id="<? echo $anuncios[$i]['id_anuncio'];?>" >
	      <?}?>
				<? if($imagen[0][imagen]!=''){
				$imbn=$imagen[0][imagen];
				}else{ $imbn="sf.jpg";}//else?>

	      <img style="width: 100%; height: 525px" src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imbn;?>" alt="...">
	      <div class="carousel-caption" style="border-radius:10px;background-color: rgb(177, 2, 126, 0.8); left: 0%; right: 0%; bottom: 1px; ">
					<h4 style="color:#FFAF2B"><? echo $anuncios[$i]['titulo']?></h4>
					<p style="color:white; font-size:14px;">
						<? echo $mun[0]['nombre'].", ".$es[0]['nombre']."  ".obtenerfecha($anuncios[$i]['fechaSuceso'])?>
					</p>
	      </div>
	    </div>

	  <? } ?>

		<? for($i=0; $i<count($anuncios2); $i++){
						$sql3=" select * from grupo_publicacion where id_grupo=".$anuncios2[$i][id_Group]." ";
						$anuncios3=$myvar->get_arreglo($sql3);
						for($j=0; $j<count($anuncios3); $j++){
							$sql4=" select * from anuncios where id_anuncio=".$anuncios3[$j][id_pub]." ";  // solo los
							$anuncios4=$myvar->get_arreglo($sql4);

			?>

		<?	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncios4[0]['id_anuncio']." order by fotoPrincipal desc limit 1";
	 $imagen=$myvar->get_arreglo($sql2);
		$sql2=" select * from estados where activo=1 and id_estado=".$anuncios4[0]['id_estado']." limit 1";
	 $es=$myvar->get_arreglo($sql2);
	 $sql2=" select * from municipios where activo=1 and id_municipio=".$anuncios4[0]['id_municipio']." limit 1";
	 $mun=$myvar->get_arreglo($sql2);?>
			<div class="item  unPback<? echo $anuncios3[$j][id_pub];?>" id="<?echo $anuncios3[$j][id_pub] ?>" >
		<? if($imagen[0][imagen]!=''){
		$imbn=$imagen[0][imagen];
		}else{ $imbn="sf.jpg";}//else?>

		<img style="width: 100%; height: 525px" src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imbn;?>" alt="...">
		<div class="carousel-caption" style="border-radius:10px;background-color: rgb(177, 2, 126, 0.8); left: 0%; right: 0%; bottom: 1px; ">
			<h4 style="color:#FFAF2B"><? echo $anuncios4[0]['titulo']?></h4>
			<p style="color:white; font-size:14px;">
				<? echo $mun[0]['nombre'].", ".$es[0]['nombre']."  ".obtenerfecha($anuncios[$i]['fechaSuceso'])?>
			</p>
			<p style="color:white; font-size:14px;">
				<strong>GRUPO:  <? echo $anuncios2[$i][name_Group] ?></strong>
			</p>
		</div>
	</div>

				<? } ?>
			<? } ?>


		<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>



</div>

<? if($_SESSION[id_clienteLof4]){?>
    <script type="text/javascript">
    	$(".infoPback").on("click", function(){

					var id = $(".active").attr("id");

					location.href = "http://lofers.club/"+id+"/anuncio";
			})
    </script>
<? }else{?>
	<script type="text/javascript">
		$(".infoPback").on("click", function(){

				var id = $(".active").attr("id");
			
				location.href = "http://lofers.club/"+id+"/autenticacion";

		})
	</script>

<? }?>


	<?php include("traductor.php"); ?>
