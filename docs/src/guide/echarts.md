

### echarts图例图标和文字居中

> 图例中存在文字和图标，图标怎么调整属性都不能和文字水平居中

https://blog.csdn.net/m0_73334325/article/details/133764447



### echarts饼状图 扇形图 自动循环突出放大

> 这里有个很有意思的取余函数的应用

查看[网上示例](https://www.jianshu.com/p/dc2dc70d5455)或[相关配置](https://echarts.apache.org/zh/api.html#action)

```react
var ProportionTasksEchars = echarts.init(document.getElementById('ProportionTasksEchars'));
// 指定图表的配置项和数据
var option = {
    darkMode: true,
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20,
        textStyle: {
            color: "#fff"
        }
    },

    color: ['#58d9f9', '#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#ff6efa'],
    series: [{
        type: 'pie',
        center: ['50%', '60%'],
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
            show: false,
            position: 'center',
            formatter: '{b}({d}%)',
            textStyle: {
                color: '#ffffff'
            },
        },
        emphasis: {
            label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
            }
        },

        labelLine: {
            show: false
        },
        data: xxData
    }]
};

ProportionTasksEchars.setOption(option);
// 自动循环突出放大功能
var currentIndex = 0;
// 计时器
timeSetIntervalFun()

function timeSetIntervalFun() {
    timeSetInterval = setInterval(function() {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        ProportionTasksEchars.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        ProportionTasksEchars.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    }, 2000);
}

ProportionTasksEchars.on('mouseover', function(e) {
    clearInterval(timeSetInterval)
    //当检测到鼠标悬停事件，取消默认选中高亮
    ProportionTasksEchars.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    //高亮显示悬停的那块
    ProportionTasksEchars.dispatchAction({
        type: 'highlight',
        seriesIndex: 1,
        dataIndex: e.dataIndex
    });
    currentIndex = e.dataIndex;
});

//检测鼠标移出后显示之前默认高亮的那块
ProportionTasksEchars.on('mouseout', function(e) {
    timeSetIntervalFun()
    ProportionTasksEchars.dispatchAction({
        type: 'highlight',
        seriesIndex: 1,
        dataIndex: 0
    });
});
```



