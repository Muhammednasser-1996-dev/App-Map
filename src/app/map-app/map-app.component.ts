import { Component, OnInit } from '@angular/core';
import {Marker} from '../marker'
import {AngularFireDatabase} from "@angular/fire/database";
import { Employee } from '../employee';

@Component({
  selector: 'app-map-app',
  templateUrl: './map-app.component.html',
  styleUrls: ['./map-app.component.css']
})
export class MapAppComponent implements OnInit {

 constructor(private realTimedb:AngularFireDatabase) { }

 status: boolean = false;
 spin: boolean = false;
 clickEvent(){
    this.status = !this.status; 
    this.spin = !this.spin 
  }

  iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

  google: any
  lat: number = 31.1482546;
  lng: number = 30.1671639;

  mouseOver(m: Marker, i:number){
    m.icon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
}

  clickedMarker(label: string, index: number) {
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
  }

  icon = {
    url: '',
    
  }
 

 EmployeeNamePosition: string;

markers: Marker[] = []

GovNameList: Array<string> = []; 
GovName: string;



GetAllCustomers(){
  this.markers = []
  if(this.GovName) {
    this.oneFieldSearch("GovName", this.GovName)
  }
}
oneFieldSearch (fieldName, fieldVal) {
  let url: string;
  this.realTimedb.database.ref("Wadi-Map/GovIcon/"+fieldVal).once('value',data2=>{
    url=data2.val()['url']
  }).then(()=>{
    this.realTimedb.database.ref("Wadi-Map/D1").once('value', data =>{
      for (const [key, value] of Object.entries(data.val())){ 
    if(value['gov']==fieldVal){
      value['icon']= {
        url: url,
        scaledSize: {
          width: 35,
          height: 40
        }
      }
      this.markers.push(value);
    }
      }
     })
  })
}

getAllGovs(){
  let GovIcon : [];
  this.realTimedb.database.ref('Wadi-Map/D1').once("value", data => {
    Object.values(data.val()).forEach(doc => {
      if (!this.GovNameList.includes(doc['gov'])) {
        this.GovNameList.sort().push(doc['gov'])
      }
    })

  }).then(()=>{
    this.realTimedb.database.ref("Wadi-Map/GovIcon").once('value',data2=>{
      GovIcon=data2.val()
    }).then(()=>{
      this.realTimedb.database.ref("Wadi-Map/D1").once('value', data =>{
        for (const [key, value] of Object.entries(data.val())){ 
    if(typeof GovIcon[value['gov']]!="undefined"){
      value['icon']= {
        url: GovIcon[value['gov']]['url'],scaledSize: {
          width: 35,
          height: 40
        }
      }
    }else{
      value['icon']= {
        url: 'http://developerdrive.developerdrive.netdna-cdn.com/wp-content/uploads/2013/08/ddrive.png',
      }
    }
        this.markers.push(value);
        }
       })
    })
  })
}


  ngOnInit(): void {
    let GovIcon : [];
    this.realTimedb.database.ref('Wadi-Map/D1').once("value", data => {
      Object.values(data.val()).forEach(doc => {
        if (!this.GovNameList.includes(doc['gov'])) {
          this.GovNameList.sort().push(doc['gov'])
        }
      })

    }).then(()=>{
      this.realTimedb.database.ref("Wadi-Map/GovIcon").once('value',data2=>{
        GovIcon=data2.val()
      }).then(()=>{
        this.realTimedb.database.ref("Wadi-Map/D1").once('value', data =>{
          for (const [key, value] of Object.entries(data.val())){ 
        if(typeof GovIcon[value['gov']]!="undefined"){
          value['icon']= {
            url: GovIcon[value['gov']]['url'],scaledSize: {
              width: 35,
              height: 40
            }
          }
      }else{
        value['icon']= {
          url: 'http://developerdrive.developerdrive.netdna-cdn.com/wp-content/uploads/2013/08/ddrive.png',
        }
      }
          
          this.markers.push(value);
        
          }
         })
      })
    })
  }

}
