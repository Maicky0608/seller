/* 3rd party components */
import { EventEmitter, Injectable } from '@angular/core';

/**
 * Método que permite crear los events emitter que se emplean en el módulo stores
 */
@Injectable()
export class EventEmitterDialogs {

  eventOpenCreateDialog = new EventEmitter<any>();

  /**
   *  Evento eventEmitter que permite detectar cuando un usuario a realizado la busqueda de una tienda.
   * @param {any} store
   * @memberof EventEmitterDialogs
   */
  openDialogCreate(view: boolean) {
    this.eventOpenCreateDialog.emit(view);
  }
}
