<?php
	
	class Conect{
		
		public static function conexion() {
			
			$con= pg_connect("host='ec2-44-194-145-230.compute-1.amazonaws.com' dbname=d7o8f8qqif15pi port=5432 user=ounzpuszrsiond password=7723163112661ac442c0ae8f357d31f91eca7c0b7dd87d03cafeed49cbea0ac2") or die("error de conexion".pg_last_error());
			return $con;

		}
	
	}

?>