$(function () {
    $("#play").click(function () {
        var cnt, delay = 0, cntClicks = 1;
        $("#startContainer").animate({ 'margin-left': '900px', opacity: 0 }, 1000, function () {
            $(this).css("display", "none");
            $('body').css({
                'background-image': 'url(images/bg.jpg)', 'background-size': 'cover',
                'background-repeat': 'no-repeat'
            });
            $("#playArea").css('display', 'block').animate({ opacity: 1 }, 400, function () {
                for (var i = 1; i <= cnt; i++) {
                    $(`#box${i} span`).delay(delay).animate({ opacity: 1 }, 1000, function () {
                        $(this).animate({ opacity: 0 }, 1000);
                    });
                    delay += 2000;
                }
                for (var i = 1; i <= cnt; i++) {
                    $(`#box${i}`).one('click', function () {
                        $(this).children('span').css('display', 'none');
                        if (cntClicks == $(this).children('span').text()) {
                            $(this).append(`<img src=images/tick.png>`);
                            if ($(this).children('span').text() == cnt) {
                                $('#result').html(`<div style='color:green;'>Congratulations</div><p>You passed level ${cnt}</p><p>Press F5 to restart</p>`)
                                    .css('display', 'block')
                                    .animate({ opacity: 1 }, 1000);
                            }
                        } else {
                            $(this).append("<img src=images/cross.png id='cross'>");
                            $('#result').html(`<div style='color:red;'>Failed</div><p>You failed in level ${cnt}</p><p>Press F5 to restart</p>`)
                                .css('display', 'block')
                                .animate({ opacity: 1 }, 1000);
                        }
                        cntClicks++;
                    });
                }
                $('#result').css('display', 'block');
            });
        });
        cnt = $("#diff").children("option:selected").val();
        cnt = parseFloat(cnt);
        var randTop, randLeft;
        var pos = [];
        var overlapLeft = false, overlapTop = false;
        for (var i = 0; i < cnt; i++) {
            randTop = Math.floor(Math.random() * 600);
            randLeft = Math.floor(Math.random() * 700) + 330;
            pos.forEach(function (i) {
                if (!(randTop + 25 < i.top || randTop - 25 > i.top)) {
                    overlapTop = true;
                }
                if (!(randLeft + 50 < i.left || randLeft - 50 > i.left)) {
                    overlapLeft = true;
                }
            });
            while (overlapTop) {
                randTop = Math.floor(Math.random() * 600);
                overlapTop = false;
                pos.forEach(function (i) {
                    if (!(randTop + 25 < i.top || randTop - 25 > i.top)) {
                        overlapTop = true;
                    }
                });
            }
            while (overlapLeft) {
                randLeft = Math.floor(Math.random() * 700 + 330);
                overlapLeft = false;
                pos.forEach(function (i) {
                    if (!(randLeft + 50 < i.left || randLeft - 50 > i.left)) {
                        overlapLeft = true;
                    }
                });
            }
            pos.push({ top: randTop, left: randLeft });
            $("#playArea").append(`<div class='box' id='box${(i + 1)}'><span>${(i + 1)}</span></div>`).children(`#box${(i + 1)}`)
                .css({ left: `${randLeft}px`, top: `${randTop}px` });
        }
    });
});