/**************************************************
* Component : Proj01
* Created on: 03Aug17
* Created By: Adam
* Description: This is Proj01 main component, purpose to to call
* List User Service and display data, Authorisation happened at 
* Service level.
* Logic : Automatically triggered API call after every 5 sec, but
*  given option to trigger from screen Button also (but no need just for debug)
* As usual Observable is set with timer and execute the logic
*
******************************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListuserService } from '../services/listuser.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-proj01',
  templateUrl: './proj01.component.html',
  styleUrls: ['./proj01.component.css']
})

export class Proj01Component implements OnInit, OnDestroy {

  list_jobs: any[];
  isAuthorised: boolean = false;
  jobsFound: boolean = false;
  searching: boolean = false;
  alive: boolean;
  
  private timer: Observable<number>;
  private interval: number;

  constructor( private _listuserService : ListuserService) { 

	  this.alive = true;
	  this.interval = 5000;
	  this.timer = Observable.timer(0, this.interval);
  }


  handleSuccess(list_Jobs){
	  	
	  this.jobsFound = true;
	  this.list_jobs = list_Jobs;
	  console.log(list_Jobs);
  }


  handleError(error) {

	  console.log(error);
  }
 
  searchUserJobs() {

  	  console.log("Processing....");

  	  if (this._listuserService.authorizeuser()) {
  	  	
  	  	this.alive = true;
  	  	/*
  	    this.searching = true;
  	  	return this._listuserService.getListUserJobs()
        .subscribe(list_jobs=>{
          this.list_jobs = list_jobs;
          console.log(list_jobs);
        },
        error => this.handleError(error),
  		 () => this.searching = false
        
        )
	*/
        //back to timer	
  	    this.ngOnInit();   
  	 }    
  } 

  ngOnInit() {

  	// this.searchUserJobs();
  	
      this.searching = true;
  	  this.timer
  	    .takeWhile(() => this.alive)
  		.subscribe(() => {
  			this._listuserService.getListUserJobs()
  			    .subscribe(list_Jobs => this.handleSuccess(list_Jobs),
  			error => this.handleError(error),
  			() => this.searching = false
  			
  			) 

  		}) 
  }

  ngOnDestroy(){

    this.alive = false; // switches your IntervalObservable off
  }

}



