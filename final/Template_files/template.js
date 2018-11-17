var sketchProc=function(processingInstance){ with (processingInstance){
size(1280, 720);
frameRate(60);

       var NPC1 = [];
       var block = [];

        angleMode = "radians";

        //Title : Black & White
        //Member : Moqi Zhang, Jie Zhang, Zidong Li
        var start = 0;
        var pNPC = [];
        var NPC1points = [];
        var footpoints = [];
        var foot2points = [];
        var iterations = 0;
        var initial = 0;


        var NPC1Obj = function(x,y){//create NPC 1 object
            this.position = new PVector(x, y);
            this.NPC = [];
            this.NPCL = [];
            this.Lspeed =-0.1;
            this.Rspeed = 0.1;
            this.Lrotate = 0;
            this.Rrotate = 0;

            this.LspeedLeg =-0.1;
            this.RspeedLeg = 0.1;
            this.LrotateLeg = 0;
            this.RrotateLeg = 0;

            this.direction =0;
            this.NPC.push(loadImage("Template_files/blackRbody.png"));
            this.NPC.push(loadImage("Template_files/blackRarm.png"));
            this.NPC.push(loadImage("Template_files/blackRarm2.png"));
            this.NPC.push(loadImage("Template_files/blackRleg1.png"));
            this.NPC.push(loadImage("Template_files/blackRleg2.png"));

            this.NPCL.push(loadImage("Template_files/blackLbody.png"));
            this.NPCL.push(loadImage("Template_files/blackLarm.png"));
            this.NPCL.push(loadImage("Template_files/blackLarm2.png"));
            this.NPCL.push(loadImage("Template_files/blackLleg1.png"));
            this.NPCL.push(loadImage("Template_files/blackLleg2.png"));
        };

        var NPC2Obj = function(x,y){//create NPC 1 object
            this.position = new PVector(x, y);
            this.NPC = [];
            this.NPCL = [];
            this.Lspeed =-0.1;
            this.Rspeed = 0.1;
            this.Lrotate = 0;
            this.Rrotate = 0;

            this.LspeedLeg =-0.1;
            this.RspeedLeg = 0.1;
            this.LrotateLeg = 0;
            this.RrotateLeg = 0;

            this.direction =0;
            this.NPC.push(loadImage("Template_files/whiteRbody.png"));
            this.NPC.push(loadImage("Template_files/whiteRarm.png"));
            this.NPC.push(loadImage("Template_files/whiteRarm2.png"));
            this.NPC.push(loadImage("Template_files/whiteRleg1.png"));
            this.NPC.push(loadImage("Template_files/whiteRleg2.png"));

            this.NPCL.push(loadImage("Template_files/whiteLbody.png"));
            this.NPCL.push(loadImage("Template_files/whiteLarm.png"));
            this.NPCL.push(loadImage("Template_files/whiteLarm2.png"));
            this.NPCL.push(loadImage("Template_files/whiteLleg1.png"));
            this.NPCL.push(loadImage("Template_files/whiteLleg2.png"));
        };

        var starObj = function(x,y){//create star object
            this.x = x;
            this.y = y;
            this.size = random(1,4);
        };
        var moonObj = function(x,y){//create moon 1 object
            this.x = x;
            this.y = y;
        };

        var sunObj = function(x,y){//create sun 1 object
            this.x = x;
            this.y = y;
        };
        var insBlockObj = function(x,y){//create box 1 object
            this.x = x;
            this.y = y;
        };
        var houseObj = function(x,y){//create box 1 object
            this.x = x;
            this.y = y;
        };



        var NPCarray = [new NPC1Obj(0,30),new NPC2Obj(100,30) ];
        var star =[];
        var insBlock = [new insBlockObj(600,350),new insBlockObj(600,450),new insBlockObj(600,550),new insBlockObj(600,650)];
        var house = new houseObj(0,250);

        for(var j = 0; j < 300; j++){
             star[j] = new starObj(random(0,1280),random(0,400));
        }

        var subdivide = function(m) {//subdivision function for array of points
            pNPC.splice(0, pNPC.length);
            for (var i = 0; i < m.length - 1; i++) {
                pNPC.push(new PVector(m[i].x, m[i].y));
                pNPC.push(new PVector((m[i].x + m[i+1].x)/2, (m[i].y +
        m[i+1].y)/2));
            }
            pNPC.push(new PVector(m[i].x, m[i].y));
            pNPC.push(new PVector((m[0].x + m[i].x)/2, (m[0].y +
        m[i].y)/2));
            for (var i = 0; i < pNPC.length - 1; i++) {
                var x = (pNPC[i].x + pNPC[i+1].x)/2;
                var y = (pNPC[i].y + pNPC[i+1].y)/2;
                pNPC[i].set(x, y);
            }
            var x = (pNPC[i].x + m[0].x)/2;
            var y = (pNPC[i].y + m[0].y)/2;
            m.splice(0, m.length);
            for (i = 0; i < pNPC.length; i++) {
                m.push(new PVector(pNPC[i].x, pNPC[i].y));
            }
        };

        starObj.prototype.draw = function() {//draw star object
            fill(255, 255, 255);
            ellipse(this.x, this.y, this.size,this.size);
        };
        starObj.prototype.move = function() {//draw star object
            this.x += 0.3;
            if(this.x > 1280){
                this.x = 0;
            }
        };

        insBlockObj.prototype.draw = function() {//draw star object
            fill(255, 255, 255);
            rect(this.x,this.y,150,50);
            fill(240, 159, 19);
            ellipse(this.x,this.y,30,30);
            fill(0, 0, 0);
            ellipse(this.x-5,this.y-4,5,5);
            ellipse(this.x+5,this.y-4,5,5);
            fill(255, 0, 0);
            arc(this.x, this.y+3, 10, 15, 1, 180);

        };
        houseObj.prototype.draw = function() {//draw star object
            fill(76, 89, 125);
            rect(this.x,this.y+300,60,200);
            rect(this.x+60,this.y+280,40,220);
            rect(this.x+100,this.y+220,40,280);
            rect(this.x+140,this.y+290,60,210);
            rect(this.x+200,this.y+240,50,260);
            rect(this.x+250,this.y+340,40,160);
            rect(this.x+290,this.y+320,40,180);
            rect(this.x+330,this.y+280,40,220);
            rect(this.x+370,this.y+200,30,300);
            rect(this.x+400,this.y+300,60,200);
            rect(this.x+460,this.y+280,40,220);
            rect(this.x+500,this.y+220,40,280);
            rect(this.x+540,this.y+290,60,210);
            rect(this.x+600,this.y+240,50,260);
            rect(this.x+650,this.y+340,40,160);
            rect(this.x+690,this.y+320,40,180);
            rect(this.x+730,this.y+280,40,220);
            rect(this.x+770,this.y+200,30,300);
            rect(this.x+800,this.y+220,40,280);
            rect(this.x+840,this.y+290,60,210);
            rect(this.x+900,this.y+240,50,260);
            rect(this.x+950,this.y+340,40,160);
            rect(this.x+990,this.y+320,40,180);
            rect(this.x+1030,this.y+280,40,220);
            rect(this.x+1070,this.y+200,30,300);
            rect(this.x+1100,this.y+300,60,200);
            rect(this.x+1160,this.y+220,40,280);
            rect(this.x+1200,this.y+290,60,210);
            rect(this.x+1260,this.y+240,50,260);
            rect(this.x+1310,this.y+340,40,160);
            rect(this.x+1250,this.y+320,40,180);
            rect(this.x+1290,this.y+340,40,160);
            rect(this.x+1330,this.y+320,40,180);
            rect(this.x+1370,this.y+280,40,220);
            rect(this.x+1400,this.y+200,30,300);
            rect(this.x+1430,this.y+220,40,280);
            rect(this.x+1470,this.y+290,60,210);
            rect(this.x+1530,this.y+240,50,260);
            rect(this.x+1580,this.y+340,40,160);
            rect(this.x+1620,this.y+320,40,180);
            rect(this.x+1660,this.y+280,40,220);

        };
        houseObj.prototype.move = function() {//draw star object
            this.x -= 0.3;
            if(this.x < -300){
                this.x = 0;
            }
        };

        NPC1Obj.prototype.draw = function() {//draw NPC 1 object

            if(this.direction === 0){
                pushMatrix();
                translate(this.position.x+50,this.position.y+70);
                rotate(this.RrotateLeg);
                image(this.NPC[4],0,0,20,20);
                popMatrix();

                pushMatrix();
                translate(this.position.x+35,this.position.y+70);
                rotate(this.LrotateLeg);
                image(this.NPC[3],0,0,20,20);
                popMatrix();



                pushMatrix();
                translate(this.position.x+60,this.position.y+50);
                rotate(this.Rrotate);
                image(this.NPC[2],0,0,20,20);
                popMatrix();

                image(this.NPC[0],this.position.x,this.position.y,80,80);

                pushMatrix();
                translate(this.position.x+35,this.position.y+50);
                rotate(this.Lrotate);
                image(this.NPC[1],-20,0,20,20);
                popMatrix();
            }else{
                pushMatrix();
                translate(this.position.x+25,this.position.y+75);
                rotate(this.RrotateLeg);
                image(this.NPCL[4],0,0,20,20);
                popMatrix();

                pushMatrix();
                translate(this.position.x+10,this.position.y+75);
                rotate(this.LrotateLeg);
                image(this.NPCL[3],0,0,20,20);
                popMatrix();



                pushMatrix();
                translate(this.position.x+20,this.position.y+50);
                rotate(this.Lrotate);
                image(this.NPCL[1],-20,0,20,20);
                popMatrix();

                image(this.NPCL[0],this.position.x,this.position.y,80,80);


                pushMatrix();
                translate(this.position.x+45,this.position.y+50);
                rotate(this.Rrotate);
                image(this.NPCL[2],0,0,20,20);
                popMatrix();
            }


        };

        NPC1Obj.prototype.move = function() {//ball move in arc line
              if (this.direction === 0 ){
                  this.Lrotate += this.Lspeed;
                  this.Rrotate += this.Rspeed;
                  this.LrotateLeg += this.LspeedLeg;
                  this.RrotateLeg += this.RspeedLeg;
                  if (this.Lrotate < -1.2 || this.Lrotate > 0){
                      this.Lspeed = -this.Lspeed;
                  }

                  if (this.Rrotate > 1 || this.Rrotate < -0.2){
                      this.Rspeed = -this.Rspeed;
                  }

                  if (this.LrotateLeg < -0.5 || this.LrotateLeg > 0.5){
                      this.LspeedLeg = -this.LspeedLeg;
                  }

                  if (this.RrotateLeg > 0.5 || this.RrotateLeg < -0.5){
                      this.RspeedLeg = -this.RspeedLeg;
                  }

              }else if (this.direction === 1)
              {
                  this.Lrotate += this.Lspeed;
                  this.Rrotate += this.Rspeed;
                  this.LrotateLeg += this.RspeedLeg;
                  this.RrotateLeg += this.LspeedLeg;
                  if (this.Lrotate < -1.2 || this.Lrotate > 0){
                      this.Lspeed = -this.Lspeed;
                  }

                  if (this.Rrotate > 1 || this.Rrotate < -0.2){
                      this.Rspeed = -this.Rspeed;
                  }

                  if (this.LrotateLeg < -0.5 || this.LrotateLeg > 0.5){
                      this.LspeedLeg = -this.LspeedLeg;
                  }

                  if (this.RrotateLeg > 0.5 || this.RrotateLeg < -0.5){
                      this.RspeedLeg = -this.RspeedLeg;
                  }
              }
        };

        NPC2Obj.prototype.draw = function() {//draw NPC 1 object

            if(this.direction === 0){
                pushMatrix();
                translate(this.position.x+50,this.position.y+70);
                rotate(this.RrotateLeg);
                image(this.NPC[4],0,0,20,20);
                popMatrix();

                pushMatrix();
                translate(this.position.x+35,this.position.y+70);
                rotate(this.LrotateLeg);
                image(this.NPC[3],0,0,20,20);
                popMatrix();



                pushMatrix();
                translate(this.position.x+60,this.position.y+50);
                rotate(this.Rrotate);
                image(this.NPC[2],0,0,20,20);
                popMatrix();

                image(this.NPC[0],this.position.x,this.position.y,80,80);

                pushMatrix();
                translate(this.position.x+35,this.position.y+50);
                rotate(this.Lrotate);
                image(this.NPC[1],-20,0,20,20);
                popMatrix();
            }else{
                pushMatrix();
                translate(this.position.x+25,this.position.y+75);
                rotate(this.RrotateLeg);
                image(this.NPCL[4],0,0,20,20);
                popMatrix();

                pushMatrix();
                translate(this.position.x+10,this.position.y+75);
                rotate(this.LrotateLeg);
                image(this.NPCL[3],0,0,20,20);
                popMatrix();



                pushMatrix();
                translate(this.position.x+20,this.position.y+50);
                rotate(this.Lrotate);
                image(this.NPCL[1],-20,0,20,20);
                popMatrix();

                image(this.NPCL[0],this.position.x,this.position.y,80,80);


                pushMatrix();
                translate(this.position.x+45,this.position.y+50);
                rotate(this.Rrotate);
                image(this.NPCL[2],0,0,20,20);
                popMatrix();
            }


        };

        NPC2Obj.prototype.move = function() {//ball move in arc line
              if (this.direction === 0 ){
                  this.Lrotate += this.Lspeed;
                  this.Rrotate += this.Rspeed;
                  this.LrotateLeg += this.LspeedLeg;
                  this.RrotateLeg += this.RspeedLeg;
                  if (this.Lrotate < -1.2 || this.Lrotate > 0){
                      this.Lspeed = -this.Lspeed;
                  }

                  if (this.Rrotate > 1 || this.Rrotate < -0.2){
                      this.Rspeed = -this.Rspeed;
                  }

                  if (this.LrotateLeg < -0.5 || this.LrotateLeg > 0.5){
                      this.LspeedLeg = -this.LspeedLeg;
                  }

                  if (this.RrotateLeg > 0.5 || this.RrotateLeg < -0.5){
                      this.RspeedLeg = -this.RspeedLeg;
                  }

              }else if (this.direction === 1)
              {
                  this.Lrotate += this.Lspeed;
                  this.Rrotate += this.Rspeed;
                  this.LrotateLeg += this.RspeedLeg;
                  this.RrotateLeg += this.LspeedLeg;
                  if (this.Lrotate < -1.2 || this.Lrotate > 0){
                      this.Lspeed = -this.Lspeed;
                  }

                  if (this.Rrotate > 1 || this.Rrotate < -0.2){
                      this.Rspeed = -this.Rspeed;
                  }

                  if (this.LrotateLeg < -0.5 || this.LrotateLeg > 0.5){
                      this.LspeedLeg = -this.LspeedLeg;
                  }

                  if (this.RrotateLeg > 0.5 || this.RrotateLeg < -0.5){
                      this.RspeedLeg = -this.RspeedLeg;
                  }
              }
        };


        var mouseClicked = function() {
            if(start ===0){
                if(mouseX > 600 && mouseX < 750 && mouseY > 350 && mouseY <400)
                {
                    start = 1;
                }else if(mouseX > 600 && mouseX < 750 && mouseY > 450 && mouseY <500)
                {
                    start = 2;
                }
                else if(mouseX > 600 && mouseX < 750 && mouseY > 550 && mouseY <600)
                {
                    start = 3;
                }
                else if(mouseX > 600 && mouseX < 750 && mouseY > 650 && mouseY <700)
                {
                    start = 4;
                }
            }else if(start === 1){//enter instruction
                if(mouseX < 70 && mouseX > 10 && mouseY < 40 && mouseY >20)
                {
                    start = 0;
                }
            }
            else if(start === 2){//enter one player
                if(mouseX < 70 && mouseX > 10 && mouseY < 40 && mouseY >20)
                {
                    start = 0;
                }
            }
            else if(start === 3){//enter two player
                if(mouseX < 70 && mouseX > 10 && mouseY < 40 && mouseY >20)
                {
                    start = 0;
                }
            }
            else if(start === 4){//enter record
                if(mouseX < 70 && mouseX > 10 && mouseY < 40 && mouseY >20)
                {
                    start = 0;
                }
            }
        };

        var keyPressed = function() {
            if (keyCode === LEFT) {
                NPCarray[0].direction = 1;
                NPCarray[0].Lspeed =-0.1;
                NPCarray[0].Rspeed = 0.1;
                NPCarray[0].Lrotate = 0;
                NPCarray[0].Rrotate = 0;

                NPCarray[0].LspeedLeg =-0.1;
                NPCarray[0].RspeedLeg = 0.1;
                NPCarray[0].LrotateLeg = 0;
                NPCarray[0].RrotateLeg = 0;

            }else if (keyCode === RIGHT){
                NPCarray[0].direction = 0;
                NPCarray[0].Lspeed =-0.1;
                NPCarray[0].Rspeed = 0.1;
                NPCarray[0].Lrotate = 0;
                NPCarray[0].Rrotate = 0;

                NPCarray[0].LspeedLeg =-0.1;
                NPCarray[0].RspeedLeg = 0.1;
                NPCarray[0].LrotateLeg = 0;
                NPCarray[0].RrotateLeg = 0;
            }else if (key.code === 97) {
                NPCarray[1].direction = 1;
                NPCarray[1].Lspeed =-0.1;
                NPCarray[1].Rspeed = 0.1;
                NPCarray[1].Lrotate = 0;
                NPCarray[1].Rrotate = 0;

                NPCarray[1].LspeedLeg =-0.1;
                NPCarray[1].RspeedLeg = 0.1;
                NPCarray[1].LrotateLeg = 0;
                NPCarray[1].RrotateLeg = 0;
            }else if (key.code === 100){
                NPCarray[1].direction = 0;
                NPCarray[1].Lspeed =-0.1;
                NPCarray[1].Rspeed = 0.1;
                NPCarray[1].Lrotate = 0;
                NPCarray[1].Rrotate = 0;

                NPCarray[1].LspeedLeg =-0.1;
                NPCarray[1].RspeedLeg = 0.1;
                NPCarray[1].LrotateLeg = 0;
                NPCarray[1].RrotateLeg = 0;
            }
        }

        var draw = function() {
            if(start===0){//start screen
                background(12, 24, 59);
                noStroke();
                fill(255, 255, 255);
                textFont(createFont("fantasy"));
                textSize(80);
                text("Black  & White", 400, 300);
                for(var i = 0; i < star.length; i ++){
                    star[i].draw();
                    star[i].move();
                }
                house.draw();
                house.move();
                for(var i = 0; i < insBlock.length; i ++){
                    insBlock[i].draw();
                }

                fill(201, 70, 30);
                textFont(createFont("cursive"));
                textSize(28);
                text("Instruction", 610, 380);
                text("Record", 630, 480);
                textSize(26);
                text("ONE Player", 600, 580);
                text("TWO Player", 600, 680);
                fill(255, 255, 255);
                textSize(20);
                textFont(createFont("fantasy"));
                text("BY:\n  Moqi Zhang\n  Jie Zhang\n  Zidong Li", 1120, 620);
                for(var i = 0; i < NPCarray.length; i ++){
                    NPCarray[i].draw();
                    NPCarray[i].move();
                }


            }else if (start === 1){//instruction
                background(85, 106, 163);
                noStroke();
                fill(125, 148, 209);
                rect(50,50,300,300);
                arc(75,50,50,50,180,360);
                arc(175,50,50,50,180,360);
                arc(275,50,50,50,180,360);
                arc(125,350,50,50,0,180);
                arc(225,350,50,50,0,180);
                arc(325,350,50,50,0,180);
                textFont(createFont("fantasy"));
                fill(222, 222, 222);
                triangle(80, 130, 100, 130, 90, 120);
                rect(85,130,10,10);
                triangle(130, 130, 150, 130, 140, 140);
                rect(135,120,10,10);
                triangle(210, 120, 200, 130, 210, 140);
                rect(210,125,10,10);
                triangle(270, 120, 280, 130, 270, 140);
                rect(260,125,10,10);
                fill(255, 242, 0);
                textSize(30);
                text("Instruction", 70, 100);
                textSize(17);
                text("1:         Up", 60, 135);
                text("Down", 155, 135);
                text("Left", 225, 135);
                text("Right", 285, 135);
                text("2:         Up", 60, 195);
                text("Down", 155, 195);
                text("Left", 225, 195);
                text("Right", 285, 195);
                text("Use Keyboard to control NPC1", 85, 165);
                text("Use Keyboard to control NPC2", 85, 225);
                text("3:  NPCs should avoid obstacles, if ", 60, 255);
                text("collide with them, NPCs will lose", 85, 285);
                text("one heart(Every NPC has 3 hearts)", 85, 315);
                fill(255, 255, 255);
                rect(80,180,20,20);
                rect(130,180,20,20);
                rect(200,180,20,20);
                rect(260,180,20,20);
                rect(320,20,60,20);
                rect(10,20,60,20);
                fill(0, 0, 0);
                text("W", 84, 195);
                text("S", 134, 195);
                text("A", 204, 195);
                text("D", 264, 195);
                textSize(20);
                text("NEXT", 322, 37);
                text("BACK", 12, 37);

            }else if(start === 2){
                background(85, 106, 163);
                fill(255, 255, 255);
                rect(10,20,60,20);
                fill(0, 0, 0);
                textSize(20);
               text("BACK", 12, 37);

                for(var i = 0; i < NPC.length; i ++){
                    scale(0.7);
                    NPC[i].draw();
                    NPC[i].move();
                    scale(1.45);
                }

            }else if(start === 3){
                background(85, 106, 163);
                fill(255, 255, 255);
                rect(10,20,60,20);
                fill(0, 0, 0);
                textSize(20);
                text("BACK", 12, 37);
            }else if(start === 4){
                background(85, 106, 163);
                fill(255, 255, 255);
                rect(10,20,60,20);
                fill(0, 0, 0);
                textSize(20);
                text("BACK", 12, 37);
            }

        };
}};
