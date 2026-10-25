@echo off
setlocal
cd /d "%~dp0"
set ELECTRON_RUN_AS_NODE=
rem Fallback launch flags for machines where the renderer sandbox / code integrity check fails.
if not exist "%~dp0EcChunks.exe" (
  echo Cannot find EcChunks.exe next to this .bat file.
  pause
  exit /b 1
)
start "" "%~dp0EcChunks.exe" --no-sandbox --disable-gpu --disable-gpu-sandbox --disable-renderer-sandbox --disable-features=RendererCodeIntegrity %*
