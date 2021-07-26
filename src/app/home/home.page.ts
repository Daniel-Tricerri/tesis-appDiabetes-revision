import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { datos, exists } from '../interface/task';
import { TaskService } from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private taskService: TaskService, private navCtrl:NavController, private http:HttpClient,
    private app:AppComponent, private Toast: ToastController, private loadingController: LoadingController) { 
  }

  ngOnInit() {
    
  }
  usuario={
    email:'',
    password:''
  }
  
  Logged:boolean;
  loading: HTMLIonLoadingElement;

  onLogin( formulario: NgForm){
    this.presentLoading();
    
    const task={
      username: formulario.form.value.email,
      password: formulario.form.value.password
    };
    this.taskService.Login(task)
    .subscribe((data: datos) =>{
      if(data.access=='success'){
        console.log("datos correctos!!");
        
        
        this.presentToastSuccess();
        this.loading.dismiss();
        this.navCtrl.navigateForward('tabs');
        
        data.correologin=task.username;
        this.taskService.changeData(data.correologin)
        

        this.http.get("https://tranquil-wildwood-15033.herokuapp.com/perfil_exists.php?correo="+this.usuario.email+"").subscribe((res:exists)=>{
          console.log(res.status);
          if(res.status){
            console.log('ya existe en la bd')
            
          }else{
            console.log('guardado en la bd')
            this.http.get("https://tranquil-wildwood-15033.herokuapp.com/Save_perfil.php?rol="+data.rol+"&nombres="+data.nombre+"&correo_alt="+data.correo+"&correo="+data.correologin+"&cedula="+data.cedula+"").subscribe(res=>{
              console.log("Exito!")
            })

          }

          this.app.obtenerDatos();
        });
        
      }else{
        console.log("datos incorrectos");
        this.loading.dismiss();
        this.presentToastfailed();
      }
      
    });
    
          
  }

  async presentToastSuccess() {
    const toast = await this.Toast.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000
    });
    toast.present();
  }

  async presentToastfailed() {
    const toast = await this.Toast.create({
      message: 'inicio de sesión fallido nombre de usuario o contraseña incorrectos',
      duration: 2000
    });
    toast.present();
  }

  async presentToastfailedSuscribe() {
    const toast = await this.Toast.create({
      message: 'No se ha podido establecer conexion con el servicio!',
      duration: 3000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  
}
