//script for index.html
// declares exercise class and Exercise circuit class. call the ExerciseCircuit constructor to render the day's exercise
let getDateString = () => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    return ( cDay + "/" + cMonth + "/" + cYear);
}

class ExerciseCircuit{
    constructor(exerciseList, date=getDateString()){
        this.exerciseList = exerciseList;
        this.date = date;
        //render the date
        document.getElementById("date").innerText = this.date;
        //render each exercise row 
        for(let i =0; i< this.exerciseList.length; i++){
            exerciseList[i].renderExercise();
        }
    }
}

//one exercise that will be rendered as a row inside the ExerciseCircuit
class Exercise {
    constructor(num_sets, num_reps, name, link, muscleGroup, linkName = "link to exercise" ) {
        this.num_sets = "number of sets: " + num_sets;
        this.num_reps = "number of reps: " + num_reps;
        this.name = name;
        this.link = link;
    }

    renderExercise = () => {
        let exerciseRows = document.getElementById("exercise-rows"); //the container that holds all exercises
        let exercise = document.createElement("div");
        exercise.classList.add("exercise-row"); //each exercise has a class of exercise-row
         //setup  exercise Link
         let exerciseLink = document.createElement("a");
         exerciseLink.id = "exercise-link";
         exerciseLink.href = this.link;
         exerciseLink.appendChild(document.createTextNode(this.linkName));
         exercise.appendChild(exerciseLink);

       //setup muscle group
        let muscleGroup = document.createElement("p");
        muscleGroup.id = "muscle-group";
        muscleGroup.appendChild(document.createTextNode(this.muscleGroup));
        exercise.appendChild(muscleGroup);

        //setup numSets
        let numSets = document.createElement("p");
        numSets.Id="num-sets";
        numSets.appendChild(document.createTextNode(this.num_sets));
        exercise.appendChild(numSets);

         //setup numReps
         let numReps = document.createElement("p");
         numReps.Id="num-reps";
         numReps.appendChild(document.createTextNode(this.num_reps));
         exercise.appendChild(numReps);

         //append the exercise to the exercise container
        exerciseRows.appendChild(exercise);
        
    }
}

//test
    let firstExerciseRow = new Exercise(5, "8-12", "Skull Crushers",
     "https://www.bing.com/videos/search?q=skull+crusher+exercise&&view=detail&mid=B217EFE5B6B1908BC950B217EFE5B6B1908BC950&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dskull%2Bcrusher%2Bexercise%26qpvt%3Dskull%2Bcrusher%2Bexercise%26FORM%3DVDRE",
      "tricep", "Skull crusher tutorial");
    let firstExercise = new ExerciseCircuit([firstExerciseRow]);