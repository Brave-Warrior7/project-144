music_1="";
music_2="";
leftWrist_X= 0;
leftWrist_y= 0;

leftWristscore=0;
rightWristscore=0;

rightWrist_X= 0;
rightWrist_y= 0;

function preload(){
music_1=loadSound("music.mp3");
music_2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(530, 380);
    canvas.position(420, 245);
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 530, 380);

    if(rightWristscore>=0.4){
        fill("#FF0000");
        stroke("#FF0000");
        circle(rightWrist_X, rightWrist_y, 40);
       if(music_2.isPlaying()==true){
        music_2.pause();
        music_1.play();
        document.getElementById("span_result").innerHTML="Song_1";
       }
    }
    if(leftWristscore>=0.4){
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWrist_X, leftWrist_y, 40);
       if(music_1.isPlaying()==true){
        music_1.pause();
        music_2.play();
        document.getElementById("span_result").innerHTML="Song_2";

       }
    }
}


function modelLoaded(){
    console.log("model is successfully Loaded")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristscore=results[0].pose.keypoints[9].score;
        rightWristscore=results[0].pose.keypoints[10].score;
        console.log("leftWrist-score ="+leftWristscore, "rightWrist-score = "+rightWristscore);

        leftWrist_X=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;

        rightWrist_X=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        
        console.log("Left Wrist-X is= "+leftWrist_X+"  "+"Left Wrist-Y is= "+leftWrist_y);
        console.log("Right Wrist-X is= "+rightWrist_X+"  "+"Right Wrist-Y is= "+rightWrist_y);

    }
}

function play(){
    music_1.play();
    document.getElementById("span_result").innerHTML="Song_1";

}
