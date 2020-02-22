
/*
Reset
###############################################################################
*/

//create listener for reset button
var reset_button = document.getElementById('resetButton');
reset_button.addEventListener("click", resetScreen);

//remove current gpa value and refresh page
function resetScreen(){
  document.getElementById("currentGPA").innerHTML = "";
  window.location.reload(true);
}


/*
Calculate GPA
###############################################################################
*/

//create listener for Calculate GPA button
var form = document.getElementById("gpa_form");
form.addEventListener("submit", calculateGPA);

//percent to 4scale: ( <%> / 20 ) - 1
//GPA = (grade1 * credit1) + (grade2 * credit2) * ... / credit total
function calculateGPA(e){
  e.preventDefault();
  //Semester GPA Section
  var total_credits = 0;
  var total_grade = 0;
  for (i=1;i<=course_count;i++){
    var new_grade = (Number(document.getElementById('inputGrade'+ i).value)/20)-1;
    var new_credit = Number(document.getElementById('inputCredit' + i).value);
    total_grade =(new_grade * new_credit) + total_grade;
    total_credits = new_credit + total_credits;
  }
  var gpa = total_grade / total_credits;
  //round to two decimal places
  document.getElementById('semesterGpa').innerHTML = (Math.round(gpa * 100)/100).toFixed(2);

  //Cumulative GPA section
  var current_gpa = Number(document.getElementById('currentGPA').value);
  var current_credits = Number(document.getElementById('currentCredits').value);
  //if current gpa is set: get cumulative gpa else cumulative gpa = gpa
  if (current_gpa == 0 || current_gpa == null || current_credits == 0 || current_credits == null ){
    document.getElementById('cumulativeGpa').innerHTML = (Math.round(gpa * 100)/100).toFixed(2);
  }
  else{
    var x = (gpa * total_credits);
    var y = (current_gpa * current_credits);
    var z = (total_credits + current_credits);
    var cumulative_gpa = (x + y)/z;
    document.getElementById('cumulativeGpa').innerHTML = (Math.round(cumulative_gpa * 100)/100).toFixed(2)
  }
}


/*
Add/Remove Courses
###############################################################################
*/

//Add Courses Section
//global variable to keep count of courses
course_count = 0;

//create listener for "+" button
var add_button = document.getElementById("addButton");
add_button.addEventListener("click", addCourse);

function addCourse(){
  //add to course count
  course_count = course_count + 1;

  //start after this element
  var before = document.getElementById("course_div");
  //insert this html (model course)
  before.insertAdjacentHTML('beforeend', '<div class="col-sm-12" id="top_div' + course_count + '"><div class="form-row"><div id="course_div' + course_count + '"><div class="form-group col-md-3"><p class="lead">Course ' + course_count + '</p></div><div class="form-group col-md-3"><input type="number" min="0" max="200" step=".01" class="form-control btn_round" id="inputGrade' + course_count + '" placeholder="Grade" required></div><div class="form-group col-md-3"><input type="number" min="1" max="10" step=".01" class="form-control btn_round" id="inputCredit' + course_count + '" placeholder="Credits" required></div><div class="form-group col-md-3"><button type="button" id="addButton" class="btn btn-primary btn_round" onclick="addCourse()">+</button>&nbsp;<button type="button" id="removeButton" class="btn btn-default btn_round" onclick="removeCourse()">-</button></div></div></div></div>');
}

//Remove Courses Section
var remove_button = document.getElementById("removeButton");
remove_button.addEventListener("click", removeCourse);

//function only runs if there is more than one course, else button does nothing
function removeCourse(){
  if (course_count > 1){
    var top_course = document.getElementById('top_div' + course_count);
    top_course.parentNode.removeChild(top_course);
    course_count = course_count - 1;
  }
  else{
    return false;
  }
}
