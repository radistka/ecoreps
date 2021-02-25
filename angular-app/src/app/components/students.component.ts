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
        const sorted =[...students].sort((a,b) => (b.finished_lessons.length - a.finished_lessons.length));
        students.forEach((student) => {
          // todo: if we have multiple users with same amount of finished lessons there may be needed clarification:
          // todo: example user 1 had finished 2 lessons same as user 2, but user 3 finished no lessons, ranks for them will be 1, 1, 3
          // todo: clarification question - Is this rank correct? Or it should be 1, 1, 2? If it should be 1, 1, 2 formula provided for rank calculation should be updated
          student.rank = (sorted.findIndex(i => i.finished_lessons.length === student.finished_lessons.length) + 1);
          student.lessons = this.lessons.map((lesson) => {
            return {
              ...lesson,
              checked: student.finished_lessons.indexOf(lesson._id) >= 0,
            }
          });
          console.log(student);
          student.percentiles = ((students.length-student.rank)/(students.length-1) * 100);
          student.donePercent = ((student.finished_lessons.length/student.lessons.length)*100).toFixed(2);
        });

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
        this.lessons = lessons.reverse();
      }, (error: any) => {
        console.log(error);
      });
  }

  public complete(lesson, student, event) {
    const isDone = event.target.checked;
    this.http.put(`${this.API}/students/${student._id}/lessons`, {
      lesson_id: lesson._id,
      done: isDone,
    })
      .subscribe((data: any) => {
        this.getAllStudents();
      }, (error: any) => {
        console.log(error);
      });
  }

  private loadData(){
    this.getAllLessons();
    this.getAllStudents();
  }
  ngOnInit(): void {
    this.loadData();
    this.data.reload.subscribe( event => (this.loadData()));
  }

}
