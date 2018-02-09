
// 'catch a falling star and put it in your pocket, save it for a rainy day'

// - start the timer when the player presses play
// - stars begin to shoot
// - as a player clicks on star, it collects the score and adds it to the bottom
// - at the end of the timer, based on score - gives you one of three results - rainy, cloudy or shine 

    const game = {};


    // Player starts at a score of 0
    game.player = { score: 0 }
    
    // Start Screen
    $('.startBtn').on('click', function() {
        $(".startScreen").hide();
        $(".gameScreen").show();
        game.timerId = setInterval(game.countdown, 1000);
    });

    // Countdown
    game.counter = 31;
    game.countdown = function() {
        if (game.counter === 0) {
            game.results();
            clearInterval(game.timerId);
        } else {
            game.counter--;
            $('.mycounter').html(`<h3 class="choice">${game.counter}</h3>`);
        }
    }

    // Display initial score on page load
    game.displayScore = function() {
        for (let item in game.player) {
            $('.score').append(`<h1>Score: `+ game.player[item] + `</h1>`);
        }
    }

    // When you click on a star, the star disappears
    // The score empties and adds to the score
    game.catchStar = function() {
        $('#starOne').on('click', function() { 
            game.player['score']++;
            game.randomStarPosition();       
            $(`.score`).empty();
            game.displayScore();
        });
    }

    game.catchStar2 = function() {
        $('#starTwo').on('click', function() {
            game.player['score']++;
            game.randomStarPosition2();
            $(`.score`).empty();
            game.displayScore();
        });
    }

    // Random position of star
    game.randomStarPosition = function() {
        game.containerWidth = $('.container').width();
        game.containerHeight = $('.container').height();
        game.randomX = Math.floor((Math.random() * game.containerWidth - 200));
        game.randomY = Math.floor((Math.random() * game.containerHeight - 200));
        $('#starOne').css('left', game.randomX);
        $('#starOne').css('top', game.randomY);
    }

    // Random position of star
    game.randomStarPosition2 = function() {
        game.containerWidth = $('.container').width();
        game.containerHeight = $('.container').height();
        game.randomX2 = Math.floor((Math.random() * game.containerWidth - 300));
        game.randomY2 = Math.floor((Math.random() * game.containerHeight - 300));
        $('#starTwo').css('left', game.randomX2);
        $('#starTwo').css('top', game.randomY2);
    }


    // When the player clicks the restart button, the game starts again
    game.restart = function() {
        $('.btn-restart').on('click', function() {
            window.location.reload();
        });
    }

    // results
    game.results = function() {
        if (game.player.score >= 10) {
            console.log('you saved your rainy day');
        } else if (game.player.score >= 5) {
            console.log('cloudy day');
        } else {
            console.log('rainy')
        }
    }

    // on page loads, it displays the initial score and starts the game
    game.init = function() {   
        game.displayScore();
        game.catchStar();
        game.catchStar2();
    }

    $(function() {
        game.init();
        $(".gameScreen").hide();     
        game.randomStarPosition();
        game.randomStarPosition2();
        game.restart();
    });
