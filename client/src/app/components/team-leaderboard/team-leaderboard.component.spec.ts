import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeaderboardComponent } from './team-leaderboard.component';

describe('TeamLeaderboardComponent', () => {
  let component: TeamLeaderboardComponent;
  let fixture: ComponentFixture<TeamLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLeaderboardComponent ]
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
});
