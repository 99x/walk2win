import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersComponent } from './team-members.component';

describe('TeamMembersComponent', () => {
	let component: TeamMembersComponent;
	let fixture: ComponentFixture<TeamMembersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TeamMembersComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TeamMembersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
