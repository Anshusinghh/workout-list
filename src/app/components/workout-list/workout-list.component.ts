import { Component , OnInit} from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-workout-list',
    imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit{
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  selectedType: string = ''; 
  searchQuery: string = '';

  constructor(private workoutService: WorkoutService) {}

  
  ngOnInit() {
    this.loadWorkouts();

    // Listen for updates from WorkoutService
    this.workoutService.workoutUpdated$.subscribe(() => {
      this.loadWorkouts();
    });
  }

  loadWorkouts() {
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = [...this.workouts];  // Initially show all workouts
    
  }

  searchWorkouts() {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    
  }

  filterByType() {
    if(!this.searchQuery){
    if (this.selectedType && this.selectedType !== '') {
      this.filteredWorkouts = this.filteredWorkouts.filter(workout =>
        workout.type.includes(this.selectedType) // Filter by workout type
      );
    } else {
      // If "All Types" or empty is selected, show all workouts
      this.filteredWorkouts = [...this.workouts];
    }
  }

  }

  // Get the count of workouts for each person
  getWorkoutCount(workout: Workout): number {
    return workout.type.length;
  }

  // Get total duration for each person
  getTotalDuration(workout: Workout): number {
    return workout.duration.reduce((acc, d) => acc + d, 0);
  }
}
