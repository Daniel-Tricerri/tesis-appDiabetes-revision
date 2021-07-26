import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private http:HttpClient, private alert:AlertController, private navCtrl:NavController,
                  private taskservice:TaskService, private Toast: ToastController) { }
  //tipos de respuesta= 1:multiple opcion, 2:respuesta input
  cuestionario: Array<any> = [
    {pregunta:'Por favor, seleccione su género:', tipo: '1'},
    {pregunta:'¿Su edad oscila entre?', tipo:'1'},
    {pregunta:'Indice de masa corporal (IMC):', tipo:'2'},
    {pregunta:'Indique su perimetro de la cintura medido debajo de las costillas (normalmente a la altura del ombligo)', tipo:'1'},
    {pregunta:'¿Realiza habitualmente al menos 30 minutos de actividad fisica cada dia (o 4 horas semanales), en el trabajo y/o en el tiempo libre?', tipo:'1'},
    {pregunta:'¿Con que frecuencia come frutas o verduras?', tipo:'1'},
    {pregunta:'¿Toma medicina para la hipertension regularmente?', tipo:'1'},
    {pregunta:'¿Le han encontrado alguna vez valores de glucosa altos (control medico, durante una enfermedad o embarazo)', tipo:'1'},
    {pregunta:'¿Se le ha diagnosticado diabetes (tipo 1 o 2) a alguno de sus familiares allegados u otros parientes?', tipo:'1'}
  ]
  //masculino = true / femenino = false
  
  
  genero:boolean;
  imc:number;
  test={
    genero:'',
    edad:'',
    imc:{peso:'', altura:''},
    cintura:'',
    actividad:'',
    frutas_verd:'',
    medicado_hipert:'',
    glucosa_alta:'',
    diagnostico_diab:''
  }

  //condiciones para obtener el puntaje del test
  pts_edad:number; pts_imc:number; pts_perimetro:number; pts_actividad:number; pts_alimentacion:number;
  pts_medicado_hipert:number; pts_glucosa_alta:number; pts_diagnostico_diab:number;
  pts_resultado_final:number;
  detalle_resultado:string;

  //variables para confirmar que se ha respondido todas las preguntas del test
  conf_genero:boolean; conf_edad:boolean; conf_peso:boolean; conf_altura:boolean; conf_imc:boolean;
  conf_peri:boolean; conf_acti:boolean; conf_frut:boolean;conf_hiper:boolean; conf_gluc:boolean; conf_fami:boolean
  
  cacular_resultado(){
      //edad
      if(this.test.edad=='Menos de 45 años'){
        this.pts_edad = 0
      }else if(this.test.edad=='Entre 45 y 54 años'){
        this.pts_edad = 2
      }else if(this.test.edad=='Entre 55 y 64 años'){
        this.pts_edad = 3
      }else if(this.test.edad=='Más de 64 años'){
        this.pts_edad = 4
      }
      //imc
      if(this.imc<25){
        this.pts_imc = 0
      }else if(this.imc>24 && this.imc<31){
        this.pts_imc = 1
      }else if(this.imc>30){
        this.pts_imc = 3
      }
      //perimetro de la cintura
      if(this.test.cintura=='Menos de 80 cm'||this.test.cintura=='Menos de 94 cm'){
        this.pts_perimetro = 0
      }else if(this.test.cintura=='Entre 80-88 cm'||this.test.cintura=='Entre 94-102 cm'){
        this.pts_perimetro = 3
      }else if(this.test.cintura=='Más 88 cm'||this.test.cintura=='Más 102 cm'){
        this.pts_perimetro = 4
      }
      //actividad fisica
      if(this.test.actividad=='Si'){
        this.pts_actividad = 0
      }else if(this.test.actividad=='No'){
        this.pts_actividad = 2
      }
      //frecuencia de consumo de frutas y verduras
      if(this.test.frutas_verd=='Todos los dias'){
        this.pts_alimentacion = 0
      }else if(this.test.frutas_verd=='No todos los dias'){
        this.pts_alimentacion = 1
      }
      //medicado de hipertension
      if(this.test.medicado_hipert=='Si'){
        this.pts_medicado_hipert = 2
      }else if(this.test.medicado_hipert=='No'){
        this.pts_medicado_hipert = 0
      }
      //glucosa alta
      if(this.test.glucosa_alta=='Si'){
        this.pts_glucosa_alta = 5
      }else if(this.test.glucosa_alta=='No'){
        this.pts_glucosa_alta = 0
      }
      //Familiares diabeticos
      if(this.test.diagnostico_diab=='No'){
        this.pts_diagnostico_diab = 0
      }else if(this.test.diagnostico_diab=='Si: abuelos, tios, primos'){
        this.pts_diagnostico_diab = 3
      }else if(this.test.diagnostico_diab=='Si: padres, hermanos o hijos'){
        this.pts_diagnostico_diab = 5
      }
      this.pts_resultado_final = this.pts_edad + this.pts_imc + this.pts_perimetro + this.pts_actividad + 
      this.pts_alimentacion + this.pts_medicado_hipert + this.pts_glucosa_alta + this.pts_diagnostico_diab;
      //asignar pronostico segun el puntaje obtenido en el test
      if(this.pts_resultado_final<7){
        this.detalle_resultado="Su riesgo de contraer diabetes tipo 2 en los próximos 10 años es bajo, se calcula que 1 de cada 100 individuos con un riesgo similar al suyo sufrirá la enfermedad."
      }else if(this.pts_resultado_final>6 && this.pts_resultado_final<12){
        this.detalle_resultado="Su riesgo de contraer diabetes tipo 2 en los próximos 10 años es ligeramente elevado, se calcula que 1 de cada 25 individuos con un riesgo similar al suyo sufrirá la enfermedad."
      }else if(this.pts_resultado_final>11 && this.pts_resultado_final<15){
        this.detalle_resultado="Su riesgo de contraer diabetes tipo 2 en los próximos 10 años es moderado, se calcula que 1 de cada 6 individuos con un riesgo similar al suyo sufrirá la enfermedad."
      }else if(this.pts_resultado_final>14 && this.pts_resultado_final<21){
        this.detalle_resultado="Su riesgo de contraer diabetes tipo 2 en los próximos 10 años es alto, se calcula que 1 de cada 3 individuos con un riesgo similar al suyo sufrirá la enfermedad."
      }else if(this.pts_resultado_final>20){
        this.detalle_resultado="Su riesgo de contraer diabetes tipo 2 en los próximos 10 años es muy alto, se calcula que 1 de cada 2 individuos con un riesgo similar al suyo sufrirá la enfermedad."
      }
      
  }


  genero_(ev:CustomEvent){
    this.conf_genero=true;
    console.log(ev.detail.value);
    this.test.genero=ev.detail.value;
  }
  edad_(ev:CustomEvent){
    this.conf_edad=true;
    console.log(ev.detail.value);
    this.test.edad=ev.detail.value;
  }
  imc_peso(ev:CustomEvent){
    this.conf_peso=true;
    this.test.imc.peso = ev.detail.value;
    if( this.test.imc.peso==='' || this.test.imc.altura==='' ){
      this.conf_imc=false;
      console.log('uno de los dos campos se encuentra vacio')
    }
  }
  imc_altura(ev:CustomEvent){
    this.conf_altura=true;
    this.test.imc.altura = ev.detail.value;
    
    if(this.conf_peso && this.conf_altura){
      this.conf_imc=true;
      console.log(this.test.imc.peso, " y ", this.test.imc.altura, "comprobados")
      if( this.test.imc.peso==='' || this.test.imc.altura==='' ){
        this.conf_imc=false;
        console.log('uno de los dos campos se encuentra vacio')
      }
    }
  }
  cintura_(ev:CustomEvent){
    this.conf_peri=true;
    console.log(ev.detail.value);
    this.test.cintura=ev.detail.value;
  }
  actividad_(ev:CustomEvent){
    this.conf_acti=true;
    console.log(ev.detail.value);
    this.test.actividad=ev.detail.value;
  }
  frutas_(ev:CustomEvent){
    this.conf_frut=true;
    console.log(ev.detail.value);
    this.test.frutas_verd=ev.detail.value;
  }
  hiper_(ev:CustomEvent){
    this.conf_hiper=true;
    console.log(ev.detail.value);
    this.test.medicado_hipert=ev.detail.value;
  }
  glucosa_(ev:CustomEvent){
    this.conf_gluc=true;
    console.log(ev.detail.value);
    this.test.glucosa_alta=ev.detail.value;
  }
  diabetes_(ev:CustomEvent){
    this.conf_fami=true;
    console.log(ev.detail.value);
    this.test.diagnostico_diab=ev.detail.value;
  }

  calcular_imc(){
    var peso:number = +this.test.imc.peso
    var altura:number = +this.test.imc.altura
    this.imc= (peso/(altura)**2)
    console.log(this.imc)
  }
  
  registrar(){
    if(this.conf_genero && this.conf_edad && this.conf_imc && this.conf_peri && this.conf_acti && this.conf_frut
      && this.conf_hiper && this.conf_gluc && this.conf_fami){
        this.presentAlertConfirm();
      }else{
        this.presentToastSuccess();
      }
    
    
  }

  async presentToastSuccess() {
    const toast = await this.Toast.create({
      message: 'Ups! aun no haz respondido todas las preguntas.',
      duration: 1500
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Genial! ',
      message: '<strong>Si aceptas guardaremos tú información proporcionada.</strong> :)',
      buttons: [
        {
          text: 'En otro momento.',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'De acuerdo!',
          handler: () => {
            console.log('Confirm Okay');
            console.log(this.test)
            this.calcular_imc();
            this.cacular_resultado();
            this.http.get("https://tranquil-wildwood-15033.herokuapp.com/Save_test.php?genero="+this.test.genero+"&imc="+this.imc+"&frecuencia_activid="+this.test.actividad+"&consumo_frut_verd="+this.test.frutas_verd+"&medicado_hipert="+this.test.medicado_hipert+"&elevacion_glucosa="+this.test.glucosa_alta+"&familiares_diabet="+this.test.diagnostico_diab+"&resultado_test="+this.pts_resultado_final+"&edad="+this.test.edad+"&cintura="+this.test.cintura+"&user="+this.sentData+"&detalle_resultado="+this.detalle_resultado+"")
            .subscribe((res)=>{
              console.log(res)
              this.navCtrl.navigateForward('/tabs/recomendaciones');
              this.taskservice.confirmarTest("Si");
              
            })
            
            
          }
        }
      ]
    });

    await alert.present();
  }
  
  cambiarGenero(genero: string){
    if(genero=='m'){
      this.genero=true;
    }else{
      this.genero=false;
    }
  }

  sentData:any;
  ngOnInit() {
    this.taskservice.serviceData.subscribe(data => (this.sentData=data));
    console.log('sent data from login page', this.sentData)
  }

}
