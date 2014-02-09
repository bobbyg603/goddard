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
 int encoder = A0;
int  x;

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
  Serial.begin(9600);
}

// the loop() method runs over and over again,
// as long as the Arduino has power

void loop()                     
{
  // Full Goddard Motor Self Check Test 
    // Move Goddard Foward at full speed for 3 seconds.
    delay(1000);
    digitalWrite(ledPin,HIGH); //set led HIGH
    delay(100);
    digitalWrite(ledPin,LOW); //set led HIGH
    delay(100);
    digitalWrite(ledPin,HIGH); //set led HIGH
    analogWrite(Motor_Left_pwmPin,255);
    analogWrite(Motor_Right_pwmPin,255);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);
    delay(3000);
 // Encoder Read Test
x = analogRead(encoder++);
Serial.print("Encoder Reads ");
Serial.print(x);
 
    //Stop for one Second
    analogWrite(Motor_Left_pwmPin,0);
    analogWrite(Motor_Right_pwmPin,0);
    delay(1000);
    
    // In Place 180 degree Left turn (Fast Left Turn)
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);  //Left Motor Reverse
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);  //Right Motor Forward
    analogWrite(Motor_Left_pwmPin,255);
    analogWrite(Motor_Right_pwmPin,255);
    delay(750);  // Turn Time TBD
    
    // Stop for one second
    analogWrite(Motor_Left_pwmPin,0);
    analogWrite(Motor_Right_pwmPin,0);
    delay(1000);
    
    // Forward at half speed for 6 seconds
      delay(400);
    digitalWrite(ledPin,HIGH); //set led HIGH
    delay(100);
    digitalWrite(ledPin,LOW); //set led HIGH
    delay(100);
    digitalWrite(ledPin,HIGH); //set led HIGH
    analogWrite(Motor_Left_pwmPin,127);
    analogWrite(Motor_Right_pwmPin, 127);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);
    delay(6000);
     
    // In Place 220 degree Right turn (Fast Right Turn)
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);  //Left Motor Foward
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);  //Right Motor Reverse
    analogWrite(Motor_Left_pwmPin,255);
    analogWrite(Motor_Right_pwmPin,255);
    delay(1000);  // Turn Time TBD
     
    // Stop for one second
    analogWrite(Motor_Left_pwmPin,0);
    analogWrite(Motor_Right_pwmPin,0);
    delay(1000);
    
    // Slow Left Turn
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);  //Left Motor Forward
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);  //Right Motor Forward
    analogWrite(Motor_Left_pwmPin,192);  //Left Motor 3/4 Speed
    analogWrite(Motor_Right_pwmPin,255);  //Right Motor Full Speed
    delay(1000);  // Turn Time TBD
  
    //Slow Right Turn
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);  //Left Motor Forward
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);  //Right Motor Forward
    analogWrite(Motor_Left_pwmPin,255);  //Left Motor Full Speed
    analogWrite(Motor_Right_pwmPin,192);  //Right Motor 3/4 Speed
    delay(1000);  // Turn Time TBD
    
    // Reverse 
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);
    analogWrite(Motor_Left_pwmPin,255);
    analogWrite(Motor_Right_pwmPin,255);
    delay(3000);
    
    // Stop For a Long Time
    analogWrite(Motor_Left_pwmPin,0);
    analogWrite(Motor_Right_pwmPin,0);
    delay(10000);

}
