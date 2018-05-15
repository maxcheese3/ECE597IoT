import RPi.GPIO as GPIO
import time
import sys
from hx711 import HX711

def cleanAndExit():
    #print "Cleaning..."
    GPIO.cleanup()
    #print "Bye!"
    sys.exit()

hx = HX711(5, 6)

#hx.set_reading_format("LSB", "MSB")

# HOW TO CALCULATE THE REFFERENCE UNIT
# To set the reference unit to 1. Put 1kg on your sensor or anything you have and know exactly how much it weights.
# In this case, 92 is 1 gram because, with 1 as a reference unit I got numbers near 0 without any weight
# and I got numbers around 184000 when I added 2kg. So, according to the rule of thirds:
# If 2000 grams is 184000 then 1000 grams is 184000 / 2000 = 92.
#hx.set_reference_unit(92)
hx.set_reference_unit(444)

#hx.reset()
#hx.tare()

time.sleep(0.2)
weights = []
i = 0
for i in range(0,20):
	weights.append(hx.get_weight(5))
#print val
weights.sort()
file = open("weight.txt","w")
file.write(str(weights[10])) 
 
file.close() 

hx.power_down()
hx.power_up()
GPIO.cleanup()
sys.exit()