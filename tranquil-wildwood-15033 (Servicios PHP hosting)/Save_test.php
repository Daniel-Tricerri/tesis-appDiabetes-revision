<?php

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once("Conectar.php");
	$db = Conect::conexion();
	$resultado = array();
    $genero=$_GET['genero'];
    $imc=$_GET['imc'];
    $frecuencia_activid=$_GET['frecuencia_activid'];
    $consumo_frut_verd=$_GET['consumo_frut_verd'];
    $medicado_hipert=$_GET['medicado_hipert'];
    $elevacion_glucosa=$_GET['elevacion_glucosa'];
    $familiares_diabet=$_GET['familiares_diabet'];
    $resultado_test=$_GET['resultado_test'];
    $edad=$_GET['edad'];
    $cintura=$_GET['cintura'];
    $user=$_GET['user'];
    $detalle_resultado=$_GET['detalle_resultado'];

    $result=pg_query($db," SELECT id FROM perfil WHERE perfil.correo = '$user'; ");

    while ($row = pg_fetch_row($result)) {
		$resultado[]=$row;
	}
    
    $valor= current($resultado);
    $fk_perfil= intval($valor[0]); // ID DEL PERFIL QUE REALIZA EL TEST


    $res=pg_query($db," INSERT INTO test_findrisk(
        genero, imc, frecuencia_activid, consumo_frut_verd, medicado_hipert, elevacion_glucosa, familiares_diabet,  
        fk_perfil, resultado, edad, cintura, fecha_registro, detalle_resultado)
        VALUES ( '$genero', '$imc', '$frecuencia_activid', '$consumo_frut_verd', '$medicado_hipert', '$elevacion_glucosa',
         '$familiares_diabet', '$fk_perfil', '$resultado_test', '$edad','$cintura', CURRENT_TIMESTAMP, '$detalle_resultado'); ");

	echo json_encode('test saved!!');





    // $this->res=pg_query($this->db,"SELECT concat(nombre, ' ',apellido) as nombres, fecha as fecha_test, resultado as puntaje, mensaje
	// 		from perfil join test_findrisk on perfil.id_perfil = test_findrisk.fk_perfil
	// 		join resultado_test on test_findrisk.id_test = resultado_test.fk_test
	// 		where test_findrisk.fecha = (select max(fecha) from test_findrisk where fk_perfil = '$id') and test_findrisk.fk_perfil='$id'");
		
	// while ($row = pg_fetch_row($this->res)) {
	// 	$this->resultado[]=$row;
	// }

	// echo json_encode($this->resultado);

?>