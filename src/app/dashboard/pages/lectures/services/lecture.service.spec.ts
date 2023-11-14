import { TestBed } from '@angular/core/testing';

import { LectureService } from './lecture.service';
import { CourseService } from '../../courses/services/course.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LectureService', () => {
  let service: LectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [CourseService],
    });
    service = TestBed.inject(LectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
