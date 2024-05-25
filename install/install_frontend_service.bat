@echo off
SET SERVICE_NAME=PromptCompetitionService
SET WORKING_DIR=D:\MyProject\PROMPT-COMPETITION
SET SERVE_CMD="D:\MyProject\PROMPT-COMPETITION\node_modules\.bin\serve.cmd"
SET SERVE_ARGS=-s build -l 3001
SET NSSM_PATH="D:\Program Files\nssm-2.24\nssm-2.24\win64\nssm.exe"
SET LOG_DIR=D:\applog\frontend_service

:: Ensure the log directory exists
if not exist %LOG_DIR% (
    mkdir %LOG_DIR%
)

:: Install the service
%NSSM_PATH% install %SERVICE_NAME% %SERVE_CMD% %SERVE_ARGS%

:: Set the startup directory
%NSSM_PATH% set %SERVICE_NAME% AppDirectory %WORKING_DIR%

:: Redirect output to log files
%NSSM_PATH% set %SERVICE_NAME% AppStdout %LOG_DIR%\frontend_stdout.log
%NSSM_PATH% set %SERVICE_NAME% AppStderr %LOG_DIR%\frontend_stdout.log

:: Set the service to start automatically
%NSSM_PATH% set %SERVICE_NAME% Start SERVICE_AUTO_START

:: Start the service
%NSSM_PATH% start %SERVICE_NAME%

:: Check service status
sc.exe query %SERVICE_NAME%
sc.exe qc %SERVICE_NAME%
