//@bobbyg603
char inChar;

void setup() {
  // initialize serial:
  Serial.begin(9600);
  pinMode(9,OUTPUT);
}

void loop() {
  if(Serial.available()>0){
    inChar = Serial.read();
  }
  
  if(inChar == '9'){
    digitalWrite(9,1);
    delay(500);
    digitalWrite(9,0);
    delay(500);
    digitalWrite(9,1);
    delay(500);
    digitalWrite(9,0);
    inChar='0';
  }
}
