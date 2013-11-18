#!/bin/bash
say() { local IFS=+;/usr/bin/mplayer -ao also -really-quiet -noconsolecontrols "http://translate.google.com/translate_tts?tl=en&q=$ "; }
say $*
