import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';	
import { TeamMembersComponent } from './team-members.component';
import { DataService } from 'src/app/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamMembersComponent', () => {
	let component: TeamMembersComponent;
	let fixture: ComponentFixture<TeamMembersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule],
			declarations: [TeamMembersComponent],
			providers: [ DataService],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TeamMembersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	xit('should create', () => {
		expect(component).toBeTruthy();
	});

	xit('defined Individual should be true', () => {
		expect(component.ngOnInit).toBeDefined();
		expect(component.ngOnInit).toBeTruthy();
		expect(component.navigateBack).toBeDefined();
		expect(component.getIndividual).toBeDefined();
		expect(component.navigateBack).toBeTruthy();
		expect(component.getIndividual).toBeTruthy();
	});
});
