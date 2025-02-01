import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  name: string = '';
  type: string = '';
  duration!: number;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.name && this.type && this.duration > 0) {
      const newWorkout = { name: this.name, type: this.type, duration: this.duration };
      this.workoutService.addWorkout(newWorkout);
      console.log('Workout Added:', newWorkout);

      // Clear the form
      this.name = '';
      this.type = '';
      this.duration = 0;
    }
  }
}
