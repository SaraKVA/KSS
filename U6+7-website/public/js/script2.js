


var DecisionTreeClassifier = function() {

    var findMax = function(nums) {
        var index = 0;
        for (var i = 0; i < nums.length; i++) {
            index = nums[i] > nums[index] ? i : index;
        }
        return index;
    };

    this.predict = function(features) {
        var classes = new Array(3);
            
        if (features[26] <= 9027.75) {
            if (features[23] <= 776.8319091796875) {
                if (features[28] <= 2000.0) {
                    classes[0] = 335; 
                    classes[1] = 0; 
                    classes[2] = 0; 
                } else {
                    if (features[30] <= 10000.0) {
                        classes[0] = 0; 
                        classes[1] = 0; 
                        classes[2] = 9; 
                    } else {
                        if (features[17] <= 7.0) {
                            if (features[21] <= -225.5) {
                                classes[0] = 1; 
                                classes[1] = 0; 
                                classes[2] = 0; 
                            } else {
                                classes[0] = 0; 
                                classes[1] = 0; 
                                classes[2] = 2; 
                            }
                        } else {
                            classes[0] = 25; 
                            classes[1] = 0; 
                            classes[2] = 0; 
                        }
                    }
                }
            } else {
                if (features[26] <= -2341.5) {
                    classes[0] = 23; 
                    classes[1] = 0; 
                    classes[2] = 0; 
                } else {
                    if (features[3] <= 1579.9856567382812) {
                        if (features[28] <= 2000.0) {
                            if (features[15] <= 1180.82861328125) {
                                classes[0] = 0; 
                                classes[1] = 0; 
                                classes[2] = 1; 
                            } else {
                                classes[0] = 9; 
                                classes[1] = 0; 
                                classes[2] = 0; 
                            }
                        } else {
                            if (features[29] <= 36250.0) {
                                if (features[4] <= 6397.5) {
                                    if (features[17] <= 758.5) {
                                        classes[0] = 0; 
                                        classes[1] = 0; 
                                        classes[2] = 35; 
                                    } else {
                                        if (features[18] <= 763.0) {
                                            classes[0] = 1; 
                                            classes[1] = 0; 
                                            classes[2] = 0; 
                                        } else {
                                            classes[0] = 0; 
                                            classes[1] = 0; 
                                            classes[2] = 1; 
                                        }
                                    }
                                } else {
                                    classes[0] = 1; 
                                    classes[1] = 0; 
                                    classes[2] = 0; 
                                }
                            } else {
                                if (features[19] <= 5.627309560775757) {
                                    classes[0] = 8; 
                                    classes[1] = 0; 
                                    classes[2] = 0; 
                                } else {
                                    classes[0] = 0; 
                                    classes[1] = 0; 
                                    classes[2] = 2; 
                                }
                            }
                        }
                    } else {
                        if (features[30] <= 500.0) {
                            if (features[3] <= 3063.754150390625) {
                                classes[0] = 3; 
                                classes[1] = 0; 
                                classes[2] = 0; 
                            } else {
                                classes[0] = 0; 
                                classes[1] = 0; 
                                classes[2] = 5; 
                            }
                        } else {
                            if (features[7] <= 1223.69140625) {
                                classes[0] = 1; 
                                classes[1] = 0; 
                                classes[2] = 0; 
                            } else {
                                if (features[17] <= 23.5) {
                                    if (features[29] <= 41500.0) {
                                        classes[0] = 0; 
                                        classes[1] = 0; 
                                        classes[2] = 7; 
                                    } else {
                                        classes[0] = 2; 
                                        classes[1] = 0; 
                                        classes[2] = 0; 
                                    }
                                } else {
                                    classes[0] = 0; 
                                    classes[1] = 0; 
                                    classes[2] = 304; 
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (features[3] <= 757.657958984375) {
                if (features[4] <= 828.5) {
                    classes[0] = 0; 
                    classes[1] = 346; 
                    classes[2] = 0; 
                } else {
                    classes[0] = 1; 
                    classes[1] = 0; 
                    classes[2] = 0; 
                }
            } else {
                if (features[30] <= 27500.0) {
                    classes[0] = 0; 
                    classes[1] = 0; 
                    classes[2] = 2; 
                } else {
                    classes[0] = 2; 
                    classes[1] = 0; 
                    classes[2] = 0; 
                }
            }
        }
    
        return findMax(classes);
    };

};

// Global variables to store current values.
var orientation_buf;
var curr_lux = 0; //save lux if it doesnt get changed

let clf = new DecisionTreeClassifier();

var features = [];

var alpha_m = [];
var beta_m = [];
var gamma_m = [];
var alphaG_m = [];
var betaG_m = [];
var gammaG_m = [];
var lux_m = [];
var count = [];
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


function onChangeClf(){
	document.getElementById("debug").innerHTML = "inside classifier"
}


function onChange(){
    //document.getElementById("subject").value = Math.floor((1 + Math.random()) * 0x10000).toString(16); //pick a random id
	document.getElementById("debug").innerHTML = "onChange"

    console.log("checkbox checked ...");
    var checkbox = document.getElementById('record');
    console.log(checkbox.checked);
 
}



function classifyData(){

    function mean_lux(values){
        if(values.length < 1){
            return curr_lux;
        }else{
        var sum = values.reduce(function(a, b) { return a + b; });
        return Math.floor(sum *1000 / values.length);
        }
    }
    
    function milli_mean_int(values) {
        var sum = values.reduce(function(a, b) { return a + b; });
        return Math.floor(sum * 1000 / values.length);
    }
    
	document.getElementById("debug").innerHTML = "inside classifier"
	document.getElementById("myspan").textContent="inside classifier"
	console.log("CLASSIFIER");
	var v=orientation_buf; //copy old buffer to var to avoid async effects on write
	orientation_buf=new OrientationValues(); // reset buffer 
	data_count++;
	count.push(data_count);
	alpha_m.push(milli_mean_int(v.alpha)); //use mean * 1000 (int for efficiency) (bei schicken jeder 1ms => rauschen(min, max windowing später))
	beta_m.push(milli_mean_int(v.beta));
	gamma_m.push(milli_mean_int(v.gamma));
	alphaG_m.push(milli_mean_int(v.alphaG));
	betaG_m.push(milli_mean_int(v.betaG));
	gammaG_m.push(milli_mean_int(v.gammaG));
	lux_m.push(mean_lux(v.lux));

	if(alpha_m.length >= 20){
		document.getElementById("myspan").textContent="window appply";
		var all_means = [];
		all_means.push(alpha_m);
		all_means.push(alphaG_m);
		all_means.push(beta_m);
		all_means.push(betaG_m);
		all_means.push(count);
		all_means.push(gamma_m);
		all_means.push(gammaG_m);
		all_means.push(lux_m);
		features = featureExtraction(all_means);

		/*var prediction = clf.predict(features);

		switch(prediction){
			case 0:
				prediction = "sitting";
				console.log(prediction);
				document.getElementById("myspan").textContent=prediction;
				break;
			case 1:
				prediction = "standing";
				console.log(prediction);
				document.getElementById("myspan").textContent=prediction;
				break;
			case 2:
				prediction = "walking";
				console.log(prediction);
				document.getElementById("myspan").textContent=prediction;
				break;
        }*/
		alpha_m = [];
		beta_m = [];
		gamma_m = [];
		alphaG_m = [];
		betaG_m = [];
		gammaG_m = [];
		lux_m = [];
		count = [];
		all_means = [];
		features = [];
	}

}

function featureExtraction(all_means){
	document.getElementById("myspan").textContent="FEATURE EXTRACT";

	var aggregator = ['min', 'max', 'median', 'std'];
	var min = [];
	var max = [];
    var median = [];
    
    var features = [];
	var feature_names = ['alpha_m', 'alphaG_m', 'beta_m', 'betaG_m', 'count',
		'gamma_m', 'gammaG_m', 'lux_m'];
    /*
      const median = arr => {
        const mid = Math.floor(arr.length / 2),
        //nums = [...arr].sort((a, b) => a - b);
        nums = arr.sort(function(a, b){return a-b;});
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
*/
    function median(numbers) {
        // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
        var median = 0, numsLen = numbers.length;
        numbers.sort();
     
        if (
            numsLen % 2 === 0 // is even
        ) {
            // average of two middle numbers
            median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
        } else { // is odd
            // middle number only
            median = numbers[(numsLen - 1) / 2];
        }
     
        return median;
    }
    
    

	  const std = arr => {
        let getMean = function (arr) {
            return arr.reduce(function (a, b) {
                return Number(a) + Number(b);
            }) / arr.length;
        };
        let m = getMean(arr);
        return Math.sqrt(arr.reduce(function (sq, n) {
            return sq + Math.pow(n - m, 2);
        }, 0) / arr.length);
	};
	 
    for(var index = 0; index < feature_names.length; index++){
        var temp_values = all_means[index];
        features.push(Math.min(...temp_values));
        features.push(Math.max(...temp_values));
        features.push(median(temp_values));
        features.push(std(temp_values));
    }
	return features;
}
