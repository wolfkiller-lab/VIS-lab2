// 这里记录的是图表各种默认配置，当用户在测试页面选择不同的选项时，也就是是选择了这里的某组配置参数。
export default {
  tooltipIsShow: {
    type: 'boolean',
    title: '是否显示提示框',
    default: true
  },
  tooltipFontSize: {
    type: 'number',
    title: '文字字号',
    default: 12,
    values: [10,14],
  },
  tooltipFontFamily: {
    type: 'enum',
    title: '文字字体',
    default: 'Arial',
    values: ['Arial','Helvetica','Verdana','Times','sans-serif'],
  },
  tooltipFontColor: {
    type: 'color',
    title: '文字颜色',
    default: '#000',
  },
  tooltipColor: {
    type: 'color',
    title: '内部颜色',
    default: '#eee'
  },
  tooltipBorder: {
    type: 'number',
    title: '边框粗细',
    default: 1,
    values: [0,10]
  },
  tooltipBorderRadius: {
    type: 'number',
    title: '边框圆角弧度',
    default: 0,
    values: [0,100]
  }
  
};
