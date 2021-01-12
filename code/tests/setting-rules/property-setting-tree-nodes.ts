export default {
    nodesIsShow: {
        type: 'boolean',
        title: '是否显示文本',
        default: true
      },
    nodesFontSize: {
      type: 'number',
      title: '文字字号',
      default: 12,
      values: [8,20],
    },
    nodesFontFamily: {
      type: 'enum',
      title: '文字字体',
      default: 'Arial',
      values: ['Arial','Helvetica','Verdana','Times','sans-serif'],
    },
    nodesFontColor: {
      type: 'color',
      title: '文字颜色',
      default: '#000',
    },
    nodesCircleSize: {
      type: 'number',
      title: '节点大小',
      default: 2,
      values: [1,5],
    },
    nodesLineWidth: {
      type: 'number',
      title: '线粗细',
      default: 2,
      values: [1,5],
    },
  };
  