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
  
  
 //added
var element = document.getElementById('popup');

var popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, 0]
});
map.addOverlay(popup);


  // display popup on click
map.on('click', function(evt) {
	var feature = map.forEachFeatureAtPixel(evt.pixel,
    function(feature) {
      return feature;
    });
  if (feature) {
    var coordinates = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinates);
    $(element).popover({
      placement: 'top',
      html: true,
      content: feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});



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
			
			var str = "";
			var sensor = json.SRData[i];
			var titleUP = "null";
			var imgURL = 'http://tahamtan.net/img/aqi1.png';
			
			if(sensor.avgRH){
			str += "\n avgRH: ";
			str += sensor.avgRH.toString();
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
			str += "\n avgRH: ";
			str += "null";
			}
			
			if(sensor.AvgPM2_5){
			str += "\n AvgPM2_5: ";
			str += sensor.AvgPM2_5.toString();
			}else{
			str += "\n AvgPM2_5: ";
			str += "null";
			}
			
			if(sensor.AvgTemp){
			str += "\n AvgTemp: ";
			str += sensor.AvgTemp.toString();
			}else{
			str += "\n AvgTemp: ";
			str += "null";
			}
			

			if(sensor.Avgpres){
			str += "\n Avgpres: ";
			str += sensor.Avgpres.toString();
			}else{
			str += "\n Avgpres: ";
			str += "null";
			}

			
			str += "\n Date: ";
			str += sensor.date;
			
			
			var lon = (Math.random() * 0.25) + 51.30;
			var lat = (Math.random() * 0.25) + 35.60;
			

			addMarker(lon, lat, str, titleUP, imgURL);
		}
		
		
        // do something with JSON
    });


//end added
 //addMarker(51.3573943,35.7020563, "<b>1  </b>");
 

//window.setInterval(addRandomFeature, 1000);

