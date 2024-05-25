const Service = require('node-windows').Service;
const path = require('path');

// 创建服务对象
const svc = new Service({
  name: 'PromptCompetitionApp',
  script: path.join(__dirname, 'service.js')
});

// 监听 "uninstall" 事件
svc.on('uninstall', () => {
  console.log('Service uninstalled');
});

// 卸载服务
svc.uninstall();
