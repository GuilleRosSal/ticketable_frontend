import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePasswordChangeComponent } from './profile-password-change.component';

describe('ProfilePasswordChangeComponent', () => {
  let component: ProfilePasswordChangeComponent;
  let fixture: ComponentFixture<ProfilePasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePasswordChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePasswordChangeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
