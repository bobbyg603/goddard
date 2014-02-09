//For fetch/come commands processed by the pi

// MOTOR VARIABLES //
int motorPin = 3;
int speed=200;

// TRANSCEIVER VARIABLES //
int north = 7;
int south = 6;
int east = 5;
int west = 4;

void setup()
{
  Serial.begin(9600);
  
  pinMode(north, INPUT);      // sets the digital pin 7 as input
  pinMode(south, INPUT);
  pinMode(east, INPUT);
  pinMode(west, INPUT);
  
  //Motor Stuff
  pinMode(motorPin, OUTPUT);
  delay(1500);
} 
 
void loop()
{
  move();
} 
 
void move()
{
  readTransceiverandSetDirection();
  if(north == LOW){ //bone is North
    moveNorth();
  } else if(south == LOW) { // bone is South
    moveSouth();
  } else if(east == LOW){ //bone is East
    moveEast();
  } else if(west == LOW) { // bone is West
    moveWest();
  }
}
 
void readTransceiverandSetDirection()
{
  north = digitalRead(7);
  south = digitalRead(6);
  east = digitalRead(5);
  west = digitalRead(4);
}

void moveNorth()
{}

void moveSouth()
{}

void moveEast()
{}

void moveWest()
{}
