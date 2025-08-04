import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../../shared/entities';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FullnamePipe } from '../../../../shared/pipes/fullname-pipe';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoutePaths } from '../../../../shared/routes';


@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, FullnamePipe, MatPaginatorModule, RouterModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.css'
})

export class StudentsTable implements AfterViewInit {

  @Input() set students(value: Student[]) {
    this.dataSource.data = value;
  }

  @Output() deleteEvent = new EventEmitter<Student>();

  constructor(private router: Router) { }

  displayedColumns: string[] = ['id', 'name', 'dni', 'email', 'actions'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(student: Student) {
    this.router.navigate([RoutePaths.VIEWSTUDENT], {
      state: { student: student }
    }
    );
  }

  editStudent(student: Student) {
    this.router.navigate([RoutePaths.EDITSTUDENT], {
      state: { student: student }
    });
  }

  deleteStudent(student: Student) {
    this.deleteEvent.emit(student);
  }
}
