import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  lista: Lista;
  nombreItem: string;

  constructor(private deseosService: DeseosService,
    private router: ActivatedRoute) { 

      const listId = this.router.snapshot.paramMap.get('listId');
      this.lista = this.deseosService.obtenerLista(listId);
    }

    agregarItem(){

      if( this.nombreItem.length === 0 ){
        return;
      }

      const NuevoItem = new ListaItem(this.nombreItem);
      this.lista.items.push( NuevoItem );
      
      this.nombreItem = '';
      this.deseosService.guardarStorage();

    }

    cambioCheck(item: ListaItem)
    {
      
      const pendientes = this.lista.items
                            .filter( itemData => !itemData.completado)
                            .length;


      if (pendientes === 0)
      {
        this.lista.terminadaEn = new Date();
        this.lista.completada = true;
      }else{
        this.lista.terminadaEn = null;
        this.lista.completada = false;
      }

      this.deseosService.guardarStorage();
      
    }

    borrar(i : number)
    {
      this.lista.items.splice(i, 1);

      this.deseosService.guardarStorage();
    }


}
