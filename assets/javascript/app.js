$(document).ready(function(){
    $("#timer").hide();
    $("#start").on('click', game.startGame);
    $(document).on('click' , '.option', game.guessChecker);
    
  })
  
  var game = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerId : '',
    gameEnd: false,
    questions: {
        q1: 'Which pokeball has a higher catch rate?',
        q2: 'Which is the first pokemon in the pokedex?',
        q3: 'Which one is an electric type?',
        q4: 'What region can you find Littleroot Town?',
        q5: "Who evolves into Aegislash?",
        q6: 'How many badges do you need to challenge the Elite 4?',
        q7: "Which type combo is 4 times effective against electric?",
        q8: "How many pokemon are there in total (as of 2019)?",
        q9: "Which pokemon can learn Solar Beam?",
        q10: "What item raises a pokemon's level by 1?"
    },
    options: {
        q1: ['Great Ball', 'Pokeball', 'Premier Ball', 'Ultra Ball'],
        q2: ['Budew', 'Charmander', 'Bulbasaur', 'Mew'],
        q3: ['Chikorita', 'Lanturn', 'Mewtwo', 'Tropius'],
        q4: ['Kanto', 'Unova', 'Alola', 'Hoenn'],
        q5: ['Honedge','Duoblade','Pawniard','Absol'],
        q6: ['7','8','9','10'],
        q7: ['Water/Rock', 'Water/Flying', 'Water/Ground','Water/Bug'],
        q8: ['809', '890', '460', '590'],
        q9: ['Exeggcute', 'Magikarp', 'Dwebble', 'Pidgeotto'],
        q10: ['Exp Share', 'Rare candy', 'PP Up', 'Oran Berry']
    },
    answers: {
        q1: 'Ultra Ball',
        q2: 'Bulbasaur',
        q3: 'Lanturn',
        q4: 'Hoenn',
        q5: 'Duoblade',
        q6: '8',
        q7: 'Water/Flying',
        q8: '890',
        q9: 'Exeggcute',
        q10: 'Rare candy'
    },
    
    startGame: function(){
        game.currentSet = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.gameEnd = false;
        clearInterval(game.timerId);
        
        $('#question').show();
        $('#results').html('');
        $('#time').text(game.timer);
        
        $('#start').hide();
        $('#timer').show();
        game.nextQuestion();
      
    },
    nextQuestion : function(){
        game.timer = 30;
        $('#time').removeClass('last-seconds'); 
        $('#time').text(game.timer);
        if(!game.gameEnd){
            game.timerId = setInterval(game.timerRunning, 1000);
        }
        $('#question').text(Object.values(game.questions)[game.currentSet]);
        
        var questionAnswers = Object.values(game.options)[game.currentSet];
        
        $.each(questionAnswers, function(index, key){
            var optionButton = `<button class="option">${key}</button>`;
            $('#answers').append(optionButton);
        })
      
    },
    timerRunning : function(){
        if(game.timer > -1 && game.currentSet < Object.keys(game.questions).length){
            $('#time').text(game.timer);
            game.timer--;
                if(game.timer === 4){
                $('#time').addClass('last-seconds');
                }
        }
        else if(game.timer === -1){
            game.unanswered++;
            game.result = false;
            clearInterval(game.timerId);
            resultId = setTimeout(game.guessResult, 2500);
            $('#results').html(`<h3>Out of time! The answer was ${Object.values(game.answers)[game.currentSet]}</h3>`);
        }
        else if(game.currentSet === Object.keys(game.questions).length){
            var resultText;
            if(game.correct === 10){
                resultText = "You are a Pokemon Master!"
            }
            else{
                resultText = "You need to train some more!"
            }
            var gameResults = `
                                <h3>${resultText}</h3>
                                <p>Correct: ${game.correct}</p>
                                <p>Incorrect: ${game.incorrect}</p>
                                <p>Unaswered: ${game.unanswered}</p>
                                <p>Please play again!</p>
                            `;
            $('#results').html(gameResults);
            
            $('#question').hide();
            $('#timer').hide();
            
            $('#start').show();
            game.gameEnd = true;
        }
      
    },
    guessChecker : function() {
        var resultId;
        var currentAnswer = Object.values(game.answers)[game.currentSet];
        
        if($(this).text() === currentAnswer){
            $(this).addClass('correct');
        
            game.correct++;
            clearInterval(game.timerId);
            resultId = setTimeout(game.guessResult, 2500);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        else{
            $(this).addClass('incorrect');
        
            game.incorrect++;
            clearInterval(game.timerId);
            resultId = setTimeout(game.guessResult, 2500);
            var result = `<h3>Sorry! Correct Answer: ${currentAnswer}</h3>`;
            $('#results').html(result);
        }
      
    },
    guessResult : function(){
        game.currentSet++;
      
        $('.option').remove();
        $('#results').empty();
      
        game.nextQuestion();
    }
  }