import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { data } from './data';
import * as $ from 'jquery';
import { bar } from './bardata';
import { Chart } from 'chart.js';
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
  chartArray: any;
  displayData: any;

  constructor(private webSocketService: WebsocketService) {
    this.value = [];
    this.chartArray = [];
    this.displayData = [];
  }
  public colors = ['red', 'green', 'blue'];
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

  ngOnInit() {
    const a = [1, 2, 3, 4, 5];
    console.log(a);
    console.log("im getting called ");

    this.chartArray = new Chart('bar', {
      type: 'bar',
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false
              },

              labels: ['a', 'b', 'c', 'd', 'e'],
            }
          ]
        },
        title: {
          display: true,
          text: 'Bar '
        }
      },
      data: {
        //labels: values,
        datasets: [
          {
            type: 'bar',
            label: 'My First dataset',
            data: this.barChartData,
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false
          }
        ]
      }
    });

    //Here we will listen to an event from the socket io server

    // this.webSocketService.listen('response').subscribe((data) => {
    //   // console.log(data);
    //   this.updategraph(data);
    //   this.displayData = data;
    //   console.log(this.displayData);

    // });
  }

  creategraph() {
    let values = {
      start_val: parseInt(this.startVal, 10),
      end_val: parseInt(this.endVal, 10),
      interval: parseInt(this.interval, 10)
    };
    console.log('VAL', this.startVal);
    this.webSocketService.emit('test', values);
    this.webSocketService.listen('response').subscribe(data => {
      console.log("received response");
      console.log("This is what we are looking at", data);

      this.updategraph(data);




      this.displayData = data;
      console.log(this.displayData);
    });


  }
  updategraph(data) {
    this.barChartData = [];
    this.chartArray.destroy();
    this.ngOnInit();


    // for (let i = 0; i < values.length; i++) {
    //   this.norm = {
    //     id: i,
    //     label: 'label',
    //     value1: values[i]
    //   };
    //   this.barChartData.push(this.norm);
    // }
    for (let x = 0; x < data.length; x++) {
      console.log("value of x outsite", x);
      setTimeout(() => {

        this.chartArray.data.datasets.forEach((dataset) => {
          dataset.data.push(data[x]);
          console.log(dataset.data)
          console.log("value inside timeout", x);
          console.log(this.chartArray.data.datasets[0].data);

        });


        this.chartArray.update();

      }, 1000 * (x + 1));
      var add = this.chartArray.data.datasets[0].data;
      let z = (add) => add.filter((v, i) => add.indexOf(v) === i)
      console.log("value of x", z);

    }
    console.log("outside for");
    console.log("without filter", this.chartArray.data.datasets[0].data);



  }

  /*removedata(data) {
    this.chartArray.data.labels.pop();
    this.chnaaddmesartArray.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    this.chartArray.update();
  }*/



}
