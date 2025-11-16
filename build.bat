@echo off
echo ===== Starting build =====

:: ---- Step 0: Delete old build files ----
echo Deleting old build files...
del /Q index.html
del /Q main.js
del /Q style.css
rd /S /Q images
rd /S /Q videos

:: ---- Step 1: Obfuscate JS ----
echo ---
echo Obfuscating JS files...

call javascript-obfuscator "src\main.js" --output "main.js"

echo JS obfuscation complete.

:: ---- Step 2: Minify CSS ----
echo ---
echo Minifying CSS...
call cleancss -o "style.css" "src\style.css"

:: ---- Step 3: Minify HTML ----
echo ---
echo Minifying HTML...
call html-minifier "src\index.html" -o "index.html" --collapse-whitespace --remove-comments

:: ---- Step 4: Copy images ----
echo ---
echo Copying images...
xcopy "src\images" "images" /E /I /Y >nul

:: ---- Step 5: Copy videos ----
echo ---
echo Copying videos...
xcopy "src\videos" "videos" /E /I /Y >nul

echo ===== Build complete! Main folder updated =====
pause
