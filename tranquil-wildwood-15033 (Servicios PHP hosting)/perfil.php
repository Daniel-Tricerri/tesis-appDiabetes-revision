<?php

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once("Conectar.php");
	$db = Conect::conexion();
	$resultado = array();
    
    $correo=$_GET['correo'];



    $res=pg_query($db," SELECT * FROM perfil WHERE perfil.correo = '$correo'; ");
    while ($row = pg_fetch_row($res)) {
		$resultado[]=$row;
	}
    
    echo json_encode ($resultado)
	


?>