<?php
function redimensionar_jpeg($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura) {

$img = imagecreatefromjpeg($img_original);

$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);

$datos = getimagesize($img_original);

imagecolortransparent($thumb, imagecolorallocate($thumb, 0, 0, 0));
imagealphablending($thumb, false);
imagesavealpha($thumb, true);
imagecopyresampled($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagepng($thumb,$img_nueva);
////////////////////////////////////////////
/*$img = imagecreatefromjpeg($img_original);


$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);



$datos = getimagesize($img_original);

imagecopyresampled ($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);


imagejpeg($thumb,$img_nueva);


*/
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function redimensionar_gif($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura) {


$img = imagecreatefromgif($img_original);


$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);


$datos = getimagesize($img_original);

imagecolortransparent($thumb, imagecolorallocate($thumb, 0, 0, 0));
imagealphablending($thumb, false);
imagesavealpha($thumb, true);
imagecopyresampled($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagepng($thumb,$img_nueva);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function redimensionar_png($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura) {


$img = imagecreatefrompng($img_original);

$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);

$datos = getimagesize($img_original);

imagecolortransparent($thumb, imagecolorallocate($thumb, 0, 0, 0));
imagealphablending($thumb, false);
imagesavealpha($thumb, true);
imagecopyresampled($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagepng($thumb,$img_nueva);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function redimensionar_bmp($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura) {


$img = imagecreatefromwbmp($img_original);

$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);

$datos = getimagesize($img_original);

imagecolortransparent($thumb, imagecolorallocate($thumb, 0, 0, 0));
imagealphablending($thumb, false);
imagesavealpha($thumb, true);
imagecopyresampled($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagepng($thumb,$img_nueva);

}


///////////////////////////////////////////////////////////////////////////////////////
//mantener formato
function redimensionar_jpeg2($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura, $img_nueva_calidad) {


$img = imagecreatefromjpeg($img_original);

$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);

$datos = getimagesize($img_original);

imagecopyresampled ($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagejpeg($thumb,$img_nueva);



}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function redimensionar_gif2($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura, $img_nueva_calidad) {


$img = imagecreatefromgif($img_original);


$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);


$datos = getimagesize($img_original);

imagecolortransparent($thumb, imagecolorallocate($thumb, 0, 0, 0));
imagealphablending($thumb, false);
imagesavealpha($thumb, true);
imagecopyresampled($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagegif($thumb,$img_nueva);


}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function redimensionar_png2($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura, $img_nueva_calidad) {


$img = imagecreatefrompng($img_original);

$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);

$datos = getimagesize($img_original);

imagecolortransparent($thumb, imagecolorallocate($thumb, 0, 0, 0));
imagealphablending($thumb, false);
imagesavealpha($thumb, true);
imagecopyresampled($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagepng($thumb,$img_nueva);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function redimensionar_bmp2($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura, $img_nueva_calidad) {


$img = imagecreatefromwbmp($img_original);


$thumb = imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura);

$datos = getimagesize($img_original);

imagecopyresampled ($thumb, $img, 0, 0, 0, 0, $img_nueva_anchura, $img_nueva_altura, $datos[0], $datos[1]);

imagewbmp($thumb,$img_nueva);

}

?>
