// ********************SET YOUR API KEY HERE*******************
// Insert your Edmunds API Key here. README for more info.
var apiKey = 'PLACE-YOUR-API-KEY-HERE';
// ************************************************************

checkKeyValidity();

// Checks if valid API Key
function checkKeyValidity() {
    var url = 'https://api.edmunds.com/api/vehicle/v2/makes/count?state=used&year=2005&view=basic&fmt=json&api_key=' + apiKey;
    keyTest = $.get(url);
    keyTest.error(function() {
        if (keyTest.status == 403) {
            invalidKeyAlert();
        }
    });
}

// Alerts user if invalid API key
function invalidKeyAlert() {
    alert('Invalid API key. See README and edit js/api.js file.');
}

//Makes first letter of every word upper case
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Make search API call to Edmunds
// Docs: http://edmunds.mashery.com/io-docs
function searchMake() {    
    make = $('#make').val();
    make = make.toLowerCase();
    if (!make) {
        alert('Please provide a make.');
        return false;
    }

    model = $('#model').val();
    model = model.toLowerCase();
    if (!model) {
        alert('Please provide a model.');
        return false;
    }

    year = $('#year').val();
    if (year.length != 4) {
        alert('Please provide a year.');
        return false;
    }
    
    var url = 'https://api.edmunds.com/api/vehiclereviews/v2/' + make + '/' + model + '/' + year + '?fmt=json&api_key=' + apiKey;
    
    // Docs: http://api.jquery.com/jquery.get/
    apiCall = $.get(url);
    
    // Runs reviewsCallback if get call is successful.
    apiCall.success(function(data) {
        console.log('success: ' + apiCall.status);
        if (apiCall.readyState == 4) {
            if (apiCall.status == 200)
                reviewsCallback(data);
            else
                alert('Error: ' + apiCall.status);
        }
    });
    
    // If the get call throws an error, alerts the user. 
    apiCall.error(function() {
        if (apiCall.status == 400)
                alert('Bad request');
        else if (apiCall.status == 403)
            invalidKeyAlert();
        else if (apiCall.status == 404)
            alert('404: Vehicle not found.');
        else if (apiCall.status == 408) 
            alert('The server is not responding');
        else
            alert('Error: ' + apiCall.status);
    });
}

// The callback function that's executed after the API call is made above.
// Displays results on #review subpage.
function reviewsCallback(payload) {
    activate_subpage("#review");
    
    var boxes = ["#reviewbox", "#makebox", "#modelbox", "#yearbox", "#recentbox"];
    $("#makebox").text("Make: " + toTitleCase(make));
    $("#modelbox").text("Model: " + toTitleCase(model));
    $("#yearbox").text("Year: " + toTitleCase(year));
    $("#reviewbox").text("Average Rating: " + payload.averageRating); 
    $("#recentbox").text("Edmunds Reviews");
    $("#recentbox").css({"text-decoration": "underline", "color": "blue"});
    $("#recentbox").click(function() {
       window.open("http://www.edmunds.com/" + make + "/" + model + "/" + year + "/#crr-pod-anchor");
    });
    for (var box in boxes) {
        $(boxes[box]).css("font-size", "18px");
    }
}