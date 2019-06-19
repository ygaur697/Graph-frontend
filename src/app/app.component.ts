import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { data } from './data';
import * as $ from 'jquery';
<<<<<<< HEAD
import { bar } from './bardata';
import { Chart } from 'chart.js';
import { Subscription } from "rxjs";

=======
import { bar } from './bardata'
>>>>>>> parent of 15daf9c... added chart js
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
<<<<<<< HEAD


  constructor() {


  }


  ngOnInit() {

  }

  ngOnDestroy() {
=======
  title = 'application';
  startVal = '';
  endVal = '';
  interval = '';
  value: Array<data>;



  constructor(private webSocketService: WebsocketService) {
    this.value = [];

  }
  public colors = ['red', 'green', 'blue']
  public dataColumns = [1];
  /* public barChartData = [{
     id: 0,
     label: 'label1',
     value1: 10,
     value2: 10,
     value3: 10,
   }, {
     id: 1,
     label: 'label2',
     value1: 10,
     value2: 10,
     value3: 10,
   }]*/
  public barChartData = [];
  norm = {
    id: 1,
    label: 'label',
    value1: 10
  }


  ngOnInit() {
    //Here we will listen to an event from the socket io server

    this.webSocketService.listen('response').subscribe((data) => {
      console.log(data);
      this.updategraph(data);

    });
  }

  creategraph() {
    let values = {
      start_val: parseInt(this.startVal, 10),
      end_val: parseInt(this.endVal, 10),
      interval: parseInt(this.interval, 10)
    };
    console.log("VAL", this.startVal);
    this.webSocketService.emit('test', values);

  }
  updategraph(values) {
    this.barChartData = [];
    for (let i = 0; i < values.length; i++) {

      this.norm = {
        id: i,
        label: 'label',
        value1: values[i],
      }
      this.barChartData.push(this.norm);

    }
    console.log(this.barChartData);
>>>>>>> parent of 15daf9c... added chart js

  }




<<<<<<< HEAD


=======
>>>>>>> parent of 15daf9c... added chart js
}

