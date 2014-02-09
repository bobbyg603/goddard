// Goddard Motor Control Actions


int ledPin =  13;    // LED connected to digital pin 13, useful for troubleshooting

//Left Motor Speed (PWM 0-255) and Direction (Pin1, Pin2) Control 
int Motor_Left_pwmPin = 6;     // PWM Motor driver (/D2 pin for motor 1 on MC338870 motor board)
int Motor_Left_Pin1 = 7;   // Motor 1 pin 1 (IN1 on MC338870 motor board)
int Motor_Left_Pin2 = 8;   // Motor 1 pin 2 (IN2 on MC338870 motor board)

//Right Motor Speed (PWM 0-255) and Direction (Pin1, Pin2) Control 
int Motor_Right_pwmPin = 11;     // PWM Motor driver (/D2 pin for motor 2 on MC338870 motor board)
int Motor_Right_Pin1 = 9;   // Motor 2 pin 1 (IN1 on MC338870 motor board)
int Motor_Right_Pin2 = 10;   // Motor 2 pin 2 (IN2 on MC338870 motor board)

//Encoder Feedback: Use to find distance, speed, angular velocity
int encoder = 2;
int EncoderCount = 0;
int lastEncoderState = 0;
int EncoderState = 0;

//Sensor Variables
int sensor = A0;
int value;
// Set the following connections to enable the Motor Driver
//  VDD -> 5v
//  EN -> 5v
//  D1 -> GND

void setup()   {                
  pinMode(ledPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Left_pwmPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Left_Pin1, OUTPUT); //initialize the digital pin as an output: 
  pinMode(Motor_Left_Pin2, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Right_pwmPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Right_Pin1, OUTPUT); //initialize the digital pin as an output: 
  pinMode(Motor_Right_Pin2, OUTPUT); //initialize the digital pin as an output:
  
  pinMode(encoder, INPUT);
  Serial.begin(9600);
}

// the loop() method runs over and over again,
// as long as the Arduino has power

void loop()                     
{
  value = analogRead(sensor);
  EncoderState = digitalRead(encoder);
  
  if (EncoderState != lastEncoderState) {
   
    EncoderCount++;

  }


   lastEncoderState = EncoderState;
  
  
  Serial.print("Value = ");
  Serial.print(value);
  Serial.print("\n");
  
  Serial.print("Encoder Statet = ");
  Serial.print(EncoderState);
  Serial.print("\n");
  Serial.print("Encoder Count = ");
  Serial.print(EncoderCount);
  Serial.print("\n");
  

  
  
 
  delay(10);
  
  if(value > 100)
  {
    analogWrite(Motor_Left_pwmPin,255);
    analogWrite(Motor_Right_pwmPin,255);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);
  }
  else if (99 > value && value > 70)
  {
    analogWrite(Motor_Left_pwmPin,200);
    analogWrite(Motor_Right_pwmPin,200);
  }
   else if (69 > value && value > 30)
  {
    analogWrite(Motor_Left_pwmPin,100);
    analogWrite(Motor_Right_pwmPin,100);
  }
    else if (30 > value)
  {
    analogWrite(Motor_Left_pwmPin,0);
    analogWrite(Motor_Right_pwmPin,0);
  }
}


