import {Bar, Line} from 'vue-chartjs'
  export default {
    extends: Bar,
    props: {
      chartData: {
        type: Array | Object,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'downloads',
            borderColor: '#000000',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#000000',
            backgroundColor: '#ff1e25',
            data: this.chartData
          }
        ]
      }, this.options)
    }
  }
