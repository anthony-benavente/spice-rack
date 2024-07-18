import { SpiceForms } from "./spiceForms.enum";

export class SpiceModel {
    id?: string;
    name?: string;
    brand?: string;
    form?: SpiceForms;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: {
        name?: string,
        brand?: string,
        form?: SpiceForms
    }) {
        this.name = data.name;
        this.brand = data.brand;
        this.form = data.form;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}