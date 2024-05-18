import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintAdminComponent } from './fingerprint-admin.component';

describe('FingerprintAdminComponent', () => {
  let component: FingerprintAdminComponent;
  let fixture: ComponentFixture<FingerprintAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FingerprintAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FingerprintAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
