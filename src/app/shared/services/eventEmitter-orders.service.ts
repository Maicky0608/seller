/* 3rd party components */
import { EventEmitter, Injectable } from '@angular/core';
import { HistoricalDevolutionEntity } from '../models';
import { HistoricalDevolutionModule } from '@app/secure';

/**
 * Método que permite crear los events emitter que se emplean en la aplicación
 */
@Injectable()
export class EventEmitterOrders {

    orderList = new EventEmitter<any>();
    fraudList = new EventEmitter<any>();
    filterOrderList = new EventEmitter<any>();
    filterBillingList = new EventEmitter<any>();
    filterOrdersWithStatus = new EventEmitter<any>();
    filterHistoricalDevolutionWithStatus = new EventEmitter<any>();
    tableInformationUploadGuide = new EventEmitter<any>();
    clearTable = new EventEmitter<any>();
    filterParams = new EventEmitter<any>();

    /**
     *  Evento eventEmitter que permite crear un suscribe para saber cuando consultar las órdenes de acuerdo al estado proporcionado.
     * @param {any} state
     * @memberof EventEmitterOrders
     */
    getOrderList(state) {
        this.orderList.emit(state);
    }

    /**
     *  Evento eventEmitter que permite crear un suscribe para saber cuando
     *  listar una determinada lista de órdenes obtenidas por los filtros aplicados por el usuario en el componente search-order-menu
     * @param {any} data
     * @memberof EventEmitterOrders
     */
    filterFraudList(data) {
        this.fraudList.emit(data);
    }

    /**
     *  Evento eventEmitter que permite crear un suscribe para saber cuando
     *  listar una determinada lista de órdenes obtenidas por los filtros aplicados por el usuario en el componente search-order-menu
     * @param {any} data
     * @memberof EventEmitterOrders
     */
    filterOrderListResponse(data) {
        this.filterOrderList.emit(data);
    }

    getClear() {
        this.clearTable.emit();
    }
    /**
     * Evento eventEmitter que permite crear un suscribe para saber cuando consultar las órdenes de acuerdo al estado proporcionado.
     * @param {any} state
     * @memberof EventEmitterOrders
     */
    printInformationTable(state) {
        this.tableInformationUploadGuide.emit(state);
    }

    /**
     * Evento eventEmitter que permite crear un suscribe para saber cuando listar una determinada lista de órdenes (billing)
     * obtenidas por los filtros aplicados por el usuario en el componente search-order-menu
     * @param {any} data
     * @memberof EventEmitterOrders
     */
    filterBillingListResponse(data) {
        this.filterBillingList.emit(data);
    }

    /**
     * Evento eventEmitter que permite crear un suscribe para saber cuando listar una determinada lista de órdenes (Solicitudes pendientes)
     * obtenidas por los filtros aplicados por el usuario en el componente search-order-menu
     * @param {any} data
     * @memberof EventEmitterOrders
     */
    filterOrdersWithStatusResponse(data) {
        this.filterOrdersWithStatus.emit(data);
    }

    filterHistoricalDevolutionWithStatusResponse(data: HistoricalDevolutionEntity[]) {
      this.filterHistoricalDevolutionWithStatus.emit(data);
    }
}
