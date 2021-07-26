<?php
        
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    $json = file_get_contents('php://input');

    $params = json_decode($json);
    
    // $url="http://salud.utm.edu.ec/mediser/proxy_mobile_app.php?url=utm";
    $url="https://app.utm.edu.ec/becas/api/publico/IniciaSesion";

    // $data_array = array(
    //     'username' =>  "$params->username",
    //     'password' => "$params->password",
    //     'key' => 'a5a0a8579130b1ac4589c7ebcc402ae3'
    // );
    
    $data_array = array(
        'usuario' =>  "$params->username",
        'clave' => "$params->password"
    );

    // $data_array = array(
    //     'usuario' =>  "jtricerri4736@utm.edu.ec",
    //     'clave' => "Dani-ecu1997"
    // );

    $header = array(
        'X-Api-Key: 3ecbcb4e62a00d2bc58080218a4376f24a8079e1'
    );



    $curl = curl_init();
    $cert = "C:/xampp/apache/conf/ssl.crt/cacert.pem";
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, $cert);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, $cert);
    
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data_array); //TUVE QUE PASAR EL ARRAY SIN TRANSFORMAR A JSON PARA QUE FUNCIONE CON LA API
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        

    $response = curl_exec($curl);
        
    if($e = curl_error($curl)){
        echo $e;
    }else{
        $decoded= json_decode($response);
        
        
        if($decoded->state == 'error'){
            // print_r("El usuario o clave es incorrecta!");
            $json_resp = array(
                'status' => " '$decoded->state",
                'access' => 'failure'
            );
            header('Content-Type: application/json');
            echo json_encode($json_resp);
        }else{
            // print_r("Login satisfactorio");
            // $datosjson= json_encode($decoded->value);
            // print_r($decoded->value->cedula);
            $json_resp = array(
                'status' => $decoded->state,
                'access' => $decoded->state,
                'cedula' => $decoded->value->cedula,
                'nombre' => $decoded->value->nombres,
                'correo' => $decoded->value->mail_alternativo,
                'rol' => $decoded->value->tipo_usuario,
            );
            header('Content-Type: application/json');
            echo json_encode($json_resp);
        }
    }    

        
    curl_close($curl);
?>
