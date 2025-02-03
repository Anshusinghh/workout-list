import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // For Table
import { MatPaginatorModule } from '@angular/material/paginator';  // For Pagination
import { MatInputModule } from '@angular/material/input'; // For Input field
import { MatSelectModule } from '@angular/material/select'; // For Select Dropdown
import { MatButtonModule } from '@angular/material/button'; // For Button


@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule,WorkoutFormComponent, WorkoutListComponent,
            MatTableModule,
            MatButtonModule,
            MatInputModule,
            MatSelectModule,
            MatPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Workout Title';
}
