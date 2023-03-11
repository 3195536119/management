<template>
    <div id="userSourceChart" class="userSourceChart">

    </div>
</template>

<script>

export default {
    name: 'UserSource',

    data() {
        return {
            chartFeature: {
            }
        };
    },

    mounted() {
        let sourceChart = this.$echarts.init(document.getElementById('userSourceChart'));
        this.$http.get('/getUserSourceChart').then(res => {
            console.log(res.data)
            this.handleDatas(res.data)
            let options=this.setChartOptions()
            console.log(options)
            sourceChart.setOption(options)
        })
    },

    methods: {
        handleDatas(data) {
            let legend = [];
            let axis = [];
            let series = []
            for (let i = 0; i < data.length; i++) {
                let serieArr = []
                let serie = {}
                legend.push(data[i].source)
                let dateData = data[i].dateData
                dateData.forEach(d => {
                    if (i == 0)
                        axis.push(d.date)
                    serieArr.push(d.data)
                })
                serie['name'] = data[i].source
                serie['data'] = serieArr
                series.push(serie)
            }
            this.chartFeature.legend = legend
            this.chartFeature.axis = axis
            this.chartFeature.series = series
            console.log(this.chartFeature)
        },
        setChartOptions() {
            let series = []
            this.chartFeature.series.forEach(serie => {
                series.push({
                    name: serie.name,
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: serie.data
                },)
            })
            return {
                backgroundColor:'#ffffff',
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#54645F'
                        }
                    }
                },
                legend: {
                    data: this.chartFeature.legend
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.chartFeature.axis
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: series
            };

        }
    },
};
</script>

<style  scoped>
.userSourceChart{
    height: 100%;
}
</style>