import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import {unByKey} from 'ol/Observable';
import View from 'ol/View';
import {easeOut} from 'ol/easing';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat as fromLonLat} from 'ol/proj';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Stroke, Style, Icon, Text, Fill} from 'ol/style';
import {getVectorContext} from 'ol/render';
import Overlay from 'ol/Overlay';


var tileLayer = new TileLayer({
  source: new OSM({
    wrapX: false
  })
});


var coordinate = [51.3010, 35.7166];
var map = new Map({
  layers: [tileLayer],
  target: 'map',
  view: new View({
    center: fromLonLat(coordinate),
    zoom: 11,
    multiWorld: true
  })
});


map.on('singleclick', function(e) {
                  var feature = map.forEachFeatureAtPixel(e.pixel, function(feature) {
                    return feature;
                  });
				  if(feature){
					 console.log(feature.values_.name.AvgTemp);
					 document.getElementById("val-AvgTemp").innerHTML = Math.round(feature.values_.name.AvgTemp);
					 document.getElementById("val-AvgPM2_5").innerHTML = Math.round(feature.values_.name.AvgPM2_5);
					 document.getElementById("val-Avgpres").innerHTML = Math.round(feature.values_.name.Avgpres);
					 document.getElementById("val-avgRH").innerHTML = Math.round(feature.values_.name.avgRH);
					 document.getElementById("avgRH").innerHTML = Math.round(feature.values_.name.avgRH);
					 document.getElementById("val-date").innerHTML = feature.values_.name.date;
					 document.getElementById("popup").style.display = "block";
					 var imgURL = 'http://tahamtan.net/img/aqi1.png';
					 if(feature.values_.name.avgRH){

						var n = Math.floor(feature.values_.name.avgRH);
						
						if(n>=200){
							imgURL = 'http://tahamtan.net/img/aqi5.png';
						}else if(n>=150){
							imgURL = 'http://tahamtan.net/img/aqi4.png';
						}else if(n>=100){
							imgURL = 'http://tahamtan.net/img/aqi3.png';
						}else if(n>=50){
							imgURL = 'http://tahamtan.net/img/aqi2.png';
						}else {
							imgURL = 'http://tahamtan.net/img/aqi1.png';
						}
					}
					document.getElementById("popup-img").src = imgURL;
				  }
					
                });
				
var source = new VectorSource({
  wrapX: false
});
var vector = new VectorLayer({
  source: source
});
map.addLayer(vector);




 function addMarker(lon, lat, name, titleUP, imgURL) {
    var mar = new Feature({
      geometry: new Point(fromLonLat([lon,lat])),
	  name: name
    });
    var iconBlue = new Style({
      image: new Icon({
        anchor: [10, 10],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        opacity: 1,
		scale: 0.1,
        src: imgURL
      }),
      text: new Text({
        text: titleUP,
		offsetY: 25,
		offsetX: 55,
        scale: 1.1,
        fill: new Fill({
          color: "#fff"
        }),
        stroke: new Stroke({
          color: "0",
          width: 3
        })
      })
    });
    mar.setStyle(iconBlue);
    source.addFeature(mar);
  }
  
  




// 'http://31.24.237.183:8080/average/api/daily/20191015025700/20191015045700/'



const fetch = require('node-fetch');

let url = "http://31.24.237.183:8080/average/api/daily/20191015025700/20191015045700/";

let settings = { method: "Get" };
var jjjj = 0;
fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
		console.log(json);
		for (var i=0; i < json.SRData.length; i++){
			
			var sensor = json.SRData[i];
			var titleUP = "null";
			var imgURL = 'http://tahamtan.net/img/aqi1.png';
			
			if(sensor.avgRH){

			var n = Math.floor(sensor.avgRH);
			titleUP = n.toString();
			
				if(n>=200){
					imgURL = 'http://tahamtan.net/img/aqi5.png';
				}else if(n>=150){
					imgURL = 'http://tahamtan.net/img/aqi4.png';
				}else if(n>=100){
					imgURL = 'http://tahamtan.net/img/aqi3.png';
				}else if(n>=50){
					imgURL = 'http://tahamtan.net/img/aqi2.png';
				}else {
					imgURL = 'http://tahamtan.net/img/aqi1.png';
				}
			}else{
				imgURL = 'http://tahamtan.net/img/aqi1.png';
			}
						
			var lon = (Math.random() * 0.25) + 51.30;
			var lat = (Math.random() * 0.25) + 35.60;
			

			addMarker(lon, lat, sensor, titleUP, imgURL);
		}
		
		
        // do something with JSON
    });


//end added
 //addMarker(51.3573943,35.7020563, "<b>1  </b>");
 

//window.setInterval(addRandomFeature, 1000);

