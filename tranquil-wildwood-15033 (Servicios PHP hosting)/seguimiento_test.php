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
    $test=$_GET['test'];



    $res=pg_query($db," select split_part(nombres,' ',3) as primer_nombre, imc, cintura, medicado_hipert, frecuencia_activid, consumo_frut_verd, elevacion_glucosa, familiares_diabet, resultado, edad, fecha_registro from perfil, test_findrisk where perfil.id = test_findrisk.fk_perfil and perfil.correo = '$correo' and test_findrisk.id_test=$test order by fecha_registro desc limit 1 ");
    $exists=pg_num_rows($res);
    $status=true;
    while ($row = pg_fetch_row($res)) {
		$resultado[]=$row;
	}
    if ($exists!=0){
        $json_resp = array(
            'status' => $status,
            'nombre' => $resultado[0][0],
            'imc' => $resultado[0][1],
            'cintura' => $resultado[0][2],
            'hipertension' => $resultado[0][3],
            'actividad' => $resultado[0][4],
            'alimentacion' => $resultado[0][5],
            'glucosa' => $resultado[0][6],
            'familiares_diabeticos' => $resultado[0][7],
            'resultado_test' => $resultado[0][8],
            'edad' => $resultado[0][9],
            'ultimo_test' => $resultado[0][10],
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