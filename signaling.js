const signaling = new SignalingChannel();
const constraints = {audio: true, video: true};
const configuration = {iceServers: [{urls: 'stun.l.google.com:19302'}]};
const pc = new RTCPeerConnection(configuration);
