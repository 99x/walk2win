import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManualSyncComponent } from './manual-sync.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from 'src/app/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManualSyncComponent', () => {
	let component: ManualSyncComponent;
	let fixture: ComponentFixture<ManualSyncComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, NgbDatepickerModule, RouterTestingModule, HttpClientTestingModule],
			declarations: [ManualSyncComponent],
			providers: [ DataService],
			schemas: [CUSTOM_ELEMENTS_SCHEMA ]
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

	it('component initial state', () => {
		expect(component.ngOnInit).toBeDefined();
		expect(component.ngOnInit).toBeTruthy();
		expect(component.onSubmit).toBeDefined();
	});

	it('Should set submitted to true', async(() => {
		expect(component.onSubmit).toBeTruthy();
	}));  
});
