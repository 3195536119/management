<template>
    <div id="userSourceChart">

    </div>
</template>

<script>

export default {
    name: 'UserSource',

    data() {
        return {
            chartFeature: []
        };
    },

    mounted() {
        let sourceChart = this.$echarts.init(document.getElementById('userSourceChart'));
        this.$http.get('/getUserSourceChart').then(res => {
            console.log(res.data)
            this.chartFeature = res.data
        })
    },

    methods: {
        setChartOptions() {
            let legend=[];
            return option = {
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: rgb(84, 100, 95)
                        }
                    }
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']//待修改
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
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']//待修改
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    
                ]
            };

        }
    },
};
</script>

<style  scoped></style>