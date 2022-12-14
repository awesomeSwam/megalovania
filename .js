// 답변 제출 
function selectbutton(answervalue, answerText){
	if(isAjaxing) return;
	
	frm.answerSeq.value=answervalue;
	
	setPlayTime();
	deleteCookie('quizTimer'); 
	$.removeCookie('quizTimer');
	var value = $('#frm').serialize();
    $.ajax({
        url:'/student/questionSelectorAction.do',
        data: value,
        type: 'post',
        dataType:'json',
        success:function(rlt){
        	console.log(rlt);
        	
        	if(rlt.success){
	        	$('#studentAnswerSeq').val( rlt.data.stlogvo.studentAnswerSeq );
	        	
	        	if( rlt.data.resultCode == 9999){
	        		alert('이미 제출하였습니다.');
	        		if(playType == "HOMEWORK" || playType == "CHALLENGE" || playType == "BATTLE"){
	        			checkNextQuestionHomework();
	        		} else {
// 		        		frm.action = '/student/questionSelector.do';
// 		        		frm.submit();
	        		}
	        	}else{
					if(playType == "ONLINE"){
						// 학생->선생님 답변 제출 알림
// 						if(isSocketIO){
// 							wsSendSubmittedAnswer(questionCd);
// 						} else {
// 						}
						wsSendSubmittedAnswer(questionCd);
					}
					
					if(playType == "HOMEWORK" || playType == "CHALLENGE" || playType == "BATTLE"){
	        			// 체크한 답 표시 
	        			$("#button"+answervalue).parents("li").addClass("checked");
	        			
	        			// 과제 정오답 피드백 off는 간지 애니메이션 있음
	        			if(playType == "HOMEWORK" && rightFeedbackYn == "N"){ // 과제 정오답 피드백 off
	        				$("#modalRightAnswerOff").show().delay(1500).fadeOut(500);
	        			
	        				// 배경음악있으면 제거
	            			if($("#quizBgmView").length > 0){
	            				$("#quizBgmView").remove();
	            			}
	            			
	                		// quizSoundChangeover
	                		$("#quizSoundChangeover").trigger('play');
	        			
	            			var timerRightYn = setInterval(function() { //실행할 스크립트 
	            				clearInterval(timerRightYn); 
	            				// 다음 문제로 이동
		        				goNextQuestionHomework();
	            			}, modalRightFeedbackOffInterval);
	        			} else {
		        			console.log("questionCd: " + questionCd);
		//         			console.log("questionCd: " + rlt.data.stlogvo.questionCd);
		        			if(questionCd == "Q1" || questionCd == "Q2" || questionCd == "Q3" || questionCd == "Q5") { // 정답 체크 
		        				var rightYn = rlt.data.stlogvo.rightYn;
		            			var point = rlt.data.stlogvo.point;
		            			var bonus = rlt.data.stlogvo.bonus;
		            			
		            			console.log(playType);
		            			console.log(battleTheme);
		            			// 정오답 팝업
		            			if(rightYn == "Y"){
		    	        			$("#modalRightAnswerY .point span").text(numberWithCommas(point+bonus));
		//     	        			$("#modalRightAnswerY").show();
		    	        			$("#modalRightAnswerY").show().delay(1500).fadeOut(500);
		    	        			if(playType == "BATTLE"){
		    	        				bgmBattleCorrectAnswer.play();
		    	        				if(battleTheme.includes('_ITEM')){
			    	        				// 배틀 아이템 선택 show
			    	        				setTimeout(function(){
				    	        				showBattleItemPick();
			    	        				}, 1500);
		    	        				}
		    	        			}
		            			} else {
		//             				$("#modalRightAnswerN").show();
		            				$("#modalRightAnswerN").show().delay(1500).fadeOut(500);
		            				if(playType == "BATTLE"){
		            					bgmBattleWorngAnswer.play();
		    	        			}
		            			}
		            			
		            			// 순서형 처리
			        			// onclick 이벤트 제거
			        			$(".orderAnswerLi").removeAttr("onclick");
		            			
		            			// 배경음악있으면 제거
		            			if($("#quizBgmView").length > 0){
		            				$("#quizBgmView").remove();
		            			}
		            			
		                		// quizSoundAnswer
		                		$("#quizSoundAnswer").trigger('play');
		            			
		            			var timerRightYn = setInterval(function() { //실행할 스크립트 
		            				clearInterval(timerRightYn); 
		            				if(questionCd == "Q3" || questionCd == "Q5"){ // 단답형
		                				if(rightYn == "Y"){
		                					$("#textStudentResultHomework i").html("정답");
		                					$("#textStudentResultHomework i").addClass("answer-o");
		                    			} else {
		                    				$("#textStudentResultHomework i").html("오답");
		                    				$("#textStudentResultHomework i").addClass("answer-x");
		                    			}
		                				// 과제. 학생 입력 답 결과 보기
		                				afterInputTextTypeHomework();
		            				} else {
		            					//과제. 퀴즈 결과 보기
			            				viewResultHomework();
		            				}
		            			}, modalRightAnswerInterval);
		        			} else if(questionCd == "Q4") { // Q4 서술형 채점 대상 아님
		        				// 과제. 학생 입력 답 결과 보기
		        				afterInputTextTypeHomework();
		        			} else if(quizCategory == 'QUIZ' && questionCd == "D6") { // 퀴즈 D6 투표
		        				//과제. 퀴즈 결과 보기
		        				viewResultHomework();
		        			} else {
		        				// 다음 문제로 이동
		        				goNextQuestionHomework();
		        			}
	        			}
	        		} else {
	        			// 정오답, 참여 모달 있으면 숨김
	        			if($(".modalRightAnswer:visible").length > 0){
	        				$(".modalRightAnswer").hide();
	        			}
	        			$("#answerWrite").hide();
	    	        	$("#answerSubmit").hide();
	    		    	$('.wrap-midst').show();

//	     	        	$("#answerSubmit").show();
	        		}
	        	}
        	}
        	
        }, beforeSend: function() {
        	isAjaxing = true;
        }, complete: function(rlt){
        	setTimeout(function(){isAjaxing = false;}, 3000); // 중복 방지 타임아웃	
//         	console.log(rlt);
	    }
    });
}

'spendTime=0&quizIdx=1814785&questionIdx=15637295&prevQuestionIdx=15637293&nextQuestionIdx=15637296&studentAnswerSeq=210032052&quizCategory=QUIZ&questionCd=Q5&answerSeq=&answerValue=%2525EB%25259D%2525BC%2525EB%2525A9%2525B4&answerDesc=&answerSeqArrayStr=&answerValueArrayStr=&answerTitleArrayStr=&rightAnswer=%EB%9D%BC%EB%A9%B4&rightAnswerCnt=1&playType=BATTLE&battleTheme=SP_RACE&timerYn=N&bonusYn=Y&showRankingYn=N&entryYn=Y&hasExplanationYn=N&sender=b&rightOrder=&inputOrder='

$.ajax({
  url:'/student/questionSelectorAction.do',
  data:   'spendTime=-1000000000&quizIdx=1814785&questionIdx=15637296&prevQuestionIdx=15637295&nextQuestionIdx=&studentAnswerSeq=210032144&quizCategory=QUIZ&questionCd=Q7&answerSeq=&answerValue=&answerDesc=&answerSeqArrayStr=&answerValueArrayStr=&answerTitleArrayStr=&rightAnswer=1%2C2%2C4%2C5%2C3&rightAnswerCnt=0&playType=BATTLE&battleTheme=SP_RACE&timerYn=N&bonusYn=Y&showRankingYn=N&entryYn=Y&hasExplanationYn=N&sender=b&rightOrder=1%2C2%2C4%2C5%2C3&inputOrder=1%2C2%2C4%2C5%2C3',
  type: 'post',
  dataType:'json',
  success:function(rlt){ console.log(rlt); }});

  'spendTime=-1000000000&quizIdx=1814785&questionIdx=15637296&prevQuestionIdx=15637295&nextQuestionIdx=&studentAnswerSeq=210032144&quizCategory=QUIZ&questionCd=Q7&answerSeq=&answerValue=&answerDesc=&answerSeqArrayStr=&answerValueArrayStr=&answerTitleArrayStr=&rightAnswer=1%2C2%2C4%2C5%2C3&rightAnswerCnt=0&playType=BATTLE&battleTheme=SP_RACE&timerYn=N&bonusYn=Y&showRankingYn=N&entryYn=Y&hasExplanationYn=N&sender=b&rightOrder=1%2C2%2C4%2C5%2C3&inputOrder=1%2C2%2C4%2C5%2C3'


function setPlayTime(){$("#frm #spendTime").val(0)}(()=>{let str='';playAnswerList.forEach(x=>{x=JSON.parse(x);str+=`${x.answerValue} : ${x.rightYn}<br>`;});const p=document.createElement("p");p.innerHTML=str;document.getElementById("questionDiv").appendChild(p);})();