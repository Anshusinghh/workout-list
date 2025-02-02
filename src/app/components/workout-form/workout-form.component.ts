import { Component,EventEmitter,Output } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-workout-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {

  @Output() workoutAdded = new EventEmitter<void>();

  name: string = '';
  type: string = '';
  duration!: number;

  constructor(private workoutService: WorkoutService, private snackBar: MatSnackBar) {}


  addWorkout() {
    try {
      if (this.name && this.type && this.duration > 0) {
        const newWorkout = {
          name: this.name,
          type: this.type,
          duration: this.duration
        };
  
        this.workoutService.addWorkout(newWorkout);
        this.snackBar.open('✅ List Updated Successfully!', 'OK',{duration:4000});
  
        this.workoutAdded.emit();
        
        // Clear the form
        this.name = '';
        this.type = '';
        this.duration = 0;
      } else {
        this.snackBar.open('⚠️ Please fill in all fields correctly.', 'OK', { duration: 2000 });
      }
    } catch (error) {
      this.snackBar.open('❌ An error occurred while updating the list.', 'OK', { duration: 3000 });
      console.error(error);
    }
  }
  
}
