export const defaultVersion = {
  prefix: 'v',
  number: 1
};

export const endpoints = {
  // Endpoints QA
  stage: {
    v1: {
      // orders
      sendOrderEmail: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/exportoffersbyseller/{idSeller}/{email}',
      sendEmailFormat: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/exportoffersbyseller?email={email}&productType={productType}',
      searchOrders: 'https://5x9qrupiba.execute-api.us-east-1.amazonaws.com/SearchOrders?idSeller={sellerId}&limit={limit}',
      carries: 'https://2he495iasj.execute-api.us-east-1.amazonaws.com/Carries',
      sendAllGuides: 'https://tew99ut1y2.execute-api.us-east-1.amazonaws.com/SendAllGuides',
      downloadOrder: 'https://z0vz1c608a.execute-api.us-east-1.amazonaws.com/DownloadOrder',
      sendAllProductInOrder: 'https://nnsfw2fjr7.execute-api.us-east-1.amazonaws.com/SendAllProductInOrder/{orderId}',
      sendProductInOrder: 'https://89qu0cyz29.execute-api.us-east-1.amazonaws.com/SendProductInOrder/{orderId}/{idDetailProduct}',
      searchPendingDevolution: 'https://nrk3ye1ppc.execute-api.us-east-1.amazonaws.com/ReversionRequestSearch?{stringParams}',
      pendingDevolution: 'https://nrk3ye1ppc.execute-api.us-east-1.amazonaws.com/ReversionRequestSearch?{stringParams}',
      pendingDevolutionSearchTemporal: 'https://nrk3ye1ppc.execute-api.us-east-1.amazonaws.com/ReversionRequestSearch?{stringParams}',
      acceptOrDeniedDevolution: 'https://v1kfqoa8yd.execute-api.us-east-1.amazonaws.com/RequestAcceptOrDenied',
      recordProcesSedOrder: 'https://4nu4lf5m80.execute-api.us-east-1.amazonaws.com/RecordProcesSedOrder',
      getallordersbysellerwithouttracking: 'https://cbihc9u6fa.execute-api.us-east-1.amazonaws.com/GetAllOrdersBySellerWithoutTracking{stringParam}',
      validateStatusLoadGuide: 'https://tew99ut1y2.execute-api.us-east-1.amazonaws.com/SendAllGuides/status',
      getBilling: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing{stringParams}',
      exportBillingPays: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing',
      searchBilling: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing?idSeller={sellerId}&limit={limit}',
      // Support message
      supporMessage: 'https://iqbs3e9dyb.execute-api.us-east-1.amazonaws.com/CreateSupport',
      createcaseseller: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/createcaseseller',
      getreasonsrejection: 'https://g7n20mhxc4.execute-api.us-east-1.amazonaws.com/ReasonsRejection{stringParams}',
      // shipments
      getShipmentById: 'service/shipping/{id}',
      listShipments: 'service/shipping/list/state/{state}/from/{from}/to/{take}/order/{sort}/carrier/{carrier}/',
      pickupShipment: 'service/shipping/pickup',
      // servicios para el arbol de categorías
      getAllSellersFull: 'https://5m0vgt1hi5.execute-api.us-east-1.amazonaws.com/GetAllSellers',
      getAllSellers: 'https://9d5now9dr2.execute-api.us-east-1.amazonaws.com/getnameallSeller/1',
      getAllSellersPaginated: 'https://5m0vgt1hi5.execute-api.us-east-1.amazonaws.com/GetAllSellers/paginated?limit={limit}',
      // servicio empleado para obtener las comisiones de un usuario o todas las comisiones
      getSellerCommissionCategory: 'https://0dk55lff0l.execute-api.us-east-1.amazonaws.com/SellerCommissionCategory/GetAllCategories',
      // Ruta base para la modificación de las categorías
      manageCategory: 'https://0dk55lff0l.execute-api.us-east-1.amazonaws.com/SellerCommissionCategory',
      // Consulta el estado de creación de una categoria
      statusCreateCategory: 'https://0dk55lff0l.execute-api.us-east-1.amazonaws.com/SellerCommissionCategory/GetStatusLoadCommissionCategory',
      // Register Seller Name
      registerSeller: 'https://5a1c7n6t70.execute-api.us-east-1.amazonaws.com/RegisterSeller/',
      validateSellerNit: 'https://5avfpnwghf.execute-api.us-east-1.amazonaws.com/ValidateSellerNit/{params}',
      validateSellerEmail: 'https://iye9w7rlsg.execute-api.us-east-1.amazonaws.com/ValidateSellerEmail/{params}',
      validateSellerName: 'https://4gxrzfojb9.execute-api.us-east-1.amazonaws.com/ValidateSellerName/{params}',
      // Cities and States services
      // getCities: 'https://u9rxwf1i19.execute-api.us-east-1.amazonaws.com/Cities/{params}', original
      getCities: 'https://u9rxwf1i19.execute-api.us-east-1.amazonaws.com/Cities/GetCitiesByState/{params}',
      getCitiesCoverage: 'https://u9rxwf1i19.execute-api.us-east-1.amazonaws.com/Cities/GetAllCitiesVtexS3',
      getDaneCodesNonCoverage: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/GetSellerData',
      getStates: 'https://vppc3gie2i.execute-api.us-east-1.amazonaws.com/States',
      pacthCitiesNoCoverage: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/UpdateCitiesNonCoverage',
      // Offers
      getOffers: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/{params}',
      getOffersAdmin: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/listoffersbyseller/{params}',
      patchOffers: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer',
      patchOffersProducts: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/registeruniqueoffer',
      getStatusOffers: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/status',
      // Historical
      getHistoricalOffers: 'https://27tkfc1vv8.execute-api.us-east-1.amazonaws.com/OfferHistorical/{params}',
      downloadHistorical: 'https://v40mzsj5hk.execute-api.us-east-1.amazonaws.com/OfferDownloadHistorical/{params}',
      // Historical admin
      getHistoricalOffersAdmin: 'https://rk6blagjy8.execute-api.us-east-1.amazonaws.com/OfferHistoricalAdmin/{params}',
      downloadHistoricalAdmin: 'https://vlaswi5ovd.execute-api.us-east-1.amazonaws.com/OfferDownloadHistoricalAdmin/{params}',
      // Products
      products: 'https://0vmlis29mk.execute-api.us-east-1.amazonaws.com/products-loads-dev/{params}',
      // Quoting
      getSendMethod: 'https://bkafj0viij.execute-api.us-east-1.amazonaws.com/ShippingMethod',
      zones: 'https://fu1opv4qtc.execute-api.us-east-1.amazonaws.com/Areas',
      getZone: 'https://fu1opv4qtc.execute-api.us-east-1.amazonaws.com/Areas/{params}',
      transports: 'https://vfblsvp0wf.execute-api.us-east-1.amazonaws.com/Transporters',
      getTransport: 'https://vfblsvp0wf.execute-api.us-east-1.amazonaws.com/Transporters/{params}',
      getSize: 'https://wss1xyl4h8.execute-api.us-east-1.amazonaws.com/Sizes/all',
      getQuoting: 'https://swje0lr27g.execute-api.us-east-1.amazonaws.com/utilities-dev/shippingcostrules/GetShippingCostRules',
      createQuoting: 'https://swje0lr27g.execute-api.us-east-1.amazonaws.com/utilities-dev/shippingcostrules/CreateShippingCostRule',
      updateQuoting: 'https://swje0lr27g.execute-api.us-east-1.amazonaws.com/utilities-dev/shippingcostrules/UpdateShippingCostRule',
      deleteQuoting: 'https://swje0lr27g.execute-api.us-east-1.amazonaws.com/utilities-dev/shippingcostrules/DeleteShippingCostRule/{param}',

      // Seller
      getListSellersName: 'https://9d5now9dr2.execute-api.us-east-1.amazonaws.com/getnameallSeller/{params}',
      getSpecificSeller: 'https://5m0vgt1hi5.execute-api.us-east-1.amazonaws.com/GetAllSellers/{idseller}/{allseller}',
      updateSeller: 'https://tyss52sgm6.execute-api.us-east-1.amazonaws.com/UpdateSeller',
      changeStatusSeller: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/SetSellerAvaibality',
      cancelVacationSeller: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/CancelVacation',
      // Validar ean
      getValidateEan: 'https://g5a9j4ahbd.execute-api.us-east-1.amazonaws.com/Products/',
      // Dashboard
      getSellsSummary: 'https://nv4izavvqj.execute-api.us-east-1.amazonaws.com/OrdersSummaryStatus/{params}',
      getOrdersStatus: 'https://nv4izavvqj.execute-api.us-east-1.amazonaws.com/OrdersSummaryStatus/{params}',
      // Estado de Carga
      getStateOfCharge: 'https://0vmlis29mk.execute-api.us-east-1.amazonaws.com/products-loads-dev/',
      // Guardar logs en CloudWatch
      setCloudWatchLog: 'https://7xre4jqhqa.execute-api.us-east-1.amazonaws.com/dev/logs',
      // Validar formato imagen
      getValidateImage: 'https://3nr5ac6osg.execute-api.us-east-1.amazonaws.com/dev/ValidateImage',
      // Get specs
      getProductSpecs: 'https://bahzzzoq93.execute-api.us-east-1.amazonaws.com/products-specs-dev',
      getConfigSpecs: 'https://bahzzzoq93.execute-api.us-east-1.amazonaws.com/products-specs-dev',
      // Enviar moderación de productos al correo
      productModeration: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting/{params}',
      // Get Regex
      getRegexBasic: 'https://n1gy42mfqa.execute-api.us-east-1.amazonaws.com/Regex/{params}',
      // Post Guardar informacion creacion unitaria de producto
      postSaveInformationUnitCreation: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products',
      // Post solicitar informacion de detalle de productos
      postUnitSaveInformationUnitCreation: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/unitproduct',
      // Patch actualizar un producto
      patchUnitSaveInformationUnitCreation: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/unitproduct',
      // Download billing.
      exportBilling: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing',
      // Billing orders visualize.
      getBillingOrders: 'https://blmce0zwq7.execute-api.us-east-1.amazonaws.com/orders-bill/{params}',
      // Download Billing .
      postBillingOrders: 'https://blmce0zwq7.execute-api.us-east-1.amazonaws.com/orders-bill/{params}',
      // Actualizar factura
      uploadBilling: 'https://blmce0zwq7.execute-api.us-east-1.amazonaws.com/orders-bill',
      // Obtener contratos por vendedor.
      getTermsBySeller: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/GetContracts/{params}',
      // Actualizar contrato del vendedor
      updateTermsSeller: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/AcceptContract',
      // Registrar contrato por medio del administrador
      registersContract: 'https://yoix96dfrg.execute-api.us-east-1.amazonaws.com/contracts/RegisterContract',
      // Obtener si el vendedor ya acepto los terminos
      getValidationTerms: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/ValidateContract',
      // Obtener los datos del vendedor
      getSellerData: 'https://ypkstb19j4.execute-api.us-east-1.amazonaws.com/SellerCmd/GetSellerData',
      // Obtener todos los perfiles.
      getAllProfiles: 'https://77q5jco8ga.execute-api.us-east-1.amazonaws.com/Profiles/GetAllProfiles',
      // Agregar perfiles.
      createProfile: 'https://77q5jco8ga.execute-api.us-east-1.amazonaws.com/Profiles/CreateProfile',
      // Editar perfiles.
      updateProfile: 'https://77q5jco8ga.execute-api.us-east-1.amazonaws.com/Profiles/UpdateProfile',
      // Obtener todos los modulos.
      getAllModule: 'https://77q5jco8ga.execute-api.us-east-1.amazonaws.com/Profiles/GetAllModules',
      // Obtener todos los permisos.
      getPermissions: 'https://77q5jco8ga.execute-api.us-east-1.amazonaws.com/Profiles/GetUserPerminsions',
      // Obtener lista de productos
      getProductList: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/{params}',
      // Obtener especificaciones por categoria
      getSpecByCategory: 'https://bahzzzoq93.execute-api.us-east-1.amazonaws.com/products-specs-dev/{params}',
      // Obtener lista producto expandido
      getProductExpanded: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/get-product/{params}',
      // Obtener detalles del producto
      getProductDetails: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/unitproduct/{params}',
      // Obtener tipo de perfil
      getTypeProfileAndProfile: 'https://77q5jco8ga.execute-api.us-east-1.amazonaws.com/Profiles/GetTypeProfileAndProfile',
      // Payoneer
      payoneer: 'https://jokht2xtxh.execute-api.us-east-1.amazonaws.com/payoneer-dev/ValidateRegisterPayoneer',
      // Servicio carga masiva moderación productos Seller
      postSaveInformationModerationSeller: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting',
      // PARAMETRIZACION
      // BRANDS GET - Obtener listado de marcas creadas
      getAllBrands: 'https://hu95klta45.execute-api.us-east-1.amazonaws.com/brands-dev/GetBrands/{params}',
      // BRANDS UPDATE - Actualiza una marca
      updateBrand: 'https://hu95klta45.execute-api.us-east-1.amazonaws.com/brands-dev/UpdateBrand/{params}',
      // BRANDS CREATE - Crea una nueva marca
      createBrand: 'https://hu95klta45.execute-api.us-east-1.amazonaws.com/brands-dev/CreateBrand/{params}',
      // BRANDS CREATE - Crea una nueva marca
      validateBrandsExact: 'https://hu95klta45.execute-api.us-east-1.amazonaws.com/brands-dev/GetExactBrand/{params}',
      // get active brands
      getActiveBrands: 'https://hu95klta45.execute-api.us-east-1.amazonaws.com/brands-dev/GetBrands/',
      // get categories vetex
      getCategoriesVetex: 'https://bahzzzoq93.execute-api.us-east-1.amazonaws.com/products-specs-dev/getspecsbycategoryname/',
      // get products
      getProductsTemplate: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/template?templateType={templateType}&categoryName={category}',
      // statusLoad
      statusLoad: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/template/statusload',
      // Support Seller center
      getAllStatusCase: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/get-case-status',
      getAllCase: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/casesfilteredpaged',
      getCase: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/get-case',
      patchCaseResponse: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/respondcasefollow',
      getUnreadCase: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/unreadscount',
      exceptionBrandsManage: '',
      // Reporte de ofertas administrator
      reportsOfferAdmin: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/reportoffersexcel',
      // Get vtex TREET
      getVtexTree: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/getvtextree',
      // Get ordenes Pendientes
      getPendinOrders: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/reversions/amount',
      // Get excecion brand comisiones
      getExceptionBrand: 'https://n2o5al9s59.execute-api.us-east-1.amazonaws.com/dev',
      // Crear/Editar/Elminar comision execpcion marca
      exceptionComissionBrand: 'https://n2o5al9s59.execute-api.us-east-1.amazonaws.com/dev/{params}',
      // Classification of cases
      getCaseCategories: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/get-case-categories',
      // Classification of cases
      getListCaseCategories: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/get-case-categories?isSeller=true',
      // Obtener calificacion de vendedores
      getSellerRating: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/qualificationseller/{params}',
      // Eliminar calificacion de un vendedor
      upsertQualification: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/qualificationseller',
      // consultar las ordenes por tipo de filtros
      ordersSummaryStatus: 'https://nv4izavvqj.execute-api.us-east-1.amazonaws.com/OrdersSummaryStatus/{params}',
      // Descargar rotulos
      getDownlaodLabel: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/orders/{params}/sticker',
      // Obtener puertos por país
      getPortsByCountryName: 'https://orba3qnrte.execute-api.us-east-1.amazonaws.com/dispatchport/GetDispatchPortsByCountryName/{params}',
      // Get para consultar todos los estados de las ordenes
      getIdOrders: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/statusorders',
      // Ruta basica para puertos
      managePort: 'https://orba3qnrte.execute-api.us-east-1.amazonaws.com/dispatchport',
      // Desactivar masiva de Ofertas
      patchDesactiveOffer: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/disableoffersbyseller',
      // Exportar reclamaciones
      exportReclaim: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/downloadreport',
      // GetProducs para modificaciones
      getProductsPendingModify: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting/productsrejected?idSeller={sellerId}&limit={limit}',
      // GetProducts pendiente validacion
      getProductsPendingValidation: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting/productswaiting?idSeller={sellerId}&limit={limit}',
      // GetProducs by EAN para modificaciones
      getEANPendingModify: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting/productsrejected/{params}',
      // GetProducs by EAN para validacion
      getEANPendingValidation: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting/productswaiting/{params}',
      // Exportar productos
      exportProducts: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/report',
      // Listado de resumen de facturacion
      getListAllSummaryBilling: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing/summary',
      // Detalle de reclaciones
      getDetailTranslationReclaim: 'https://7y9v564dl9.execute-api.us-east-1.amazonaws.com/cases-dev/get-case-expanded/{params}',
      // Obtener comentarios de solicitud de devolución
      getAllCommentRefuse: 'https://nrk3ye1ppc.execute-api.us-east-1.amazonaws.com/ReversionRequestSearch/translation',
      // enviar array de archivos para ser procesados y guardados
      setMassiveBillOrderAsync: 'https://blmce0zwq7.execute-api.us-east-1.amazonaws.com/orders-bill/setmassivebillorderasync',
      // consultar status de carga masiva de facturas
      getstatussetmassivebilling: 'https://blmce0zwq7.execute-api.us-east-1.amazonaws.com/orders-bill/getstatussetmassivebilling',
      // enviar por correo un reporte con los errores en vtex
      reportErrorsVtex: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/reportfailsendvtex/{params}',
      // archivo en s3 formato carga masiva de excepcion
      uploadMasiveUpload: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates-Dev/FormatChargeCommissions.xlsx',
      // verificar el estado de la carga masiva para excepciones PLU
      verificateStatusException: 'https://n2o5al9s59.execute-api.us-east-1.amazonaws.com/dev/GetMassiveComsnExcStatus',
      // enviar data en formato json al back
      sendDataJsonReadExcel: 'https://n2o5al9s59.execute-api.us-east-1.amazonaws.com/dev/MassiveComsnExc',
      // Listado de colores
      getListColor: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/colors',
      // Descargable del listado/historico de cancelaciones
      exportListCancel: 'https://nrk3ye1ppc.execute-api.us-east-1.amazonaws.com/ReversionRequestSearch/report',
      // Descargar especificaciones
      exportSpecs: 'https://bahzzzoq93.execute-api.us-east-1.amazonaws.com/products-specs-dev/report{params}',
      // Descargar arbol de categorías
      exporCategories: 'https://0dk55lff0l.execute-api.us-east-1.amazonaws.com/SellerCommissionCategory/GenerateReportCategories',
      // Eliminar categpria por Id
      deleteCategory: 'https://0dk55lff0l.execute-api.us-east-1.amazonaws.com/SellerCommissionCategory/DeleteCategory{params}',
      // Descargar exportar comisiones
      exportCommission: 'https://n2o5al9s59.execute-api.us-east-1.amazonaws.com/dev/ExportComsnExcsAudit/{params}',
      // Obtener el listado de comisiones ultimos 15 dias
      getListCommissionAll: 'https://n2o5al9s59.execute-api.us-east-1.amazonaws.com/dev/GetComsnExcsAudit/{params}',
      // Obtener listado de historico de pagos
      getListHistoricPayments: 'https://w7uiqlm4b6.execute-api.us-east-1.amazonaws.com/dev/detaildispersion{params}',
      // Obtener listado novedades cobro
      getListNewsCollected: 'https://w7uiqlm4b6.execute-api.us-east-1.amazonaws.com/dev/detailpaymentnews{params}',
      // Obtener el listado de vendedores para hacer la dispersion
      getListDispersionAll: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing/dispersion/{params}',
      // Excluir - incluir en el pago de la dispersion
      excludeSellerPayoneer: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing/dispersion/excludesellerpayoneerdispersion',
      // ejecutar la dispersion
      sendDispersion: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing/dispersion',
      // Descargar detalle de dispersion
      exporDetailPayment: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing/dispersion/report{params}',
      // Descargar productos vendedor
      downloadProducts: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/report',
      // verificar el status de carga de dispersion
      statusLoadDispersion: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing/dispersion/getstatusdispersion',
      // Envia un correo con el reporte
      sendModuleReportDispersion: 'https://iqur5b3ua3.execute-api.us-east-1.amazonaws.com/billing/dispersion/pendingpaymentnews/{params}',
      // Obtener listado de modulos y submodulos
      getAllModuleSchoolExito: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/GetAllModule',
      // escuela exito modificar modulos
      editModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/EditModule',
      // escuela exito eliminar modulos
      deleteModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/DeleteModule/{params}',
      // escuela exito eliminar submodulos
      deleteSubModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/DeleteSubModule/{module}/{submodule}',
      // escuela exito editar submodulos
      editSubModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/EditSubModule',
      // escuela exito crear submodulos
      createSubModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/CreateSubModule/{NombreModulo}',
      // escuela exito crear modulos
      createModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/CreateModule',
      // Descargar formato masiva de marcas
      uploadMasiveBrand: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates/PlantillaCargaMasivaMarcas.xlsx',
      // Crear marcas masivas (post)
      createMassiveBrand: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/CreateMassive',
      // Consultar estado de crear Marcas Masivas (get)
      getStatusMassiveBrand: 'https://hu95klta45.execute-api.us-east-1.amazonaws.com/brands-dev/ValidateStatusCreateMassive',
      // actualiza la posicion del elemento en la base de datos trabaja con el index
      updatePositionSubModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/MoveSubModule',
      // actualiza la posicion del elemento en la base de datos trabaja con el index
      updatePositionModules: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/MoveModule',
      // Eliminar productos del listado por medio del ean
      deleteProductByEan: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/deleteproduct/{params}',
      // Descarga formato masiva vendedores
      uploadMassiveAgreementSellers: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates-Dev/PlantillaCargaAcuerdos.xlsx',
      // Obtener listado de acuerdos
      getAllAgreement: 'https://yoix96dfrg.execute-api.us-east-1.amazonaws.com/contracts/GetSellerContract/{params}',
      // Consultar estado de crear acuerdos masivos (get)
      getStatusMassiveAgreement: 'https://yoix96dfrg.execute-api.us-east-1.amazonaws.com/contracts/GetStatusLoads',
      // ELiminar contrato a todos los vendedores
      deleteAllAgreement: 'https://yoix96dfrg.execute-api.us-east-1.amazonaws.com/contracts/DeleteContract/{params}',
      // Establecer contrato por defecto
      defaulAgreement: 'https://yoix96dfrg.execute-api.us-east-1.amazonaws.com/contracts/SetContractByDefault/{params}',
      // Obtener listado de vendedores por acuerdos
      getListSellersAgreement: 'https://yoix96dfrg.execute-api.us-east-1.amazonaws.com/contracts/GetSellerContractApply/{params}',
      // Eliminar uno o varios vendedores del contrato
      delete1orMore: 'https://yoix96dfrg.execute-api.us-east-1.amazonaws.com/contracts/DeleteContractApply',
      // Consultar si tiene carga la creacion de modulos.
      ValidateCreateMassive: 'https://ezuk98aqii.execute-api.us-east-1.amazonaws.com/dev/ValidateCreateMassive',
      // ELiminar productos vendedor
      deleteProduct: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/disassociateproductfrommyproductsasync',
      // Mirar estado batch carga eliminar productos
      getStatusDeleteProducts: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/getstatusdisassociateproducts',
      // Captura de indicadores
      getIndicators: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/qualificationseller/getindicatorsbynit/{params}',
      // Obtener listado de tallas
      getAllSizes: 'https://wss1xyl4h8.execute-api.us-east-1.amazonaws.com/Sizes/{params}',
      // Obtener listado de tallas Creacion unitaria
      getAllSizesProducts: 'https://wss1xyl4h8.execute-api.us-east-1.amazonaws.com/Sizes/all',
      // Consultar estado de la carga masiva de tallas
      getStatusSize: 'https://wss1xyl4h8.execute-api.us-east-1.amazonaws.com/Sizes/status',
      // Crear tallas y editar tallas (post y patch)
      parametrizeSizes: 'https://wss1xyl4h8.execute-api.us-east-1.amazonaws.com/Sizes',
      // Validar status carga tallas
      statusSizes: 'https://wss1xyl4h8.execute-api.us-east-1.amazonaws.com/Sizes/status',
      // obtiene el listado de fraudes
      getFrauds: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/fraudfiles?&limit={limit}',
      // envia el listado de fraudes
      sendFrauds: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/fraudfiles',
      // obtiene el statuts de los fraudes
      statusFrauds: 'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/fraudfiles/status',
      // descarga la plantilla
      downloadTemplateFrauds: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates-Dev/PlantillaCargaFraudes.xlsx',
      // Descargar plantilla para carga masiva de categorias
      downloadTemplateCategoryMasive: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates-Dev/PlantillaCargaMasivaCategorias.xlsx',
      // Crear caterogiras de forma masiva
      createUpdateMassiveCategories: 'https://0dk55lff0l.execute-api.us-east-1.amazonaws.com/SellerCommissionCategory/CreateUpdateMassiveCategories/{params}',
      // valida el estado de la carga masiva de categorias
      ValidateStatusCreateUpdateMassive: 'https://0dk55lff0l.execute-api.us-east-1.amazonaws.com/SellerCommissionCategory/ValidateStatusCreateUpdateMassive',
      // Exportar Contactos
      exportContacts: 'https://abc89jo3oa.execute-api.us-east-1.amazonaws.com/dev/GenerateReportSellerContacts',
      // Listar Contactos
      listContacts: 'https://abc89jo3oa.execute-api.us-east-1.amazonaws.com/dev/GetListContacts',
      // Captura todas las notificaciones (anuncios )
      getAllNotification: 'https://oi3ylqu9t0.execute-api.us-east-1.amazonaws.com/Dev-SC-News/GetPaginatedNews{params}',
      // Crear anuncio
      createNew: 'https://oi3ylqu9t0.execute-api.us-east-1.amazonaws.com/Dev-SC-News/CreateNew',
      // Guardar imagen de anuncios
      saveImgNotification: 'https://oi3ylqu9t0.execute-api.us-east-1.amazonaws.com/Dev-SC-News/SaveImage',
      // Editar anuncios
      updateNotification: 'https://oi3ylqu9t0.execute-api.us-east-1.amazonaws.com/Dev-SC-News/UpdateNew',
      // Eliminar anuncios
      deleteNotification: 'https://oi3ylqu9t0.execute-api.us-east-1.amazonaws.com/Dev-SC-News/DeleteNew{params}',
      // Listar anuncios vendedor
      getAdvertisements: 'https://oi3ylqu9t0.execute-api.us-east-1.amazonaws.com/Dev-SC-News/GetNewsByTarget?totalMax=10',
      // Listar anuncios vendedor
      readAdvertisements: 'https://oi3ylqu9t0.execute-api.us-east-1.amazonaws.com/Dev-SC-News/SetNewsRead',
      // Validacion del video creacion
      validateVideo: 'https://3nr5ac6osg.execute-api.us-east-1.amazonaws.com/dev/ValidateVideo',
      // Obtener todos los datos de contacto un vendedor
      getAllContactData: 'https://abc89jo3oa.execute-api.us-east-1.amazonaws.com/dev/GetSellerContacts',
      // Actualizar datos de contacto vendedor
      updateContactData: 'https://abc89jo3oa.execute-api.us-east-1.amazonaws.com/dev/UpdateSellerContact',
      // Crear un contacto para un vendedor (primero creamos y luego editamos)
      createContactData: 'https://abc89jo3oa.execute-api.us-east-1.amazonaws.com/dev/RegisterContactSeller',
      // Servicio obtener productos multioferta
      getAllproductsApproveBySeller: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/productspendingtoapprovebyseller{params}',
      // Servicio para obtener info expandida de producto multioferta
      getExpandedProductMultiofferbyEan: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/productspendingtoapprovebyseller/specificproduct{params}',
      // Servicio para aceptar o rechazar multioferta
      postAccepRejectedMultioffer: 'https://ugv14jroji.execute-api.us-east-1.amazonaws.com/Products/productspendingtoapprovebyseller',
      // Crear y editar una oferta programada
      scheduleoffer: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/scheduleoffer',
      // Borrar un oferta programada
      deleteScheduleoffer: 'https://1b98mqc06i.execute-api.us-east-1.amazonaws.com/Offer/scheduleoffer/{params}',
      // Obtener las categorias para los productos pendientes de modificación
      getCategoriesProductsPendingModification: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting/productsrejected/categories',
      // Retorna respuesta del descargable de productos pendientes de modificacíon
      reportProductsPendingModificartion: 'https://dsaxgtixub.execute-api.us-east-1.amazonaws.com/ProductsWaiting/productsrejected/report?email={email}&categories={categories}',
      //Retorna respuesta con el report de ordenes al correo enviado
      reportOrders:'https://frgj254c3l.execute-api.us-east-1.amazonaws.com/dev/sellercenter/orders/reportbyadmin/{params}'
    },
  },
  // Endpoints production
  prod: {
    v1: {
      // orders
      sendOrderEmail: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/exportoffersbyseller/{idSeller}/{email}',
      sendEmailFormat: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/exportoffersbyseller?email={email}&productType={productType}',
      searchOrders: 'https://ldixrz8no2.execute-api.us-east-1.amazonaws.com/searchorders-pdn?idSeller={sellerId}&limit={limit}',
      carries: 'https://q8sree00sb.execute-api.us-east-1.amazonaws.com/carrier-pdn',
      sendAllGuides: 'https://vaf1d3c2ic.execute-api.us-east-1.amazonaws.com/sendallguides-pdn',
      downloadOrder: 'https://az3ophrruj.execute-api.us-east-1.amazonaws.com/downloadorder-pdn',
      sendAllProductInOrder: 'https://5zu3684z6e.execute-api.us-east-1.amazonaws.com/sendallproductsinorder-pdn/{orderId}',
      sendProductInOrder: 'https://dc042g38t8.execute-api.us-east-1.amazonaws.com/sendproductinorder-pdn/{orderId}/{idDetailProduct}',
      searchPendingDevolution: 'https://5nkjhkfsm2.execute-api.us-east-1.amazonaws.com/reversionrequest-pdn?{stringParams}',
      pendingDevolution: 'https://5nkjhkfsm2.execute-api.us-east-1.amazonaws.com/reversionrequest-pdn?{stringParams}',
      pendingDevolutionSearchTemporal: 'https://5nkjhkfsm2.execute-api.us-east-1.amazonaws.com/reversionrequest-pdn?{stringParams}',
      acceptOrDeniedDevolution: 'https://geddaxinw4.execute-api.us-east-1.amazonaws.com/refuseoracceptdevolution-pdn',
      recordProcesSedOrder: 'https://cfa1kdi5yj.execute-api.us-east-1.amazonaws.com/recordproccessedorder-pdn',
      getallordersbysellerwithouttracking: 'https://e06ayaf6s9.execute-api.us-east-1.amazonaws.com/getallordersbysellerwithouttracking-pdn{stringParam}',
      validateStatusLoadGuide: 'https://vaf1d3c2ic.execute-api.us-east-1.amazonaws.com/sendallguides-pdn/status',
      // Billing Mock
      getBilling: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn{stringParams}',
      exportBillingPays: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn',
      searchBilling: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn?idSeller={sellerId}&limit={limit}',
      // Support message
      supporMessage: 'https://7bvbe7k6n8.execute-api.us-east-1.amazonaws.com/createsupport-pdn',
      createcaseseller: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/createcaseseller',
      getreasonsrejection: 'https://m9rdnx8wog.execute-api.us-east-1.amazonaws.com/reasonrejection-pdn{stringParams}',
      // shipments
      getShipmentById: 'service/shipping/{id}',
      listShipments: 'service/shipping/list/state/{state}/from/{from}/to/{take}/order/{sort}/carrier/{carrier}/',
      pickupShipment: 'service/shipping/pickup',
      // servicios para el arbol de categorías
      getAllSellersFull: 'https://0zhu6q42zl.execute-api.us-east-1.amazonaws.com/getallsellers-pdn',
      getAllSellers: 'https://xvc4l3bdd7.execute-api.us-east-1.amazonaws.com/getnameallseller-pdn/1',
      getAllSellersPaginated: 'https://0zhu6q42zl.execute-api.us-east-1.amazonaws.com/getallsellers-pdn/paginated?limit={limit}',
      // servicio empleado para obtener las comisiones de un usuario o todas las comisiones
      getSellerCommissionCategory: 'https://lp04fcggo3.execute-api.us-east-1.amazonaws.com/sellercommissioncategory-pdn/GetAllCategories',
      // Ruta base para la modificación de las categoría
      manageCategory: 'https://lp04fcggo3.execute-api.us-east-1.amazonaws.com/sellercommissioncategory-pdn',
      // Consulta el estado de creación de una categoria
      statusCreateCategory: 'https://lp04fcggo3.execute-api.us-east-1.amazonaws.com/sellercommissioncategory-pdn/GetStatusLoadCommissionCategory',
      // Register seller services
      registerSeller: 'https://x2vflz270c.execute-api.us-east-1.amazonaws.com/registerseller-pdn/',
      validateSellerNit: 'https://ce8fuvj37h.execute-api.us-east-1.amazonaws.com/validatesellernit-pdn/{params}',
      validateSellerEmail: 'https://ejn1rdfov9.execute-api.us-east-1.amazonaws.com/validateselleremail-pdn/{params}',
      validateSellerName: 'https://z0exz5y0f6.execute-api.us-east-1.amazonaws.com/validatesellername-pdn/{params}',
      // Cities and States services
      getCities: 'https://lcdy1iepcf.execute-api.us-east-1.amazonaws.com/cities-pdn/GetCitiesByState/{params}',
      getCitiesCoverage: 'https://lcdy1iepcf.execute-api.us-east-1.amazonaws.com/cities-pdn/GetAllCitiesVtexS3',
      getDaneCodesNonCoverage: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/GetSellerData',
      getStates: 'https://yz3bm0grtf.execute-api.us-east-1.amazonaws.com/states-pdn',
      pacthCitiesNoCoverage: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/UpdateCitiesNonCoverage',
      // Offers
      getOffers: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/{params}',
      patchOffers: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn',
      getOffersAdmin: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/listoffersbyseller/{params}',
      patchOffersProducts: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/registeruniqueoffer',
      getStatusOffers: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/status',
      // Historical
      getHistoricalOffers: 'https://k19m329r85.execute-api.us-east-1.amazonaws.com/offerhistorical-pdn/{params}',
      downloadHistorical: 'https://wq8pypt9ra.execute-api.us-east-1.amazonaws.com/offerdownloadhistorical-pdn/{params}',
      // Historical admin
      getHistoricalOffersAdmin: 'https://0gt6matz9i.execute-api.us-east-1.amazonaws.com/offerhistoricaladmin-pdn/{params}',
      downloadHistoricalAdmin: 'https://cb0d3nxi40.execute-api.us-east-1.amazonaws.com/offerdownloadhistoricaladmin-pdn/{params}',
      // Products
      products: 'https://pnjswhgf60.execute-api.us-east-1.amazonaws.com/products-loads-pdn/{params}',
      // Quoting -->
      getSendMethod: 'https://54k5wykbn7.execute-api.us-east-1.amazonaws.com/shippingmethod-pdn',
      zones: 'https://umn1gjcm9a.execute-api.us-east-1.amazonaws.com/areas-pdn',
      getZone: 'https://umn1gjcm9a.execute-api.us-east-1.amazonaws.com/areas-pdn/{params}',
      transports: 'https://hl7mqciur3.execute-api.us-east-1.amazonaws.com/transporters-pdn',
      getTransport: 'https://hl7mqciur3.execute-api.us-east-1.amazonaws.com/transporters-pdn/{params}',
      getSize: 'https://9zfy4s7pok.execute-api.us-east-1.amazonaws.com/Sizes/all',
      getQuoting: 'https://ndinovqhh8.execute-api.us-east-1.amazonaws.com/utilities-pdn/shippingcostrules/GetShippingCostRules',
      createQuoting: 'https://ndinovqhh8.execute-api.us-east-1.amazonaws.com/utilities-pdn/shippingcostrules/CreateShippingCostRule',
      updateQuoting: 'https://ndinovqhh8.execute-api.us-east-1.amazonaws.com/utilities-pdn/shippingcostrules/UpdateShippingCostRule',
      deleteQuoting: 'https://ndinovqhh8.execute-api.us-east-1.amazonaws.com/utilities-pdn/shippingcostrules/DeleteShippingCostRule/{param}',
      // Seller
      getListSellersName: 'https://xvc4l3bdd7.execute-api.us-east-1.amazonaws.com/getnameallseller-pdn/{params}',
      getSpecificSeller: 'https://0zhu6q42zl.execute-api.us-east-1.amazonaws.com/getallsellers-pdn/{idSeller}/{allSeller}',
      updateSeller: 'https://yiw0kz0lal.execute-api.us-east-1.amazonaws.com/UpdateSeller-pdn',
      changeStatusSeller: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/SetSellerAvaibality',
      cancelVacationSeller: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/CancelVacation',
      // Validar ean
      getValidateEan: 'https://0ly35c82pa.execute-api.us-east-1.amazonaws.com/products-pdn/',
      // Dashboard
      getSellsSummary: 'https://2l1pous4cl.execute-api.us-east-1.amazonaws.com/OrdersSummaryStatus-pdn/{params}',
      getOrdersStatus: 'https://2l1pous4cl.execute-api.us-east-1.amazonaws.com/OrdersSummaryStatus-pdn/{params}',
      // Estado de Carga
      getStateOfCharge: 'https://pnjswhgf60.execute-api.us-east-1.amazonaws.com/products-loads-pdn/',
      // Guardar logs en CloudWatch
      setCloudWatchLog: 'https://kakj4pzzd9.execute-api.us-east-1.amazonaws.com/prod/logs',
      // Validar formato imagen
      getValidateImage: 'https://nkoltok5rk.execute-api.us-east-1.amazonaws.com/pdn/ValidateImage',
      // Get specs
      getProductSpecs: 'https://fhby1m1mxd.execute-api.us-east-1.amazonaws.com/productsspec-pdn',
      getConfigSpecs: 'https://fhby1m1mxd.execute-api.us-east-1.amazonaws.com/productsspec-pdn',
      // Enviar moderación de productos al correo
      productModeration: 'https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn/{params}',
      // Get Regex
      getRegexBasic: 'https://wpamkgir31.execute-api.us-east-1.amazonaws.com/regex-pdn/{params}',
      // Post Guardar informacion creacion unitaria de producto
      postSaveInformationUnitCreation: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn',
      //
      postUnitSaveInformationUnitCreation: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/unitproduct',
      patchUnitSaveInformationUnitCreation: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/unitproduct',
      // Download billing.
      exportBilling: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn',
      // Billing orders visualize.
      getBillingOrders: 'https://t4xxi6ge3e.execute-api.us-east-1.amazonaws.com/orders-bill-pdn/{params}',
      // Download Billing .
      postBillingOrders: 'https://t4xxi6ge3e.execute-api.us-east-1.amazonaws.com/orders-bill-pdn/{params}',
      // Actualizar factura
      uploadBilling: 'https://t4xxi6ge3e.execute-api.us-east-1.amazonaws.com/orders-bill-pdn',
      // Obtener contratos por vendedor.
      getTermsBySeller: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/GetContracts/{params}',
      // Actualizar contrato del vendedor
      updateTermsSeller: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/AcceptContract',
      // ACTUALIZAR CON EL DE PRODUCCION
      registersContract: 'https://sw7zmm3j80.execute-api.us-east-1.amazonaws.com/contracts/RegisterContract',
      // Obtener si el vendedor ya acepto los terminos
      getValidationTerms: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/ValidateContract',
      // Obtener los datos del vendedor
      getSellerData: 'https://84urxspbpg.execute-api.us-east-1.amazonaws.com/seller-pdn/GetSellerData',
      // Obtener todos los perfiles.
      getAllProfiles: 'https://tjymvkz23e.execute-api.us-east-1.amazonaws.com/Profiles-pdn/GetAllProfiles',
      // Agregar perfiles.
      createProfile: 'https://tjymvkz23e.execute-api.us-east-1.amazonaws.com/Profiles-pdn/CreateProfile',
      // Editar perfiles.
      updateProfile: 'https://tjymvkz23e.execute-api.us-east-1.amazonaws.com/Profiles-pdn/UpdateProfile',
      // Obtener todos los modulos.
      getAllModule: 'https://tjymvkz23e.execute-api.us-east-1.amazonaws.com/Profiles-pdn/GetAllModules',
      // Obtener todos los permisos.
      getPermissions: 'https://tjymvkz23e.execute-api.us-east-1.amazonaws.com/Profiles-pdn/GetUserPerminsions',
      // Obtener lista de productos
      getProductList: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/{params}',
      // Obtener especificaciones por categoria
      getSpecByCategory: 'https://fhby1m1mxd.execute-api.us-east-1.amazonaws.com/productsspec-pdn/{params}',
      // Obtener lista producto expandido
      getProductExpanded: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/get-product/{params}',
      // Obtener detalles del producto
      getProductDetails: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/unitproduct/{params}',
      // Obtener tipo de perfil
      getTypeProfileAndProfile: 'https://tjymvkz23e.execute-api.us-east-1.amazonaws.com/Profiles-pdn/GetTypeProfileAndProfile',
      // Payoneer
      payoneer: 'https://fi27yra105.execute-api.us-east-1.amazonaws.com/payoneer-pdn/ValidateRegisterPayoneer',
      // Servicio carga masiva moderación productos Seller
      postSaveInformationModerationSeller: 'https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn',
      // PARAMETRIZACION
      // BRANDS GET - Obtener listado de marcas creadas
      // BRANDS GET - Obtener listado de marcas creadas
      getAllBrands: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/GetBrands/{params}',
      // BRANDS UPDATE - Actualiza una marca
      updateBrand: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/UpdateBrand/{params}',
      // BRANDS CREATE - Crea una nueva marca
      createBrand: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/CreateBrand/{params}',
      // BRANDS CREATE - Crea una nueva marca
      validateBrandsExact: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/GetExactBrand/{params}',
      // get active brands
      getActiveBrands: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/GetBrands/',
      // get categories vetex
      getCategoriesVetex: 'https://fhby1m1mxd.execute-api.us-east-1.amazonaws.com/productsspec-pdn/getspecsbycategoryname/',
      // get products
      getProductsTemplate: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/template?templateType={templateType}&categoryName={category}',
      // statusLoad
      statusLoad: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/template/statusload',
      // Support Seller center
      getAllStatusCase: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/get-case-status',
      getAllCase: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/casesfilteredpaged',
      getCase: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/get-case',
      patchCaseResponse: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/respondcasefollow',
      getUnreadCase: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/unreadscount',
      exceptionBrandsManage: '',
      // Reporte de ofertas administrator
      reportsOfferAdmin: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/reportoffersexcel',
      // Get vtex TREET
      getVtexTree: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/getvtextree',
      // Get ordenes Pendientes
      getPendinOrders: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/reversions/amount',
      // Get excecion brand comisiones
      getExceptionBrand: 'https://716x1nqplg.execute-api.us-east-1.amazonaws.com/comsexcep-pdn',
      // Crear/Editar/Elminar comision execpcion marca
      exceptionComissionBrand: 'https://716x1nqplg.execute-api.us-east-1.amazonaws.com/comsexcep-pdn/{params}',
      // Classification of cases
      getCaseCategories: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/get-case-categories',
      // Classification of cases 2
      getListCaseCategories: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/get-case-categories?isSeller=true',
      // Obtener calificacion de vendedores
      getSellerRating: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/qualificationseller/{params}',
      // Eliminar calificacion de un vendedor
      upsertQualification: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/qualificationseller',
      // consultar las ordenes por tipo de filtros
      ordersSummaryStatus: 'https://2l1pous4cl.execute-api.us-east-1.amazonaws.com/OrdersSummaryStatus-pdn/{params}',
      // Descargar rotulos
      getDownlaodLabel: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/orders/{params}/sticker',
      // Obtener puertos por país
      getPortsByCountryName: 'https://kouotxul6i.execute-api.us-east-1.amazonaws.com/dispatchport-pdn/GetDispatchPortsByCountryName/{params}',
      // Get para consultar todos los estados de las ordenes
      getIdOrders: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/statusorders',
      // Ruta basica para puertos
      managePort: 'https://kouotxul6i.execute-api.us-east-1.amazonaws.com/dispatchport-pdn',
      // Desactivar masiva de Ofertas
      patchDesactiveOffer: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/disableoffersbyseller',
      // Exportar reclamaciones
      exportReclaim: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/downloadreport',
      // GetProducs para modificaciones
      getProductsPendingModify: 'https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn/productsrejected?idSeller={sellerId}&limit={limit}',
      // GetProducts pendiente validacion
      getProductsPendingValidation: ' https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn/productswaiting?idSeller={sellerId}&limit={limit}',
      // GetProducs by EAN para modificaciones
      getEANPendingModify: 'https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn/productsrejected/{params}',
      // GetProducs by EAN para validacion
      getEANPendingValidation: 'https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn/productswaiting/{params}',
      // Exportar productos
      exportProducts: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/report',
      // Listado de resumen de facturacion
      getListAllSummaryBilling: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn/summary',
      // Detalle de reclaciones
      getDetailTranslationReclaim: 'https://rbanmmpwm0.execute-api.us-east-1.amazonaws.com/cases-pdn/get-case-expanded/{params}',
      // Obtener comentarios de solicitud de devolución
      getAllCommentRefuse: 'https://5nkjhkfsm2.execute-api.us-east-1.amazonaws.com/reversionrequest-pdn/translation',
      // enviar array de archivos para ser procesados y guardados
      setMassiveBillOrderAsync: 'https://t4xxi6ge3e.execute-api.us-east-1.amazonaws.com/orders-bill-pdn/setmassivebillorderasync',
      // consultar status de carga masiva de facturas
      getstatussetmassivebilling: 'https://t4xxi6ge3e.execute-api.us-east-1.amazonaws.com/orders-bill-pdn/getstatussetmassivebilling',
      // enviar por correo un reporte con los errores en vtex
      reportErrorsVtex: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/reportfailsendvtex/{params}',
      // archivo en s3 formato carga masiva de excepcion
      uploadMasiveUpload: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates/FormatChargeCommissions.xlsx',
      // verificar el estado de la carga masiva para excepciones PLU
      verificateStatusException: 'https://716x1nqplg.execute-api.us-east-1.amazonaws.com/comsexcep-pdn/GetMassiveComsnExcStatus',
      // enviar data en formato json al back
      sendDataJsonReadExcel: 'https://716x1nqplg.execute-api.us-east-1.amazonaws.com/comsexcep-pdn/MassiveComsnExc',
      // Descargar especificaciones
      exportSpecs: 'https://fhby1m1mxd.execute-api.us-east-1.amazonaws.com/productsspec-pdn/report{params}',
      // Listado de colores
      getListColor: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/colors',
      // Descargable del listado/historico de cancelaciones
      exportListCancel: 'https://5nkjhkfsm2.execute-api.us-east-1.amazonaws.com/reversionrequest-pdn/report',
      // Descargar arbol de categorías
      exporCategories: 'https://lp04fcggo3.execute-api.us-east-1.amazonaws.com/sellercommissioncategory-pdn/GenerateReportCategories',
      // Eliminar categpria por Id
      deleteCategory: 'https://lp04fcggo3.execute-api.us-east-1.amazonaws.com/sellercommissioncategory-pdn/DeleteCategory{params}',
      // Descargar exportar comisiones
      exportCommission: 'https://716x1nqplg.execute-api.us-east-1.amazonaws.com/comsexcep-pdn/ExportComsnExcsAudit/{params}',
      // Obtener el listado de comisiones ultimos 15 dias
      getListCommissionAll: 'https://716x1nqplg.execute-api.us-east-1.amazonaws.com/comsexcep-pdn/GetComsnExcsAudit/{params}',
      // Obtener listado de historico de pagos
      getListHistoricPayments: 'https://paaw2oxdqd.execute-api.us-east-1.amazonaws.com/pdn/detaildispersion{params}',
      // Obtener listado novedades cobro
      getListNewsCollected: 'https://paaw2oxdqd.execute-api.us-east-1.amazonaws.com/pdn/detailpaymentnews{params}',
      // Obtener el listado de vendedores para hacer la dispersion
      getListDispersionAll: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn/dispersion/{params}',
      // Excluir - incluir en el pago de la dispersion
      excludeSellerPayoneer: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn/dispersion/excludesellerpayoneerdispersion',
      // ejecutar la dispersion
      sendDispersion: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn/dispersion',
      // Descargar detalle de dispersion
      exporDetailPayment: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn/dispersion/report{params}',
      // Descargar productos vendedor
      downloadProducts: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/report',
      // verificar el status de carga de dispersion
      statusLoadDispersion: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn/dispersion/getstatusdispersion',
      // Envia un correo con el reporte
      sendModuleReportDispersion: 'https://rtox6c92tc.execute-api.us-east-1.amazonaws.com/financial-pdn/dispersion/pendingpaymentnews/{params}',
      // Obtener listado de modulos y submodulos
      getAllModuleSchoolExito: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/GetAllModule',
      // escuela exito modificar modulos
      editModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/EditModule',
      // escuela exito eliminar modulos
      deleteModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/DeleteModule/{params}',
      // escuela exito eliminar submodulos
      deleteSubModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/DeleteSubModule/{module}/{submodule}',
      // escuela exito editar submodulos
      editSubModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/EditSubModule',
      // escuela exito crear submodulos
      createSubModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/CreateSubModule/{NombreModulo}',
      // escuela exito crear modulos
      createModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/CreateModule',
      // Descargar formato masiva de marcas
      uploadMasiveBrand: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates/PlantillaCargaMasivaMarcas.xlsx',
      // Crear marcas masivas (post)
      createMassiveBrand: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/CreateMassive',
      // Consultar estado de crear Marcas Masivas (get)
      getStatusMassiveBrand: 'https://5rtfag3dpl.execute-api.us-east-1.amazonaws.com/brands-pdn/ValidateStatusCreateMassive',
      // actualiza la posicion del elemento en la base de datos trabaja con el index
      updatePositionSubModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/MoveSubModule',
      // actualiza la posicion del elemento en la base de datos trabaja con el index
      updatePositionModules: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/MoveModule',
      // Elimina un producto del listado de productos por Ean
      deleteProductByEan: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/deleteproduct/{params}',
      // Descarga formato masiva vendedores
      uploadMassiveAgreementSellers: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates/PlantillaCargaAcuerdos.xlsx',
      // Obtener listado de acuerdos
      getAllAgreement: 'https://sw7zmm3j80.execute-api.us-east-1.amazonaws.com/contracts/GetSellerContract/{params}',
      // Consultar estado de crear acuerdos masivos (get)
      getStatusMassiveAgreement: 'https://sw7zmm3j80.execute-api.us-east-1.amazonaws.com/contracts/GetStatusLoads',
      // ELiminar contrato a todos los vendedores
      deleteAllAgreement: 'https://sw7zmm3j80.execute-api.us-east-1.amazonaws.com/contracts/DeleteContract/{params}',
      // Establecer contrato por defecto
      defaulAgreement: 'https://sw7zmm3j80.execute-api.us-east-1.amazonaws.com/contracts/SetContractByDefault/{params}',
      // Obtener listado de vendedores por acuerdos
      getListSellersAgreement: 'https://sw7zmm3j80.execute-api.us-east-1.amazonaws.com/contracts/GetSellerContractApply/{params}',
      // Eliminar uno o varios vendedores del contrato
      delete1orMore: 'https://sw7zmm3j80.execute-api.us-east-1.amazonaws.com/contracts/DeleteContractApply',
      // Consultar si tiene carga la creacion de modulos.
      ValidateCreateMassive: 'https://jb829a2m54.execute-api.us-east-1.amazonaws.com/pdn/ValidateCreateMassive',
      // ELiminar productos vendedor
      deleteProduct: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/disassociateproductfrommyproductsasync',
      // Mirar estado batch carga eliminar productos
      getStatusDeleteProducts: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/getstatusdisassociateproducts',
      // Captura de indicadores
      getIndicators: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/qualificationseller/getindicatorsbynit/{params}',
      // Obtener listado de tallas
      getAllSizes: 'https://9zfy4s7pok.execute-api.us-east-1.amazonaws.com/Sizes/{params}',
      // Obtener listado de tallas Creacion unitaria
      getAllSizesProducts: 'https://9zfy4s7pok.execute-api.us-east-1.amazonaws.com/Sizes/all',
      // Consultar estado de la carga masiva de tallas
      getStatusSize: 'https://9zfy4s7pok.execute-api.us-east-1.amazonaws.com/Sizes/status',
      // Crear tallas y editar tallas (post y patch)
      parametrizeSizes: 'https://9zfy4s7pok.execute-api.us-east-1.amazonaws.com/Sizes',
      // Validar status carga tallas
      statusSizes: 'https://9zfy4s7pok.execute-api.us-east-1.amazonaws.com/Sizes/status',
      // obtiene el listado de fraudes
      getFrauds: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/fraudfiles?&limit={limit}',
      // envia el listado de fraudes
      sendFrauds: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/fraudfiles',
      // obtiene el status de los fraudes
      statusFrauds: 'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/fraudfiles/status',
      // descarga la plantilla
      downloadTemplateFrauds: 'https://seller-center-exito-staging.s3.amazonaws.com/Templates/PlantillaCargaFraudes.xlsx',
      // Descargar plantilla para carga masiva de categorias
      downloadTemplateCategoryMasive: 'https://s3.amazonaws.com/seller-center-exito-staging/Templates/PlantillaCargaMasivaCategorias.xlsx',
      // Crear caterogiras de forma masiva
      createUpdateMassiveCategories: 'https://lp04fcggo3.execute-api.us-east-1.amazonaws.com/sellercommissioncategory-pdn/CreateUpdateMassiveCategories/{params}',
      // valida el estado de la carga masiva de categorias
      ValidateStatusCreateUpdateMassive: 'https://lp04fcggo3.execute-api.us-east-1.amazonaws.com/sellercommissioncategory-pdn/ValidateStatusCreateUpdateMassive',
      // Exportar Contactos
      exportContacts: 'https://igxf6mswfa.execute-api.us-east-1.amazonaws.com/pdn/GenerateReportSellerContacts',
      // Listar Contactos
      listContacts: 'https://igxf6mswfa.execute-api.us-east-1.amazonaws.com/pdn/GetListContacts',
      // Captura todas las notificaciones (anuncios )
      getAllNotification: 'https://p3ippeuua6.execute-api.us-east-1.amazonaws.com/pdn/GetPaginatedNews{params}',
      // Crear anuncio
      createNew: 'https://p3ippeuua6.execute-api.us-east-1.amazonaws.com/pdn/CreateNew',
      // Guardar imagen de anuncios
      saveImgNotification: 'https://p3ippeuua6.execute-api.us-east-1.amazonaws.com/pdn/SaveImage',
      // Editar anuncios
      updateNotification: 'https://p3ippeuua6.execute-api.us-east-1.amazonaws.com/pdn/UpdateNew',
      // Eliminar anuncios
      deleteNotification: 'https://p3ippeuua6.execute-api.us-east-1.amazonaws.com/pdn/DeleteNew{params}',
      // Listar anuncios vendedor
      getAdvertisements: 'https://p3ippeuua6.execute-api.us-east-1.amazonaws.com/pdn/GetNewsByTarget?totalMax=10',
      // Validacion del video creacion
      validateVideo: 'https://nkoltok5rk.execute-api.us-east-1.amazonaws.com/pdn/ValidateVideo',
      // Leido anuncios vendedor
      readAdvertisements: 'https://p3ippeuua6.execute-api.us-east-1.amazonaws.com/pdn/SetNewsRead',
      // Obtener todos los datos de contacto un vendedor
      getAllContactData: 'https://igxf6mswfa.execute-api.us-east-1.amazonaws.com/pdn/GetSellerContacts',
      // Actualizar datos de contacto vendedor
      updateContactData: 'https://igxf6mswfa.execute-api.us-east-1.amazonaws.com/pdn/UpdateSellerContact',
      // Crear un contacto para un vendedor (primero creamos y luego editamos)
      createContactData: 'https://igxf6mswfa.execute-api.us-east-1.amazonaws.com/pdn/RegisterContactSeller',
      // Servicio obtener productos multioferta
      getAllproductsApproveBySeller: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/productspendingtoapprovebyseller{params}',
      // Servicio para obtener info expandida de producto multioferta
      getExpandedProductMultiofferbyEan: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/productspendingtoapprovebyseller/specificproduct{params}',
      // Servicio para aceptar o rechazar multioferta
      postAccepRejectedMultioffer: 'https://pb78swws90.execute-api.us-east-1.amazonaws.com/products-pdn/productspendingtoapprovebyseller',
      // Crear y editar una oferta programada
      scheduleoffer: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/scheduleoffer',
      // Borrar un oferta programada
      deleteScheduleoffer: 'https://dgu5y5h0u3.execute-api.us-east-1.amazonaws.com/offer-pdn/scheduleoffer/{params}',
      // Obtener las categorias para los productos pendientes de modificación
      getCategoriesProductsPendingModification: 'https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn/productsrejected/categories',
      // Retorna respuesta del descargable de productos pendientes de modificacíon
      reportProductsPendingModificartion: 'https://qnhy8aplag.execute-api.us-east-1.amazonaws.com/products-waiting-pdn/productsrejected/report?email={email}&categories={categories}',
      //Retorna respuesta con el report de ordenes al correo enviado
      reportOrders:'https://cl9k3h7xr4.execute-api.us-east-1.amazonaws.com/orders-pdn/sellercenter/orders/reportbyadmin/{params}'
    }
  }
};
