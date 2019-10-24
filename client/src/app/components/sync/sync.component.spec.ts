import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SyncComponent } from './sync.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleFitService } from 'src/app/services/google-fit.service';

describe('HomeComponent', () => {
	let component: SyncComponent;
	let fixture: ComponentFixture<SyncComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ RouterTestingModule],
			declarations: [SyncComponent],
			providers: [GoogleFitService],
			schemas: [CUSTOM_ELEMENTS_SCHEMA ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SyncComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	xit('should create', () => {
		expect(component).toBeTruthy();
	});

	xit(' should defined initial state ', () => {
		expect(component.ngOnInit).toBeDefined();
		expect(component.viewStepCount).toBeDefined();
		expect(component.syncData).toBeDefined();
		expect(component.getPlayerScore).toBeDefined();
		expect(component.getSyncData).toBeDefined();
	});

	xit('initial state should be true ', () => {
		expect(component.ngOnInit).toBeTruthy();
		expect(component.viewStepCount).toBeTruthy();
		expect(component.syncData).toBeTruthy();
		expect(component.getPlayerScore).toBeTruthy();
		expect(component.getSyncData).toBeTruthy();
	});
});
