@echo off
set REPO_URL=https://github.com/MohamedRamzi9/JS-UI-library.git
set DIR= .\Lib\UI

REM Remove existing UI folder inside Lib
if exist %DIR%\%NAME% (
	echo Removing existing UI folder...
	rmdir /S /Q %DIR%
)

REM Clone into a temporary folder
git clone %REPO_URL% %DIR%


REM Optionally remove Git history from Lib
rmdir /S /Q %DIR%\.git

echo Repo content cloned to Lib successfully.
