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



    $res=pg_query($db," select nombres as Nombres_completos, split_part(nombres,' ',3) as primer_nombre, fecha_registro, detalle_resultado, resultado from perfil, test_findrisk where perfil.id = test_findrisk.fk_perfil and perfil.correo = '$correo' order by fecha_registro desc limit 1 ");
    $exists=pg_num_rows($res);
    $status=true;
    while ($row = pg_fetch_row($res)) {
		$resultado[]=$row;
	}
    if ($exists!=0){
        $json_resp = array(
            'status' => $status,
            'nombres' => $resultado[0][0],
            'primerNombre' => $resultado[0][1],
            'ultimo_registro' => $resultado[0][2],
            'detalle_resultado' => $resultado[0][3],
            'puntuacion' => $resultado[0][4]
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