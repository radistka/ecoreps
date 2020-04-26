import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit{
  @Input() data;
  public newStudentModel = '';

  API = 'http://localhost:3000';
  // Declare empty list of students
  students: any[] = [];
  lessons: any[] = [];

  constructor(private http: HttpClient) {
  }

  // Students
  // Add one student to the API
  public addStudent() {
    // tslint:disable-next-line:triple-equals
    if (this.newStudentModel.trim().length === 0) {
      return alert('Please provide a name for the student');
    }
    const name = this.newStudentModel;
    this.http.post(`${this.API}/students`, {name})
      .subscribe((data: any) => {
        this.getAllStudents();
        this.newStudentModel = '';
      }, (error: any) => {
        console.log(error);
      });
  }

  public deleteStudent(student) {
    this.http.delete(`${this.API}/students/` + student._id)
      .subscribe((data: any) => {
        this.getAllStudents();
      }, (error: any) => {
        console.log(error);
      });
  }

  // Get all students from the API
  public getAllStudents() {
    this.http.get(`${this.API}/students`)
      .subscribe((students: any) => {
        console.log(students);
        this.students = students.reverse();
      }, (error: any) => {
        console.log(error);
      });
  }

  // Lessons
  // Get all lessons from the API
  public getAllLessons() {
    this.http.get(`${this.API}/lessons`)
      .subscribe((lessons: any) => {
        console.log(lessons);
        this.lessons = lessons.reverse();
      }, (error: any) => {
        console.log(error);
      });
  }

  public complete(lesson, student) {
    alert('completion of lessons to be implemented');
  }

  private loadData(){
    this.getAllStudents();
    this.getAllLessons()
  }
  ngOnInit(): void {
    this.loadData();
    this.data.reload.subscribe( event => (this.loadData()));
  }

}
