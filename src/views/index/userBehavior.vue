<template>
    <div id="userBehavior" class="userBehavior">

    </div>
</template>

<script>
export default {
    name: 'UserBehavior',

    data() {
        return {
        };
    },

    mounted() {
        let behaviorChart=this.$echarts.init(document.getElementById('userBehavior'))
        this.$http.get('/getUserbehaviorChart').then(res => {
            let seriesData = res.data
            let option=this.setOptions(seriesData)
            behaviorChart.setOption(option)
        })

    },

    methods: {
        setOptions(seriesData) {
            return  {
                backgroundColor: 'rgb(255,255,255)',
                title: {
                    text: '每日用户行为',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: 'rgba(103, 124, 135)'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: seriesData,
                        roseType: 'radius',
                        label: {
                            color: 'rgba(103, 124, 135)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(103, 124, 135)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
        }
    },
};
</script>

<style scoped>
</style>