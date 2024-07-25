import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { jqxGridComponent, jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { SpiceInventoryService } from "./services/spice-inventory.service";
import { SessionService } from "../auth/services/session.service";
import { map } from "rxjs";

@Component({
    selector: 'app-spice-inventory',
    standalone: true,
    templateUrl: './spice-inventory.component.html',
    imports: [jqxGridModule, ReactiveFormsModule], 
    providers: [SpiceInventoryService]
})
export class SpiceInventoryComponent implements OnInit {
    @ViewChild(jqxGridComponent) grid!: jqxGridComponent;

    columns = [
        { text: 'Id', dataField: 'id', hidden: true },
        { 
            text: 'Spice', 
            dataField: 'spice',
        },
        { text: 'Amount Remaining', dataField: 'amount', columntype: 'rating' },
    ];
    source: any = {
        localdata: [],
        datafields: [
          { name:  'id', type: 'string' },
          { name: 'spice', type: 'string', },
          { name: 'amount', type: 'rating' },
        ],
        datatype: 'array'
    }
    dataAdapter = new jqx.dataAdapter(this.source);
    addSpiceForm = new FormGroup({
        spice: new FormControl(),
        amount: new FormControl()
    });

    constructor(
        private spiceInventoryService: SpiceInventoryService,
        public sessionService: SessionService
    ) { }

    ngOnInit() {
        this.refreshGrid();
    }
    
    refreshGrid() {
        this.spiceInventoryService.getSpiceInventory().pipe(
            map(data => {
                return data.map(val => {
                    return {
                        ...val,
                        spice: `${val.spice?.name} - ${val.spice?.brand}`,
                    }
                })
            })
        ).subscribe(data => {
            this.source.localdata = data;
            console.log(this.source);
            this.grid.updatebounddata('cells');
            this.grid.autoresizecolumns();
        })
    }

    addSpice() {
        const { spice, amount } = {
            ...this.addSpiceForm.value
        };

        this.spiceInventoryService.addSpiceToInventory({
            spice, amount
        }).subscribe(() => {
            console.log('Added spice successfully', spice, amount);
        });
    }
}