
const configuration = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
const pc = new RTCPeerConnection(configuration);
console.log(pc)
pc.onicecandidate = function(icecandidate) {

    // send candidates to other guy
    var data = {
        type: 'iceCandidate',
       // roomId: roomId,
        payload: icecandidate
    };

};

discoveryChannel = pc.createDataChannel('discovery', {ordered: true});
discoveryChannel.onopen = function (a,b) {
    console.log("opened")
    console.log(a,b)
};
discoveryChannel.onclose = function (a,b) {
    console.log(a,b)
};
const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
};

discoveryChannel.onerror = function (a,b) {

    console.log(a,b)
};

pc.createOffer(offerOptions).then(function (offer) {
    pc.setLocalDescription(offer)
    document.getElementById("rootSDP").textContent = offer.sdp
})
function setRemote() {
   console.log("setRemote")
    const answer = {
        type: 'answer',
        sdp: document.getElementById("rootSDP").textContent
    };
   pc.setRemoteDescription(answer,
       function (data) {
           console.log(data)
   },
       function (err) {
           console.log(err)
       })
}