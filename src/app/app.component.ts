import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { data } from './data';
import * as $ from 'jquery';
import { bar } from './bardata';
import { Chart } from 'chart.js';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor() {


  }


  ngOnInit() {

  }

  ngOnDestroy() {

  }






}
