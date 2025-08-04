import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Course } from '../../../../shared/entities';

@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule, MatPaginatorModule, RouterModule],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.css'
})
export class CoursesTable implements AfterViewInit {

  @Input() set courses(value: Course[]) {
    this.dataSource.data = value;
  }

  @Output() deleteEvent = new EventEmitter<Course>();

  constructor(private router: Router) { }

  displayedColumns: string[] = ['name', 'code', 'credits', 'actions'];
  dataSource = new MatTableDataSource<Course>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(course: Course) {
    this.router.navigate(['/view-course'], {
      state: { course: course }
    }
    );
  }

  deleteCourse(course: Course) {
    this.deleteEvent.emit(course);
  }

  editCourse(course: Course) {
    this.router.navigate(['/edit-course'], {
      state: { course: course }
    });
  }
}
