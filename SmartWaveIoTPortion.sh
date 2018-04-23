#!/bin/bash
raspistill -w 900 -h 600 -o QR.jpg
#sleep 1
QR=$(zbarimg --noxml QR.jpg)
#echo $QR
echo ${QR:8} | tr -d '\n' > QR.txt
node SmartWaveIoTPortion.js