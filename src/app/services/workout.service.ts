import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey: string = 'workouts';

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
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(workouts));
    }
  }

  // Add a new workout with a unique ID
  addWorkout(workout: Workout): void {
    const workouts = this.getWorkouts();

    // Generate the next unique ID (use the highest ID + 1)
    const validIds = workouts.map(w => w.id).filter(id => id !== undefined) as number[];

    const newId = validIds.length > 0 ? Math.max(...validIds) + 1 : 1;

    const workoutWithId = { ...workout, id: newId };
    workouts.push(workoutWithId);
    this.saveWorkouts(workouts);
  }
}
