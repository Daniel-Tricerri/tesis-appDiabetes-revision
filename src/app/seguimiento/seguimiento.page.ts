import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, IonList, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {

  @ViewChild(IonList)ionList:IonList;

  loading: HTMLIonLoadingElement;

  constructor(private taskservice:TaskService, private http:HttpClient, private alert:AlertController, 
    private navCtrl:NavController, private loadingController:LoadingController) { }

  ngOnInit() {

    this.presentAlert();

    this.taskservice.serviceData.subscribe(data => (this.sentData=data));
    console.log('sent data from login page', this.sentData)
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/seguimientos.php?correo="+this.sentData+"").subscribe((res:any)=>{
    
    this.dataArray = res.respuesta;
    console.log(this.dataArray)

    })
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'alert-wrapper',
      mode: "ios",
      backdropDismiss:false,
      header: 'SEGUIMIENTO DE TEST FINDRISC',
      subHeader: 'En ésta seccion podrá ver los tests de findrisc realizados. En cada uno de ellos, se mostrarán las preguntas en detalle con su respectiva respuesta y se asignará un tono rojo si existe un peligro, un amarillo si presenta una advertencia y un verde si NO presenta mayor riesgo.',
      
      
      buttons: ['ENTENDIDO']
    });

    await alert.present();
  }

  ver(element:any){
    console.log('id', element[0])
    this.taskservice.changeDataTest(element[0])
    this.ionList.closeSlidingItems();
    this.navCtrl.navigateForward('show-seguimiento');
  }

  refresh(){
    this.presentLoading();
    console.log("refresh")
    this.taskservice.serviceData.subscribe(data => (this.sentData=data));
    console.log('sent data from login page', this.sentData)
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/seguimientos.php?correo="+this.sentData+"").subscribe((res:any)=>{
    this.loading.dismiss();
    this.dataArray = res.respuesta;
    console.log(this.dataArray)

    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  sentData:any;
  dataArray:string[];
}
