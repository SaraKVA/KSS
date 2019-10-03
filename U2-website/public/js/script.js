


// Global variables to store current values.
var orientation_buf;
var curr_lux = 0; //save lux if it doesnt get changed

//make constructor to easily initiallize all arrays
function OrientationValues() {return {
	alpha : [],
	beta : [],
	gamma : [],
	alphaG: [],
	betaG: [],
	gammaG: [],
	lux : [],
}
};

orientation_buf=new OrientationValues(); // start empty

var data_count = 0;
// How many data points are uploaded per second?
var UPLOAD_RATE = 20;

// Stop/Start uploading depending on switch.
var interval;// Global var for setInterval setting/clearing.

var write=function () 
{
	document.getElementById("debug").innerHTML = "DataBase not Connected!!"
}

var writePoint=function(){noWrite()} //do not pass object reference otherwise noWrite might get overwritten ?!?


function onChange(){
    //document.getElementById("subject").value = Math.floor((1 + Math.random()) * 0x10000).toString(16); //pick a random id

    console.log("checkbox checked ...");
    var checkbox = document.getElementById('record');
    console.log(checkbox.checked);
    if(checkbox.checked){
        label = document.getElementById("label").value;
        console.log(label);
        subject = document.getElementById("subject").value;
        console.log(subject);
        writePoint=function(){write()}
        if (label) {
			document.getElementById("debug").innerHTML = "Recording... (" + data_count + ")";
			window.clearInterval(interval);
			// Write DeviceOrientation to buffer
			if (window.window.DeviceMotionEvent) {
                document.getElementById("debug").innerHTML = "device supports motion ..."
                console.log("device supports motion ...");
				window.addEventListener('devicemotion', function(orientation) {
					// Read and store all acceleration and rotation values.
					if(!isNaN(parseFloat(orientation.accelerationIncludingGravity.x))){ orientation_buf.alphaG.push(orientation.accelerationIncludingGravity.x);}
					if(!isNaN(parseFloat(orientation.accelerationIncludingGravity.y))){ orientation_buf.betaG.push(orientation.accelerationIncludingGravity.y);}
					if(!isNaN(parseFloat(orientation.accelerationIncludingGravity.z))){ orientation_buf.gammaG.push(orientation.accelerationIncludingGravity.z);}
					if(!isNaN(parseFloat(orientation.acceleration.x))){ orientation_buf.alpha.push(orientation.acceleration.x);}
					if(!isNaN(parseFloat(orientation.acceleration.y))){ orientation_buf.beta.push(orientation.acceleration.y);}
					if(!isNaN(parseFloat(orientation.acceleration.z))){ orientation_buf.gamma.push(orientation.acceleration.z);}

				}, false);
				window.addEventListener('devicelight', function(event) {
					if(!isNaN(parseFloat(event.value))){ orientation_buf.lux.push(event.value); curr_lux = (event.value*1000);}
				}, false);
				//interval = window.setInterval(writePoint, 1000 / UPLOAD_RATE);
				interval = window.setInterval(sendData, 1000 / UPLOAD_RATE);
            } else {
			    document.getElementById("debug").innerHTML = "DeviceOrientation not supported."
			}

		} else {
			this.checked = false;
			document.getElementById("debug").innerHTML = "Choose label first.";
		}
        
    }else{
        window.clearInterval(interval);
        writePoint();
        document.getElementById("debug").innerHTML = "Not recording."
    }
}

function sendData(){
    console.log("sendData func reached ...");
    influent
        .createHttpClient({
            server: [
                {
                    protocol: "http", //https aber influxdb noch net eingerichtet(siehe ilias)
                    host:     location.hostname,
                    port:     8086
                }
            ],

            username: "",
            password: "",
            
            database: "training" //document.getElementById("label").value
        })		
        .then(function(client) {
            console.log("created http client ...");
            //document.getElementById("debug").innerHTML = "created http client ...";

			//set the write function to empty our buffer (called periodically, see above)
			// write=function()
			// {
                console.log( "created http client ... and inside write func");
                // document.getElementById("debug").innerHTML = "created http client ... and inside write func";
				if(orientation_buf.alphaG.length>0)
				{
					data_count++;

					var v=orientation_buf; //copy old buffer to var to avoid async effects on write
					orientation_buf=new OrientationValues(); // reset buffer 

					function milli_mean_int(values) {
						var sum = values.reduce(function(a, b) { return a + b; });
						return Math.floor(sum * 1000 / values.length);
					}

					function mean_lux(values){
						if(values.length < 1){
							return curr_lux;
						}else{
						var sum = values.reduce(function(a, b) { return a + b; });
						return Math.floor(sum *1000 / values.length);
						}
					}
					client.write({
						key: "empty", //acceleration, orientation, test_lux, test_G_nlux, test_G, test_lux_accG, sit_stand_walk, acc_with_lux in from am anfang
						tags: {
							label: document.getElementById("label").value,
							subject: document.getElementById("subject").value
						},
						fields: {
							count: data_count, // debug var to identify missing values...
							alpha: milli_mean_int(v.alpha), //use mean * 1000 (int for efficiency) (bei schicken jeder 1ms => rauschen(min, max windowing später))
							beta: milli_mean_int(v.beta),
							gamma: milli_mean_int(v.gamma),
							alphaG: milli_mean_int(v.alphaG),
							betaG: milli_mean_int(v.betaG),
							gammaG: milli_mean_int(v.gammaG), 
							lux: mean_lux(v.lux)
						},
						timestamp: (Date.now() * 1000000)
					})
						.then(function() {
							document.getElementById("debug").innerHTML = "Recording "+ document.getElementById("label").value + " ... (" + data_count + ")";
						});
				}
			//}
		})
}

function onChangeClf(){
	document.getElementById("debug").innerHTML = "DataBase not Connected!!"
}