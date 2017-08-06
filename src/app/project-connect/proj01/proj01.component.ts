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
	  this.interval = 50000;
	  this.timer = Observable.timer(0, this.interval);
  }


  handleSuccess(data){
	  	
	  this.jobsFound = true;
	  this.list_jobs = data.result;
	  console.log(this.list_jobs);
  }


  handleError(error) {

	  console.log(error);
  }
 
  searchUserJobs() {

  	  console.log("Processing....");

  	  	this.alive = true;
 
        //back to timer	
  	    this.ngOnInit();   
  	     
  } 

  ngOnInit() {

      this.searching = true;
  	  this.timer
  	    .takeWhile(() => this.alive)
  		    .subscribe(() => {
  			    this._listuserService.getListUserJobs()
  			      .subscribe(data => this.handleSuccess(data),
  			    error => this.handleError(error),
  			    () => this.searching = false
  			
  			) 

  		}) 
   // }  
  }

  ngOnDestroy(){

    this.alive = false; // switches your IntervalObservable off
  }


}



