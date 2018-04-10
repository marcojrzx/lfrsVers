  <meta http-equiv="Content-type" content="text/html; charset=UTF-8" />  
<? 
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include_once("sad/funciones-bd.php");

$myvar = new db_mysql;
$myvar->conectarBd();

if($_POST[band]==1){ // es pais
	$sql="select * from estados where id_pais='".$_POST[dato]."' order by nombre ";
	$tipos=$myvar->get_arreglo($sql);
	
	
	if($_POST[dato]==2){ //es mexico
	?>
		<div class="unaopF">
		<p>Estado:</p>
		<select name="id_estado" id="id_estado" onChange="cargaMunicipios();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_estado]?>" ><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
        </div>
        
        <div class="unaopF">
		<p>Municipio:</p>
             <div id="datosEstado1">   <?
			 $sql2=" select * from municipios where activo=1"; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_municipio" id="id_municipio" disabled="disabled">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" ><? echo utf8_encode($tipos[$i][nombre])?></option>
                 <? }?>
               </select>
               </div>
		</div>
		
		<? }else{//if
		?> 
		Pais<input type="text" name="pais" id="pais" />
		Estado<input type="text" name="estado" id="estado" />
		Municipio<input type="text" name="municipio" id="municipio" />
		
		<?
		}
}

if($_POST[band]==2){ // es estado

	$sql="select * from municipios where id_estado='".$_POST[dato]."' order by nombre ";
	$tipos=$myvar->get_arreglo($sql);
	
	?>
         <select name="id_municipio" id="id_municipio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" ><? echo utf8_encode($tipos[$i][nombre])?></option>
                 <? }?>
               </select>
           
<? }
?>