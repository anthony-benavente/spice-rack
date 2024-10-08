import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { jqxGridComponent, jqxGridModule,  } from "jqwidgets-ng/jqxgrid";
import { SpiceForms } from "../../db/spiceForms.enum";
import { CommonModule } from "@angular/common";
import { SpicesService } from "./services/spices.service";
import { SpiceModel } from "../../db/spice.model";

@Component({
  selector: 'app-spices',
  templateUrl: './spices.component.html',
  imports: [jqxGridModule, ReactiveFormsModule, CommonModule],
  providers: [SpicesService],
  standalone: true
})
export class SpicesComponent implements OnInit {

  @ViewChild('spiceName') spiceName!: { nativeElement: HTMLElement };
  @ViewChild('spiceGrid') spiceGrid!: jqxGridComponent;

  spiceColumns: jqwidgets.GridColumn[] = [
    { text: 'Name', datafield: 'name' },
    { text: 'Brand', datafield: 'brand' },
    { text: 'Form', datafield: 'form' },
    { text: 'Created Date', datafield: 'createdAt', columntype: 'datetimeinput', cellsformat: 'MMM d, y, hh:mm:ss' },
    { text: 'Updated Date', datafield: 'updatedAt', columntype: 'datetimeinput', cellsformat: 'MMM d, y, hh:mm:ss' },
  ];
  source: any = {
    localdata: [],
    datafields: [
      { name:  'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'brand', type: 'string' },
      { name: 'form', type: 'string' },
      { name: 'createdAt', type: 'date' },
      { name: 'updatedAt', type: 'date' },
    ],
    datatype: 'array'
  }
  dataAdapter = new jqx.dataAdapter(this.source);
  addSpiceForm = new FormGroup({
    name: new FormControl(),
    brand: new FormControl(),
    form: new FormControl()
  });
  spiceForms: { text: string, value: string }[];

  constructor(
    private spicesService: SpicesService
  ) {
    this.spiceForms = Object.keys(SpiceForms)
      .map(form => ({
        text: form.charAt(0) + form.slice(1).toLowerCase(),
        value: form.toLowerCase()
      }));
    this.spiceForms.sort((a, b) => a.value < b.value ? -1 : 1);
  }

  ngOnInit(): void {
    this.spicesService.getSpices().subscribe(data => {
      this.source.localdata = data;
      this.spiceGrid.updatebounddata('cells');
      this.spiceGrid.autoresizecolumns();
    });
  }

  addSpice() {
    const toAdd = {
      ...this.addSpiceForm.value
    };
    this.spicesService.addSpice(toAdd).subscribe(data => {
      this.source.localdata.push(data);
      this.spiceGrid.addrow(data.id, data);
      this.spiceGrid.autoresizecolumns();
      this.addSpiceForm.reset();
      console.log(this.spiceName.nativeElement.focus());
    });
  }
}