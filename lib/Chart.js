var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {Chart}
 */
var Chart = AbstractComponent.extend({
    toString: 'Chart',

    construct: function () {
        this.values = [];
        this.updateChart = function () { /* noop */ };
    },

    in_input: function (val) {
        this.values.push(parseFloat(val));
        this.updateChart();
    },

    /**
     * this method is called by the Browser Runtime in order to retrieve
     * this component AngularJS UI controller
     */
    uiController: function () {
        return ['$scope', '$timeout', 'instance', function ($scope, $timeout, instance) {
            $scope.values = [ instance.values ];
            $scope.labels = instance.values;


            instance.updateChart = function () {
                $timeout(function () {
                    $scope.values = [ instance.values ];
                });
            };

            $scope.clearValues = function () {
                instance.values.length = 0;
                $scope.labels.length = 0;
            };
        }];
    }
});

module.exports = Chart;
