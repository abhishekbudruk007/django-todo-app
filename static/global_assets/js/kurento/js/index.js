/*
* (C) Copyright 2014 Kurento (http://kurento.org/)
*
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the GNU Lesser General Public License
* (LGPL) version 2.1 which accompanies this distribution, and is available at
* http://www.gnu.org/licenses/lgpl-2.1.html
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* Lesser General Public License for more details.
*
*/

function getopts(args, opts)
{
  var result = opts.default || {};
  args.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) { result[$1] = $3; });

  return result;
};

var args = getopts(location.search,
{
  default:
  {
    ws_uri: 'ws://' + 'localhost' + ':8888/kurento',
    ice_servers: undefined
  }
});

if (args.ice_servers) {
  console.log("Use ICE servers: " + args.ice_servers);
  kurentoUtils.WebRtcPeer.prototype.server.iceServers = JSON.parse(args.ice_servers);
} else {
  console.log("Use freeice")
}



window.addEventListener('load',function(){

    var videoOutput = document.getElementsByClassName('videoOutput');
    var address_value = 'http://files.kurento.org/video/puerta-del-sol.ts';
    let address;
    startButtons = document.getElementsByClassName('start');

    stopButtons = document.getElementsByClassName('stop');

    for(var i=0;i< startButtons.length; i++){


            startButtons[i].addEventListener('click',function(i){
            address = this.parentElement.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling;

                if(!address.value){
          window.alert("You must set the video source URL first");
          return;
        }

        address.disabled = true;
          var videoOutput = this.parentElement.previousElementSibling.firstElementChild;
        showSpinner(videoOutput);
        var options = {
          remoteVideo : videoOutput
        };
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
          function(error){
            if(error){
              return console.error(error);
            }
            webRtcPeer.generateOffer(onOffer);
            webRtcPeer.peerConnection.addEventListener('iceconnectionstatechange', function(event){
              if(webRtcPeer && webRtcPeer.peerConnection){
                console.log("oniceconnectionstatechange -> " + webRtcPeer.peerConnection.iceConnectionState);
                console.log('icegatheringstate -> ' + webRtcPeer.peerConnection.iceGatheringState);
              }
            });
            });
        });
    }

    for(var i=0; i< stopButtons.length; i++){
        stopButtons[i].addEventListener('click',function(){
       address = this.parentElement.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling;
       var videoOutput = this.parentElement.previousElementSibling.firstElementChild;
            address.disabled = false;
            if (webRtcPeer) {
              webRtcPeer.dispose();
              webRtcPeer = null;
            }
            if(pipeline){
              pipeline.release();
              pipeline = null;
            }
            hideSpinner(videoOutput);
                });

    }





      function onOffer(error, sdpOffer){
      //address = "rtmp://13.126.194.113/live/live1"
    if(error) return onError(error);

  	kurentoClient(args.ws_uri, function(error, kurentoClient) {
  		if(error) return onError(error);

  		kurentoClient.create("MediaPipeline", function(error, p) {
  			if(error) return onError(error);

  			pipeline = p;

  			pipeline.create("PlayerEndpoint", {uri: address.value}, function(error, player){
  			  if(error) return onError(error);

  			  pipeline.create("WebRtcEndpoint", function(error, webRtcEndpoint){
  				if(error) return onError(error);

          setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError);

  				webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer){
  					if(error) return onError(error);

            webRtcEndpoint.gatherCandidates(onError);

  					webRtcPeer.processAnswer(sdpAnswer);
  				});

  				player.connect(webRtcEndpoint, function(error){
  					if(error) return onError(error);

  					console.log("PlayerEndpoint-->WebRtcEndpoint connection established");

  					player.play(function(error){
  					  if(error) return onError(error);

  					  console.log("Player playing ...");
  					});
  				});
  			});
  			});
  		});
  	});
  }






});






//window.addEventListener('load', function(){
//  //console = new Console('console', console);
//	var videoOutput = document.getElementById('videoOutput');
//	var address = document.getElementById('address');
//	address.value = 'http://files.kurento.org/video/puerta-del-sol.ts';
//  var pipeline;
//  var webRtcPeer;
//
//  startButton = document.getElementById('start');
//  startButton.addEventListener('click', start);
//
//  stopButton = document.getElementById('stop');
//  stopButton.addEventListener('click', stop);
//
//  function start() {
//  	if(!address.value){
//  	  window.alert("You must set the video source URL first");
//  	  return;
//  	}
//  	address.disabled = true;
//  	showSpinner(videoOutput);
//    var options = {
//      remoteVideo : videoOutput
//    };
//    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
//      function(error){
//        if(error){
//          return console.error(error);
//        }
//        webRtcPeer.generateOffer(onOffer);
//        webRtcPeer.peerConnection.addEventListener('iceconnectionstatechange', function(event){
//          if(webRtcPeer && webRtcPeer.peerConnection){
//            console.log("oniceconnectionstatechange -> " + webRtcPeer.peerConnection.iceConnectionState);
//            console.log('icegatheringstate -> ' + webRtcPeer.peerConnection.iceGatheringState);
//          }
//        });
//    });
//  }
//
//  function onOffer(error, sdpOffer){
//    if(error) return onError(error);
//
//  	kurentoClient(args.ws_uri, function(error, kurentoClient) {
//  		if(error) return onError(error);
//
//  		kurentoClient.create("MediaPipeline", function(error, p) {
//  			if(error) return onError(error);
//
//  			pipeline = p;
//
//  			pipeline.create("PlayerEndpoint", {uri: address.value}, function(error, player){
//  			  if(error) return onError(error);
//
//  			  pipeline.create("WebRtcEndpoint", function(error, webRtcEndpoint){
//  				if(error) return onError(error);
//
//          setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError);
//
//  				webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer){
//  					if(error) return onError(error);
//
//            webRtcEndpoint.gatherCandidates(onError);
//
//  					webRtcPeer.processAnswer(sdpAnswer);
//  				});
//
//  				player.connect(webRtcEndpoint, function(error){
//  					if(error) return onError(error);
//
//  					console.log("PlayerEndpoint-->WebRtcEndpoint connection established");
//
//  					player.play(function(error){
//  					  if(error) return onError(error);
//
//  					  console.log("Player playing ...");
//  					});
//  				});
//  			});
//  			});
//  		});
//  	});
//  }
//
//  function stop() {
//    address.disabled = false;
//    if (webRtcPeer) {
//      webRtcPeer.dispose();
//      webRtcPeer = null;
//    }
//    if(pipeline){
//      pipeline.release();
//      pipeline = null;
//    }
//    hideSpinner(videoOutput);
//  }
//
//});

function setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError){
  webRtcPeer.on('icecandidate', function(candidate){
    console.log("Local icecandidate " + JSON.stringify(candidate));

    candidate = kurentoClient.register.complexTypes.IceCandidate(candidate);

    webRtcEndpoint.addIceCandidate(candidate, onError);

  });
  webRtcEndpoint.on('OnIceCandidate', function(event){
    var candidate = event.candidate;

    console.log("Remote icecandidate " + JSON.stringify(candidate));

    webRtcPeer.addIceCandidate(candidate, onError);
  });
}

function onError(error) {
  if(error)
  {
    console.error(error);
    stop();
  }
}

function showSpinner() {
console.log(arguments)
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].poster = 'static/global_assets/images/transparent-1px.png';
		arguments[i].style.background = "center transparent url('static/global_assets/images/spinner.gif') no-repeat";
	}
}

function hideSpinner() {
console.log(arguments);
	for (var i = 0; i < arguments.length; i++) {
		//arguments[i].src = '';
		arguments[i].poster = 'static/global_assets/images/transparent-1px.png';
		arguments[i].style.background = '';
	}
}

/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});
