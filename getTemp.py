#!/usr/bin/python
# Can enable debug output by uncommenting:
#import logging
#logging.basicConfig(level=logging.DEBUG)
import time

import Adafruit_TMP.TMP006 as TMP006

sensor = TMP006.TMP006()

sensor.begin()

file = open("temp.txt","w")

obj_temp = sensor.readObjTempC()
temp = obj_temp

file.write(str(temp)) 
file.close() 

