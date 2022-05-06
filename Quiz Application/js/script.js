/* Selecting All Required Elements */
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

//If StartQuiz Button Clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Show Info Box
}
//If ExitQuiz Button Clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Hide Info Box
}
//If ContinueQuiz Button Clicked 
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Hide Info Box
    quiz_box.classList.add("activeQuiz"); //Show Quiz Box
    showQuestions(0); //Calling ShowQuestions Function
    queCounter(1); //Passing 1 Parameter To QueCounter
    startTimer(15); //Calling StartTimer Function
    startTimerLine(0); //Calling StartTimerLine Function
}
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//If RestartQuiz Button Clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //Show Quiz Box
    result_box.classList.remove("activeResult"); //Hide Result Box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //Calling ShowQuestions Function
    queCounter(que_numb); //Passing que_numb Value To queCounter
    clearInterval(counter); //Clear Counter
    clearInterval(counterLine); //Clear counterLine
    startTimer(timeValue); //Calling startTimer Function
    startTimerLine(widthValue) //Calling startTimerLine Function 
    timeText.textContent = ("Time Left");
    next_btn.classList.remove("show"); //Hide The Next Button
}

//If QuitQuiz Button Clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //Reload The Current Window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

//If Next Que Button Clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1) {
        que_count++; //Increament the que_coun value
        que_numb++; //Increament the que_numb value
        showQuestions(que_count); //Calling showQuestions Function
        queCounter(que_numb); //Passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //Clear counterLine
        startTimer(timeValue); //Calling startTimer Function
        startTimerLine(widthValue); //Calling startTimerLine Function
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show"); //Hide The Next Button
    }else{
        clearInterval(counter); //Clear counter
        clearInterval(counterLine); //Clear counterLine
        showResult(); //Calling showResult Function
    }
}

//Getting Questions And Options From Array
function showQuestions(index){
const que_text = document.querySelector(".que_text")

//Creating a new span and div tag for question and option  and passing the value using array index
let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
let option_tag = '<div class="option"><span>' + questions[index].options[0] +'</span></div>' +'<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
+'<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
+'<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
que_text.innerHTML = que_tag; //Adding new span tag inside que_tag
option_list.innerHTML = option_tag //Adding new div tag inside option_tag

const option = option_list.querySelectorAll(".option");

//Set onclick attributeto all available options
for(i=0; i < option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
}
}

//Creating The New Div For Icons
let tickIconTag  = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag  = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//If User Clicked On Options
function optionSelected(answer){
    clearInterval(counter); //Clear Counter
    clearInterval(counterLine); //Clear countryLine
    let userAns = answer.textContent; //Getting user selected option
    let correcAns = questions[que_count].answer; //Getting correct answer from array
    const allOptions = option_list.children.length; // Getting all options items

    //If user selected option is equal to array's correct answer
    if(userAns == correcAns){
        userScore += 1; //Upgrading score value width 1
        answer.classList.add("correct"); //Adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //Adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //Adding cross icon to the correct selected option
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){
                option_list.children[i].setAttribute("class", "option correct"); //Adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //Adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //Once user select an option then disable all options
    }
    next_btn.classList.add("show"); //Show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //Hide info box
    quiz_box.classList.remove("activeQuiz"); //Hide quiz box
    result_box.classList.add("activeResult"); //Show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ //If user score more than 3
        let scoreTag = '<span>Congratulations! 💎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; //Adding new tag inside score_text
    }
    else if(userScore > 1){ //If user score more than 1
        let scoreTag = '<span>Nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ //if user score less than 1
        let scoreTag = '<span>Sorry 😥, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length + '</p></span>';
        scoreText.innerHTML  = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //Changing the value of timeCount with time value
        time--; //Decreament the time value
        if(time < 9){ //If time is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // Add a 0 before time value
        }
        if(time < 0){ //If time is less than 0
            clearInterval(counter); //Clear interval
            timeText.timeContent = "Time Off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer; //Getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //Once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //Show the next button if user selected any option
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //Upgrading time value width 1
        time_line.style.width = time + "px"; //Increasing width of time_line with px by time value
        if(time > 549){ //If time value is greater than 549
            clearInterval(counterLine); //Clear interval
        }
    }
}
function queCounter(index){
    //Creating a new span tag and passing the question number and total 
    let totalQueCounTag = '<span><p>'+ index + '</p> of <p>'+ questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; //Adding new span tag inside bottom_ques_counter
}


