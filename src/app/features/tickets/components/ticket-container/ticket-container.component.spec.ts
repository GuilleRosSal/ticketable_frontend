import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketContainerComponent } from './ticket-container.component';

describe('TicketContainerComponent', () => {
  let component: TicketContainerComponent;
  let fixture: ComponentFixture<TicketContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketContainerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
