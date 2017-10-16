
//Missing is code that on click would access file for "gun cocking".
//Second Sound File would be accessed upon a wrong answer and would fire a shot.
//Array of Questions
var triviaQuestions = [{
	question: "Which villian's weapon was a hat?",
	answerList: ["Odd Job", "Jaws", "Xenia Onatopp", "Auric Goldfinger"],
	answer: 0
},{
	question: "How does Goldfinger try to kill James Bond?",
	answerList: ["Gun","Laser","Car Bomb","Strangulation"],
	answer: 1
},{
	question: "What is Octopussy's main talent?",
	answerList: ["Criminal Mastermind", "Gymnast", "Pilot", "World-class hotdog eating champ"],
	answer: 2
},{
	question: "Who is notorius for using a golden gun?",
	answerList: ["Ernst Stavro Blofeld","Alec Trevelyan","Francisco Scaramanga","Dr. Kananga"],
	answer: 2
},{
	question: "Who was the first actor to portray James Bond?",
	answerList: ["Daniel Craig", "Zac Efron", "George Lazenby", "Sean Connery"],
	answer: 3
},
{
	question: "What type of gun does James Bond use?",
	answerList: ["Ak-47","Walther PPK","Machine Gun","Glock"],
	answer: 1
},{
	question: "What does the second 'E' in SPECTRE stand for?",
	answerList: ["Extortion","Extinction","Extermination","Elimination"],
	answer: 0
},{
	question: "Who created James Bond?",
	answerList: ["J.K. Rowling", "Ian Fleming", "Mario Puzo", "Tom Clancy"],
	answer: 1
},{
	question: "What is James Bond's Military Rank?",
	answerList: ["Private First Class","Colonel British Army","007 Agent","Commander in the Royal Navy"],
	answer: 3
},{
	question: "What is Q's Real Name?",
	answerList: ["It's Actually Q"," Sir Christopher Smith","Major Geoffrey Boothroyd","Colonel William Lawrence"],
	answer: 2
},]
//image array that connects image to question
var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8','question9','question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Way to go Double-0!",
	incorrect: "You might want Q to answer these for you",
	endTime: "Out of time!",
	finished: "The mission is over,<br> did you come out unscathed."
}
//buttons
$('#startBtn').on('click', function(){
	$(this).hide();
	game();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	game();
});

function game(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	Question();
}

function Question(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answers();
	});
}
//Sets countdown to answer the question
function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answers();
	}
}

function answers(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.jpg" width = "200px">');
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(Question, 5000);
	}	
}
//Sets up score board
function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
