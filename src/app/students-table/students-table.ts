import { Component, Input } from '@angular/core';
import { Student } from '../../shared/entities';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FullnamePipe } from '../../shared/pipes/fullname-pipe';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, FullnamePipe, MatPaginatorModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.css'
})

export class StudentsTable implements AfterViewInit{

  @Input() set students(value: Student[]) {
    this.dataSource.data = value;
  }

  displayedColumns: string[] = ['id', 'name', 'dni', 'email'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
