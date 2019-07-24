import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualListComponent } from './individual-list.component';

describe('IndividualMaleListComponent', () => {
	let component: IndividualListComponent;
	let fixture: ComponentFixture<IndividualListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IndividualListComponent]
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
});
