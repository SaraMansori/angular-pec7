import { AbstractControl, ValidatorFn } from "@angular/forms";

export function wineNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const testName = (control.value === 'Laya' || control.value === 'K-Naina' || control.value === 'Verdejo' || control.value === 'Monastrell') ? false : true;
        return testName ? { NameWineValidator: { value: control.value } } : null;
    };
}