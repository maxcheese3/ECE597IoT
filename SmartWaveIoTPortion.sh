#!/bin/bash
#raspistill -w 900 -h 600 -t 100 -n -o QR.jpg
QR=$(zbarimg --noxml QR.jpg)
echo $QR
echo ${QR:8} | tr -d '\n' > QR.txt
node SmartWaveIoTPortion.js