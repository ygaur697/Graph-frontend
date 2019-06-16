import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { data } from './data';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  public barChartData;


  ngOnInit() {
    //Here we will listen to an event from the socket io server

    this.webSocketService.listen('response').subscribe((data) => {
      console.log(data);
      this.barChartData = data;

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
  updategraph() {


  }


}

