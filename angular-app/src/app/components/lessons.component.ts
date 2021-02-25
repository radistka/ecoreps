import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './lessons.component.html'
})
export class LessonsComponent implements OnInit {
  @Input() data;
  public newLessonModelTitle = '';

  API = 'http://localhost:3000';
  // Declare empty list of students
  lessons: any[] = [];

  constructor(private http: HttpClient) {
  }

  // Students
  // Add one student to the API
  public addLesson() {
    // tslint:disable-next-line:triple-equals
    if (this.newLessonModelTitle.trim().length === 0) {
      return alert('Please provide a name for the student');
    }
    const title = this.newLessonModelTitle;
    this.http.post(`${this.API}/lessons`, {title})
      .subscribe((data: any) => {
        this.getAllLessons();
        this.newLessonModelTitle = '';
      }, (error: any) => {
        console.log(error);
      });
  }

  public deleteLesson(lesson) {
    this.http.delete(`${this.API}/lessons/` + lesson._id)
      .subscribe((data: any) => {
        this.getAllLessons();
      }, (error: any) => {
        console.log(error);
      });
  }

  // Get all students from the API
  public getAllLessons() {
    this.http.get(`${this.API}/lessons`)
      .subscribe((lessons: any) => {
        this.lessons = lessons.reverse();
      }, (error: any) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.getAllLessons();
  }

}
