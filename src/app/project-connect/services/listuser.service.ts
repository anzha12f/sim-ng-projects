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
	private body: string  = 'username=adam.aijaz&password=L8s!5s*sfs'
    
   	
	constructor(private _http: Http, private router: Router) { }


	//Method to get list of user
	getListUserJobs() {
	
	var headers = new Headers();
	headers.append('Authorization', 'Basic '+ btoa('adam.aijaz:L8s!5s*sfs'));
	headers.append('Content-Type', 'application/X-www-form-urlencoded');
	
	return this._http.post(this.SIM_API_URL, this.body,{headers: headers}).map(res => res.json());
	  
	}


}
