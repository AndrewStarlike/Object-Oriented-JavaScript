var saga = function () {
    console.log("inside saga");
};
saga();

//prototype delegation
var gold = {a: 1};
var rose = Object.create(gold);

//some code refactoring
var amy = {loc: 1};
amy.loc++;
var ben = {loc:9};
ben.loc++;
//----- > ------
var move = function (car) {
    car.loc++;
};
var amy = {loc:1};
move(amy);
var ben = {loc:9};
move(ben);

//decorator
var carlike = function (obj, loc) {
    obj.loc = loc;
    return obj;
};
var amy = carlike({}, 1);
var ben = carlike({}, 9);


// Refactor the carlike function in a way
// that allows you to use the method calling
// syntax with "dot access" as we do below.
var carlike = function(obj, loc) {
    obj.loc = loc;
    obj.move = move;
    return obj;
};

var move = function(car) {
    this.loc++;
};

/////
// Here we want to call move with "dot access"
var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();


// Refactor the carlike function so
// that the move function is no longer
// defined as a global variable but is
// contained within the constructor function.

var carlike = function(obj, loc) {
    obj.loc = loc;
    obj.move = function() {
        //"this" is bound to a new variable every time move is invoked, let's refer to obj
        //which is bound to only one variable (1=1 with car object)
        this.loc++;
    };
    return obj;
};

var amy = carlike({}, 1);
console.log(amy.move());
console.log(amy.move());
var ben = carlike({}, 9);
ben.move();


//Classes (similar with the decorator except the object - car - is created inside the function)
var Car = function (loc) {
    var obj = {loc: loc};
    obj.move = function () {
        obj.loc++;
    };
};

var amy = Car(1);
amy.move();
var ben = Car(9);
ben.move();


//Functional shared pattern
var Car = function (loc) {
    var obj = {loc: loc};
    extend(obj, Car.methods);
    return obj;
};
Car.methods = {
    move: function () {
        this.loc++;
    }
};


//Constructor Prototypes
var Car = function (loc) {
    var obj = Object.create(Car.prototype);
    obj.loc = loc;
    return obj;
};
//the function move is inside prototype to avoid copying it at evey Car instantiation
Car.prototype.move = function () {
    this.loc++;
};


//Pseudoclassical patterns
//the creation of the object (as this) and returning it (return this) is done automatically
var Car = function (loc) {
    //define what's unique with this function
    this.loc = loc;
};
//shared function
Car.prototype.move = function () {
    this.loc++;
};

var amy = new Car(1);
amy.move();
var ben = new Car(9);
ben.move();