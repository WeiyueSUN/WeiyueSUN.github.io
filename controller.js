$(document).ready(function () {

var qNumber=0;
var qbank=new Array();
var opArray=new Array();
var myloader="activity.json";
var stage="#game1";
var stage2=new Object;
var qlock=false;
var numberOfQuestions;
var score=0;

fillDB();



function fillDB(){



 		$.getJSON(myloader, function(data) {


		for(i=0;i<data.quizlist.length;i++){

			qbank[i]=new Array;
			qbank[i][0]=data.quizlist[i].question;
			qbank[i][1]=data.quizlist[i].op1;
			qbank[i][2]=data.quizlist[i].op2;
			qbank[i][3]=data.quizlist[i].op3;

		}
		 numberOfQuestions=qbank.length;

		 //alert(qbank);

		 displayQuestion();


		})//gtjson

}//filldb


function displayQuestion(){

var rnd=Math.random()*3;rnd=Math.ceil(rnd);
var q1;
var q2;
var q3;
if(rnd==1){q1=qbank[qNumber][1];q2=qbank[qNumber][2];q3=qbank[qNumber][3];}
if(rnd==2){q2=qbank[qNumber][1];q3=qbank[qNumber][2];q1=qbank[qNumber][3];}
if(rnd==3){q3=qbank[qNumber][1];q1=qbank[qNumber][2];q2=qbank[qNumber][3];}

$(stage).append('<div class="questionText">'+qbank[qNumber][0]+'</div><div id="1" class="pix"><img src="img/'+q1+'"></div><div id="2" class="pix"><img src="img/'+q2+'"></div><div id="3" class="pix"><img src="img/'+q3+'"></div>');

$('.pix').click(function(){
			if(qlock==false){qlock=true;
			//correct answer
			if(this.id==rnd){
				$(stage).append('<div class="feedback1">CORRECT</div>');
				 score++;
				}
			//wrong answer
			if(this.id!=rnd){
				$(stage).append('<div class="feedback2">WRONG</div>');


				}

			setTimeout(function(){changeQuestion()},1000);

			}})



}//display question





	function changeQuestion(){

		qNumber++;

	if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}

	if(qNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}

	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {qlock=false;});
	}//change question




	function displayFinalSlide(){

		$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>Correct answers: '+score+'</div>');

	}//display final slide







	});//doc ready