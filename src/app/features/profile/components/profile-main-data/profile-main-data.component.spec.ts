import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainDataComponent } from './profile-main-data.component';

describe('ProfileMainDataComponent', () => {
  let component: ProfileMainDataComponent;
  let fixture: ComponentFixture<ProfileMainDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMainDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMainDataComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
