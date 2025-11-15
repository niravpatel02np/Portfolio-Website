@echo off
echo ===== Starting build =====

:: Ensure dist folder exists
if not exist "dist" mkdir "dist"

echo ---
echo Obfuscating JS...
call javascript-obfuscator "src\main.js" --output "dist\main.js"

echo ---
echo Minifying CSS...
call cleancss -o "dist\style.css" "src\style.css"

echo ---
echo Minifying HTML...
call html-minifier "src\index.html" -o "dist\index.html" --collapse-whitespace --remove-comments

echo ---
echo Copying images...
xcopy "src\images" "dist\images" /E /I /Y >nul

echo Copying videos...
xcopy "src\videos" "dist\videos" /E /I /Y >nul

echo ===== Build complete! Check dist/ folder =====
pause
