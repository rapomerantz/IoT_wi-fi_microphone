//********************************************************************
// AudioGetAverageLib for Spark
// http://github.com/davidegironi/spark-audiogetaveragelib
// Copyright (c) Davide Gironi, 2014 
//
// References:
//   http://davidegironi.blogspot.it/2013/05/avr-atmega-audio-input-rma-using-ema.html
//
// Released under GPLv3.
// Please refer to LICENSE file for licensing information.
//********************************************************************

#include "AudioGetAverageLib.h"

//set the audio input ADC channel
#define AUDIO_INPUTCHANNEL A0
//set the audio input board reference voltage
#define AUDIO_VOLTREF 0.0022
//set the audio input board reference dB value
#define AUDIO_DBREF 40

//set the reference ADC voltage
#define ANALOGVOLTAGEREF 3.3
double analogVoltageRef = ANALOGVOLTAGEREF; //ADC reference voltage

//initialize audioGet library
AudioGetAverageLib audioGet(
    AUDIO_INPUTCHANNEL,
    AUDIOGETAVERAGE_DEFAULTDYNAMICBIAS,
    AUDIOGETAVERAGE_DEFAULTBIASZERORAW,
    AUDIOGETAVERAGE_DEFAULTSMOOTHFILTERVAL,
    AUDIOGETAVERAGE_DEFAULTSAMPLES,
    AUDIOGETAVERAGE_DEFAULTSAMPLESINTERVALMICROSEC,
    AUDIOGETAVERAGE_DEFAULTRMSCORRECTION);

void setup() {
    //startup serial
    int audioSpl = 20; //audio Spl value
    Serial.begin(9600);
    //Particle.variable("audioSpl", String(audioSpl));
}

void loop() {
    int audioRms = 0; //audio RMS value
    int audioSpl = 0; //audio Spl value
    int audioAdc = 0; //audio raw ADC
    
    //get raw ADC
    audioAdc = analogRead(AUDIO_INPUTCHANNEL);
    //get RMS value
	audioRms = audioGet.getRms();
	double voltageRms = AUDIO_VOLTREF;
	if(audioRms > 0) {
	    voltageRms = audioRms*analogVoltageRef/4096;
	    if(voltageRms < AUDIO_VOLTREF) { //prevent values less than AUDIO_DBREF
	        voltageRms = AUDIO_VOLTREF;
	    }
    	        //get Spl value
    	audioSpl = audioGet.getSpl(voltageRms, AUDIO_VOLTREF, AUDIO_DBREF);
	}
    //output values
	Particle.publish("audioSpl", String(audioSpl));
    Particle.variable("audioSpl", audioSpl);

    delay(2000); 
    
//    Particle.publish("sonar", String(audioAdc), PRIVATE); 
}