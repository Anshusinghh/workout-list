import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';
import { BehaviorSubject,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey: string = 'workouts';
  private workoutsSubject = new BehaviorSubject<Workout[]>(this.getWorkouts());
  workouts$ = this.workoutsSubject.asObservable();

  workoutUpdated$ = new Subject<void>(); // Notify components when updated

  constructor() {
    // Initialize localStorage with an empty array if no data exists
    if (this.isLocalStorageAvailable() && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get workouts from localStorage
  getWorkouts(): Workout[] {
    if (this.isLocalStorageAvailable()) {
      const workouts = localStorage.getItem(this.storageKey);
      return workouts ? JSON.parse(workouts) : [];
    } else {
      return [];
    }
  }

  // Save workouts to localStorage
  saveWorkouts(workouts: Workout[]): void {

    localStorage.setItem('workouts', JSON.stringify(workouts));
    this.workoutsSubject.next(workouts); // Notify components
    this.workoutUpdated$.next(); // Notify workout list
  }

  // Add a new workout with a unique ID
  addWorkout(workout: { name: string; type: string; duration: number }): void {
    let workouts = this.getWorkouts();
  
    // Check if a record already exists for this person
    let existingWorkout = workouts.find(w => w.name === workout.name);
  
    if (existingWorkout) {
      // Person already exists, update their record
      existingWorkout.type.push(workout.type);
      existingWorkout.duration.push(workout.duration);
    } else {
      // New entry, create a new workout object
      const newId = workouts.length > 0 ? Math.max(...workouts.map(w => w.id!)) + 1 : 1;
      const newWorkout: Workout = {
        id: newId,
        name: workout.name,
        type: [workout.type], // Store as an array
        duration: [workout.duration] // Store as an array
      };
      workouts.push(newWorkout);
    }
  
    this.saveWorkouts(workouts);
  }
  
}
