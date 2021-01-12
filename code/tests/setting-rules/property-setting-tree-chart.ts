// 这里记录的是图表各种默认配置，当用户在测试页面选择不同的选项时，也就是是选择了这里的某组配置参数。
export default {
    chartBackground: {
      type: 'color',
      title: '背景色',
      default: '#eee'
    },
    scrollingIsShow: {
      type: 'boolean',
      title: '是否允许滚动',
      default: false
    },
    scrollingWidth: {
      type: 'number',
      title: '滚动宽度',
      default: 1100,
      values: [0,1100]
    },
    scrollingHeight: {
      type: 'number',
      title: '滚动高度',
      default: 800,
      values: [0,800]
    },
  };
  