const Service = require('node-windows').Service;
const path = require('path');

// 创建服务对象
const svc = new Service({
  name: 'PromptCompetitionApp',
  description: 'llm prompt competition Application Service',
  script: path.join(__dirname, 'service.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// 监听 "install" 事件，安装服务
svc.on('install', () => {
  svc.start();
  console.log('Service installed and started');
});

// 安装服务
svc.install();
