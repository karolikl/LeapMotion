var carouselFunction = function CarouselDemoCtrl($scope) {
    $scope.myInterval = -1;
    var slides = $scope.slides = [];

    $scope.previousSlide = function () {
        $scope.$broadcast('previousSlide');
    };
    $scope.nextSlide = function () {
        $scope.$broadcast('nextSlide');
    };
    $scope.addPictures = function (pictures) {
        for (var i = 0; i <= pictures.length - 1; i++) {
            slides.push({ image: pictures[i] });
        }
    };
    $scope.removeSlides = function() {
        var length = slides.length;
        for (var i = length - 1; i >= 0; i--) {
            slides.pop();
        }
    };
    $scope.selectSlide = function(slide) {
        var index = slides.indexOf(slide);
        if (index >= 0)
        {
            $scope.$broadcast('selectSlide', index);
        }
    };
};

angular.module('BasicSlider', ['ui.bootstrap']).controller('CarouselDemoCtrl', carouselFunction);



