var lm_workerPaused = false;

var LeapMotionDemo = {
    start: function () {
        setTimeout(function () { LeapMotionDemo.loadSlides(); }, 5000);
    },
    nextSlide: function () {
        angular.element($("#controller")).scope().nextSlide();
        angular.element($("#controller")).scope().$apply();
    },
    previousSlide: function () {
        angular.element($("#controller")).scope().previousSlide();
        angular.element($("#controller")).scope().$apply();
    },
    loadSlides: function () {
        var worker = new Worker('scripts/flickrWorker.js');

        worker.addEventListener('message', function (e) {
            if (e.data != null && e.data.length > 0) {
                angular.element($("#controller")).scope().addPictures(e.data);
                angular.element($("#controller")).scope().$apply();
            }
        }, false);

        var data = [$('#lastchecked').val(), $('#photoSetId').val(), $('#apiKey').val()];
        worker.postMessage(data);

        var date = new Date();
        var epochTime = date.getTime() / 1000;
        $('#lastchecked').val(epochTime);

        if (!lm_workerPaused)
            LeapMotionDemo.start();
    },
    removeSlides: function () {
        angular.element($("#controller")).scope().removeSlides();
        angular.element($("#controller")).scope().$apply();
    }
};

$('#apiKey').change(function () {
    LeapMotionDemo.loadSlides();
});

$('#photoSetId').change(function () {
    lm_workerPaused = true;
    $('#lastchecked').val(0);
    LeapMotionDemo.removeSlides();
    LeapMotionDemo.loadSlides();
    lm_workerPaused = false;
});

var paused = false;
var previousFrame;
var controllerOptions = { enableGestures: true };

Leap.loop(controllerOptions, function (frame) {
    if (paused) {
        return; // Skip this update
    }
    if (frame.gestures.length > 0) {
        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];
            switch (gesture.type) {
                case "swipe":
                    $(window).scrollTop(0);
                    if (frame.gestures[0].direction[0] > 0) { // direction: right
                        LeapMotionDemo.previousSlide();
                    }
                    else { // direction: left
                        LeapMotionDemo.nextSlide();
                    }
                    paused = true;
                    break;
                default:
                    ;
            }
        }
        if (paused)
            setTimeout(function () { paused = false; }, 2000);
    }
    else if (frame.hands.length == 1)
    {
        if (previousFrame) {
            var translation = frame.translation(previousFrame);
            var translationY = translation[1];

            var hand = frame.hands[0];
            var palmPositionY = hand.palmPosition[1].toFixed(1);
            if (palmPositionY > 200)
                return;

            var palmVelocityY = hand.palmVelocity[1].toFixed(1);
            if (palmVelocityY > 5 || palmVelocityY < 4)
                window.scrollBy(0, -hand.palmVelocity[1].toFixed(1) / 4);
        }
        previousFrame = frame;
    }
});

