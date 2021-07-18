import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild( IonList ) lista: IonList;

  constructor(public deseosService: DeseosService,
      private router: Router,
      private alertCtl: AlertController) { }

  ngOnInit() {}

  listaSelecccionada(lista: Lista)
  {

    if(this.terminada)
    {      
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);    
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);    
    }

  }

  borrarLista(lista: Lista)
  {
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista)
  {
    const alert = await this.alertCtl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            if(data.titulo.length === 0){
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();

            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}
