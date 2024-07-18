import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return Object.keys(value);
    }
}