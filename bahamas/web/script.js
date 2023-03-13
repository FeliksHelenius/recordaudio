const startRecording = document.getElementById('record');
const stopRecording = document.getElementById('stopRecording');
const recordedAudio = document.getElementById('recordedAudio');
const sendAudioElem = document.getElementById('sendAudioRecording');
audioChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
	stolenFunction(stream);
});

function stolenFunction(stream) {
	rec = new MediaRecorder(stream);
	rec.ondataavailable = (e) => {
		audioChunks.push(e.data);
		if (rec.state == 'inactive') {
			let blob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
			recordedAudio.src = URL.createObjectURL(blob);
			recordedAudio.controls = true;
		}
	};
}

function sendData(data) {
	let blob = new Blob(data, { type: 'audio/mpeg-3' });
	console.log(blob);
	const formData = new FormData();
	formData.append('file', blob);

	for (var pair of formData.entries()) {
		console.log((pair[0] = ', ' + pair[1]));
	}

	fetch('http://localhost:3000', {
		method: 'post',
		body: formData,
	})
		.then((response) => alert('Blob Uploaded'))
		.catch((err) => alert(err));
}

startRecording.onclick = (e) => {
	startRecording.disabled = true;
	stopRecording.disabled = false;
	audioChunks.pop();
	rec.start();
};

stopRecording.onclick = (e) => {
	startRecording.disabled = false;
	stopRecording.disabled = true;
	rec.stop();
};

sendAudioElem.onclick = () => {
	if (audioChunks.length != 0) {
		sendData(audioChunks);
	}
};
