//Main by Cassie

#include <Servo.h> 

char inChar;

//SERVO VARIABLES //
Servo myservo;    // Tail
Servo headservo;  // Head
Servo neckservo;  // Neck

int pos = 0;      // variable to store the servo position 
int counter = 0;
int proxSensorPin = A5;   // proximity sensor pin plugged into A0
int sensorOutput;        // declare sensor output


// MOTOR VARIABLES //
int ledPin =  13;    // LED connected to digital pin 13, useful for troubleshooting

//Left Motor Speed (PWM 0-255) and Direction (Pin1, Pin2) Control 
int Motor_Left_pwmPin = 6;     // PWM Motor driver (/D2 pin for motor 1 on MC338870 motor board)
int Motor_Left_Pin1 = 7;   // Motor 1 pin 1 (IN1 on MC338870 motor board)
int Motor_Left_Pin2 = 8;   // Motor 1 pin 2 (IN2 on MC338870 motor board)

//Right Motor Speed (PWM 0-255) and Direction (Pin1, Pin2) Control 
int Motor_Right_pwmPin = 11;     // PWM Motor driver (/D2 pin for motor 2 on MC338870 motor board)
int Motor_Right_Pin1 = 9;   // Motor 2 pin 1 (IN1 on MC338870 motor board)
int Motor_Right_Pin2 = 10;   // Motor 2 pin 2 (IN2 on MC338870 motor board)

//Autonomous Sensor Inputs
int North_Sensor = A2;
int East_Sensor = A3;
int West_Sensor = A4;      // A5 is open

//Autonomus Sensor Values
int North_Value;
int East_Value;
int West_Value;

// TRANSCEIVER VARIABLES //
int north = 5;
int south = 4;
int east = 3;
int west = 2;

//MATH VARIABLES
int myInts[4] = {0, 0, 0, 0};
int refArray[4] ={1, 1, 1, 1};
int x;

void setup() {
  // Setup Digital Motor OUTPUT Pins
  pinMode(ledPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Left_pwmPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Left_Pin1, OUTPUT); //initialize the digital pin as an output: 
  pinMode(Motor_Left_Pin2, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Right_pwmPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Right_Pin1, OUTPUT); //initialize the digital pin as an output: 
  pinMode(Motor_Right_Pin2, OUTPUT); //initialize the digital pin as an output:
  
  // initialize serial:
  Serial.begin(9600);
  myservo.attach(12);     // Tail
  headservo.attach(A0);   // Head
  neckservo.attach(A1);   //Neck
  pinMode(proxSensorPin, INPUT);
  pinMode(north, INPUT);      
  pinMode(south, INPUT);
  pinMode(east, INPUT);
  pinMode(west, INPUT);

}

void loop() {
  
  if(Serial.available()>0){
    inChar = Serial.read();
    goddardStop();

    if(inChar == '0'){
      goodBoy();
      inChar='0';
    }
  
    if(inChar == '1'){
     bump();
     inChar='0';
    }
  
    if(inChar == '2'){
      sniff();
      inChar='0';
    }
  
    if(inChar == '3'){
    treat();
    inChar='0';
    }
  
    if(inChar == '5'){
      fetch();          //come
      inChar='0';
    
    if(inChar == '6'){
      dance();
      inChar='0';
    }

    if(inChar == 'N')
    {
      moveNorth();
    }
    if(inChar == 'B')
    {
      moveNE();
    }
    if(inChar == 'E')
    {
      moveEast();
    }
    if(inChar == 'D')
    {
      moveSE();
    }
    if(inChar == 'S')
    {
      moveSouth();
    }
    if(inChar == 'C')
    {
      moveSW();
    }
    if(inChar == 'W')
    {
      moveWest();
    }
    if(inChar == 'A')
    {
      moveNW();
    }
    if(inChar == '1')
    {
      fullStop();
    }
  }
  
  else {
    sensorOutput = digitalRead(proxSensorPin);
    if(sensorOutput == LOW) {
      wagTail();
    }
    if(sensorOutput == HIGH) {
      myservo.write(147);              // tell servo to go to position in variable 'pos' 
    }
        //MORE AUTONAMOUS FEATURES
        
        //Sensor Value Readings
        North_Value = analogRead(North_Sensor);
        East_Value = analogRead(East_Sensor);
        West_Value = analogRead(West_Sensor);
        
        //Print Out values for troubleshooting to serial print
        Serial.print("      North Value = ");   // 3  tabs
        Serial.print(North_Value);
        Serial.print("\n");
        Serial.print("West Value = ");
        Serial.print(West_Value);
        Serial.print("            East Value = ");
        Serial.print(East_Value);
        Serial.print("\n\n\n");
        moveAutonomously();
          
  }
}

void goodBoy() {
  for(counter=0; counter < 5; counter += 1) {
    for(pos = 95; pos < 200; pos += 1)  
    {                                
      myservo.write(pos);             
      delay(2);                      
    } 
    for(pos = 200; pos>95; pos-=1)     
    {                                
      myservo.write(pos);              
      delay(2);                   
    }
  } 
  myservo.write(147);
  counter=0;
  pos=0;
}

void bump() {
  for(counter=0; counter < 30; counter += 1) {
    for(pos = 30; pos < 76; pos += 1)  
    {                                 
      headservo.write(pos);              
      delay(8);                      
    } 
    for(pos = 76; pos > 30; pos -= 1)   
    {                                
      headservo.write(pos);             
      delay(8);                    
    }
  } 
  headservo.write(50);              
  pos = 0;
  counter = 0;
}

void sniff() {
  for(pos = 20; pos < 100; pos += 1)  // goes from 0 degrees to 100 degrees 
  {                                  // in steps of 1 degree 
    neckservo.write(pos);              // tell servo to go to position in variable 'pos' 
    delay(8);                       // waits for the servo to reach the position
  }
           
  delay(3000); 
           
  for(pos = 100; pos > 20; pos -= 1)     // goes from 100 degrees to 0 degrees 
  {                                
    neckservo.write(pos);              // tell servo to go to position in variable 'pos' 
    delay(8);                       // waits for the servo to reach the position
  }
  pos=0;
  counter=0;
}

void treat() {
  delay(2000);
  for(pos = 50; pos < 120; pos += 1)  // goes from 0 degrees to 100 degrees 
  {                                  // in steps of 1 degree 
    headservo.write(pos);              // tell servo to go to position in variable 'pos' 
    delay(1);                       // waits for the servo to reach the position
  } 
 
  for(pos = 120; pos > 50; pos -= 1)     // goes from 100 degrees to 0 degrees 
  {                                
    headservo.write(pos);              // tell servo to go to position in variable 'pos' 
    delay(1);                       // waits for the servo to reach the position
  }
 
        
  headservo.write(50);              // tell servo to go to position in variable 'pos' 
}

void wagTail () {
    sensorOutput = digitalRead(proxSensorPin);
    
    for(pos = 95; pos < 200; pos += 1)  // goes from 0 degrees to 100 degrees 
    {                                  // in steps of 1 degree 
      myservo.write(pos);              // tell servo to go to position in variable 'pos' 
      delay(2);                       // waits for the servo to reach the position
    } 
    for(pos = 200; pos>95; pos-=1)     // goes from 100 degrees to 0 degrees 
    {                                
      myservo.write(pos);              // tell servo to go to position in variable 'pos' 
      delay(2);                       // waits for the servo to reach the position
    }
}

void fetch () {
  if(North_Value < 75) {
      readTransceiverandSetDirection();
  }
  else
    goddardStop;
}

void readTransceiverandSetDirection() {
  north = digitalRead(7);
  
  if(north == LOW) {
    for(int x=0; x<4; x++) {
      north = digitalRead(7);
      if(north == LOW) {
        myInts[x] = 1;
      }else {
        myInts[x] = 0;
      }
      delay(200);
      }
  
      if (array_cmp(refArray, myInts, 4, 4) == true) {
        moveNorth();
      }
   }
   
  south = digitalRead(6);
  
  if(south == LOW) {
    for(int x=0; x<4; x++) {
      south = digitalRead(6);

      if(south == LOW) {
        myInts[x] = 1;
      }else {
        myInts[x] = 0;
      }
      delay(200);
      }
  
      if (array_cmp(refArray, myInts, 4, 4) == true) {
        moveSouth();
      }
   }
   
  east = digitalRead(5);
  
  if(east == LOW) {
    for(int x=0; x<4; x++) {
      east = digitalRead(5);

      if(east == LOW) {
        myInts[x] = 1;
      }else {
        myInts[x] = 0;
      }
      delay(200);
      }
  
      if (array_cmp(refArray, myInts, 4, 4) == true) {
        moveEast();
      }
   }
   
  west = digitalRead(4);
  
  if(west == LOW) {
    for(int x=0; x<4; x++) {
      west = digitalRead(4);

      if(west == LOW) {
        myInts[x] = 1;
      }else {
        myInts[x] = 0;
      }
      delay(200);
      }
  
      if (array_cmp(refArray, myInts, 4, 4) == true) {
        moveWest();
      }
   }
}



void moveNorth()
{
    Serial.print("N  ");
    // Move Goddard Foward .
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);
}

void moveSouth()
{
  Serial.print("S  ");
    // Move Goddard back .
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);
}

void moveEast()
{
  Serial.print("E  ");
    // Turn Goddard right.
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);
}

void moveWest()
{
  Serial.print("W  ");
     // Turn Goddard Left.
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);  
}
void moveNE()
 {
    analogWrite(Motor_Left_pwmPin,200);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);
 }
  void moveNW()
 {
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,200);
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);
 }
 void moveSE()
 {
    analogWrite(Motor_Left_pwmPin,200);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);
 }
  void moveSW()
 {
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,200);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);
 }
void goddardStop()
{
   analogWrite(Motor_Left_pwmPin,0);
   analogWrite(Motor_Right_pwmPin,0);
}

void moveAutonomously()
{
   if(North_Value > 75)
  {
    moveNorth();
  }
  else if(North_Value < 75)
  {
    goddardStop();
    delay(200);
    if( West_Value > East_Value)
    {
      moveEast();
      delay(750);
    }
    else
    {
      moveWest();
      delay(750);
    }
  }
}

boolean array_cmp(int *a, int *b, int len_a, int len_b){
      int n;

      // if their lengths are different, return false
      if (len_a != len_b) return false;

      // test each element to be the same. if not, return false
      for (n=0;n<len_a;n++) if (a[n]!=b[n]) return false;
      
      //ok, if we have not returned yet, they are equal :)
      return true;
}      
