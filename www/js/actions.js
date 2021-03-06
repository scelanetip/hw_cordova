
var canvasID, initWidth, initHeight = 0;

//Manage click on different TVS
$(document).on("click touch touchmove", ".canvas-div", function (event) {
    //event.preventDefault();
    //canvasID = $(this).attr('id');
    var matches = ($(this).attr('id')).match(/(\d+)/);
    canvasID = matches[0];
    $(".canvas-div").each(function() {
        $(this).css('border', '0.5vw solid transparent');
    });
    $("#div"+ canvasID).css('border', '0.5vw dashed #03a9f4');

    if ($(this).hasClass("grid")){
        $(".grid-menu").show();
    }else{
        $(".grid-menu").hide();
    }
});

//Manage click on different GRIDS
$(document).on("click touch", ".number", function (event) {

    $(".number").each(function() {
        $(this).css('background-color', 'transparent');
        $(this).attr("selected",false);

    });
        $(this).css('background-color', 'rgb(3, 169, 244)');
        $(this).attr("selected",true);
        deleteGrids();
        changeGrid();

});


//function to take an image and display on screen
function onSuccess(imageURI) {
    var image = document.getElementById('myImg');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
$(function () {
$("#camera").on('click touch', function (e) {
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });
    $("#init").hide();
    $("#home").show();

    });

});

//function to upload an image and display on screen

$(function () {
$("#files").on('click touch', function (e) {

    $(":file[name=initFile]").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {

                $('#myImg').attr('src', e.target.result);
            };
            reader.readAsDataURL(this.files[0]);
            $("#init").hide();
            $("#home").show();
        }
    });
});
});

//function click shutter
$(function () {
$("#shut").on('click touch', function (e) {

    navigator.screenshot.save(function(error,res){

          if(error){
            console.error(error);
          }else{
            console.log('ok',res.filePath);
            console.log(navigator.screenshot.save)
          }
        });

        $('#menu-icon').show();
        $('#default').show();
        $('#grid').show();
        $('#action-menu').show();

        $('#shut').hide();

});
});

//function to handle SAVE IMAGE button
function saveImage() {
        //https://github.com/gitawego/cordova-screenshot

        $(".canvas-div").each(function() {
            $(this).css('border', '0.5vw solid transparent');
        });

        $(".screen").each(function() {
            $(this).css('border', '1vw solid transparent');
//        $(this).attr("selected",false);

        });


        $('#menu-icon').hide();
        $('#default').hide();
        $('#grid').hide();
        $('.grid-menu').hide();
        $('#action-menu').hide();
        $("#media-menu").hide();

        $('#shut').show();


}


//function to select a screen and make it appear over the image
$(function () {
$('.screen').on('click touch', function (e) {


    divID =$('.canvas-div').length;

    //REVISAR!!!!!!
    canvasID=divID;

    var elementID = 'canvas-div' + divID; // Unique ID
    var delementID = 'div' + divID;
    var celementID = 'canvas' + divID;


    $('<div>').attr({
        id: delementID,
        class: 'canvas-div'
    }).css({
        height: '10vw',
        width: '15%',
        position: 'absolute',
        zIndex: 80,
        left: '26%' ,
        top: '22%',
        border: '0.5vw solid transparent'
    }).appendTo('#workspace').draggable();

    $('<div>').attr({
        id: elementID,
        class: 'canvas-border'
    }).css({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        position: 'absolute',
        height: '100%',
        width: '100%',
        border: '0.5vw solid rgb(61, 64, 68)',
        boxSizing: 'border-box',
        background: 'slategrey'
    }).appendTo('#'+delementID);

    var container = $('#div' + divID);
    $('<div>').attr({
        class: "pt tl"
    }).appendTo(container);
    $('<div>').attr({
        class: "pt tr"
    }).appendTo(container);
    $('<div>').attr({
        class: "pt bl"
    }).appendTo(container);
    $('<div>').attr({
        class: "pt br"
    }).appendTo(container);

    if ($(this).attr("id") == "grid"){

        $(".grid-menu").show();
        $('#'+delementID).addClass("grid");

        changeGrid();

    }else{
    $(".grid-menu").hide();}

    unperspective();

    //RESIZE FUNCTION con gesture touch

    initWidth = container.width();
    initHeight = container.height();

    var el = document.getElementById(delementID);
    var ham = new Hammer( el, {
    domEvents: true
    } );
    var width = initWidth;
    var height = initHeight;
    var left = 0;
    var top = 0;

    ham.get('pinch').set({ enable: true });

    ham.on( "pinch", function( e ) {
    if ( width * e.scale >= 100 ) {
      var img = el;

      img.style.width = (width * e.scale) + 'px';
      img.style.marginLeft = (-left * e.scale) + 'px';
      img.style.height = (height * e.scale) + 'px';
      img.style.marginTop = (-top * e.scale) + 'px';
     }
    } );

    ham.on( "pinchend", function( e ) {
    width = width * e.scale;
    height = height * e.scale;
    left = left * e.scale;
    top = top * e.scale;
    } );




    $(".screen").each(function() {
        $(this).css('border', '1vw solid transparent');
        $(this).attr("selected",false);

    });
    $(this).css('border', '1vw solid #03a9f4');
    $(this).attr("selected",true);
    });
});


$(function () {


$('#menu-icon').on('click touch', function (e) {

    if($(this).hasClass('unselected')){
        $("#action-menu").show();
        $(this).css('color', '#fff');
        $(this).css('background-color', '#03a9f4');
        $(this).removeClass('unselected').addClass('selected');
    }else{
        $("#action-menu").hide();
        $(".canvas-div").each(function() {
            $(this).css('border', '0.5vw solid transparent');
        });

        $(".screen").each(function() {
            $(this).css('border', '1vw solid transparent');
//        $(this).attr("selected",false);

        });
        $(this).css('color', '#03a9f4');
        $(this).css('background-color', '#fff');
        $(this).removeClass('selected').addClass('unselected');
        $(".grid-menu").hide();
        unperspective();
        $("#media-menu").hide();
    }

    });
});

//onClick control in action menu

$(function () {
$('.menu').on('click touch', function (e) {
    action = $(this).attr('id');
    activateMenu(action);
    });
});

//Manage action menu

function activateMenu(action) {

//    $("#action-menu").show();
    $(".menu").each(function() {
        $(this).css('background-color', '#fff');
        $(this).css('color', '#03a9f4')
        $(this).attr("selected",false);
    });
    $("#" + action).attr("selected",true);
    $("#" + action).css('background-color', '#03a9f4');
    $("#" + action).css('color', '#fff');


    switch(action){
        case 'delete':
            $("#media-menu").hide();
            unperspective();
            $("#div"+ canvasID).remove();
            $("#canvas-div"+ canvasID).remove();
            break;
        case 'share':
            saveImage();
            break;
        case 'perspective':
            $("#media-menu").hide();
            perspective();
            break;
        case 'content':
            unperspective();
            addContent();
            break;
        default:
            unperspective();
            $("#media-menu").hide();
            break;
        }

}



//function to manage media menu
$(function () {
    $(".dropbtn").on('click touch', function (e) {
     if ($(this).is("button")){
     if ($(this).nextUntil("button").is(":hidden")){
            $(this).nextUntil("button").show();
        }else{
            $(this).nextUntil("button").hide();
        }
        }
    });
});



//CHANGE GRID FUNCTION

function changeGrid(){

    n_grid = [9, '33.33%', '33.33%'];

    $(".number").each(function() {
        var attr = $(this).attr('selected');
        if (attr){
            sel_grid = parseInt($(this).attr("id"));
            switch(sel_grid) {
                case 2: n_grid = [2, '50%', '100%'];break;
                case 3: n_grid= [3, '33.33%', '100%'];break;
                case 4: n_grid = [4, '50%', '50%'];break;
                case 6: n_grid = [6, '33.33%', '50%'];break;
                case 8: n_grid = [8, '25%', '50%'];break;
                case 9: n_grid = [9, '33.33%', '33.33%'];break;
                default: n_grid = [9, '33.33%', '33.33%'];break;
                }
            }

    });

    for (i=0; i<n_grid[0]; i++) {
        $('<div>').attr({
            id: 'grid'+i+canvasID,
            class: 'canvas-grid'
        }).css({

            position: 'relative',
            width: n_grid[1],
            boxSizing: 'border-box',
            height: n_grid[2],
            margin: 'none',
            border: '0.25vw solid rgb(61, 64, 68)',
            zIndex: 3,
            background: 'transparent'

        }).appendTo('#'+'canvas-div' + canvasID);
    }
}

function deleteGrids(){
    $('#'+'canvas-div' + canvasID).find('.canvas-grid').remove();
    }

//PERSPECTIVE FUNCTIONS
function unperspective(){
var pts = $(".pt");
pts.hide();
}

function perspective(){
    var elementID = "#canvas-div" + canvasID;
    var x = $(elementID).position();
    //var container = $("#workspace");
    var container = $('#div' + canvasID);
    var img = $(elementID);
    //var img = $("#image-section");

    var pts = $('#div' + canvasID).find(".pt");

    var IMG_WIDTH = $(elementID).width();
    var IMG_HEIGHT = $(elementID).height();

    pts.show();

    var transform = new PerspectiveTransform(img[0], IMG_WIDTH, IMG_HEIGHT, true);
    var tl = pts.filter(".tl").css({
        left : transform.topLeft.x,
        top : transform.topLeft.y
    });
    var tr = pts.filter(".tr").css({
        left : transform.topRight.x,
        top : transform.topRight.y
    });
    var bl = pts.filter(".bl").css({
        left : transform.bottomLeft.x,
        top : transform.bottomLeft.y
    });
    var br = pts.filter(".br").css({
        left : transform.bottomRight.x,
        top : transform.bottomRight.y
    });
    var target;
    var targetPoint;

    function onMouseMove(e) {

        targetPoint.x = e.pageX - container.offset().left ;
        targetPoint.y = e.pageY - container.offset().top ;
        target.css({
            left : targetPoint.x,
            top : targetPoint.y
        });

        // check the polygon error, if it's 0, which mean there is no error
        if(transform.checkError()==0){
            transform.update();
            img.show();
        }else{
            img.hide();
        }
    }
    $("#div"+ canvasID).css('border', '0.5vw solid transparent');

    pts.draggable();
    pts.mousedown(function(e) {
        target = $(this);
        targetPoint = target.hasClass("tl") ? transform.topLeft : target.hasClass("tr") ? transform.topRight : target.hasClass("bl") ? transform.bottomLeft : transform.bottomRight;
        onMouseMove.apply(this, Array.prototype.slice.call(arguments));
        $(window).mousemove(onMouseMove);
        $(window).mouseup(function() {
            $(window).unbind('mousemove', onMouseMove);
        })
    });

//    pts.on('touchstart', function (e) {
//        //e.preventDefault();
//        pts.draggable({disabled: false});
//        target = $(this);
//        targetPoint = target.hasClass("tl") ? transform.topLeft : target.hasClass("tr") ? transform.topRight : target.hasClass("bl") ? transform.bottomLeft : transform.bottomRight;
//        onMouseMove.apply(this, Array.prototype.slice.call(arguments));
//        //$(window).mousemove(onMouseMove);
//        $(window).on('touchmove', onMouseMove);

        //$(window).mouseup(function() {
//        $(window).on('touchend', function (ev) {
//            console.log(ev);
//            //$(window).unbind('mousemove', onMouseMove);
//            $(window).unbind('touchmove', onMouseMove);
//            pts.draggable({disabled: true});
//        });
//        pts.draggable({disabled: false});
//        pts.on('mousedown', function (e) {
//        e.preventDefault();
//        $("#div"+ canvasID).css('border', '1.5vw solid transparent');
//        target = $(this);
//        targetPoint = target.hasClass("tl") ? transform.topLeft : target.hasClass("tr") ? transform.topRight : target.hasClass("bl") ? transform.bottomLeft : transform.bottomRight;
//        onMouseMove.apply(this, Array.prototype.slice.call(arguments));
//        //$(window).mousemove(onMouseMove);
//        $(window).on('mousemove', onMouseMove);
//
//        //$(window).mouseup(function() {
//        $(window).on('mouseup', function (ev) {
//            $("#div"+ canvasID).css('border', '1.5vw solid transparent');
//            $(window).unbind('mousemove', onMouseMove(ev));
//            //$(window).unbind('touchmove', onMouseMove(ev));
//            //pts.draggable({disabled: true});
//        });


}


//ADD CONTENT FUNCTION
function addContent(){

    $("#media-menu").show();
    $("#canvas-div"+ canvasID).css('background', 'url(http://blog.angeloff.name/compass-canvas/assets/images/example-2.png)');

    $('li').click(function(e){
        var celementID = 'canvas-div' + canvasID;
        if ($(this).children().is("video")){
            filename = $(this).children().children().attr('src');
        } else{
            filename = $(this).children().attr('src');
        }

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(filename)[1];

        if (ext=="png" || ext=="jpeg" || ext=="jpg") {
            $('#video'+canvasID).remove();
            $('#img'+canvasID).remove();

            $('<img>').attr({
                id: "img"+canvasID,
                src: filename
            }).css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: '0',
                boxSizing: 'border-box',
                zIndex: 2
            }).appendTo('#canvas-div' + canvasID);
        }else{
            $('#video'+canvasID).remove();
            $('#img'+canvasID).remove();
            $('<video>').attr({
                id: "video"+canvasID
            }).css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: '0',
                boxSizing: 'border-box',
                border: '0.5vw solid transparent',
                zIndex: 2
            }).appendTo('#canvas-div' + canvasID);


            $('<source>').attr({
                src: filename,
                type: "video/mp4"
            }).appendTo('#video'+canvasID);


            $('#video'+canvasID)[0].autoplay = true;
            //$('#video'+canvasID)[0].controls = true;
            $('#video'+canvasID).attr("playsinline", true);
            $('#video'+canvasID)[0].loop = true;

            $("#canvas-div"+ canvasID).css('background', 'black');

        }

    });

}

