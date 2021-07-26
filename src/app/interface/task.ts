export interface loginTask{
    username: string;
    password: string;
}

export interface datos {
  status: string;
  access: string;
  cedula: string;
  nombre: string;
  correo: string;
  rol: string;
  correologin: string;
  exists: string;
}

export interface exists {
  status: boolean;
}

export interface recomendaciones {
  status: string;
  nombre: string;
  imc: string;
  cintura: string;
  hipertension:string;
  actividad:string;
  alimentacion:string;
}
