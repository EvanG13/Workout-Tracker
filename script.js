//script for index.html
// declares exercise class and Exercise circuit class. call the ExerciseCircuit constructor to render the day's exercise

let createButton = document.getElementById("create-workout");


let createWorkout = (e) => {
    //test
    let firstExerciseRow = new Exercise(5, "8-12", "Skull Crushers",
     "https://www.bing.com/videos/search?q=skull+crusher+exercise&&view=detail&mid=B217EFE5B6B1908BC950B217EFE5B6B1908BC950&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dskull%2Bcrusher%2Bexercise%26qpvt%3Dskull%2Bcrusher%2Bexercise%26FORM%3DVDRE",
      "tricep", "Skull crusher tutorial");
    
    let secondExerciseRow = new Exercise(3, 
                                    "12",
                                    "tricep pulldown",
                                    "https://www.bing.com/videos/search?q=rope+pulldown&&view=detail&mid=0061B03BECB5783C199E0061B03BECB5783C199E&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Drope%2520pulldown%26qs%3Dn%26form%3DQBVDMH%26%3D%2525eManage%2520Your%2520Search%2520History%2525E%26sp%3D-1%26pq%3Drope%2520pulldown%26sc%3D8-13%26sk%3D%26cvid%3D4F401B911C5343DB8DC97707BEA1B904",
                                    "tricep",
                                    "rope pulldown tutorial");
    let armDay = new ExerciseCircuit("Arm Day", [firstExerciseRow, secondExerciseRow]);

    return true;
}

createButton.addEventListener("click", createWorkout);

let getDateString = () => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    return ( cMonth + "/" + cDay + "/" + cYear);
}

class ExerciseCircuit{
    constructor(circuitTitle, exerciseList) {
        this.circuitTitle = circuitTitle;
        this.exerciseList = exerciseList;
        this.date = getDateString();
        //render the date
        document.getElementById("date").innerText = this.date;
        document.getElementById("circuit-title").innerText = this.circuitTitle;
        //render each exercise row 
        for(let i =0; i< this.exerciseList.length; i++){
            exerciseList[i].renderExercise();
        }
    }
}

//one exercise that will be rendered as a row inside the ExerciseCircuit
class Exercise {
    constructor(num_sets, num_reps, name, link, muscleGroup, linkName ) {
        this.num_sets = "number of sets: " + num_sets;
        this.num_reps = "number of reps: " + num_reps;
        this.name = name;
        this.link = link;
        this.muscleGroup = muscleGroup;
        this.linkName = linkName;
    }

    renderExercise = () => {
        let exerciseRows = document.getElementById("exercise-rows"); //the container that holds all exercises
        let exercise = document.createElement("div");
        exercise.classList.add("exercise-row"); //each exercise has a class of exercise-row
        //setup  exercise Link
        let exerciseLink = document.createElement("a");
        exerciseLink.id = "exercise-link";
        exerciseLink.href = this.link;
        exerciseLink.innerText = this.linkName;
        exercise.appendChild(exerciseLink);

        //setup muscle group
        let muscleGroup = document.createElement("p");
        muscleGroup.id = "muscle-group";
        muscleGroup.innerText = this.muscleGroup;
        exercise.appendChild(muscleGroup);

        //setup numSets
        let numSets = document.createElement("p");
        numSets.id="num-sets";
        numSets.innerText = this.num_sets;
        exercise.appendChild(numSets);

         //setup numReps
         let numReps = document.createElement("p");
         numReps.id="num-reps";
         numReps.innerText = this.num_reps;
         exercise.appendChild(numReps);

         //append the exercise to the exercise container
        exerciseRows.appendChild(exercise); 
    }
}

