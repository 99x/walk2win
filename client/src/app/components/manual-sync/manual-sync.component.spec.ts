import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSyncComponent } from './manual-sync.component';

describe('ManualSyncComponent', () => {
	let component: ManualSyncComponent;
	let fixture: ComponentFixture<ManualSyncComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ManualSyncComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ManualSyncComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
