@echo off
SET SERVICE_NAME=PromptCompetitionService
SET NSSM_PATH="D:\Program Files\nssm-2.24\nssm-2.24\win64\nssm.exe"

:: Stop and delete the service using nssm
%NSSM_PATH% stop %SERVICE_NAME%
%NSSM_PATH% remove %SERVICE_NAME% confirm

:: Check if the service is removed
sc.exe query %SERVICE_NAME%
