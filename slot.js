/**
* Slot machine
* Author: Saurabh Odhyan | http://odhyan.com
*
* Licensed under the Creative Commons Attribution-ShareAlike License, Version 3.0 (the "License")
* You may obtain a copy of the License at
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Date: May 23, 2011 
*/
$(document).ready(function() {
    /**
    * @class Slot
    * @constructor
    */
    function Slot(el, data, speed) {
        if (data.length) {
            $(el).css('heigth', data.length * 90 + 'px');
        }
        data.forEach(function(_data) {
            var img = $("<img>");
            img.attr("src", _data.img_src);
            img.css({"width": "120px", "height": "90px"});
            img.appendTo(el);
            img.attr("data-id", _data.id);
        });
        this.el = el; //dom element of the slot
        this.pos = null; //final position of the slot
        $(el).roulette({
            speed : speed,
            duration : 10,
            stopImageNumber : null,
            startCallback : function() {
                console.log('start ' + el);
            },
            stopCallback : function($stopElm) {
                console.log('stop ' + el, 'won id: ' + $($stopElm[0]).attr("data-id"));
            }});
    }

    /**
    * @method start
    * Starts a slot
    */
    Slot.prototype.start = function() {
        $(this.el).roulette("start");
    };

    /**
    * @method stop
    * Stops a slot
    */
    Slot.prototype.stop = function() {
        $(this.el).roulette("stop");
    };

    function enableControl() {
        $('#control').attr("disabled", false);
    }

    function disableControl() {
        $('#control').attr("disabled", true);
    }

    function printResult() {
        var res;
        res = "You Won!";
        $('#result').html(res);
    }

    //create slot objects
    var a = new Slot('#slot1', window.data.slot1, 10),
        b = new Slot('#slot2', window.data.slot2, 20),
        c = new Slot('#slot3', window.data.slot3, 30);

    /**
    * Slot machine controller
    */
    $('#control').click(function() {
        if(this.innerHTML == "Start") {
            a.start();
            setTimeout(function() {b.start()}, 250);
            setTimeout(function() {c.start()}, 500);
            this.innerHTML = "Stop";
            
            disableControl(); //disable control until the slots reach max speed
            setTimeout(function() {enableControl()}, 2000);
            
        } else if(this.innerHTML == "Stop") {
            a.stop();
            setTimeout(function() {b.stop()}, 500);
            setTimeout(function() {c.stop()}, 1000);
            this.innerHTML = "Start";

            disableControl(); //disable control until the slots stop
            setTimeout(function() {
                enableControl();
                printResult();
            }, 1000);
        }
    });
});
