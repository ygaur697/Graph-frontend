import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { data } from '../data';
import * as $ from 'jquery';
import { bar } from '../bardata';
import { Chart } from 'chart.js';
import { Subscription } from "rxjs";
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [GraphComponent]
})
export class DataComponent implements OnInit {
  title = 'application';
  startVal = '';
  endVal = '';
  interval = '';
  value: Array<data>;
  chartArray: any;
  displayData: any;

  your_subscription: any;

  constructor(private webSocketService: WebsocketService, private graphcalling: GraphComponent) {

    this.value = [];
    this.chartArray = [];
    this.displayData = [];
  }



  public dataColumns = [1];
  public barChartData = [];
  public array2 = [];


  ngOnInit() {
    const a = [1, 2, 3, 4, 5];
    console.log(a);
    console.log("im getting called ");
  }

  ngOnDestroy() {
    this.your_subscription.unsubscribe();
  }



  creategraph() {

    if (this.your_subscription != undefined) {
      this.your_subscription.unsubscribe();
      console.log("killed a subscription");
    }
    let values = {
      start_val: parseInt(this.startVal, 10),
      end_val: parseInt(this.endVal, 10),
      interval: parseInt(this.interval, 10)
    };
    console.log('VAL', this.startVal);
    this.webSocketService.emit('test', values);
    this.your_subscription = this.webSocketService.listen('response').subscribe(data => {
      console.log("received response");
      console.log("This is what we are looking at", data);
      this.updategraph(data);
    });

  }


  updategraph(data) {
    this.barChartData = [];

    console.log("function to update graph is running");


    var length = data.length;
    this.array2 = [];
    for (let i = 1; i <= length; i++) {
      this.array2.push(i);
      console.log(i);
    }


    for (let x = 0; x < data.length; ++x) {
      setTimeout(() => {
        this.graphcalling.chartArray.data.datasets.forEach((dataset) => {

          console.log(data[x]);
          dataset.data.push(data[x]);
        });

        this.graphcalling.chartArray.update();


      }, (1000 * (x + 1)));

    }

    this.graphcalling.graph(this.barChartData, this.array2);
    this.graphcalling.chartArray.update();

    //Graph getting redraw here

  }





}
