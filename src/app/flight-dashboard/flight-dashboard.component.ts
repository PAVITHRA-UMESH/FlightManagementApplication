import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,FormControl} from'@angular/forms';
import { ApiService } from '../Shared/api.service';
import { FlightModel } from './flight-dashboard.model';

@Component({
  selector: 'app-flight-dashboard',
  templateUrl: './flight-dashboard.component.html',
  styleUrls: ['./flight-dashboard.component.css']
})
export class FlightDashboardComponent implements OnInit {
  

  formValue!:FormGroup;
  flightModelObj:FlightModel=new FlightModel();
  flightData !:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
   this.formValue=this.formbuilder.group({
     id:[''],
     flightname:[''],
     fromcity:[''],
     tocity:[''],
     date:[new Date],
     airportname:['']
   })
   this.getAllFlight();
  }
  clickAddFlight(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postFlightDetails(){
    this.flightModelObj.id=this.formValue.value.id;
    this.flightModelObj.flightname=this.formValue.value.flightname;
    this.flightModelObj.fromcity=this.formValue.value.fromcity;
    this.flightModelObj.tocity=this.formValue.value.tocity;
    this.flightModelObj.date=this.formValue.value.date;
    this.flightModelObj.airportname=this.formValue.value.airportname;

    this.api.postFlight(this.flightModelObj)
      .subscribe(res=>{
        console.log(res);
        alert("Flight Added Successfully!!!");
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllFlight();
      },
      err=>{
        alert("Something Went Wrong!!!");
      })
    }
    getAllFlight(){
      this.api.getFlight()
      .subscribe(res=>{
      this.flightData=res;
      })
    }
    deleteFlight(row:any){
      this.api.deleteFlight(row.id)
      .subscribe(res=>{
        alert("Flight Deleted!!!");
        this.getAllFlight();
      })
    }
    onEdit(row:any){
     this.showAdd=false;
     this.showUpdate=true;

      this.formValue.controls['id'].setValue(row.id);
      this.formValue.controls['flightname'].setValue(row.flightname);
      this.formValue.controls['fromcity'].setValue(row.fromcity);
      this.formValue.controls['tocity'].setValue(row.tocity);
      this.formValue.controls['date'].setValue(row.date);
      this.formValue.controls['airportname'].setValue(row.airportname);
    }
    updateFlightDetails(){
      this.flightModelObj.id=this.formValue.value.id;
      this.flightModelObj.flightname=this.formValue.value.flightname;
      this.flightModelObj.fromcity=this.formValue.value.fromcity;
      this.flightModelObj.tocity=this.formValue.value.tocity;
      this.flightModelObj.date=this.formValue.value.date;
      this.flightModelObj.airportname=this.formValue.value.airportname;

      this.api.updateFlight(this.flightModelObj,this.flightModelObj.id).subscribe(res=>{
        alert("Updated Successfully!!!");
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllFlight();
      })
    }
    isDescOrder:boolean=true;
    orderHeader:String='';
    Sort(headerName:String){
     this.isDescOrder=!this.isDescOrder;
     this.orderHeader=headerName;
}
  }




