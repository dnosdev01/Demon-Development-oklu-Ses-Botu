:: Demon Development Çoklu Ses Botu Buraları Ellemeyiniz
@echo off
echo Demon Development Ses Botlari baslatiliyor... 
cd /d "%~dp0"


pm2 start ecosystem.config.js


pm2 ls

pause
