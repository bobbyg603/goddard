//For follow command processed by the pi

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

// TRANSCEIVER VARIABLES //
int north = 4;
int south = 3;
int east = 2;
int west = 1;
int stop = 5;

//MATH VARIABLES
int myInts[4] = {0, 0, 0, 0};
int refArray[4] ={1, 1, 1, 1};
int x;

void setup()
{
  Serial.begin(9600);
  
  pinMode(north, INPUT);      // sets the digital pin 7 as input
  pinMode(south, INPUT);
  pinMode(east, INPUT);
  pinMode(west, INPUT);
  pinMode(stop, INPUT);
  
  pinMode(ledPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Left_pwmPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Left_Pin1, OUTPUT); //initialize the digital pin as an output: 
  pinMode(Motor_Left_Pin2, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Right_pwmPin, OUTPUT); //initialize the digital pin as an output:
  pinMode(Motor_Right_Pin1, OUTPUT); //initialize the digital pin as an output: 
  pinMode(Motor_Right_Pin2, OUTPUT); //initialize the digital pin as an output:
  
  //Motor Stuff

} 
 
void loop()
{
  stop = digitalRead(8);
  
  if(stop == HIGH) {
  readTransceiverandSetDirection();
  }
  else {
    Serial.print("Stop");
  }
} 


 
void readTransceiverandSetDirection()
{
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
    Serial.print("N");
    // Move Goddard Foward .
    moveFoward();
}

void moveSouth()
{
  Serial.print("S");
    //Move goddard Backward
    moveBackward();
}

void moveEast()
{
  Serial.print("E");
    // Turn Goddard right.
    inPlaceTurnRight();
}

void moveWest()
{
  Serial.print("W");
     // Turn Goddard Left.
     inPlaceTurnLeft();
}

void moveFoward()
 {
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);
 }
 
 void moveBackward()
 {
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);
 }

  
  void inPlaceTurnLeft()
 {
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,HIGH);
    digitalWrite(Motor_Left_Pin2,LOW);
    digitalWrite(Motor_Right_Pin1,HIGH);
    digitalWrite(Motor_Right_Pin2,LOW);  
 }
 
 void inPlaceTurnRight()
 {
    analogWrite(Motor_Left_pwmPin,150);
    analogWrite(Motor_Right_pwmPin,150);
    digitalWrite(Motor_Left_Pin1,LOW);
    digitalWrite(Motor_Left_Pin2,HIGH);
    digitalWrite(Motor_Right_Pin1,LOW);
    digitalWrite(Motor_Right_Pin2,HIGH);
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