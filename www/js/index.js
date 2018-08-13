/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var $scope;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);

        $scope = angular.element($('body')).scope();

        // Test area
        $scope.$apply(function() {
            $scope.pairedDevices = [{ name: "doctor", address: "12:34:56:87:90" },
                { name: "EV3", address: "12:34:56:87:90" }
            ];
        });

        $scope.$apply(function() {
            $scope.unpairedDevices = [{ name: "HC-05", address: "12:34:56:87:90" }];
        });

        // Check bluetooth is now enabled or nots
        app.bluetoothEnabled(function() {
            alert("Bluetooth is enabled");
        }, function() {
            alert("Bluetooth is disabled");
        });

        // List paired and unpaired device automatic when app launch
        app.bluetoothList(function(devices) {
            $scope.$apply(function() {
                $scope.pairedDevices = devices;
            });
        });

        app.bluetoothDiscoverUnpaired(function(devices) {
            $scope.$apply(function() {
                $scope.unpairedDevices = devices;
            });
        });

        // Select device for connection
        $("body").on("click", ".bluetooth-device-list .device-list li", function() {
            var address = $(this).find(".device-hint").attr("data-address");

            app.bluetoothConnect(address, function() {
                $(".mode-container").fadeIn(500);
            }, function() {
                alert("Connect faiure");
            });
        });

        $("body").on("click", ".unpaired-device-list .device-list li", function() {
            var address = $(this).find(".device-address").attr("data-address");

            app.bluetoothConnect(address, function() {
                $(".mode-container").fadeIn(500);
            }, function() {
                alert("Connect failure");
            });
        });

        // Select mode
        $(".mode-container").find("li").click(function() {
            var mode = $(this).attr("data-mode");
            $(".mode-container").fadeOut(500, function() {
                screen.orientation.lock('landscape');
                $("." + mode + "-container").fadeIn(500);
            });
        });

        // Leave mode selection
        $(".mode-container").click(function() {
            $(".mode-container").fadeOut(500);
        });

        // Controller mode
        var controllerUp = document.getElementById("controller-up");
        var controllerLeft = document.getElementById("controller-left");
        var controllerRight = document.getElementById("controller-right");
        var controllerDown = document.getElementById("controller-down");
        var controller2 = document.getElementById("controller2");
        var controller3 = document.getElementById("controller3");

        controllerUp.addEventListener("touchstart", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("forward");
            app.bluetoothWrite("f");
        });

        controllerUp.addEventListener("touchend", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("stop");
            app.bluetoothWrite("s");
        });

        controllerLeft.addEventListener("touchstart", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("left");
            app.bluetoothWrite("l");
        });

        controllerLeft.addEventListener("touchend", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("stop");
            app.bluetoothWrite("s");
        });

        controllerRight.addEventListener("touchstart", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("right");
            app.bluetoothWrite("r");
        });

        controllerRight.addEventListener("touchend", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("stop");
            app.bluetoothWrite("s");
        });

        controllerDown.addEventListener("touchstart", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("backward");
            app.bluetoothWrite("b");
        });

        controllerDown.addEventListener("touchend", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("stop");
            app.bluetoothWrite("s");
        });

        controller2.addEventListener("touchstart", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("lightup");
            app.bluetoothWrite("u");
        });

        controller3.addEventListener("touchstart", function(evt) {
            evt.preventDefault();
            // app.bluetoothWrite("lightdown");
            app.bluetoothWrite("o");
        });
    },
    bluetoothEnabled: function(enabled, disabled) {
        bluetoothSerial.isEnabled(function() {
            if (typeof(enabled) === "function") {
                enabled();
            }
        }, function() {
            if (typeof(disabled) === "function") {
                disabled();
            }
        });
    },
    bluetoothList: function(success, failure) {
        bluetoothSerial.list(function(devices) {
            if (typeof(success) === "function") {
                success(devices);
            }
        }, function() {
            if (typeof(failure) === "function") {
                failure();
            }
        });
    },
    bluetoothDiscoverUnpaired: function(success, failure) {
        bluetoothSerial.discoverUnpaired(function(devices) {
            if (typeof(success) === "function") {
                success(devices);
            }
        }, function() {
            if (typeof(failure) === "function") {
                failure();
            }
        });
    },
    bluetoothConnect: function(address, success, failure) {
        var successProccess = typeof(success) === "function" ? success : function() {};
        var failureProccess = typeof(failure) === "function" ? failure : function() {};

        bluetoothSerial.connect(address, successProccess, failureProccess);
    },
    bluetoothWrite: function(data, success, failure) {
        var successProccess = typeof(success) === "function" ? success : function() {};
        var failureProccess = typeof(failure) === "function" ? failure : function() {};

        bluetoothSerial.write(data, successProccess, failureProccess);
    }
};
