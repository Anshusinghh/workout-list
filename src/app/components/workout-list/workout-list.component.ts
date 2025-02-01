import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-list',
    imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  searchQuery: string = '';

  constructor(private workoutService: WorkoutService) {
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = this.workouts;
  }

  searchWorkouts() {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
