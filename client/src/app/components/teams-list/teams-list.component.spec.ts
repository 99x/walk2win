import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TeamsListComponent } from './teams-list.component';
import { DataService } from 'src/app/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamsListComponent', () => {
	let component: TeamsListComponent;
	let fixture: ComponentFixture<TeamsListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			declarations: [TeamsListComponent],
			providers: [DataService],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TeamsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('defined TeamLead Board should be true', () => {
		expect(component.ngOnInit).toBeDefined();
		expect(component.ngOnInit).toBeTruthy();
		expect(component.loadTeamsLeaderboard).toBeDefined();
		expect(component.loadTeamsLeaderboard).toBeTruthy();
	});

	it('Team List should be true and defined', () => {
		expect(component.getTeamList).toBeDefined();
		expect(component.getTeamList).toBeTruthy();
	});

});
