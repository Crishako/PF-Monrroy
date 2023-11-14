// Import necessary modules
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [CourseService],
    });

    service = TestBed.inject(CourseService);
  });

  it('Debería ser creado', () => {
    expect(service).toBeTruthy();
  });
});
