<template>
    <div id="tree-container" :style="{width:700,height:700}" >
    </div>
</template>
<script>
import * as d3 from 'd3';
import * as d3h from 'd3-hierarchy';

export default {
    name: 'Tree',
    props:['options'],
    data(){
        return {
            tree: null,
            g: null,
            chart: null,
            title: null,
            titleText: 'Tree',
            titleRectWidth: 460,
            titleRectHeight: 40,
            width:460,
            height:460,
            tooltipPadding : {top: 5, right: 5, bottom: 5, left: 5},
            chartPadding : {top: 80, right: 80, bottom: 80, left: 80},
            data: {
                'name': 'flare',
                'children': [
                {
                'name': 'analytics',
                'children': [
                    {
                    'name': 'cluster',
                    'children': [
                    {'name': 'AgglomerativeCluster', 'value': 3938},
                    {'name': 'MergeEdge', 'value': 743}
                    ]
                    },
                    {
                    'name': 'optimization',
                    'children': [
                    {'name': 'AspectRatioBanker', 'value': 7074}
                    ]
                    }
                ]
                },
                {
                'name': 'animate',
                'children': [
                    {
                    'name': 'interpolate',
                    'children': [
                    {'name': 'ArrayInterpolator', 'value': 1983},
                    ]
                    },
                    {'name': 'ISchedulable', 'value': 1041},
                    {'name': 'Parallel', 'value': 5176},
                ]
                },
                {
                'name': 'display',
                'children': [
                    {'name': 'RectSprite', 'value': 3623},
                    {'name': 'TextSprite', 'value': 10066}
                ]
                },
                {
                'name': 'flex',
                'children': [
                    {'name': 'FlareVis', 'value': 4116}
                ]
                },
                {
                'name': 'physics',
                'children': [
                    {'name': 'Simulation', 'value': 9983},
                    {'name': 'Spring', 'value': 2213},
                    {'name': 'SpringForce', 'value': 1681}
                ]
                },
                {
                'name': 'scale',
                'children': [
                    {'name': 'IScaleMap', 'value': 2105},
                    {'name': 'ScaleType', 'value': 1821},
                    {'name': 'TimeScale', 'value': 5833}
                ]
                },
                {
                'name': 'vis',
                'children': [
                    {
                    'name': 'axis',
                    'children': [
                    {'name': 'AxisLabel', 'value': 636},
                    {'name': 'CartesianAxes', 'value': 6703}
                    ]
                    },
                    {
                    'name': 'controls',
                    'children': [
                    {'name': 'AnchorControl', 'value': 2138},
                    {'name': 'ClickControl', 'value': 3824}
                    ]
                    },
                    {
                    'name': 'data',
                    'children': [
                    {
                    'name': 'render',
                    'children': [
                        {'name': 'ArrowType', 'value': 698},
                        {'name': 'EdgeRenderer', 'value': 5569},
                        {'name': 'ShapeRenderer', 'value': 2247}
                    ]
                    },
                    {'name': 'ScaleBinding', 'value': 11275},
                    ]
                    },
                    {
                    'name': 'events',
                    'children': [
                    {'name': 'DataEvent', 'value': 2313},
                    {'name': 'SelectionEvent', 'value': 1880},
                    {'name': 'VisualizationEvent', 'value': 1117}
                    ]
                    },
                    {
                    'name': 'legend',
                    'children': [
                    {'name': 'Legend', 'value': 20859},
                    {'name': 'LegendItem', 'value': 4614},
                    {'name': 'LegendRange', 'value': 10530}
                    ]
                    },
                    {
                    'name': 'operator',
                    'children': [
                    {
                    'name': 'distortion',
                    'children': [
                        {'name': 'BifocalDistortion', 'value': 4461},
                        {'name': 'Distortion', 'value': 6314},
                        {'name': 'FisheyeDistortion', 'value': 3444}
                    ]
                    },
                    {
                    'name': 'encoder',
                    'children': [
                        {'name': 'ColorEncoder', 'value': 3179},
                        {'name': 'SizeEncoder', 'value': 1830}
                    ]
                    },
                    {
                    'name': 'filter',
                    'children': [
                        {'name': 'FisheyeTreeFilter', 'value': 5219},
                        {'name': 'GraphDistanceFilter', 'value': 3165},
                        {'name': 'VisibilityFilter', 'value': 3509}
                    ]
                    },
                    {'name': 'IOperator', 'value': 1286},
                    {
                    'name': 'label',
                    'children': [
                        {'name': 'Labeler', 'value': 9956},
                        {'name': 'RadialLabeler', 'value': 3899},
                        {'name': 'StackedAreaLabeler', 'value': 3202}
                    ]
                    },
                    {
                    'name': 'layout',
                    'children': [
                        {'name': 'AxisLayout', 'value': 6725},
                        {'name': 'BundledEdgeRouter', 'value': 3727},
                    ]
                    }
                    ]
                    }
                ]
                }
                ]
                },
            nodesText: 'null',
        };
    },
    // https://cn.vuejs.org/v2/api/#computed
    // https://cn.vuejs.org/v2/guide/computed.html#%E5%9F%BA%E7%A1%80%E4%BE%8B%E5%AD%90
    computed: {
        // 这里是一些计算属性，当其中涉及的值发生变化时，计算属性会重新计算，返回新的值
        ascendingData(){ 
            // 升序排序
            return this.sortKeyAscending(this.originData,'value');
        },
        descendingData(){
            // 降序排序
            return this.sortKeyDescending(this.originData,'value');
        }
    },
    // https://cn.vuejs.org/v2/api/#watch
    watch: {
        // watch的作用可以监控一个值的变换，并调用因为变化需要执行的方法。可以通过watch动态改变关联的状态。
        // 这里是一些可被修改的配置项，例如图表标题内容、标题是否显示等
        'options.titleText': {
            handler(){
                this.titleText = this.options.titleText;
                this.title.select('text').text(this.titleText);
            }
        },
        'options.titleIsShow': {
            handler() {
                if(this.options.titleIsShow){
                    this.title.attr('style','display: block');
                }else{
                    this.title.attr('style','display: none');
                }
            }
        },
        // 标题位置
        'options.titlePosition': {
            handler() {
                this.updateTitle();
            }
        },
        // 标题背景
        'options.titleBackground': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('rect').attr('fill',`${this.options.titleBackground}`);
                }
            }
        },
        // 标题字体颜色
        'options.titleFontColor': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('text').attr('fill',`${this.options.titleFontColor}`);
                }
            }
        },
        // 标题字体位置
        'options.titleTextPosition': {
            handler() {
                if(this.options.titleIsShow){
                    // 修改text相对标题rect的位置,来更改文本对齐方式
                    switch(this.options.titleTextPosition){
                        case 'center':  this.title.select('text')
                                            .attr('text-anchor','middle')
                                            .attr('x',350);
                                        break;
                        case 'left':    this.title.select('text')
                                            .attr('text-anchor','start')
                                            .attr('x',10);
                                        break;
                        case 'right':   this.title.select('text')
                                            .attr('text-anchor','end')
                                            .attr('x',690);
                                        break;
                        default: break;
                    }
                    
                }
            }
        },
        // 标题字体样式
        'options.titleFontFamily': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('text').attr('font-family',`${this.options.titleFontFamily}`);
                }
            }
        },
        // 标题字体大小
        'options.titleFontSize': {
            handler() {
                if(this.options.titleIsShow){
                   this.title.select('text').attr('font-size',`${this.options.titleFontSize}`);
                }
            }
        },
        
        // node
        // 是否显示
        'options.nodesIsShow': {
            handler() {
                if(this.options.nodesIsShow){
                    this.nodeEnter.attr('style','display: block');
                }else{
                    this.nodeEnter.attr('style','display: none');
                }
            }
        },
        // 文本字体大小
        'options.nodesFontSize': {
            handler() {
                if(this.options.nodesIsShow){
                   this.nodeEnter.select('text').attr('font-size',`${this.options.nodesFontSize}`);
                }
            }
        },
        // 文字字体样式
        'options.nodesFontFamily': {
            handler() {
                if(this.options.nodesIsShow){
                   this.nodeEnter.select('text').attr('font-family',`${this.options.nodesFontFamily}`);
                }
            }
        },
        // 文本字体颜色
        'options.nodesFontColor':{
            handler() {
                if(this.options.nodesIsShow){
                    this.nodeEnter.select('text').attr('stroke',`${this.options.nodesFontColor}`);
                }
            }
        },
        // 节点大小
        'options.nodesCircleSize':{
            handler(){
                this.nodeEnter.select('circle').attr('r',`${this.options.nodesCircleSize}`);
            }
        },
        // 线条粗细
        'options.nodesLineWidth':{
            handler(){
                this.gLink.attr('stroke-width',`${this.options.nodesLineWidth}`);
            }
        },

        // chart
        'options.chartBackground': {
            handler(){
                this.svg.attr('style',`background: ${this.options.chartBackground}`);
            }
        },
        'options.chartPaddingCross': {
            handler() {
                this.svg.attr('width',`${this.options.chartPaddingCross}`);
            }
        },
        'options.chartPaddingVer': {
            handler() {
                this.svg.attr('height',`${this.options.chartPaddingVer}`);
            }
        },
        // 滚动
        'options.scrollingIsShow':{
            handler() {
                if(this.options.scrollingIsShow){
                    d3.select('#tree-container').style('overflow','scroll');
                }else{
                    d3.select('#tree-container').style('overflow','hidden');
                }
            }
        },
        'options.scrollingWidth':{
            handler(){
                if(this.options.scrollingIsShow){
                    d3.select('#tree-container').style('width',`${this.options.scrollingWidth}px`);
                }
            }
        },
        'options.scrollingHeight':{
            handler(){
                if(this.options.scrollingIsShow){
                    d3.select('#tree-container').style('height',`${this.options.scrollingHeight}px`);
                }
            }
        },
        // tooltip
        'options.tooltipIsShow' : {
            handler() {
                if(this.options.tooltipIsShow){
                   this.tooltip.attr('style','display: block');
                }else{
                    this.tooltip.attr('style','display: none');
                }
            }
        },
        // 文本颜色
        'options.tooltipFontColor': {
            handler() {
                if(this.options.tooltipIsShow){
                   this.tooltip.select('text').attr('fill',`${this.options.tooltipFontColor}`);
                }
            }
        },
        // 文本大小
        'options.tooltipFontSize': {
            handler() {
                if(this.options.tooltipIsShow){
                   this.tooltip.select('text').attr('font-size',`${this.options.tooltipFontSize}`);
                }
            }
        },
        // 文字字体样式
        'options.tooltipFontFamily': {
            handler() {
                if(this.options.tooltipIsShow){
                   this.tooltip.select('text').attr('font-family',`${this.options.tooltipFontFamily}`);
                }
            }
        },
        'options.tooltipColor': {
            handler() {
                if(this.options.tooltipIsShow){
                this.tooltip.select('rect')
                    .attr('fill',this.options.tooltipColor);
                }
            }
        },
        'options.tooltipBorder': {
            handler() {
                if(this.options.tooltipIsShow){
                this.tooltip.select('rect')
                    .attr('style', `stroke-width: ${this.options.tooltipBorder}`);
                }
            }
        },
        'options.tooltipBorderRadius': {
            handler() {
                if(this.options.tooltipIsShow){
                this.tooltip.select('rect')
                    .attr('rx', `${this.options.tooltipBorderRadius}`)
                    .attr('ry', `${this.options.tooltipBorderRadius}`);
                }
            }
        },
        // 请根据组件需要补充...
    },
    // https://cn.vuejs.org/v2/api/#mounted
    mounted() {
        // 这里会在实例被挂载后调用
        // 初始化图表
        this.initTree();
    },
    // https://cn.vuejs.org/v2/api/#methods
    methods: {
        // 这里是一些组件其余地方会使用到的函数，调用方式为 this.xxxx()
        // 例如mounted中的图表初始化函数 initTree() 就应该被定义在这里
        // 其余与交互、更新有关的函数也都写在这里
        initTree() {
          // 在这里编写初始化图表的代码，以下代码仅供参考，均可调整
          // 可以使用d3绘制可视化图表，具体可参考 bar chart 示例和 README.md 中的链接
          
          console.log(this.options);
          this.treeRoot=d3h.hierarchy(this.data);
          // 指定图表的宽高
          this.width = 1100 - this.chartPadding.right - this.chartPadding.left-180;
          this.height = 800 -this.chartPadding.bottom - this.chartPadding.top-80;
          
          d3.select('#tree-container')
                .style('width','1100px')
                .style('height','800px');
          
          // 添加svg
          this.svg = d3.select('#tree-container').append('svg')
                          .attr('style','background: #eee')
                          .attr('width',1100)
                          .attr('height',800);
          // 添加g标签 
          this.g = this.svg.append('g')
                      .attr('class','chart')  // 图表部分
                      .attr('transform',`translate(${this.chartPadding.left}, ${this.chartPadding.top})`);
          

          // 添加图表标题
          this.title = this.svg.append('g')
                           .attr('transform','translate(0,0)')
                           .attr('style','display: none');     // 默认不显示
          // 标题背景框
          this.title.append('rect')
                    .attr('class','title')
                    .attr('width', 700)
                    .attr('height',`${this.titleRectHeight}`)
                    .attr('fill','#E3E3E3')
                    .attr('x','0')
                    .attr('y','0');
          // 标题文本       
          this.title.append('text')
                  .text(this.titleText)
                  .attr('x',350)
                  .attr('y',25)
                  .attr('text-anchor','middle')
                  .attr('fill','#000');
           // tree
           this.treeLayout=d3h.tree();
           this.treeLayout.size([600,600]);
           this.treeLayout(this.treeRoot);

           this.nodeEnter = this.g.append('g')
                .attr('class','nodes')
                .selectAll('node')
                .data(this.treeRoot.descendants())
                .enter()
                .append('g')
                .classed('node',true)
                .attr('transform', d => `translate(${d.y},${d.x})`);

            this.nodeEnter.append('circle')
                .attr('r', 2.5)
                .attr('fill', d => d._children ? '#555' : '#999')
                .attr('stroke-width', 10);

            this.nodeEnter.append('text')
                .attr('dy', '0.31em')
                .attr('x', d => d._children ? -6 : 6)
                .attr('font-size','12px')  // 用style会不能改字体大小
                .text(d => d.data.name);                                

            this.gLink = this.g.append('g')
                .attr('fill', 'none')
                .attr('stroke', '#555')
                .attr('stroke-opacity', 0.4)
                .attr('stroke-width', 1.5)
                .selectAll('path')
                .data(this.treeRoot.links())
                .join('path')
                .attr(
                    'd',
                    d3.linkHorizontal()
                    .x(d=>d.y)
                    .y(d=>d.x)
                );
            const chartpadding = this.chartPadding;

            // 添加提示框
            this.tooltip = this.g.append('g')
                                .attr('class','tooltip') 
                                .attr('opacity',0); // 默认不显示

            this.tooltip.append('rect')
                        .attr('fill','#eeeeee')
                        .attr('rx',0)
                        .attr('ry',0)
                        .attr('stroke','black')
                        .attr('style','stroke-width:1');

            this.tooltip.append('text')
                        .attr('font-size',12)
                        .attr('fill','#000')
                        .attr('transform',`translate(${this.tooltipPadding.left},${this.tooltipPadding.top+12})`);
                
            d3.select('.tooltip').select('rect')
                        .attr('width',45)
                        .attr('height',23);  // 为提示框设置默认尺寸

            // 划过显示提示框
            let name;
            this.nodeEnter.on('mouseover', function (d) {
            // 叶子节点显示value
             if(d.children===undefined){
                const x =d3.event.layerX+10-chartpadding.left;
                const y =d3.event.layerY-chartpadding.top;
                d3.selectAll('.nodes').attr('text',function(item){
                    if(item===name){
                        d3.select('.tooltip')
                            .attr('transform',`translate(${x},${y})`)   
                            .attr('opacity',0.7);
                        d3.select('.tooltip').select('text')
                            .text(`${d.data.value}`);  
                    }
                });
            }                        
            });
        },
        
        updateTitle() {
            if(this.options.titleIsShow){
                // 根据设置进行对应旋转和平移
                switch(this.options.titlePosition){
                    case 'top':     this.title.attr('transform','rotate(0) translate(0,0)');
                                    break;
                    case 'bottom':  this.title.attr('transform','rotate(0) translate(0,700)');
                                    break;
                    case 'left':    this.title.attr('transform','translate(0,700) rotate(270)');
                                    break;
                    case 'right':   this.title.attr('transform','translate(1000,0) rotate(90)');
                                    break;
                    default: break;
                }
                    
            }
        },
    },
};
</script>
<style scoped>
text {
    background: '#000';
}
#tree-container {
    overflow: hidden;
}
</style>