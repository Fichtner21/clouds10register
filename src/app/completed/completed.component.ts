import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {
  public state$: Observable<object>; 
  public fg$: Observable<object>; 
  
  constructor(private router: Router) {
    // this.state$ = this.router.getCurrentNavigation().extras.state.form;  
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {form: Observable<object>};
    this.fg$ = state.form;       
   }

   ngOnInit(): void {
    
  }

}
