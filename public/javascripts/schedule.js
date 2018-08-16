function myFunction(x) {
    $('.sidebar').sidebar({
        dimPage: false,
        transition: 'push',
        exclusive: false,
        closable: false
        });
    $('.pusher').addClass('noanim');
    if (x.matches) {
        mediaQueryFlag800 = true;
        $('.calendar-menu>.ui.pagination.menu').css('cssText', 'margin-top: ');
        $('#side_menu').removeClass('push');
        $('.sidebar').sidebar('hide');
        $('.button-menu').css({display: 'inline'});
        var timer = setInterval(function() {
            $('.button-menu').css({
                transition: 'opacity .2s',
                opacity: '1',
                'pointer-events': 'all'
            });
            clearInterval(timer); 
        }, 100);

        $(function(){ 
            $('.pusher').swipe({ 
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if( direction == "left" ) { 
                        $('.sidebar').sidebar('hide');
                        threshold:256;
                    }else if( direction == "right" ) { 
                        $('.pusher').removeClass('noanim');
                        $('#side_menu').removeClass('noanim');
                        $('.sidebar').sidebar({
                            dimPage: false,
                            transition: 'overlay',
                            exclusive: false,
                            closable: true
                            })
                        .sidebar('show');
                        threshold:256;
                    } 
                }, 
            }); 
        });
    } else {
        mediaQueryFlag800 = false;
        if(activeItem == 1) {
            $('.calendar-menu>.ui.pagination.menu').css('cssText', 'margin-top: 24px !important');
        }
        $('#side_menu').addClass('noanim');
        $('#side_menu').removeClass('overlay');
        $('.sidebar').sidebar('show');
        $('.button-menu').css({
            display: 'none',
            opacity: '0',
            'pointer-events': 'none'
        });

        // $(function(){ 
        //     $('#side_menu').swipe({ 
        //         swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        //             if( direction == "left" ) { 
        //                 // Overrided method
        //                 threshold:9999;
        //             }else if( direction == "right" ) { 
        //                 // Overrided method
        //                 threshold:9999;
        //             } 
        //         }, 
        //     }); 
        // });
    }
    sidebarFlag = false;
}

var sidebarFlag = false;

function onMenu() {
    if($('.sidebar').sidebar('is hidden')) {
        sidebarFlag = false;
    }
    else {
        sidebarFlag = true;
    }

    if(!sidebarFlag) {
        $('.pusher').removeClass('noanim');
        $('#side_menu').removeClass('noanim');
        $('.sidebar').sidebar({
            dimPage: false,
            transition: 'overlay',
            exclusive: false,
            closable: true
            })
        .sidebar('toggle');
        sidebarFlag = true;
    }
    else {
        $('.sidebar').sidebar('hide');
        sidebarFlag = false;
    }
}

var mediaQueryFlag800 = false;
var mediaQueryFlag512 = false;
var activeItem = 0;

function menuToggle(x){
    var y=document.getElementsByClassName("item active")[0];
    y.className="item";

    document.getElementById(x).className="item active";

    if(x == 'menu_schedule') {
        activeItem = 0;
        $('.calendar-this').removeClass('height-fill');
        $('.calendar-menu').css({'position': 'inherit'});
        $('.calendar-menu>.ui.pagination.menu').css('cssText', 'margin-top: ');
        $('#view_calendar').css({display: 'table'});
        $('#view_diary_preview').css({display: 'none', 'height': ''});
        $('#view_pictures').css({display: 'none','height': ''});

        $('.calendar-menu').css({height: '96px', opacity: 1, visibility: 'visible'});
        $('.search-diary').css({'margin-top': '90px'});
        $('article').css('cssText', 'margin-top: 192px; padding-top: 16px !important; height: calc(100% - 192px);');
        $('#searchbar_back').css({visibility: 'visible', opacity: 1});

        $('.height-fill').unbind('mousemove');
        $('article').unbind();
        $('#header_main_menu').unbind();
        $('#view_pictures').css({display: 'none'});
    }
    else if(x == 'menu_diary') {
        activeItem = 1;
        $('.calendar-this').addClass('height-fill');
        $('.calendar-menu').css({'position': 'fixed'});
        $('.calendar-menu>.ui.pagination.menu').css('cssText', !mediaQueryFlag800 ? 'margin-top: 24px !important' : mediaQueryFlag512 ? 'margin-top: 22px !important': '');
        $('#view_calendar').css({display: 'none'});
        $('#view_diary_preview').css({display: 'block', 'height': '72px'});
        $('#view_pictures').css({display: 'none'});

    }
    else if(x == 'menu_pictures') {
        activeItem = 2;
        $('#view_calendar').css({display: 'none'});
        $('#view_diary_preview').css({display: 'none'});
        $('#view_pictures').css({display: 'block'});

        $('.pre_image').height($('.pre_image').width());

        
    }
}

// $(document).ready(function(){
//     var uNickname = $('.nickname');
//     var changedName = '';
//     var uMessage = $('.user-message');
//     var changedMessage = '';

//     uNickname.blur(function(){
//         console.log('nickname blured');
//         changedName = $(this).val();
//         uNickname.val(changedName);
//     });
//     uMessage.blur(function(){
//         changedMessage = $(this).val(); // changedMessage를 서버에 보내서 상태메시지의 변경된 내용 저장
//         uMessage.val(changedMessage);
//     });

//     $('.profile-image').click(function() {
//         $('.profpic-modal').modal('show');
//     });

//     $('.user-profile').click(function() {
//         console.log('hi');
//         $('#info_card').attr({'style': 'display: block !important'});
//         $('.card-back').attr({'style': 'display: block !important'});
//     });

//     $('.card-back').click(function() {
//         $('#info_card').attr({'style': 'display: none !important'});
//         $('.card-back').attr({'style': 'display: none !important'});
//     });
// });

$(document).ready(function(){
    var uNickname = $('#nickname');
    var changedName = '';
    var uMessage = $('#user_message');
    var changedMessage = '';
    var editFlag=0;

    $('#edit_button').click(function(){
        if(editFlag==0){
            uNickname.attr('readonly', false);
            uMessage.attr('readonly', false);
            uNickname.attr('style', 'border: 1px solid rgba(34, 36, 38, 0.15) !important;');
            uMessage.attr('style', 'border: 1px solid rgba(34, 36, 38, 0.15) !important;');
            $('#edit_button').html('Save');
            $('#edit_button').attr('data-tooltip', '저장');

            editFlag=1;
        } else {
            changedName = uNickname.val();
            changedMessage = uMessage.val(); // changedMessage를 서버에 보내서 상태메시지의 변경된 내용 데이터베이스에 저장
            uMessage.val(changedMessage);
            uNickname.val(changedName);

            uNickname.attr('readonly', true);
            uMessage.attr('readonly', true);
            uNickname.attr('style', 'border: none');
            uMessage.attr('style', 'border: none');
            $('#edit_button').html('Edit');
            $('#edit_button').attr('data-tooltip', '정보 수정');

            editFlag=0;
        }
    });

    $('#profile_image').click(function(){
        $('.profpic-modal').modal('show');
    });

    $('.user-profile').click(function(){
        $('#info_card').attr({'style': 'display: block !important'});
    });

    $('.user-profile').click(function() {
        console.log('hi');
        $('#info_card').attr({'style': 'display: block !important'});
        $('.card-back').attr({'style': 'display: block !important'});
    });

    $('.card-back').click(function() {
        $('#info_card').attr({'style': 'display: none !important'});
        $('.card-back').attr({'style': 'display: none !important'});
    });

    $('.pre_image').height($('.pre_image').width());
    $(window).resize(()=>{
      $('.pre_image').height($('.pre_image').width());
    });

});

var x = window.matchMedia("only screen and (max-width: 800px)");
myFunction(x);
x.addListener(myFunction);

var delayAnim = '0s';
function actionOnSearch(arg) {
    if (arg == 1) {
        $('#searchbar').css({visibility: 'visible', opacity: 1, transform: 'translateX(0)', 'transition-delay': '0s'});
        $('#searchbar_back').css({visibility: 'hidden', opacity: 0, transform: 'translateX(-204px)', 'transition-delay': '0s'});
       
        var timer = setInterval(function() {
            $('#searchbar input').focus();
            clearInterval(timer); 
        }, 100);

        var timer2 = setInterval(function () {
            delayAnim = '1s';
            clearInterval(timer2);
        }, 338);
    }

    else if(arg == 0) {
        $('#searchbar').css({visibility: 'hidden', opacity: 0, transform: 'translateX(260px)', 'transition-delay': delayAnim});
        $('#searchbar_back').css({visibility: 'visible', opacity: 1, transform: 'translateX(0)', 'transition-delay': delayAnim});

        var tmp = $('#searchbar input').val();
        $('#searchbar_back input').attr('placeholder', tmp == ''?'검색':tmp);

        var timer2 = setInterval(function () {
            delayAnim = '0s';
            clearInterval(timer2);
        }, 338);
    }
}

function actionSyncOnSearch() {
    
}

var flagSpread = true;

$('article').scroll(function () {
    var height = $('article').scrollTop();
    console.log(height);
    if(height == 0) {
        $('article').removeClass('shadow');
    }
    else {
        $('article').addClass('shadow');
    }

    if(height < 84) {
        $('.calendar-menu').css({height: '96px', opacity: 1, visibility: 'visible'});
        $('.search-diary').css({'margin-top': '90px'});
        $('#searchbar_back').css({visibility: 'visible', opacity: 1});
        $('article').css('cssText', 'margin-top: 192px; padding-top: 16px !important; height: calc(100% - 192px);');
        $('.height-fill').off();
        flagSpread = true;
    }
    else {
        $('.calendar-menu').css({height: '0px', opacity: 0, visibility: 'hidden'});
        $('.search-diary').css({'margin-top': '-32px'});
        $('article').css('cssText', 'margin-top: 72px; padding-top: 136px !important; height: calc(100% - 72px);');
        $('#searchbar_back').css({visibility: css1, opacity: css2});

        flagSpread = false;

        var overThreshold = 72;

        $('article').mousemove(function (event) {
            actionOnSearch(0);

            if(!flagSpread)
                $('#searchbar_back').css({visibility: css1, opacity: css2});
        });

        $('#header_main_menu').click(function() {
            console.log('true');
            overThreshold = 290;
            $('.calendar-menu').css({height: '96px', opacity: 1, visibility: 'visible'});
            $('.search-diary').css({'margin-top': '90px'});
            $('article').css('cssText', 'margin-top: 192px; padding-top: 16px !important; height: calc(100% - 192px);');
            $('#searchbar_back').css({visibility: 'visible', opacity: 1});
        });

        if(activeItem == 1) {
            $('.height-fill').mousemove(function (event) {
                x = event.pageX;
                y = event.pageY;

                console.log(x +' ' + y);

                if(y < overThreshold) {
                    console.log('true');
                    overThreshold = 290;
                    $('.calendar-menu').css({height: '96px', opacity: 1, visibility: 'visible'});
                    $('.search-diary').css({'margin-top': '90px'});
                    $('article').css('cssText', 'margin-top: 192px; padding-top: 16px !important; height: calc(100% - 192px);');
                    $('#searchbar_back').css({visibility: 'visible', opacity: 1});
                }
                else {
                    if(y < overThreshold) {
                        $('.calendar-menu').css({height: '96px', opacity: 1, visibility: 'visible'});
                        $('.search-diary').css({'margin-top': '90px'});
                        $('article').css('cssText', 'margin-top: 192px; padding-top: 16px !important; height: calc(100% - 192px);');
                        $('#searchbar_back').css({visibility: 'visible', opacity: 1});
                    }
                    else {
                        $('.calendar-menu').css({height: '0px', opacity: 0, visibility: 'hidden'});
                        $('.search-diary').css({'margin-top': '-32px'});
                        $('article').css('cssText', 'margin-top: 72px; padding-top: 136px !important; height: calc(100% - 72px);');
                        overThreshold = 72;
                    }
                }
            });
        }
    }
});

var css1 = 'hidden';
var css2 = '0';

function myFunction1(x1) {
    if(x1.matches) {
        mediaQueryFlag512 = true;
        css1 = 'hidden';
        css2 = '0';
    }
    else {
        mediaQueryFlag512 = false;
        css1 = 'visible';
        css2 = '1';
    }
}

var x1 = window.matchMedia("only screen and (max-width: 512px)");
myFunction1(x1);
x1.addListener(myFunction1);
    
////////////////////////////////////////////////////////

$(document).ready(function(){
    $('#newsched_button').click(function(){
        $('#left_cont').hide();
        $('#left_cont2').css('cssText','display : block !important');
    });

    $("#start_date").flatpickr({
        mode: 'range',
        enableTime: false,
        dateFormat: "Y.m.d"
    });
    // $("#end_date").flatpickr({
    //     enableTime: false,
    //     dateFormat: "Y.m.d"
    // });
    $('#time1').flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K"
    });
    $('#time2').flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K"
    });

    $('#all_day').click(function(){
        if($('#all_day').is(':checked')){
            $('#time1').css('display', 'none');
            $('#time2').css('display', 'none');
        } else {
            $('#time1').css('display', 'block');
            $('#time2').css('display', 'block');
        }
    });
    
    // var startDate = flatpickr('#start_date');
    // var endDate = flatpickr('#end_date');
    // var startTime = flatpickr('#time1');
    // var endTime = flatpickr('#time2');

    // flatpickr("#start_date", {
    //     enableTime: false,
    //     dateFormat: "Y.m.d",
    //     onChange: function(dateObj, dateStr) {
    //         //console.log(dateObj);
    //         //console.log(dateStr);
    //         endDate = flatpickr("#end_date", { minDate: dateStr, dateFormat: "Y.m.d", });
    //         // endDate.set('minDate', dateStr);
    //     }
    // });
    // flatpickr("#end_date", {
    //     enableTime: false,
    //     dateFormat: "Y.m.d",
    //     onChange: function(dateObj, dateStr) {
    //         startDate = flatpickr("#start_date", { maxDate: dateStr, dateFormat: "Y.m.d", });
    //     }
    // });

    // flatpickr('#time1', {
    //     enableTime: true,
    //     noCalendar: true,
    //     dateFormat: "h:i K",
    //     onChange: function(timeObj, timeStr) {
    //         console.log(timeStr);

    //     }
    // });

    $('.ui.accordion').accordion({
        selector: {
            trigger: '.title .icon'
            }
        });

    $('.ui.selection.dropdown').dropdown();

    $('#repeat_dropdown').dropdown();
    $('#repeat_details').hide();
    $('#repeat_details2').hide();

    $('#p_repeat').change(function(){
        var pRepeat=$('#p_repeat').val();
        $('#repeating_period').html(pRepeat+'마다');

        console.log(pRepeat);

        if(pRepeat == 0){
            $('#repeat_details').hide();
            $('#repeat_details2').hide();
        } else {
            $('#repeat_details').show();
            $('#repeat_details2').show();

            if(pRepeat == 1) {
                $('#repeating_period').html('일마다');
            } else if (pRepeat == 2) {
                $('#repeating_period').html('주마다');
            } else if (pRepeat ==3 ) {
                $('#repeating_period').html('개월마다');
            } else {
                $('#repeating_period').html('년마다');
            }
        }
    });

    // 채원이거 여기부터~~!~!
    $(".close").click(function(){
        $('.ui.longer.modal').modal('hide');
    });

    $("#end_repeat").flatpickr({
        enableTime: false,
        dateFormat: "Y.m.d"
    });
    
    var BackgroundClass = Quill.import('attributors/class/background');
    var ColorClass = Quill.import('attributors/class/color');
    var SizeStyle = Quill.import('attributors/style/size');
    Quill.register(BackgroundClass, true);
    Quill.register(ColorClass, true);
    Quill.register(SizeStyle, true);
    var quill = new Quill('#editor-container', {
        modules: {
            toolbar:'#toolbar-container' ,
            imageResize: {
                displaySize: true
              },
            imageDrop: true
        },
        placeholder: '오늘의 일기를 작성해주세요',
        theme: 'snow'  // or 'bubble'
      });
      

    $('#취소').click(function(){
        $('#new_diary_hnc').attr({'style':'display: block !important'});
        $('#write_diary').attr({'style':'display: none !important'});
    });

    $('#new_diary_content').click(function(){
        $('#new_diary_hnc').attr({'style':'display: none !important'});
        $('#write_diary').attr({'style':'display: block !important'});
    });
    
});