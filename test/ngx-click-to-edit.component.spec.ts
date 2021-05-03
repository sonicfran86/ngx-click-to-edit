import {
    inject,
    ComponentFixture,
    TestBed, async
} from '@angular/core/testing';

import { NgxClickToEditModule } from '../src/index';
import { NgxClickToEditComponent } from '../src/ngx-click-to-edit.component';

describe('click to edit component', () => {
    let fixture: ComponentFixture<NgxClickToEditComponent>;
    let component: NgxClickToEditComponent;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxClickToEditModule.forRoot()
            ]
        });
        fixture = TestBed.createComponent(NgxClickToEditComponent);
        component = fixture.componentInstance;
        component.value = 'Some text';
        expect(component).toBeDefined();
        element = fixture.nativeElement;
    });

    it('should show default', () => {
        fixture.detectChanges();
        component.makeEditable('trigger');
        expect(component.value).toEqual('Some text');
        expect(component.min).toBeUndefined();
        expect(component.max).toBeUndefined();
        expect(component.type).toEqual('string');
        expect(component.field).toEqual('field');
        expect(component.unit).toEqual('');
        expect(component.full).toBeFalsy();
        expect(component.show).toBeTruthy();
        expect(component.hideTrigger).toBeFalsy();
        expect(element.querySelectorAll('input').length).toBe(0);
        expect(element.querySelectorAll('.ndv-buttons').length).toBe(0);
        expect(element.querySelectorAll('i').length).toBe(1);
        expect(element.querySelector('i').className.split(' ').indexOf('selectable')).toBeGreaterThan(-1);
        expect(element.querySelectorAll('.click-to-edit-value').length).toBe(1);
        expect(element.querySelector('.click-to-edit-value').className.split(' ').indexOf('selectable')).toBe(-1);
        expect(element.querySelectorAll('.click-to-edit-unit').length).toBe(0);
    });

    it('should show unit', () => {
        component.value = '100';
        component.unit = 'm/s';
        fixture.detectChanges();
        expect(element.querySelectorAll('.click-to-edit-unit').length).toBe(1);
        expect(component.unit).toEqual('m/s');
        expect(element.querySelector('.ndv-comp > div').textContent).toEqual('100m/s');
    });

    it('should be fully selectable when full=true ', () => {
        component.unit = 'unit';
        component.full = true;
        fixture.detectChanges();
        component.makeEditable('whatever');
        expect(component.show).toBe(true);
        expect(element.querySelector('.click-to-edit-value').className.split(' ').indexOf('selectable')).toBeGreaterThan(-1);
        expect(element.querySelectorAll('.click-to-edit-unit').length).toBe(1);
        expect(element.querySelector('.click-to-edit-unit').className.split(' ').indexOf('selectable')).toBeGreaterThan(-1);
    });

    it('should be value selectable when full=false and hideTrigger=true ', () => {
        component.unit        = 'unit';
        component.full        = false;
        component.hideTrigger = true;
        fixture.detectChanges();
        expect(element.querySelectorAll('i').length).toBe(0);
        expect(element.querySelector('.click-to-edit-value').className.split(' ').indexOf('selectable')).toBeGreaterThan(-1);
        expect(element.querySelectorAll('.click-to-edit-unit').length).toBe(1);
        expect(element.querySelector('.click-to-edit-unit').className.split(' ').indexOf('selectable')).toBeGreaterThan(-1);
        component.makeEditable('whatever');
        expect(component.show).toBe(true);
    });

    it('should be value not be selectable when full=false and hideTrigger=false and' +
        ' trigger=whatever', () => {
        component.unit        = 'unit';
        component.full        = false;
        component.hideTrigger = false;
        fixture.detectChanges();
        component.makeEditable('whatever');
        expect(component.show).toBe(false);
    });

    it('should show the value when I click the cancel button in edit mode', () => {
        component.show = true;
        fixture.detectChanges();
        expect(element.querySelectorAll('input').length).toBe(1);
        expect(element.querySelectorAll('.ndv-buttons').length).toBe(1);

        component.cancelEditable();
        fixture.detectChanges();
        expect(component.show).toBe(false);
        expect(element.querySelectorAll('input').length).toBe(0);
        expect(element.querySelectorAll('.ndv-buttons').length).toBe(0);
    });

    it('should emit the field and value', () => {
        component.field = 'length';
        component.value = '100';
        spyOn(component.onSave, 'emit');
        component.callSave();
        expect(component.onSave.emit).toHaveBeenCalledWith({ field: 'length', value: '100' });
    });

    it('should allow me to edit the value', () => {
        component.show = true;
        fixture.detectChanges();

        let input: any = element.querySelector('input');
        input.value = 'Other text';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        fixture.whenStable();
        expect(component.value).toEqual('Other text');
    });

    it('should show numeric field', () => {
        let fixture: ComponentFixture<NgxClickToEditComponent> = TestBed.createComponent(NgxClickToEditComponent);
        let component: NgxClickToEditComponent = fixture.componentInstance;
        component.value = 2;
        fixture.detectChanges();
        expect(component.type).toBe('number');
    });

    it('should allow me to set the value', () => {
        fixture.detectChanges();
        component.theValue = 'Other text';

        expect(component.value).toEqual('Other text');
    });


});
