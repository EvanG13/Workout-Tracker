//script for index.html
// declares exercise class and Exercise circuit class. call the ExerciseCircuit constructor to render the day's exercise

const createButton = document.getElementById("create-workout");
const addButton = document.getElementById("add-exercise");
                                                   /// exercise list  


/**
 * Creates workout plan template for day
 * 
 * @param {*} e 
 */
let createWorkout = (e) => {
    armDay = new ExerciseCircuit("Arm Day");
    
    return true;
}

 //removes the current circuit from the current Workout div
 clearWorkout = () =>{
    //get rid of all rows in the exercise rows div
    document.getElementById("exercise-rows").innerHTML = "";
}

/**
 * Creates exercise template user will fill out
 * 
 * @param {*} k 
 */
let addExercise = () => {

    let firstExercise = new Exercise(120, "8-12", "Skull Crushers",
     "https://www.bing.com/videos/search?q=skull+crusher+exercise&&view=detail&mid=B217EFE5B6B1908BC950B217EFE5B6B1908BC950&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dskull%2Bcrusher%2Bexercise%26qpvt%3Dskull%2Bcrusher%2Bexercise%26FORM%3DVDRE",
      "tricep", "Skull crusher tutorial", "");
    
    let secondExercise = new Exercise(3, 
                                    "12",
                                    "tricep pulldown",
                                    "https://www.bing.com/videos/search?q=rope+pulldown&&view=detail&mid=0061B03BECB5783C199E0061B03BECB5783C199E&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Drope%2520pulldown%26qs%3Dn%26form%3DQBVDMH%26%3D%2525eManage%2520Your%2520Search%2520History%2525E%26sp%3D-1%26pq%3Drope%2520pulldown%26sc%3D8-13%26sk%3D%26cvid%3D4F401B911C5343DB8DC97707BEA1B904",
                                    "tricep",
                                    "rope pulldown tutorial", "");
    armDay.addNewExercise(firstExercise);
    armDay.addNewExercise(secondExercise);
}

/**
 * Save, submit and display newly created exercise
 */
let saveExercise = () => {

}

createButton.addEventListener("click", createWorkout);
addButton.addEventListener("click", addExercise);

/**
 * Gets current date in format : mm/dd/yyyy
 * 
 * @returns current date
 */

//utilities

let enlarge = (e ) => {
    id = e.target.value;
    let toBeLarge = document.getElementById(id);
    //enlargen the element
    toBeLarge.style.height =  "500px";
    e.target.innerText = "minimize";
    e.target.removeEventListener("click", enlarge);
    e.target.addEventListener("click", minify);
}

let minify = (e ) => {
    id = e.target.value;
    let toBeSmall = document.getElementById(id);
    //enlargen the element
    toBeSmall.style.height = "340px";
    e.target.innerText = "Enlarge";
    e.target.removeEventListener("click", minify);
    e.target.addEventListener("click", enlarge);
}


let getDateString = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    return (month + "/" + day + "/" + year);
}
/**
 *  Class for your exercise circuit
 */
class ExerciseCircuit{


    constructor(circuitTitle, circuitID) {
        this.circuitID = circuitID;
        this.circuitTitle = circuitTitle;
        this.exerciseList = [];
        this.date = getDateString();
        //render the date
        document.getElementById("date").innerText = this.date;
        document.getElementById("circuit-title").innerText = this.circuitTitle;
        
    }

     //render all exercises
     renderAllExercises = () =>{

        for(ex of this.exerciseList){
            ex.renderExercise();
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
            Exercise.renderExercise();
            this.exerciseList.push(Exercise);
        } 
        else {
            alert("Error, attempted to add null exercise!");
        }
    }
}

/**
 * one exercise that will be rendered as a row inside the ExerciseCircuit
 * 
 */
class Exercise {
    static  serialID = 0;
    constructor(numSets, numReps, name, link, muscleGroup, linkName, workoutTrack ) {
        this.numSets = numSets;
        this.numReps = "number of reps: " + numReps;
        this.name = name;
        this.link = link;
        this.muscleGroup = muscleGroup;
        this.linkName = linkName;
        this.workoutTrack = workoutTrack;
        this.exerciseID = "exercise-" + Exercise.serialID;
        Exercise.serialID++;
    }
    //renders numBoxes # of checkboxes to arg2
    renderCheckboxes = (numBoxes, container) =>{
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("checkbox-list");
        for (let i=0; i< numBoxes; i++){
            let currentBox = document.createElement("input");
            currentBox.type = "checkbox";
            checkContainer.appendChild(currentBox);
        }
        container.appendChild(checkContainer);
    }
    /**
     * create template user fills out in order to add an exercise to list
     */
    renderTemplate = () => {
        
    }

    /**
     * render exercise that the user creates
     */
    renderExercise = () => {
        let exerciseRows = document.getElementById("exercise-rows"); //the container that holds all exercises

        //set up exercise row
        let exercise = document.createElement("div");
        exercise.id = this.exerciseID; //assign static ID
        console.log("this exercise ID = " + this.exerciseID);
        console.log(exercise.id);
        exercise.classList.add("exercise-row"); //each exercise has a class of exercise-row
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

        //setup enlarge button
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
        track.src = this.workoutTrack; //TODO: MAKE THIS FIT INSIDE THE EXERCISE BOX EVEN WHEN ENLARGED.
        exercise.appendChild(track);
        // append the exercise to the exercise container
        exerciseRows.appendChild(exercise); 
    }
}
    //list of exerciseCircuits
    class CircuitCalendar{

       
        
        //takes ExerciseCircuit object array and renders the circuits to the workout-list element
        constructor(circuitArray){
            this.circuitList = circuitArray;


            //render all workouts to the workout list
            let workoutList = document.getElementById('workout-list');
            for(let i=0; i< this.circuitList.length; i++){
                //create container div
                let circuitContainer = document.createElement('div');
                circuitContainer.setAttribute("value", i); // this is index of the corresponding circuit object in this.circuitList
                circuitContainer.classList.add("workout-list-circuit");

                //for circuit title
                let circuitTitle = document.createElement("p");
                circuitTitle.classList.add("workout-list-circuit-title");
                circuitTitle.innerText = this.circuitList[i].circuitTitle;

                //create date
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
         switchToCurrent = (e) =>{
            clearWorkout();
           this.exerciseList[e.target.value].renderAllExercises();
        }

      
         
    }

let armDay= new ExerciseCircuit("Arm Day");
let shoulderDay= new ExerciseCircuit("Shoulder Day");
let legDay= new ExerciseCircuit("Leg Day");
let allExercises = [armDay, shoulderDay, legDay];

let calendar = new CircuitCalendar(allExercises);


