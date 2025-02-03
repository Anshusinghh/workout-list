import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { Workout } from '../models/workout.model'; 

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout', () => {
    const mockWorkout= { id: 1, name: 'Alice', type: 'Cardio', duration: 30 };
  
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    spyOn(localStorage, 'setItem');
  
    service.addWorkout(mockWorkout);
  
    expect(localStorage.setItem).toHaveBeenCalledWith('workouts', jasmine.any(String));
  
    const storedData: Workout[] = JSON.parse((localStorage.setItem as jasmine.Spy).calls.mostRecent().args[1]);
    expect(storedData[0].type).toEqual(['Cardio']);  
  });

  it('should update an existing workout', () => {
    const workout1 = { name: 'John', type: 'Cardio', duration: 30 };
    service.addWorkout(workout1);
    
    const workout2 = { name: 'John', type: 'Strength', duration: 20 };
    service.addWorkout(workout2);

    const updatedWorkout = service.getWorkouts().find(w => w.name === 'John');
    expect(updatedWorkout?.type).toContain('Strength');
    expect(updatedWorkout?.duration).toContain(20);
  });

  it('should return all workouts', () => {
    const mockWorkouts: Workout[] = [
      { id: 1, name: 'Alice', type: ['Cardio'], duration: [20] },
      { id: 2, name: 'Bob', type: ['Strength'], duration: [40] }
    ];
  
    // Mock localStorage
    localStorage.setItem('workouts', JSON.stringify(mockWorkouts));
  
    const workouts = service.getWorkouts();
    
    expect(workouts.length).toBe(2);
    expect(workouts).toEqual(mockWorkouts);
  });

  
});
