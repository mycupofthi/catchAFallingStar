// - Start the timer when the player presses play
// - Stars begin to shoot
// - As a player clicks on star, it collects the score and adds it to the bottom
// - At the end of the timer, based on score - gives you one of three results - rainy, cloudy or shine 

const game = {};

game.player = { score: 0 };

// Game container minus the moon (W x H)
game.cW = ($('.container').width() - 400) ;
game.cH = ($('.container').height() - 400);   

// Timer
game.counter = 31;
game.countdown = function() {
    if (game.counter === 0) {
        game.results();
    } else {
        game.counter--;
        $('.mycounter').html(`<h2>Timer: ` + game.counter + `</h2>`);
    }
}

// Displays initial score
game.displayScore = function() {
    for (let item in game.player) {
        $('.score').append(`<h2>Score: `+ game.player[item] + `</h2>`);
    }
}

// Adds point to score
game.addPoint = function() {
    game.player['score']++;
    $(`.score`).empty();
    game.displayScore();
}

// Random position of star
game.randomStarPosition = function() {
    game.randomX = Math.floor((Math.random() * game.cW));
    game.randomY = Math.floor((Math.random() * game.cH));
    $('#starOne').css('left', game.randomX);
    $('#starOne').css('top', game.randomY);
}

// Random position of star 2
game.randomStarPosition2 = function() {
    game.randomX2 = Math.floor((Math.random() * game.cW));
    game.randomY2 = Math.floor((Math.random() * game.cH));
    $('#starTwo').css('left', game.randomX2);
    $('#starTwo').css('top', game.randomY2);
}

// When you click on the star, it disappears and repositions
game.catchStar = function() {
    $('#starOne').on('click', function() { 
        game.randomStarPosition();       
        game.addPoint();
    });
}

// Star 2
game.catchStar2 = function() {
    $('#starTwo').on('click', function() {
        game.randomStarPosition2();
        game.addPoint();
    });
}

// Hide game screen and display final score
game.hideGameDisplayFinal = function() {
    $(".gameScreen").hide();
    game.displayFinalScore();
}

// Final score count
game.displayFinalScore = function () {
    $('.resultsScore').append(`You scored ` + game.player.score);
    clearInterval(game.timerId);
}

// Results screen
game.results = function() {
    game.hideGameDisplayFinal();        
    if (game.player.score >= 15) {
        $(".sunny").show();
        $(".cloudy").hide();            
        $(".rainy").hide();
    } else if (game.player.score >= 8) {
        $(".cloudy").show();
        $(".rainy").hide();
        $(".sunny").hide();    
    } else {
        $(".rainy").show(); 
        $(".cloudy").hide();       
        $(".sunny").hide();      
    }
}

// Start Button 
game.start = function() {
    $('.btnStart').on('click', function() {
        $(".startScreen").hide();
        $(".gameScreen").show();
        game.timerId = setInterval(game.countdown, 1000);
    });
}

// Game Controls
game.controls = function() {
    $('.btnPause').on('click', function () {
        clearInterval(game.timerId);
    });
    $('.btnResume').on('click', function () {
        game.timerId = setInterval(game.countdown, 1000);
    });
    $('.btnRestart').on('click', function () {
        window.location.reload();
    });
}

// Hides game screen, and all the possible results' screens
game.hideScreens = function() {
    $(".cloudy").hide();
    $(".gameScreen").hide();
    $(".rainy").hide();
    $(".sunny").hide();    
}

// On page load, start button gets the game ready
game.init = function() { 
    game.start();
    game.hideScreens();
}

$(function() {
    game.init();
    game.displayScore();
    game.catchStar();
    game.catchStar2();
    game.randomStarPosition();
    game.randomStarPosition2();
    game.controls();
});
