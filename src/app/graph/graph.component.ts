import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  chartArray: any;

  constructor() { }

  ngOnInit() {
  }
  graph(barChartData, labels) {
    this.chartArray = new Chart('bar', {
      type: 'line',
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


            }
          ]
        },
        title: {
          display: true,
          text: 'Bar '
        }
      },
      data: {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: 'My First dataset',
            data: barChartData,
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false
          }
        ]
      }
    });

  }

}
