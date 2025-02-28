import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '@app/shared/shared.module';
import { PendingProductsComponent } from '../pending-products/pending-products.component';
import { PendingProductsRoutingModule } from './pending-products.routing';
import { PendingProductsService } from './pending-products.service';
import { ComboPendingProductComponent } from './combo-pending-product/combo-pending-product.component';
import { ExpandedPendingProductsComponent } from './expanded-pending-products/expanded-pending-products.component';
import { ListProductMultiOfertComponent } from './expanded-pending-products/component/list-product-multi-ofert/list-product-multi-ofert.component';
import { DetailProductMultiOfertComponent } from './expanded-pending-products/component/detail-product-multi-ofert/detail-product-multi-ofert.component';
import { ModalGenericProductMultiOfertComponent } from './expanded-pending-products/component/modal-generic-product-multi-ofert/modal-generic-product-multi-ofert.component';
import { ProductsPendingModificationModalComponent } from './products-pending-modification-modal/products-pending-modification-modal.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        CurrencyMaskModule,
        SharedModule,
        PendingProductsRoutingModule
    ],
    declarations: [
        PendingProductsComponent,
        ComboPendingProductComponent,
        ExpandedPendingProductsComponent,
        ListProductMultiOfertComponent,
        DetailProductMultiOfertComponent,
        ModalGenericProductMultiOfertComponent,
        ProductsPendingModificationModalComponent
    ],
    exports: [
        PendingProductsComponent,
        ComboPendingProductComponent,
        ExpandedPendingProductsComponent
    ],
    entryComponents: [
        ModalGenericProductMultiOfertComponent,
        ProductsPendingModificationModalComponent
    ],
    providers: [
        PendingProductsService
    ]
})
export class PendingProductsModule {
}
