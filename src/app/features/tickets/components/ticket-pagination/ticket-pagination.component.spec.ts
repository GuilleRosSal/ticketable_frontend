import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPaginationComponent } from './ticket-pagination.component';

describe('TicketPaginationComponent', () => {
  let component: TicketPaginationComponent;
  let fixture: ComponentFixture<TicketPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPaginationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
