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
    $exists=pg_num_rows($res);
    $status=true;
    if ($exists!=0){
        $json_resp = array(
            'status' => $status
        );
        header('Content-Type: application/json');
        echo json_encode($json_resp);
    }else{
        $status=false;
        $json_resp = array(
            'status' => $status
        );
        header('Content-Type: application/json');
        echo json_encode($json_resp);
    }
	


?>