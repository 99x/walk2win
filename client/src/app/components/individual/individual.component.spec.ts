import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualComponent } from './individual.component';

describe('IndividualMaleComponent', () => {
	let component: IndividualComponent;
	let fixture: ComponentFixture<IndividualComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IndividualComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IndividualComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('component navigateBack state', () => {
		expect(component.navigateBack).toBeDefined();
		expect(component.navigateBack).toBeTruthy();
	});
});
