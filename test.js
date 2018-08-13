test(function() {
    console.log("t is function");
});


function test(t) {
    if (typeof(t) === "function") {
        t();
    }
    console.log("Go in test funtion");
}

function doSomthing(param) {

}