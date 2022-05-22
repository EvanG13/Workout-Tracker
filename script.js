//script for index.html
// declares exercise class and Exercise circuit class. call the ExerciseCircuit constructor to render the day's exercise

const createButton = document.getElementById("create-workout");
const addButton = document.getElementById("add-exercise");

/**
 * Creates workout plan template for day
 * 
 * @param {*} e 
 */
let createWorkout = (e) => {
    // TODO
    return true;
}

 /**
  * removes the current circuit from the current Workout div
  */
clearWorkout = () => {
    //get rid of all rows in the exercise rows div
    document.getElementById("exercise-rows").innerHTML = "";
}

/**
 * Creates exercise template user will fill out
 * 
 * @param {*} k 
 */
let addExercise = () => {
    // TODO 
}

createButton.addEventListener("click", createWorkout);
addButton.addEventListener("click", addExercise);

/**
 * Gets current date in format : mm/dd/yyyy
 * 
 * @returns current date
 */

//utilities

/**
 * Enlarges the exercise box
 * 
 * @param {*} param0 
 */
let enlarge = ({target}) => {
    id = target.value;
    let toBeLarge = document.getElementById(id);
    //enlargen the element
    toBeLarge.style.height =  "500px";
    target.innerText = "minimize";
    target.removeEventListener("click", enlarge);
    target.addEventListener("click", minify);
}

/**
 * Makes exercise box smaller 
 * 
 * @param {*} param0 
 */
let minify = ({target}) => {
    id = target.value;
    let toBeSmall = document.getElementById(id);
    //enlargen the element
    toBeSmall.style.height = "340px";
    target.innerText = "Enlarge";
    target.removeEventListener("click", minify);
    target.addEventListener("click", enlarge);
}


/**
 * Gets the current date in format mm/dd/yyyy
 * 
 * @returns mm/dd/yyyy 
 */
let getDateString = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    return (month + "/" + day + "/" + year);
}

/**
 * Action for clicking select box
 * starts rest timer
 * 
 * @param {*} param0 
 */
let clickSetCheckBox = ({target}) => {
    console.log(target.value);
    id = target.value;
    let startTimer = document.getElementById(id);
    target.addEventListener('change', (e) => {
        console.log("check box selected");
    }); 
}

/**
 *  Creates Countdown timer
 */
class RestTimer {
    totalTime = 0;
    originalTime;
    seconds = 0;
    minutes = 0;
    interval;
    constructor(restTime, domId) { //dom id is the id of the p tag that displays the time 
        this.totalTime = restTime;
        this.originalTime = restTime;
        this.domId = domId;
    }

    start = () => {
        this.totalTime = this.originalTime; //reset the time
        if(!this.interval){
        this.interval = setInterval(this.displayTime, 1000);
        }
        //TODO disable the checkboxes
    }

    displayTime = () => {
        this.displayer = document.getElementById(this.domId);
        this.isOver(); //handle if the timer reached zero.
        this.minutes = Math.floor(this.totalTime / 60);
        this.seconds = (this.totalTime % 60);
        
        if (this.displayer!= null) {
            this.displayer.innerText = (this.minutes + ":" + this.seconds);
        }
        this.totalTime--;
    }

    isOver = () => {
        if (this.totalTime < 0) { //if timer reached zero
            clearInterval(this.interval);
        } 
        if (this.displayer === null) {
            clearInterval(this.interval);
            console.log("clearing interval");
        }
    }
}

/**
 *  Class for your exercise circuit
 */
class ExerciseCircuit {

    constructor(circuitTitle, circuitID) {
        this.circuitID = circuitID;
        this.circuitTitle = circuitTitle;
        this.exerciseList = [];
        this.date = getDateString();
        // render the date
        document.getElementById("date").innerText = this.date;
        document.getElementById("circuit-title").innerText = this.circuitTitle;
    }

     //render all exercises
     renderAllExercises = () => {
        for (let ex of this.exerciseList) {
            if (ex) { 
                ex.renderExercise();
            }
        } 
     }

    /**
     * Adds exercise onto exercise list
     * 
     * @param {*} Exercise 
     */
    addNewExercise(Exercise) {
        //render each exercise row
        if (Exercise != null) {
            this.exerciseList.push(Exercise);
        } 
        else {
            alert("Error, attempted to add null exercise!");
        }
    }

    addTemplate(Exercise) {
        Exercise.renderTemplate();
    }
}

/**
 * one exercise that will be rendered as a row inside the ExerciseCircuit
 * 
 */
class Exercise {
    static serialID = 0;
    constructor(numSets, numReps, name, link, muscleGroup, linkName, workoutTrack, restTime ) {
        this.numSets = numSets;
        this.numReps = "number of reps: " + numReps;
        this.name = name;
        this.link = link;
        this.muscleGroup = muscleGroup;
        this.linkName = linkName;
        this.workoutTrack = workoutTrack;
        this.exerciseID = "" + Exercise.serialID;
        this.restTime = restTime;
        Exercise.serialID++;
        
    }
    //renders numBoxes # of checkboxes to arg2
    renderCheckboxes = (numBoxes, container) => {
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("checkbox-list");
        let timer = new RestTimer(this.restTime,  "exercise-timer" + this.exerciseID);
        for (let i = 0; i < numBoxes; ++i) {
            let currentBox = document.createElement("input");
            currentBox.type = "checkbox"; 
            currentBox.addEventListener("click", timer.start);
            checkContainer.appendChild(currentBox);
            
        }
        container.appendChild(checkContainer);
    }

    /**
     * render exercise that the user creates
     */
    renderExercise = () => {
        let exerciseRows = document.getElementById("exercise-rows"); //the container that holds all exercises

        //set up exercise row
        let exercise = document.createElement("div");
        exercise.id = this.exerciseID; //assign static ID
        exercise.classList.add("exercise-row"); //each exercise has a class of exercise-row

        // setup  exercise name and timer
        let nameAndTimerContainer = document.createElement("div");
        nameAndTimerContainer.id = "name-and-timer";
        let exerciseName = document.createElement("p");
        exerciseName.id = "exercise-name";
        exerciseName.innerText = this.name;
        nameAndTimerContainer.appendChild(exerciseName);

        // Timer
        let exerciseTimer = document.createElement("p");
        exerciseTimer.id = "exercise-timer" + exercise.id;
        exerciseTimer.classList.add("exercise-timer");
        exerciseTimer.innerText = Math.floor(this.restTime / 60) + " : " + (this.restTime % 60);
        nameAndTimerContainer.appendChild(exerciseTimer);

        exercise.appendChild(nameAndTimerContainer);

        // setup  exercise Link
        let exerciseLink = document.createElement("a");
        exerciseLink.id = "exercise-link";
        exerciseLink.href = this.link;
        exerciseLink.innerText = this.linkName;
        exercise.appendChild(exerciseLink);

        // setup muscle group
        let muscleGroup = document.createElement("p");
        muscleGroup.id = "muscle-group";
        muscleGroup.innerText = this.muscleGroup;
        exercise.appendChild(muscleGroup);

        // setup numSets
        let numSets = document.createElement("p");
        numSets.id="num-sets";
        numSets.innerText = "Number of Sets: " + this.numSets;
        exercise.appendChild(numSets);
        //set up checkboxes
        this.renderCheckboxes(parseInt(this.numSets, 10), exercise);

        // setup enlarge button
        let enlarger = document.createElement("button");
        enlarger.value = exercise.id;
        enlarger.classList.add("enlarge-button");
        enlarger.addEventListener("click", enlarge);
        enlarger.innerText = "Enlarge";
        exercise.appendChild(enlarger);

        // setup numReps
        let numReps = document.createElement("p");
        numReps.id="num-reps";
        numReps.innerText = this.numReps;
        exercise.appendChild(numReps);

        //setup exercise track
        let track = document.createElement("audio");
        track.controls = "controls";
        track.src = this.workoutTrack; 
        exercise.appendChild(track);

        // append the exercise to the exercise container
        exerciseRows.appendChild(exercise); 
    }
}

/**
 * List of exerciseCircuits
 */
class CircuitCalendar {

    //takes ExerciseCircuit object array and renders the circuits to the workout-list element
    constructor(circuitArray) {
        this.circuitList = circuitArray;

        //render all workouts to the workout list
        let workoutList = document.getElementById('workout-list');
            for (let i = 0; i < this.circuitList.length; ++i) {
                // create container div
                let circuitContainer = document.createElement('div');
                circuitContainer.setAttribute("value", i); // this is index of the corresponding circuit object in this.circuitList
                circuitContainer.classList.add("workout-list-circuit");

                // for circuit title
                let circuitTitle = document.createElement("p");
                circuitTitle.classList.add("workout-list-circuit-title");
                circuitTitle.innerText = this.circuitList[i].circuitTitle;

                // create date
                let circuitDate = document.createElement("p");
                circuitTitle.classList.add("workout-list-circuit-date");
                circuitDate.innerText = this.circuitList[i].date;

                //add click event handler to container
                circuitContainer.addEventListener("click", this.switchToCurrent);

                //add elements to container and then push container onto the DOM
                circuitContainer.appendChild(circuitTitle);
                circuitContainer.appendChild(circuitDate);
                workoutList.appendChild(circuitContainer);
            }
        }

        //event handler. When a circuit in the calendar is clicked, it renders the exercise rows to the current workout window.
        switchToCurrent = ({target}) => {
        clearWorkout();
        if (this.circuitList[target.getAttribute("value")]) {
            this.circuitList[target.getAttribute("value")].renderAllExercises();
            document.getElementById("circuit-title").innerText = this.circuitList[target.getAttribute("value")].circuitTitle;
        }
        else {
            this.circuitList[target.parentElement.getAttribute("value")].renderAllExercises();
            document.getElementById("circuit-title").innerText = this.circuitList[target.parentElement.getAttribute("value")].circuitTitle;
        }
    }
}

/** Chest Day and Chest Exercises */
const chestDay = new ExerciseCircuit("Chest Day", 1);
let flatBenchPress = new Exercise("4",
                                  "3-5",
                                  "Flat Bench Press", 
                                  " ", 
                                  "Chest", 
                                  "tutorial", 
                                  "https://www.bing.com/videos/search?q=daydreamer+flux&&view=detail&mid=C87A95913DC160837651C87A95913DC160837651&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Ddaydreamer%2520flux%26qs%3Dn%26form%3DQBVR%26%3D%2525eManage%2520Your%2520Search%2520History%2525E%26sp%3D-1%26pq%3Ddaydreamer%2520flux%26sc%3D1-15%26sk%3D%26cvid%3D48B8769C7BBB4E6BA1D21A06311F2A86",
                                  210);

let inclineBenchPress = new Exercise("4",
                                     "10-12",
                                     "Incline Bench Press", 
                                     " ", 
                                     "Upper Chest", 
                                     "Incline BP Tutorial", 
                                     " ",
                                     210);

let dips = new Exercise("4",
                        "12",
                        "Dips", 
                        " ", 
                        "Lower Chest", 
                        "Dips Tutorial", 
                        " ", 
                        180);

let chestFly = new Exercise("4",
                            "12-14",
                            "Chest Fly", 
                            " ", 
                            "Chest Stretch", 
                            "Chest Fly Tutorial", 
                            " ",
                            180);
chestDay.addNewExercise(flatBenchPress);
chestDay.addNewExercise(inclineBenchPress);
chestDay.addNewExercise(dips);
chestDay.addNewExercise(chestFly);

/** Arm Day Workout and Exercises */
const bicepsAndTricepsDay= new ExerciseCircuit("Arm Day", 2);
let skullCrusher = new Exercise(4, 
                                "8-12", 
                                "Skull Crushers",
                                "https://www.bing.com/videos/search?q=skull+crusher+exercise&&view=detail&mid=B217EFE5B6B1908BC950B217EFE5B6B1908BC950&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dskull%2Bcrusher%2Bexercise%26qpvt%3Dskull%2Bcrusher%2Bexercise%26FORM%3DVDRE",
                                "tricep", 
                                "Skull Crusher Tutorial", 
                                " ",
                                120);
    
let tricepPulldown = new Exercise(3, 
                                  "12",
                                  "tricep pulldown",
                                  "https://www.bing.com/videos/search?q=rope+pulldown&&view=detail&mid=0061B03BECB5783C199E0061B03BECB5783C199E&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Drope%2520pulldown%26qs%3Dn%26form%3DQBVDMH%26%3D%2525eManage%2520Your%2520Search%2520History%2525E%26sp%3D-1%26pq%3Drope%2520pulldown%26sc%3D8-13%26sk%3D%26cvid%3D4F401B911C5343DB8DC97707BEA1B904",
                                  "tricep",
                                  "Rope pulldown Tutorial",
                                  "",
                                  120);
let cableCurl = new Exercise(4, 
                            "12-14",
                            "Cable Bicep Curl",
                            " ",
                            "Bicep",
                            "Cable Curl tutorial",
                            " ",
                            120);

let preacherCurl = new Exercise(4, 
                                "12-14",
                                "Preacher Curl",
                                " ",
                                "Bicep",
                                "Preacher Curl Tutorial",
                                " ",
                                180);

bicepsAndTricepsDay.addNewExercise(skullCrusher);
bicepsAndTricepsDay.addNewExercise(tricepPulldown);
bicepsAndTricepsDay.addNewExercise(cableCurl);
bicepsAndTricepsDay.addNewExercise(preacherCurl);

/** Back Day and Back Exercises */
const backDay = new ExerciseCircuit("Back Day");
let pullups = new Exercise("4",
                           "10-12",
                           "Pullups", 
                           " ", 
                           "Back", 
                           "Video Exercise Tutorial", 
                           " ",
                           90);

let deadlift = new Exercise("4",
                            "3-5",
                            "Deadlift", 
                            " ", 
                            "Back", 
                            "Video Exercise tutorial", 
                            " ",
                            120);

let barbellRow = new Exercise("4",
                              "10",
                              "Barbell Row",  
                              " ", 
                              "Upper Back", 
                              "Video Exercise Tutorial", 
                              " ",
                              120);

let closeGripLatPulldown = new Exercise("4",
                                        "12",
                                        "Close Grip Lat Pulldown", 
                                        " ", 
                                        "Stretch Lat", 
                                        "Video Exercise Tutorial", 
                                        " ",
                                        120);

let singleArmCableRow = new Exercise("4",
                                     "12",
                                     "Single Arm Cable Row", 
                                     " ", 
                                     "Lower Lat", 
                                     "Video Exercise Tutorial", 
                                     " ",
                                     120);
backDay.addNewExercise(pullups);
backDay.addNewExercise(deadlift);
backDay.addNewExercise(barbellRow);
backDay.addNewExercise(closeGripLatPulldown);
backDay.addNewExercise(singleArmCableRow);

/** Shoulder Day Workout and Exercises */
const shoulderDay= new ExerciseCircuit("Shoulder Day");
let overheadPress = new Exercise("4",
                                 "5-8",
                                 "Overhead Press", 
                                 " ", 
                                 "shoulder", 
                                 "tutorial", 
                                 " ", 
                                 120);

let dumbellShoulderPress = new Exercise("4",
                                        "12-14",
                                        "Dumbell Shoulder Press", 
                                        " ", 
                                        "shoulder", 
                                        "Video Exercise Tutorial", 
                                        " ", 
                                        120);

let laterRaises = new Exercise("4",
                                "12",
                                "Lateral Raises", 
                                " ", 
                                "shoulder", 
                                "Exercise Video Tutorial", 
                                " ",
                                120);

let readDeltFly = new Exercise("4",
                               "12",
                               "Rear Delt Flys", 
                               " ", 
                               "Rear delts", 
                               "Exercise Video Tutorial", 
                               " ",
                               90);



shoulderDay.addNewExercise(overheadPress);
shoulderDay.addNewExercise(dumbellShoulderPress);
shoulderDay.addNewExercise(laterRaises);
shoulderDay.addNewExercise(readDeltFly);

/** Leg Day Workout and Exercises */
const legDay= new ExerciseCircuit("Leg Day");

let legCurl = new Exercise("4",
                            "12-14",
                            "Leg Curl", 
                            " ", 
                            "Hamstrings", 
                            "Video Exercise Tutorial", 
                            " ",
                            120);

let legExtensions = new Exercise("4",
                                "12-14",
                                "Dumbell Shoulder Press", 
                                " ", 
                                "Quadriceps", 
                                "Video Exercise utorial", 
                                " ",
                                120);

let squats = new Exercise("4",
                          "3-5",
                          "Squats", 
                          " ", 
                          "Legs", 
                          "Video Exercise Tutorial", 
                          " ",
                          120);

let legPress = new Exercise("4",
                            "12-14",
                            "Leg Press", 
                            " ", 
                            "Legs", 
                            "Video Exercise Tutorial", 
                            " ",
                            120);
legDay.addNewExercise(legCurl);
legDay.addNewExercise(legExtensions);
legDay.addNewExercise(squats);
legDay.addNewExercise(legPress);

let allExercises = [chestDay, bicepsAndTricepsDay, backDay, shoulderDay, legDay];
let calendar = new CircuitCalendar(allExercises);

