#!/bin/bash
#raspistill -o QR.jpg
#sleep 1
QR=$(zbarimg --noxml QR.jpg)
#echo $QR
echo ${QR:8} > QR.txt
#sudo python SmartWaveIoTPortion.py
#sudo nodejs SmartWaveIoTPortion.js