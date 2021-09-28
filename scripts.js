function quizInit() {

  // Selectors
  var $quizQuestionText = $('.quiz .question .questionText');
  var $quizQuestionOptions = $('.quiz .question .options');
  var $quizProgress= $('.quiz progress');
  var $quizProgressDataCurrent= $('.quiz .progressData .current');
  var $quizProgressDataLimit= $('.quiz .progressData .limit');

  // Data input for Questions and Results
  var questions = [{
    text: '1. What best resembles your Bearded Dragon?',
    answers: {
      type: 'multiple',
      options: [{
        text: 'White/Grey and Patternless',
        weight: 5
      }, {
        text: 'Sandy/Orange and patternless',
        weight: 4
      }, {
        text: 'Multiple different colors all over',
        weight: 3
      },{
        text: 'Patternless, mix of the first two answers/ blotches of darker colors',
        weight: 2
      },{
        text: 'Random patches of missing color (patches most commonly purple)',
        weight: 1
      },{
        text: 'Colors with almost perfectly circle spots of missing pigment',
        weight: 0
      }]
    },
  }, {
    text: '2. Describe your dragons eyes?',
    answers: {
      type: 'multiple',
      options: [{
        text: 'Black',
        weight: 0
      }, {
        text: 'Colored',
        weight: 1
      }, {
        text: '1 colored and 1 black',
        weight: 2
      }]
    },
  },{
    text: '3. What type of nails does your dragon have?',
    answers: {
      type: 'multiple',
      options: [{
        text: 'Clear',
        weight: 1
      }, {
        text: 'Black',
        weight: 2
      }, {
        text: 'I can see a black line through the nail',
        weight: 3
      },{
        text: 'Some are clear and some are not',
        weight: 4
      }]
    },
  },{
    text: '4. How would you best describe your dragons scales?',
    answers: {
      type: 'multiple',
      options: [{
        text: 'My dragon has a super smooth back and some spikes on the side',
        weight: 1
      }, {
        text: 'My dragon has very orderly normal looking scales and spikes',
        weight: 2
      }, {
        text: 'My dragon has scales going every direction and a lot of spikes/scales appear circular',
        weight: 3
      },{
        text: 'My dragon doesn’t have scales',
        weight: 4
      }]
    },
  },{
    text: '5. If you had your dragon as a baby, how would you describe their appearance?',
    answers: {
      type: 'multiple',
      options: [{
        text: 'My dragon appeared almost transparent like',
        weight: 1
      }, {
        text: 'Nothing I could notice, looked normal',
        weight: 2
      }, {
        text: 'My dragon was older when they came into my life',
        weight: 3
      },{
        text: 'I don’t know',
        weight: 4
      }]
    },
  },{
    text: '6. Does your dragon have 2 perfectly solid stripes (similar to racing stripes) down its back?',
    answers: {
      type: 'multiple',
      options: [{
        text: 'Yes',
        weight: 1
      }, {
        text: 'No',
        weight: 2
      }]
    },
  }];

  var results = [{
    id: 1,
    text:'result 1 text',
    minScore:0
  },{
    id: 2,
    text:'result 2 text',
    minScore:5
  },{
    id: 3,
    text:'result 3 text',
    minScore:9
  },{
    id: 4,
    text:'result 4 text',
    minScore:12
  },{
    id: 5,
    text:'result 4 text',
    minScore:12
  },{
    id: 6,
    text:'result 4 text',
    minScore:12
  }];

  // QUIZ ENGINE
  function quiz() {
    var currentQuestion = 0; // default starting value
    var currentScore = 0; // default starting value
    var answerLog = [] // for storing answers for Marketo
    $quizProgress.attr("max", questions.length);
    $quizProgressDataLimit.html(questions.length);
    renderQuestion(currentQuestion);

    // RENDER
    function renderQuestion() {
      var question = questions[currentQuestion];
      var optionsHtml = [];
      var questionText = question.text;
      var questionOptionText = question.answers.options;
      $quizQuestionText.html(questionText);
      for(var i = 0; i < questionOptionText.length; i++) {
        if (question.answers.type == 'range'){
          var questionOptionItem = '<button class="quiz-opt range" value="'+questionOptionText[i].weight+'" id="'+questionOptionText[i].text+'">'+questionOptionText[i].text+'</button>'
        } else {
          var questionOptionItem = '<button class="quiz-opt" value="'+questionOptionText[i].weight+'" id="'+questionOptionText[i].text+'">'+questionOptionText[i].text+'</button>'
        }
        optionsHtml.push(questionOptionItem);
      }
      $quizQuestionOptions.html(optionsHtml.join(''));
      $('.quiz button').click(nextQuestion);
    } // END renderQuestion

    // HANDLER
    function nextQuestion() {
      currentQuestion += 1;
      var optionValue = parseInt(this.value);
      currentScore += optionValue;
      console.log('currentScore=', currentScore);
      $quizProgress.attr("value", currentQuestion);
      $quizProgressDataCurrent.html(currentQuestion);
      if (questions.length == currentQuestion){
        calculateResults();
      } else {
        renderQuestion();
        // addToAnswerLog();
      }
    } // END nextQuestion

    // RESULTS
    function calculateResults() {
      $('.quiz .question').html('<p class="questionText">You Have A _______!</p>');
    }
  } // END quiz engine

  // Init render
  quiz();

} // END quizInit

$(function() {
  quizInit();
});