
var r;
var g; 
var b;
var finalValue;
var sliderFinalRgba;
var randomHexToSliderVariable;
var randomHexToSlider1;
var randomHexToSlider2;
var randomHexToSlider3;
var randomHexToSlider4;
var randomHexToSlider5;
var randomHexToSlider6;
var hexSliderToRandomHexFull;
var hexSliderToRandomHex1;
var hexSliderToRandomHex2;
var hexSliderToRandomHex3;
var hexSliderToRandomHex4;
var hexSliderToRandomHex5;
var hexSliderToRandomHex6;
var randomRGBToSliderRGBFull;
var randomRGBToSliderRGBRed;
var randomRGBToSliderRGBGreen;
var randomRGBToSliderRGBBlue;
var newRGBValueRed;
var newRGBValueGreen;
var newRGBValueBlue;


window.onload = (event) => {
  $('#random-colour-switch-container').hide();
  $('#colour-selector-switch-container').hide();
  $('#colour-selector-main').hide();
  $('#random-colour-button').hide();
  $('#colour-selector-button').hide();
  $('.footer').hide();

  setTimeout(() => {

    $("#loader-box").fadeOut();

}, 1000);
};

//================================================================================CLICK SCREEN TO GET RANDOM COLOUR=================//

//FUNCTION TO RANDOMLY CHANGE THE COLOUR DEPENDING ON USER SELECTION
$("#random-colour-main").click(function() {

  $('.footer').show();
  $('#random-colour-switch-container').show();
  $('#random-colour-button').show();
  $('#colour-selector-button').show();
  
  //IF USER SELECTS RGB SHOW RANDOM RGB 
  if($('#random-colour-switch-checkbox').is(":checked")){
    changeColourHEX()
  } else {
    changeColourRBGA()
  }
});

//FUNCTION TO RANDOMLY CHOOSE RGB VALUE
function changeColourRBGA() {
  let rbga1 = Math.floor(Math.random()*255);
  let rbga2 = Math.floor(Math.random()*255);
  let rbga3 = Math.floor(Math.random()*255);

  let finalColour = `rgba(${rbga1}, ${rbga2},${rbga3})`;
  let finalRGBAValue = `${rbga1}, ${rbga2}, ${rbga3}`;

  document.body.style.backgroundColor = finalColour;

  rgbaTextTransform = "RGB (" + finalRGBAValue + ")";

  $('#value').html(rgbaTextTransform)

  setContrast(`(${rbga1}, ${rbga2},${rbga3})`)


}

//FUNCTION TO RANDOMLY CHOOSE HEX VALUE
function changeColourHEX() {
  let randomHex = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  
  document.body.style.backgroundColor = randomHex;

  randomHex = randomHex.toUpperCase();

  $('#value').html(randomHex)

  var contrastRandomHex = hexToRgb(randomHex)
  contrastRandomHex = `(${contrastRandomHex})`
  setContrast(contrastRandomHex)
  
}


//================================================================================TOGGLE SWITCH BETWEEN RGB AND HEX ON RANDOM PAGE=================//

//SWITCH THE VIEW BETWEEN RGB AND HEX ON THE RANDOM COLOUR PAGE
var rgbaTextTransform;
$('#random-colour-switch-checkbox').change(function() {
  //IF CHECKED SHOW HEX ELSE SHOW RGB
  if(this.checked) {
    numbersOutput($('#value').html());
    $('#value').html(finalValue);
  } else {
    finalValue = hexToRgb($('#value').html());
    rgbaTextTransform = "RGB (" + finalValue + ")";
    $('#value').html(rgbaTextTransform)
  }
});

//CONERTS RGB TO HEX VALUE
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

//CONVERTS HEX TO RGB
function hexToRgb(hex) {

  hex = hex.toLowerCase();

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(result){
      var r= parseInt(result[1], 16);
      var g= parseInt(result[2], 16);
      var b= parseInt(result[3], 16);
      return r+", "+g+", "+b; 
  } 
  return null;
}

//BREAKS DOWN RGB TO CONVERT IT TO HEX
function numbersOutput(numbers) {

  numbers = numbers.slice(5,18);

  var num = numbers.replaceAll(',','');
  num = num.split(' ');

  r = num[0];
  g = num[1];
  b = num[2];

  r = parseInt(r);
  g = parseInt(g);
  b = parseInt(b);

  finalValue = (rgbToHex(r, g, b));

  finalValue = finalValue.toUpperCase();
}


//================================================================================GO TO COLOUR SELECT PAGE=================//


//SWITCH BETWEEN RANDOM COLOUR AND COLOUR SELECT
$('#colour-selector-button').click(function() {

  //IF USER IS LOOKING AT HEX VALUE TAKE USER TO THE HEX SELECTOR ELSE TAKE TO RGB SLIDER
  if($('#random-colour-switch-checkbox').is(':checked')){
    $('#colour-selector-switch-checkbox').prop("checked", true);
    $('#rgb-slider-container').hide();
    $('#hex-select-container').show();
    randomHexToSliderHex();
  } else {
    $('#colour-selector-switch-checkbox').prop("checked", false);
    $('#rgb-slider-container').show();
    $('#hex-select-container').hide();
    randomRGBToSliderRGB();
  }

  $('#random-colour-button').css('textDecoration', 'none');
  $('#colour-selector-button').css('textDecoration', 'underline');
  $('#random-colour-main').hide();
  $('#random-colour-switch-container').hide();
  $('#colour-selector-switch-container').show();
  $('#colour-selector-main').show();
});

//SWITCH THE VIEW BETWEEN RGB AND HEX ON THE COLOUR SELECTOR PAGE
$('#colour-selector-switch-checkbox').change(function() {
  if(this.checked) {
    $('#rgb-slider-container').hide();
    $('#hex-select-container').show();
    RGBSliderToHexSlider()
  } else {
    $('#rgb-slider-container').show();
    $('#hex-select-container').hide();
    hexSliderToRgbSlider()
  }
});

//WHEN USER CHANGES THE RGB SLIDER THE BACKGROUND UPDATES
$('.RGB-Slider').change(function(){
  getRGBSliderValue();

  document.body.style.backgroundColor = sliderFinalRgba;

  var contrastRGBSlider = sliderFinalRgba.slice(3);
  setContrast(contrastRGBSlider)
})

//WHEN USER CHANGES THE HEX SELECTOR THE BACKGROUND UPDATES
$('.hex-select-slider').change(function() {  
  getHexSliderValue()

  document.body.style.backgroundColor = hexSelectorFinalValue;

  var contrastHexSlider = hexToRgb(hexSelectorFinalValue)
  contrastHexSlider = `(${contrastHexSlider})`
  setContrast(contrastHexSlider)
})

//TAKES THE RANDOM HEX AND CHANGES IT TO HEX SELECTOR 
function randomHexToSliderHex(){
  randomHexToSliderVariable = $('#value').html();

  randomHexToSlider1 = randomHexToSliderVariable.slice(1,2);
  randomHexToSlider2 = randomHexToSliderVariable.slice(2,3);
  randomHexToSlider3 = randomHexToSliderVariable.slice(3,4);
  randomHexToSlider4 = randomHexToSliderVariable.slice(4,5);
  randomHexToSlider5 = randomHexToSliderVariable.slice(5,6);
  randomHexToSlider6 = randomHexToSliderVariable.slice(6,7);

  $('#hex-select-1').val(randomHexToSlider1)
  $('#hex-select-2').val(randomHexToSlider2)
  $('#hex-select-3').val(randomHexToSlider3)
  $('#hex-select-4').val(randomHexToSlider4)
  $('#hex-select-5').val(randomHexToSlider5)
  $('#hex-select-6').val(randomHexToSlider6)
}

//TAKES THE RANDOM RGB AND SETS THE RGB SLIDER TO THIS VALUE
function randomRGBToSliderRGB(){

  randomRGBToSliderRGBFull = $('#value').html();
  
  splitRGB(randomRGBToSliderRGBFull);

  $('#red-slider').val(newRGBValueRed);
  $('#green-slider').val(newRGBValueGreen);
  $('#blue-slider').val(newRGBValueBlue);
  
  $('#red-value').html(newRGBValueRed);
  $('#green-value').html(newRGBValueGreen);
  $('#blue-value').html(newRGBValueBlue);
}

//CONVERTS THE RGB SLIDER VALUE TO HEX VALUE WHEN TRANSITIONING FROM THE RGB TO HEX ON THE COLOUR SELECTOR PAGE
var rgbSliderToHexSliderRed;
var rgbSliderToHexSliderGreen;
var rgbSliderToHexSliderBlue;
var rgbaSliderToHexSliderFinal;

function RGBSliderToHexSlider() {
  
  rgbSliderToHexSliderRed = $('#red-slider').val();
  rgbSliderToHexSliderGreen = $('#green-slider').val();
  rgbSliderToHexSliderBlue = $('#blue-slider').val();

  rgbSliderToHexSliderRed = parseInt(rgbSliderToHexSliderRed);
  rgbSliderToHexSliderGreen = parseInt(rgbSliderToHexSliderGreen);
  rgbSliderToHexSliderBlue = parseInt(rgbSliderToHexSliderBlue);

  rgbaSliderToHexSliderFinal = rgbToHex(rgbSliderToHexSliderRed, rgbSliderToHexSliderGreen, rgbSliderToHexSliderBlue);

  rgbaSliderToHexSliderFinal = rgbaSliderToHexSliderFinal.toUpperCase();


  $('#hex-select-1').val(rgbaSliderToHexSliderFinal[1]);
  $('#hex-select-2').val(rgbaSliderToHexSliderFinal[2]);
  $('#hex-select-3').val(rgbaSliderToHexSliderFinal[3]);
  $('#hex-select-4').val(rgbaSliderToHexSliderFinal[4]);
  $('#hex-select-5').val(rgbaSliderToHexSliderFinal[5]);
  $('#hex-select-6').val(rgbaSliderToHexSliderFinal[6]);
}

//CONVERTS THE HEX SELECTOR VALUE TO RGB SLIDER VALUE WHEN TRANSITIONING FROM THE HEX TO RGB ON THE COLOUR SELECTOR PAGE

function hexSliderToRgbSlider(){

  getHexSliderValue()

  hexSliderToRgbSliderFunction = hexToRgb(hexSelectorFinalValue);
 
  hexSliderToRgbSliderFunction = '(' + hexSliderToRgbSliderFunction + ')';

  splitRGB(hexSliderToRgbSliderFunction);


  $('#red-slider').val(newRGBValueRed) 
  $('#green-slider').val(newRGBValueGreen) 
  $('#blue-slider').val(newRGBValueBlue) 

  $('#red-value').html(newRGBValueRed);
  $('#green-value').html(newRGBValueGreen);
  $('#blue-value').html(newRGBValueBlue);
}


//get rgb sliders value
var redSliderVal;
var blueSliderVal;
var greenSliderVal;

function getRGBSliderValue(){
  redSliderVal = $('#red-slider').val()
  greenSliderVal = $('#green-slider').val()
  blueSliderVal = $('#blue-slider').val()

  sliderFinalRgba = `rgb(${redSliderVal},${greenSliderVal},${blueSliderVal})`;
}

//get the hex slider value
var hexValueOne;
var hexValueTwo;
var hexValueThree;
var hexValueFour;
var hexValueFive;
var hexValueSix;
var hexSelectorFinalValue;

function getHexSliderValue(){
  hexValueOne = $('#hex-select-1').val();
  hexValueTwo = $('#hex-select-2').val();
  hexValueThree = $('#hex-select-3').val();
  hexValueFour = $('#hex-select-4').val();
  hexValueFive = $('#hex-select-5').val();
  hexValueSix = $('#hex-select-6').val();

  hexSelectorFinalValue = '#' + hexValueOne + hexValueTwo + hexValueThree + hexValueFour + hexValueFive + hexValueSix;
}

//================================================================================GO TO RANDOM COLOUR PAGE=================//

//TAKE USER BACK TO RANDOM COLOUR
$('#random-colour-button').click(function() {

  //IF USER IS LOOKING AT HEX SELECTOR TAKE THEM BACK TO HEX RANDOM IF USER IS LOOKING AT RGB SLIDER TAKE THEM TO RANDOM RGB
  if($('#colour-selector-switch-checkbox').is(':checked')){
    hexSliderToRandom();
    $('#random-colour-switch-checkbox').prop("checked", true);
  } else {
    RGBSliderToRandom();
    $('#random-colour-switch-checkbox').prop("checked", false);
  }

  $('#random-colour-button').css('textDecoration', 'underline');
  $('#colour-selector-button').css('textDecoration', 'none');
  $('#random-colour-main').show();
  $('#random-colour-switch-container').show();
  $('#colour-selector-switch-container').hide();
  $('#colour-selector-main').hide();
});


//TAKES THE HEX SELECTOR AND CONVERTS IT TO HEX VALUE FOR DISPLAY 
function hexSliderToRandom(){

  hexSliderToRandomHex1 = $('#hex-select-1').val();
  hexSliderToRandomHex2 = $('#hex-select-2').val();
  hexSliderToRandomHex3 = $('#hex-select-3').val();
  hexSliderToRandomHex4 = $('#hex-select-4').val();
  hexSliderToRandomHex5 = $('#hex-select-5').val();
  hexSliderToRandomHex6 = $('#hex-select-6').val();


  hexSliderToRandomHexFull = '#' + hexSliderToRandomHex1 + hexSliderToRandomHex2 + hexSliderToRandomHex3 + hexSliderToRandomHex4 + hexSliderToRandomHex5 + hexSliderToRandomHex6;

  $('#value').html(hexSliderToRandomHexFull); 
}

//CONVERTS THE RGB SLIDER INTO RGB VALUE WHEN GOING FROM THE RGB SELECTOR TO THE RGB RNADOM
var RGBSliderToRandomRedSlider;
var RGBSliderToRandomGreenSlider;
var RGBSliderToRandomBlueSlider;
var RGBSliderToRandomFinal;

function RGBSliderToRandom(){
  
  RGBSliderToRandomRedSlider = $('#red-slider').val();
  RGBSliderToRandomGreenSlider = $('#green-slider').val();
  RGBSliderToRandomBlueSlider = $('#blue-slider').val();

  RGBSliderToRandomFinal = 'RGB (' + RGBSliderToRandomRedSlider + ', ' + RGBSliderToRandomGreenSlider + ', ' + RGBSliderToRandomBlueSlider + ')';
  
  $('#value').html(RGBSliderToRandomFinal)
}

//RGB SLIDER 
var redSlider = document.getElementById("red-slider");
var redOutput = document.getElementById("red-value");
redOutput.innerHTML = redSlider.value;

redSlider.oninput = function() {
  redOutput.innerHTML = this.value;
}

var greenSlider = document.getElementById("green-slider");
var greenOutput = document.getElementById("green-value");
greenOutput.innerHTML = greenSlider.value;

greenSlider.oninput = function() {
  greenOutput.innerHTML = this.value;
}

var blueSlider = document.getElementById("blue-slider");
var blueOutput = document.getElementById("blue-value");
blueOutput.innerHTML = blueSlider.value;

blueSlider.oninput = function() {
  blueOutput.innerHTML = this.value;
}


//================================================================================OTHER FUNCTIONS=================//


//SPLITS THE RGB VALUE FOR INPUT INTO THE SLIDER
function splitRGB(rgbvalue){

  rgbvalue = rgbvalue.replace(/ /g,'');

  newRGBValueRed = rgbvalue.substring(
    rgbvalue.indexOf("(") + 1, 
    rgbvalue.indexOf(",")
  );

  newRGBValueGreen = rgbvalue.substring(
    rgbvalue.indexOf(",") + 1, 
    rgbvalue.lastIndexOf(",")
  );

  newRGBValueBlue = rgbvalue.substring(
    rgbvalue.lastIndexOf(",") + 1, 
    rgbvalue.lastIndexOf(")")
  );

}


//CHANGES TEXT COLOUR WHEN BACKGROUND COLOUR IS TOO LIGHT OR DARK
function setContrast(rgb) {

  splitRGB(rgb)

  const brightness = Math.round(((parseInt(newRGBValueRed) * 299) +
                      (parseInt(newRGBValueGreen) * 587) +
                      (parseInt(newRGBValueBlue) * 114)) / 1000);
                  
  const textColour = (brightness > 125) ? 'black' : 'white';
  //const backgroundColour = 'rgb(' + newRGBValueRed + ',' + newRGBValueGreen + ',' + newRGBValueBlue + ')';
  $('#background').css('color', textColour); 
  $('#random-colour-button').css('color', textColour);
  $('#colour-selector-button').css('color', textColour);
  $('#andyMetcalfe').css('color', textColour);
  $('.switch-buttons').css('borderColor', textColour);
  $('.created-by-container').css('borderColor', textColour)
  //$('#background').css('background-color', backgroundColour);
}



