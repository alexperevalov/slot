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
                // console.log('start ' + el);
            },
            stopCallback : function($stopElm) {
                console.log('stop ' + el, 'won id: ' + $($stopElm[0]).attr("data-id"));
                var sel = el + '_result';
                $(sel).html($($stopElm[0]).attr("data-id"));
            }});
    }

    /**
    * @method start
    * Starts a slot
    */
    Slot.prototype.start = function(timeout) {
        var _this = this;
        setTimeout(function() {
            $(_this.el).roulette("start");
        }, timeout || 0);
    };

    /**
    * @method stop
    * Stops a slot
    */
    Slot.prototype.stop = function(timeout) {
        var _this = this;
        setTimeout(function() {
            $(_this.el).roulette("stop");
        }, timeout || 0);
    };

    function enableControl() {
        $('#control').attr("disabled", false).toggleClass("button--disabled");
    }

    function disableControl() {
        $('#control').attr("disabled", true).toggleClass("button--disabled");
    }

    //create slot objects
    var slots = [];
    slots[0] = new Slot('#slot1', window.data.slot1, 6);
    slots[1] = new Slot('#slot2', window.data.slot2, 10);
    slots[2] = new Slot('#slot3', window.data.slot3, 12);
    slots[3] = new Slot('#slot4', window.data.slot3, 15);
    slots[4] = new Slot('#slot5', window.data.slot3, 10);

    var timeout;
    /**
    * Slot machine controller
    */
    $('#control').click(function() {
        if(this.innerHTML == "Start") {
            timeout = 0;
            slots.forEach(function(slot) {
                slot.start(timeout);
                timeout += 250;
            });
            this.innerHTML = "Stop";
            $(this).addClass("button--youtube");
            
            disableControl(); //disable control until the slots reach max speed
            setTimeout(function() {enableControl()}, 2000);
            
        } else if(this.innerHTML == "Stop") {
            timeout = 0;
            slots.forEach(function(slot) {
                slot.stop(timeout);
                timeout += 250;
            });
            this.innerHTML = "Start";
            $(this).removeClass("button--youtube");

            disableControl(); //disable control until the slots stop
            setTimeout(function() {
                enableControl();
            }, 1500);
        }
    });
});
