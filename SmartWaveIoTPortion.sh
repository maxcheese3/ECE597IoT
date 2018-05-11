#!/bin/bash
#raspistill -w 900 -h 600 -t 100 -n -o QR.jpg
QR=$(zbarimg --noxml -q QR.jpg)
retVal=$?
if [ $retVal -ne 0 ];
  then
    echo "No QR Code found... Using temp and weight estimation..."
    sudo python getWeight.py
    sudo python getTemp.py
    WEIGHT=$(cat weight.txt)
    TEMP=$(cat temp.txt)
    echo "Weight: "  $WEIGHT "    Temp: "  $TEMP
  else
    echo "QR Code found:  "
    echo ${QR:8} | tr -d '\n' > QR.txt
    node SmartWaveIoTPortion.js
    STIRAT=$(cat StirAt.txt)
    SLEEPTIME=$(cat SleepTime.txt)
    if [ $STIRAT -ne 0 ];
      then
        sleep $((($STIRAT)/10))
        node notification.js stir
    fi
    sleep $((($SLEEPTIME-STIRAT)/10))
    node notification.js
fi
