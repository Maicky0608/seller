import { Order } from '@app/shared/models/order.model';

export class Const {
  /**
   * Estructura vacia para los datos de un usuario
   * @static
   * @type {*}
   * @memberof Const
   */
  static readonly EMPTYUSER: any = {
    login: false,
    nickname: '',
    name: '',
    role: 0,
    last_name: '',
    email: '',
    email_verified: '',
    picture: '',
    access_token: '',
    sub: '',
    updated_at: ''
  };

  /**
   * Estructura vacia para una orden
   * @static
   * @type {Order}
   * @memberof Const
   */
  static readonly EMPTYORDER: Order =
    {
      id: 0,
      orderNumber: '',
      allowShipping: false,
      sendAllProduct: false,
      processedOrder: false,
      idSeller: 0,
      nameSeller: '',
      nitSeller: '',
      idChannel: 0,
      channel: '',
      dateOrder: '',
      idStatusOrder: 0,
      statusOrder: '',
      costTotalOrder: 0,
      costTotalShipping: 0,
      commission: 0,
      dateMaxDeliveryOrder: '',
      typeDespatchOrder: '',
      identificationCard: '',
      clientName: '',
      clientTelephone: '',
      clientAddress: '',
      products: [{
        id: 0,
        idDetailProduct: 0,
        idPicking: 0,
        nameProduct: '',
        productId: '',
        sku: 0,
        ean: '',
        checkProductToSend: false,
        reference: '',
        idStatusProduct: 0,
        statusProduct: '',
        quantity: 0,
        costProduct: 0,
        costShippingProduct: 0,
        commission: 0,
        dateMaxDeliveryProduct: '',
        typeDespatchProduct: '',
        tracking: '',
        carrier: '',
        dateDelivery: '',
        enviosExito: false,
        fulfillment: false
      }
      ],
      port:{
        idDispatchPort: 0,
        name: '',
        address: '',
        phone: '',
      }
    };


  /**
   * Estados para los productos de las órdenes
   * @static
   * @memberof Const
   */
  static readonly ProductAsignado = 35;
  static readonly ProductAprobadoDespacho = 45;
  static readonly ProductCancelado = 80;
  static readonly ProductEmpacado = 47;
  static readonly ProductEnProcesoDeEnvio = 170;
  static readonly ProductEntregado = 60;
  static readonly ProductFacturadoEnviado = 170;
  static readonly ProductPagadoCancelado = 120;
  static readonly ProductRechazadoDespacho = 55;
  static readonly ProductSinInventario = 185;
  static readonly ProductSinInventarioNotificado = 185;
  static readonly ProductDespachoInter = 48;


  static readonly NameProductAsignado = 'Asignado';
  static readonly NameProductAprobadoDespacho = 'AprobadoDespacho';
  static readonly NameProductCancelado = 'Cancelado';
  static readonly NameProductEmpacado = 'Empacado';
  static readonly NameProductEnProcesoDeEnvio = 'EnProcesoDeEnvio';
  static readonly NameProductEntregado = 'Entregado';
  static readonly NameProductFacturadoEnviado = 'FacturadoEnviado';
  static readonly NameProductPagadoCancelado = 'PagadoCancelado';
  static readonly NameProductRechazadoDespacho = 'RechazadoDespacho';
  static readonly NameProductSinInventario = 'SinInventario';
  static readonly NameProductSinInventarioNotificado = 'SinInventarioNotificado';
  static readonly NameProductDespachoInter = 'DespachoVendedorInt';


  /**
   * Estados para las órdenes
   * @static
   * @memberof Const
   */
  static readonly OrderAsignado = 35;
  static readonly OrderEntregado = 60;
  static readonly OrderEnProcesoDeEnvio = 170;
  static readonly OrderCancelado = 80;
  static readonly OrderPagadoCanceldo = 120;
  // static readonly OrderCancelado = 50;
  static readonly OrderDevolucionPendienteValidacion = 73;
  static readonly OrderDespachoInter = 48;

  static readonly NameOrderAsignado = 'Asignado';
  static readonly NameOrderEntregado = 'Entregado';
  static readonly NameOrderEnProcesoDeEnvio = 'EnProcesoDeEnvio';
  static readonly NameOrderEnFacturadoEnviado = 'FacturadoEnviado';
  static readonly NameOrderCancelado = 'Cancelado';
  static readonly NameOrderPagadoCanceldo = 'PagadoCancelado';
  static readonly NameOrderDevolucionPendienteValidacion = 'DevolucionPendienteValidacion';
  static readonly NameOrderDespachoInt = 'DespachoVendedorInt';


  /**
   * Estados para las órdenes y los productos en la app
   */
  static readonly AppProductEnviado = 'En envío';
  static readonly AppProductAsignado = 'Asignado';
  static readonly AppProductEntregado = 'Entregado';

  static readonly AppOrderEnviado = 'En envío';
  static readonly AppOrderAsignado = 'Asignado';
  static readonly AppOrderEntregado = 'Entregado';
  static readonly AppOrderCancelado = 'Cancelado';
  static readonly AppOrderPagadoCanceldo  = 'Pagado Cancelado';
  static readonly AppOrderDevolucionPendienteValidacion  = 'Devolución Pendiente Validación';
  static readonly AppOrderFacturadoEnviado = 'Facturado Enviado';
  static readonly AppOrderDespachoInt= 'Despacho Vendedor Int';

  // Constantes para los estados de las solicitudes de devolución
  static readonly StatusInDevolution = 9;
  static readonly StatusPendingDevolution = 1;
  static readonly StatusInValidation = 4;


  // Constantes para los tipos de rechazo de solicitudes
  static readonly OrderPendingDevolution = 2;
  static readonly OrdersInDevolution = 4;

  // Constantes para estaods de historico de devolucion
  static readonly StatusHistoricDevolution = -1;
  static readonly StatusPendingCancels = -2;

  // Conceptos de facturación para los pagos.
  static readonly BILLING_CONCEPTS = {
    marketplaceSale: 'Venta Marketplace',
    logisticsExito: 'Logistica Exito',
    noteCredit: 'Nota crédito'
  };

  static readonly ProfileTypes: any = ['Vendedor', 'Administrador'];
  static readonly ProfileTypesBack: any = ['Exito', 'Tienda'];

  static readonly error = 'error';
  static readonly home = 'home';

  readonly seller = 'seller';
  readonly administrator = 'administrator';
}
