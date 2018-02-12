const game = {};

game.player = { score: 0 };

// Game container minus the moon (W x H)
game.cWidth = ($('.container').width() - 400);
game.cHeight = ($('.container').height() - 400);   

// Timer
game.counter = 30;
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
game.starId = ['#starOne', '#starTwo', '#starThree', '#starFour'];

// On page load, randomly positions stars
function randPos(starId) {
    for (i = 0; i < starId.length; i++) {
        game.id = starId[i];
        game.randX = Math.floor((Math.random() * game.cWidth));
        game.randY = Math.floor((Math.random() * game.cHeight));
        $(game.id).css('left', game.randX);
        $(game.id).css('top', game.randY);
    }
}

// Add point when click on star
function catchAStar(starId) {
    for (i = 0; i < starId.length; i++) {
        $(starId[i]).on('click', function() {
            game.addPoint();
        });
    }
}

// After star is clicked, randomly positions again
game.moveStar = function() {
    $('#starOne, #starTwo, #starThree, #starFour').on('click', function() {
        game.randX = Math.floor((Math.random() * game.cWidth));
        game.randY = Math.floor((Math.random() * game.cHeight));
        if (this.id === 'starOne') {
            $('#starOne').css('left', game.randX);
            $('#starOne').css('top', game.randY);
        }
        else if (this.id === 'starTwo') {
            $('#starTwo').css('left', game.randX);
            $('#starTwo').css('top', game.randY);
        }
        else if (this.id === 'starThree') {
            $('#starThree').css('left', game.randX);
            $('#starThree').css('top', game.randY);
        }
        else {
            $('#starFour').css('left', game.randX);
            $('#starFour').css('top', game.randY);
        }
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

// On page load, intial score displayed 
// Screens are hid
// Start button gets the game ready
// Stars are randomly positioned & click ready
game.init = function() { 
    game.displayScore();
    game.hideScreens();
    game.start();
    randPos(game.starId);
    catchAStar(game.starId);
    game.moveStar();
    game.controls();
}

$(function() {
    game.init();
});
