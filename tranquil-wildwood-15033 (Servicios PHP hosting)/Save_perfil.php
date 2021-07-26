<?php

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    require_once("Conectar.php");
	$db = Conect::conexion();
	$resultado = array();
    $rol=$_GET['rol'];
    $nombres=$_GET['nombres'];
    $correo_alt=$_GET['correo_alt'];
    $correo=$_GET['correo'];
    $cedula=$_GET['cedula'];


    $res=pg_query($db," INSERT INTO perfil(
        rol, nombres, correo_alt, correo, cedula, fecha_reg)
        VALUES ('$rol', '$nombres', '$correo_alt', '$correo', '$cedula', CURRENT_DATE); ");

	echo json_encode('perfil saved!!');

    // $this->res=pg_query($this->db,"SELECT concat(nombre, ' ',apellido) as nombres, fecha as fecha_test, resultado as puntaje, mensaje
	// 		from perfil join test_findrisk on perfil.id_perfil = test_findrisk.fk_perfil
	// 		join resultado_test on test_findrisk.id_test = resultado_test.fk_test
	// 		where test_findrisk.fecha = (select max(fecha) from test_findrisk where fk_perfil = '$id') and test_findrisk.fk_perfil='$id'");
		
	// while ($row = pg_fetch_row($this->res)) {
	// 	$this->resultado[]=$row;
	// }

	// echo json_encode($this->resultado);

?>