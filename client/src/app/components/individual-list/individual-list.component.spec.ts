import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IndividualListComponent } from './individual-list.component';
import { DataService } from 'src/app/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IndividualListComponent', () => {
	let component: IndividualListComponent;
	let fixture: ComponentFixture<IndividualListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			declarations: [IndividualListComponent],
			providers: [ DataService],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IndividualListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('getIndividual player initial state defined', () => {
		expect(component.ngOnInit).toBeDefined();
		expect(component.ngOnInit).toBeTruthy();
		expect(component.getIndividual).toBeDefined();
		expect(component.getIndividual).toBeTruthy();
	});
});
