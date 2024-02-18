let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;
let allPoses = [];

function setup() {  // this function runs only once while running
    createCanvas(800, 500);
    
    capture = createCapture(VIDEO);
    capture.hide();

    //load the PoseNet model
    posenet = ml5.poseNet(capture, modelLOADED);

    //detect pose
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    console.log(poses);

    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        
        // Assuming you want to save all poses and skeletons into an array
        allPoses.push({ pose: singlePose, skeleton });

        console.log('Data added to allPoses:', allPoses);
    }
}

function saveDataToFile() {
    // Convert allPoses array to JSON string
    const jsonData = JSON.stringify(allPoses, null, 2);

    // Create a Blob object containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a link element to prompt the user to download the JSON data
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'poses_data.json';
    a.textContent = 'Download JSON';

    // Append the link to the document body and click it to trigger the download
    document.body.appendChild(a);
    a.click();

    // Cleanup: Remove the link from the document body
    document.body.removeChild(a);
}

function modelLOADED() {
    console.log("model has loaded");
}

/*
function getRandomArbitrary(min, max) { // generate random num
    return Math.random() * (max - min) + min;
}
*/
function draw() { // this function code runs in infinite loop
    
    // images and video(webcam)
    image(capture, 0, 0);
    fill(255, 0, 0);
    
    if(singlePose) {
        for(let i=0; i<singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }

        stroke(255, 255, 255);
        strokeWeight(5);

        for(let j=0; j<skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }
    }
}
