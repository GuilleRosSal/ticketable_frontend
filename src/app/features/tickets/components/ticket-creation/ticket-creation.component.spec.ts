import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCreationComponent } from './ticket-creation.component';

describe('TicketCreationComponent', () => {
  let component: TicketCreationComponent;
  let fixture: ComponentFixture<TicketCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCreationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
