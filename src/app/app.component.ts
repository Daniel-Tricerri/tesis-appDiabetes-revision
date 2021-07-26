import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  sentData:any;
  loading: HTMLIonLoadingElement;
  usuario = {
    rol : '' ,
    nombre : '',
    cedula : '',
    correologin : ''
  }
  constructor(private taskService: TaskService, private http:HttpClient, private loadingController:LoadingController,
                private navCtrl: NavController) {
    
  
  }

  obtenerDatos(){
    this.taskService.serviceData.subscribe(data => (this.sentData=data));
    console.log('sent data from login page', this.sentData)
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/perfil.php?correo="+this.sentData+"").subscribe(datos=>{
      console.log('array con datos: ',datos);
      this.usuario.rol=datos[0][1]
      this.usuario.nombre=datos[0][2]
      this.usuario.cedula=datos[0][5]
      this.usuario.correologin=datos[0][4]
    });
  }

  
  cerrarSesion(){
    this.presentLoading();
    
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cerrando sesión...'
    });
    await this.loading.present();
    this.navCtrl.navigateForward('/home');
    this.loading.dismiss();
  }

}
