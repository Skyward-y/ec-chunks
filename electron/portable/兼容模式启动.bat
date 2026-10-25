@echo off
setlocal
cd /d "%~dp0"
set ELECTRON_RUN_AS_NODE=
rem Last resort: merge every Chromium child process into the main one (--single-process).
if not exist "%~dp0EcChunks.exe" (
  echo Cannot find EcChunks.exe next to this .bat file.
  pause
  exit /b 1
)
start "" "%~dp0EcChunks.exe" --single-process --no-sandbox --disable-gpu --disable-gpu-sandbox --disable-renderer-sandbox --disable-features=RendererCodeIntegrity %*
