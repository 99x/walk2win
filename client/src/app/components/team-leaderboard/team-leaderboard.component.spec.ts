import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TeamLeaderboardComponent } from './team-leaderboard.component';
import { DataService } from 'src/app/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
describe('TeamLeaderboardComponent', () => {
	let component: TeamLeaderboardComponent;
	let fixture: ComponentFixture<TeamLeaderboardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ],
			declarations: [TeamLeaderboardComponent],
			providers: [ DataService],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TeamLeaderboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('defined Male and female leadboard should be true', () => {
		expect(component.ngOnInit).toBeDefined();
		expect(component.ngOnInit).toBeTruthy();
		expect(component.loadMaleLeaderboard).toBeDefined();
		expect(component.loadFemaleLeaderboard).toBeDefined();
		expect(component.loadMaleLeaderboard).toBeTruthy();
		expect(component.loadFemaleLeaderboard).toBeTruthy();
	});

});
