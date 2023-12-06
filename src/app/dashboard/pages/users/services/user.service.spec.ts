import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'; 
import { UserService } from './user.service';
import { reducer } from '../store/user.reducer';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, StoreModule.forRoot({ yourFeature: reducer })], 
    });
    
    service = TestBed.inject(UserService);
  });

  it('UserService debería ser creado', () => {
    expect(service).toBeTruthy();
  });
});
