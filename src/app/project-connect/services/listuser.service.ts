/**************************************************
* Service : listuser
* Created on: 03Aug17
* Created By: Adam
* Description: This is main service to get list of user jobs
* With Authorisation .
*
******************************************************/

import { Injectable }    from '@angular/core';
import { environment }   from '../../../environments/environment';
import { Http, Headers } from '@angular/http';
import {Router}          from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ListuserService{
	
	private SIM_CON_KEY: string = environment.SIM_CON_KEY;
	private SIM_CON_SEC: string = environment.SIM_CON_SEC;
	private SIM_API_URL: string = environment.SIM_API_URL;
	private perPage: string = "&per_page=10";

	private windowHandle;
    private ourcode;
    private accesstoken;
   	
	constructor(private _http: Http, private router: Router) { }

	//Method to get list of user
	getListUserJobs() {
	  return this._http.get(this.SIM_API_URL).map(res => res.json());
	}


	//Get Authorization from OAUTH
	authorizeuser() {
  
  		// Obtain a Request token
   		this.windowHandle = window.open('http://sandbox.simpro.co/oauth/request_token.php?client_id=adamaijaz&response_type=code&redirect_uri=https://itssuite.simprocloud.com');
  		var href;
  		console.log(this.windowHandle);
  		if (this.windowHandle === null) {
  			console.log("Serious Problem cant access...");
  			return false;
  		}
  		setTimeout(() => {
    	href = this.windowHandle.location.href;
    
    	this.windowHandle.close();
    	var extractedcode = href.split('=');
    	this.ourcode = extractedcode[1];
    	if (this.ourcode) {
    		this.getAccessToken();
    		return true;
    	} else {
    		console.log('Access denied. Try again');
    		return false;
    	}
  		},5000);
	}

	//Get Access Token
	getAccessToken() {
  	
	  var basicheader = btoa(this.SIM_CON_KEY + ':' + this.SIM_CON_SEC);
	  
	  var headers = new Headers();
	  
	  headers.append('Authorization', 'Basic '+ basicheader);
	  headers.append('Content-Type', 'application/X-www-form-urlencoded');
	  
	  var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=https://itssuite.simprocloud.com';
	  
	  this._http.post('http://sandbox.simpro.co/oauth/access_token.php', tokendata, {headers: headers})
	  .subscribe((data) => {
	  	this.accesstoken = data.json().access_token;
    	console.log(this.accesstoken);
      this.router.navigate(['/api/?procedure=JobRetrieveAllocated companyid=0']);
  })
}
	
}
