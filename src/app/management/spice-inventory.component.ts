import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { jqxGridComponent, jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { SpiceInventoryService } from "./services/spice-inventory.service";
import { SessionService } from "../auth/services/session.service";
import { forkJoin, map, Observable } from "rxjs";
import { jqxComboBoxModule } from 'jqwidgets-ng/jqxcombobox';
import { SpiceModel } from "../../db/spice.model";
import { SpicesService } from "./services/spices.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-spice-inventory',
    standalone: true,
    templateUrl: './spice-inventory.component.html',
    imports: [jqxGridModule, ReactiveFormsModule, CommonModule, jqxComboBoxModule], 
    providers: [SpiceInventoryService, SpicesService]
})
export class SpiceInventoryComponent implements OnInit {
    @ViewChild(jqxGridComponent) grid!: jqxGridComponent;

    selectedIndexes: number[] = [];
    columns = [
        { text: 'Id', dataField: '_id', hidden: false },
        { 
            text: 'Spice', 
            dataField: 'spice',
        },
        { text: 'Amount Remaining', dataField: 'amount', columntype: 'rating' },
    ];
    source: any = {
        localdata: [],
        datafields: [
          { name:  '_id', type: 'string' },
          { name: 'spice', type: 'string', },
          { name: 'amount', type: 'rating' },
        ],
        datatype: 'array'
    }
    dataAdapter = new jqx.dataAdapter(this.source);
    addSpiceForm = new FormGroup({
        spiceId: new FormControl(),
        amount: new FormControl()
    });

    spices: SpiceModel[] = [];

    constructor(
        private spiceInventoryService: SpiceInventoryService,
        private spiceService: SpicesService,
        public sessionService: SessionService
    ) { }

    ngOnInit() {
        this.refreshGrid();
        this.spiceService.getSpices().subscribe(spices => this.spices = spices);
    }

    onSpiceChange(e: any) {
        console.log(e);
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
            console.log(data);
            this.source.localdata = data;
            this.grid.updatebounddata('cells');
            this.grid.autoresizecolumns();
        })
    }

    getSelectedRows(e: any) {
        const selectedIndexes = this.grid.getselectedrowindexes();
        this.selectedIndexes = selectedIndexes;
    }

    deleteSelectedSpices() {
        let deletes: Observable<any>[] = [];
        this.selectedIndexes.forEach(index => {
            const data = this.grid.getrowdata(index);
            deletes.push(this.spiceInventoryService.deleteFromSpiceInventory(data._id));
        });
        forkJoin(deletes).subscribe({
            next: () => {
                console.log('Successfully deleted.');
                this.refreshGrid();
            },
            error: (err) => {
                console.error('Failed to delete.', err);
            }
        })
    }
    
    addSpice() {
        const { spiceId, amount } = {
            ...this.addSpiceForm.value
        };

        this.spiceInventoryService.addSpiceToInventory({
            spiceId, amount
        }).subscribe(() => {
            console.log('Added spice successfully', spiceId, amount);
            this.refreshGrid();
        });
    }
}