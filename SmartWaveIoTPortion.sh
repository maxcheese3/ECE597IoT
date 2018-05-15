#!/bin/bash

#   Exports pin to userspace
if [ ! -d /sys/class/gpio/gpio17 ]
then
  echo 17 > /sys/class/gpio/export
  sleep 1 ;# Short delay while GPIO permissions are set up
fi
echo "in" > /sys/class/gpio/gpio17/direction

function countdown {
	TIMELEFT=$1
	#echo $TIMELEFT
	#Save Cursor Position
	tput sc
	while [ "$TIMELEFT" -gt 0 ]; do
		#Retrieve saved cursor position
		tput rc
		tput ed
		echo -ne "$TIMELEFT"\\r
		TIMELEFT=$(($TIMELEFT-1))
		sleep 0.09
	done
}

function startIoT {
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
	    echo "Weight: "  $(($WEIGHT / 444)) "    Temp: "  $TEMP
	    echo ""
	    countdown $(($WEIGHT / 444 * (100 - ${TEMP%.*}) / 10))
	  else
	    echo "QR Code found:  Retrieving information..."
	    echo ${QR:8} | tr -d '\n' > QR.txt
	    node SmartWaveIoTPortion.js
	    STIRAT=$(cat StirAt.txt)
	    SLEEPTIME=$(cat SleepTime.txt)
	    if [ $STIRAT -ne 0 ];
	      then
	        #sleep $((($STIRAT)/10))
		echo "Cooking Food..."
	        countdown $STIRAT
		echo "Stir and re-insert item"
		node notification.js stir &
		while true; do
			DOORSTATUS=$(cat /sys/class/gpio/gpio17/value)
			if [ $DOORSTATUS -eq 1 ]; then
				break
			else
				sleep .25
			fi
		done
		echo "Door opened..."
		while true; do
			DOORSTATUS=$(cat /sys/class/gpio/gpio17/value)
			if [ $DOORSTATUS -eq 0 ]; then
				echo "Door closed, resume heating..."
				break
			else
				sleep .25
			fi
		done
	    fi
	    #sleep $((($SLEEPTIME-STIRAT)/10))
	    countdown $SLEEPTIME
	    node notification.js &
	fi
}
RESTARTED=1
python tare.py
echo "Waiting on item to be inserted..."
while true; do
	DOORSTATUS=$(cat /sys/class/gpio/gpio17/value)
	#echo $DOORSTATUS
	if [ $DOORSTATUS -eq 0 ] && [ $RESTARTED -eq 1 ]; then
		echo "Item inserted, looking for QR Code..."
		startIoT
		RESTARTED=0
		echo "Food cooked!"
		echo "Waiting on item to be inserted..."
	else
		sleep .25
		RESTARTED=1
	fi
done