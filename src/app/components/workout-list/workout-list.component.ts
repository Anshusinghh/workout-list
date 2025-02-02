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
  displayedWorkouts: Workout[] = [];
  selectedType: string = ''; 
  searchQuery: string = '';
  displayedColumns: string[] = ['name', 'workouts', 'workoutCount', 'totalDuration'];
  currentPage: number = 1;
  pageSize: number = 5;
  totalWorkouts: number = 0;

  constructor(private workoutService: WorkoutService) {}

  
  ngOnInit() {
    this.loadWorkouts();

    // Listen for updates from WorkoutService
    this.workoutService.workoutUpdated$.subscribe(() => {
      this.loadWorkouts();
    });
  }

  paginateData() {
    if (!this.filteredWorkouts) return;  // Ensure filteredWorkouts is defined
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    if(this.searchQuery || this.selectedType){
      this.filteredWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
    }
    else this.filteredWorkouts = this.workouts.slice(startIndex, endIndex);
    
  }
  

  loadWorkouts() {
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = [...this.workouts];  // Initially show all workouts
    this.totalWorkouts = this.filteredWorkouts.length;
    
    this.paginateData();
  }



  searchWorkouts() {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalWorkouts = this.filteredWorkouts.length; // Update count
    
    this.currentPage=1;
    this.paginateData();
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
    this.totalWorkouts = this.filteredWorkouts.length; // Update count
    this.currentPage=1
    this.paginateData();
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

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      console.log("next-page")
      this.currentPage++;
      this.paginateData();
      console.log(this.filteredWorkouts)
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }
  

  goToPage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.totalWorkouts / this.pageSize)) {
      this.currentPage = page;
      this.paginateData();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalWorkouts / this.pageSize);
  }
}
