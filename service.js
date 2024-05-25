const spawn = require('child_process').spawn;
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 设置工作目录到前端应用的根目录
const projectDir = 'D:\\MyProject\\PROMPT-COMPETITION';

// 启动前端应用
function startApp() {
  const startProcess = spawn('npx', ['serve', '-s', 'build', '-l', '3001'], { cwd: projectDir, shell: true, stdio: 'inherit' });
  
  startProcess.on('error', (err) => {
    console.error(`Failed to start process: ${err}`);
    fs.appendFileSync(path.join(__dirname, 'error.log'), `Failed to start process: ${err}\n`, { encoding: 'utf8' });
  });

  startProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    fs.appendFileSync(path.join(__dirname, 'error.log'), `child process exited with code ${code}\n`, { encoding: 'utf8' });
  });
  
    return startProcess;
  }
  
  // 处理未捕获的异常
  process.on('uncaughtException', (err) => {
    const errorLogPath = path.join(__dirname, 'error.log');
    fs.writeFileSync(errorLogPath, `Uncaught Exception: ${err.message}\n${err.stack}`, { encoding: 'utf8' });
    process.exit(1);
  });
  
  // 初始启动前端应用
  let appProcess = startApp();
  
  if (!appProcess) {
    console.error('Failed to start the application process.');
    fs.appendFileSync(path.join(__dirname, 'error.log'), 'Failed to start the application process.\n', { encoding: 'utf8' });
    process.exit(1);
  }
  
  // 监视项目目录中的文件变化
//   const watcher = chokidar.watch(projectDir, {
//     ignored: /node_modules|\.git/,
//     persistent: true
//   });
  
//   watcher.on('change', (filePath) => {
//     console.log(`${filePath} has been changed. Restarting the app...`);
    
//     // 杀掉当前运行的进程
//     appProcess.kill();
  
//     // 重新启动前端应用
//     appProcess = startApp();
  
//     if (!appProcess) {
//       console.error('Failed to restart the application process.');
//       fs.appendFileSync(path.join(__dirname, 'error.log'), 'Failed to restart the application process.\n', { encoding: 'utf8' });
//       process.exit(1);
//     }
//   });
  
  // 使脚本保持运行
  setInterval(() => {
    // 空的 setInterval 保持 Node.js 进程运行
  }, 1000);