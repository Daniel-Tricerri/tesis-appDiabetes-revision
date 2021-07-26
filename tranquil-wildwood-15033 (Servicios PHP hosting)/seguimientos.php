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



    $res=pg_query($db," select id_test, resultado, split_part(fecha_registro,' ',1) as fecha_test from test_findrisk, perfil where perfil.id = test_findrisk.fk_perfil and perfil.correo = '$correo' order by fecha_registro desc");
    $exists=pg_num_rows($res);
    $status=true;
    while ($row = pg_fetch_row($res)) {
		$resultado[]=$row;
	}
    if ($exists!=0){
        $json_resp = array(
            'status' => $status,
            'respuesta' => $resultado,
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