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
        var walls = [];
        var players = [];
        var traps = [];
        var exits = [];
        var lights = [];
        var players = [];
        var iterations = 0;
        var initial = 0;
        var wallImage = loadImage("Template_files/wall.png");

        // helper function
        var checkCollision = function(x1, y1, w1, h1, x2, y2, w2, h2) {
            if (x1 < x2 + w2 && x1 + w1 > x2)
            {
                if (y1 + h1 > y2 && y1 < y2 + h2)
                {
                    return true;
                }
            }
            return false;
        };

        // START - initialize objects =================================================
        var wallObj = function(x, y)
        {
            this.x = x;
            this.y = y;
        };

        var exitObj = function(x, y) {
            this.x = x;
            this.y = y;
        };
        
        var lightObj = function(x, y) {
            this.x = x;
            this.y = y;
            k = random(0, 2);
            this.off = false;
            this.delay = random(1, 3);
            if (k < 1)
            {
                this.kind = 0; // white
            }
        
            if (k >= 1)
            {
                this.kind = 1; // black
            }
            this.angle = 0;
            this.angleSpeed = 0.02;
            this.lastTime = millis();
        };

        var initTilemap = function(tilemap) {
            walls = [];
            players = [];
            traps = [];
            exits = [];
            lights = [];
            for (var i = 0; i< tilemap.length; i++) {
                for (var j = 0; j < tilemap[i].length; j++) {
                    switch (tilemap[i][j]) {
                        case 'w': 
                            walls.push(new wallObj(j*40, i*40));
                            break;
                        case '1':
                            players.push(new NPC1Obj(j*40, i*40));
                            break;
                        case '2':
                            players.push(new NPC2Obj(j*40, i*40));
                            break;
                        case 'e':
                            exits.push(new exitObj(j*40, i*40 - 40));
                            break;    
                        case 'l':
                            lights.push(new lightObj(j*40, i*40));
                            break;
                    }
                }
            }
        };

        var NPC1Obj = function(x,y){//create NPC 1 object
            this.color = 1;
            this.position = new PVector(x, y);
            this.NPC = [];
            this.NPCL = [];
            this.Lspeed =-0.5;
            this.Rspeed = 0.5;
            this.Lrotate = 0;
            this.Rrotate = 0;

            this.LspeedLeg =-0.5;
            this.RspeedLeg = 0.5;
            this.LrotateLeg = 0;
            this.RrotateLeg = 0;

            this.direction =0;
			this.isStill = 1;
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
            this.color = 0;
            this.position = new PVector(x, y);
            this.NPC = [];
            this.NPCL = [];
            this.Lspeed =-0.5;
            this.Rspeed = 0.5;
            this.Lrotate = 0;
            this.Rrotate = 0;

            this.LspeedLeg =-0.5;
            this.RspeedLeg = 0.5;
            this.LrotateLeg = 0;
            this.RrotateLeg = 0;

            this.direction =0;
			this.isStill = 1;
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

        var copObj = function(x,y){//create NPC 1 object
            this.position = new PVector(x, y);
            this.NPC = [];
            this.NPCL = [];
            this.Lspeed =-0.5;
            this.Rspeed = 0.5;
            this.Lrotate = 0;
            this.Rrotate = 0;

            this.LspeedLeg =-0.5;
            this.RspeedLeg = 0.5;
            this.LrotateLeg = 0;
            this.RrotateLeg = 0;

            this.direction =0;
            this.NPC.push(loadImage("Template_files/copRbody.png"));
            this.NPC.push(loadImage("Template_files/copRarm.png"));
            this.NPC.push(loadImage("Template_files/copRarm2.png"));
            this.NPC.push(loadImage("Template_files/copRleg1.png"));
            this.NPC.push(loadImage("Template_files/copRleg2.png"));

            this.NPCL.push(loadImage("Template_files/copLbody.png"));
            this.NPCL.push(loadImage("Template_files/copLarm.png"));
            this.NPCL.push(loadImage("Template_files/copLarm2.png"));
            this.NPCL.push(loadImage("Template_files/copLleg1.png"));
            this.NPCL.push(loadImage("Template_files/copLleg2.png"));
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

        // END -- initialize objects ===========================================================================================
        var NPCarray = [new NPC1Obj(0,30),new NPC2Obj(100,30) ];
        var cop = new copObj(0,200);
        var star =[];
        var insBlock = [new insBlockObj(600,350),new insBlockObj(600,450),new insBlockObj(600,550),new insBlockObj(600,650)];
        var house = new houseObj(0,250);

        for(var j = 0; j < 300; j++){
             star[j] = new starObj(random(0,1280),random(0,400));
        }

        // START - draw objects =============================================================================
        var backGroundDraw = function(w, h) {
            stroke(0);
            strokeWeight(1);
            fill(143, 132, 127);
            for (var y=0; y <= h; y+=20) {
                for (var x=0; x <w; x+= 50) {
                    rect(x, y, 50, 20);
                }
                y += 20;
                for (var x=-25; x < w; x += 50) {
                    rect(x, y, 50, 20);
                }
            }
        };

        wallObj.prototype.draw = function() {
            image(wallImage, this.x, this.y, 40, 40);
        };

        exitObj.prototype.draw = function() {
            fill(130, 87, 87);
            rect(this.x, this.y, 80, 80);
            fill(0);
            rect(this.x + 10, this.y + 10, 80 - 20, 80 - 10);
        };
        
        lightObj.prototype.draw = function() {
            var xr = this.x + 20;
            var yr = this.y;
            fill(0);
            ellipse(xr, yr, 5, 5);
            pushMatrix();
            translate(xr, yr);
            //rotate(this.angle);
            noStroke();
            fill(255, 213, 0);
            var x = -20;
            var y = 0;
            rect(x + 12.5, y, 15, 20);
            // 32.5 - 7.5 = 25
            quad(x + 12.5, y + 20, x + 12.5 + 15, y + 20, x + 12.5 + 15 + 5, y + 25, x + 12.5 - 5, y + 25);
            stroke(0);
            line(x + 12, y + 20, x + 27.5, y + 20);
            var xc = x + 20;
            var yc = y + 8;
            line(xc, yc, xc, yc + 5);
            line(xc - 5, yc + 0.5, xc - 5, yc + 5 - 0.5);
            line(xc + 5, yc + 0.5, xc + 5, yc + 5 - 0.5);
            //line(xc - 9.5, yc + 1, xc - 9.5, yc + 4);
            //line(xc + 9, yc + 1, xc + 9, yc + 4);
            var xl = x + 12.5 - 5;
            var yl = y + 25;
            noStroke();
            var r, g, b;
            if (this.kind === 0) {
                r = 255;
                g = 255;
                b = 255;
            }
            else {
                r = 28;
                g = 3;
                b = 28;
            }
            
            if (this.off) {
                if (millis() - this.lastTime > 3000) // 3s
                {
                    this.off = false;
                    this.lastTime = millis();
                }
            }
            else {
                if (millis() - this.lastTime > this.delay * 1000)
                {
                    this.off = true;
                    this.lastTime = millis();
                }
            }
            if (!this.off) {
            fill(r, g, b, 80);
            rect(xl, yl, 24.5, 20);
            fill(r, g, b, 70);
            rect(xl, yl + 20, 24.5, 10);
            fill(r, g, b, 60);
            rect(xl, yl + 30, 24.5, 5);
            fill(r, g, b, 50);
            rect(xl, yl + 35, 24.5, 2);
            }
            //if (this.angle < (-PI/2 + 0.1) || this.angle > (PI/2 - 0.1)) {
             //   this.angleSpeed = -this.angleSpeed;
            //}
            popMatrix();
            //this.angle += this.angleSpeed;
        };

        var drawTilemap = function() {
            for (var i=0; i<walls.length; i++) {
                walls[i].draw();
            }
            for (var i=0; i<players.length; i++) {
                players[i].draw();
            }
            for (var i=0; i<exits.length; i++) {
                exits[i].draw();
            }
            for (var i=0; i<lights.length; i++) {
                lights[i].draw();
            }
        };
        
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
			if(this.isStill === 1){
				this.RrotateLeg = 0;
				this.LrotateLeg = 0;
				this.Rrotate = 0;
				this.Lrotate = 0;
			}
			
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
			}
			else{
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

        NPC1Obj.prototype.move = function() {
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
			if(this.isStill === 1){
				this.RrotateLeg = 0;
				this.LrotateLeg = 0;
				this.Rrotate = 0;
				this.Lrotate = 0;
			}
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

        copObj.prototype.draw = function() {//draw NPC 1 object

            if(this.direction === 0){
                pushMatrix();
                translate(this.position.x+40,this.position.y+70);
                rotate(this.RrotateLeg);
                image(this.NPC[4],0,0,20,20);
                popMatrix();

                pushMatrix();
                translate(this.position.x+25,this.position.y+70);
                rotate(this.LrotateLeg);
                image(this.NPC[3],0,0,20,20);
                popMatrix();



                pushMatrix();
                translate(this.position.x+40,this.position.y+50);
                rotate(this.Rrotate);
                image(this.NPC[2],0,0,20,20);
                popMatrix();

                image(this.NPC[0],this.position.x,this.position.y,80,80);

                pushMatrix();
                translate(this.position.x+25,this.position.y+50);
                rotate(this.Lrotate);
                image(this.NPC[1],-20,0,20,20);
                popMatrix();
            }else{
                pushMatrix();
                translate(this.position.x+35,this.position.y+75);
                rotate(this.RrotateLeg);
                image(this.NPCL[4],0,0,20,20);
                popMatrix();

                pushMatrix();
                translate(this.position.x+20,this.position.y+75);
                rotate(this.LrotateLeg);
                image(this.NPCL[3],0,0,20,20);
                popMatrix();



                pushMatrix();
                translate(this.position.x+30,this.position.y+50);
                rotate(this.Lrotate);
                image(this.NPCL[1],-20,0,20,20);
                popMatrix();

                image(this.NPCL[0],this.position.x,this.position.y,80,80);


                pushMatrix();
                translate(this.position.x+55,this.position.y+50);
                rotate(this.Rrotate);
                image(this.NPCL[2],0,0,20,20);
                popMatrix();
            }


        };

        copObj.prototype.move = function() {//ball move in arc line
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

        var drawStarting = function() {
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
        }

        var drawIns = function()
        {
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
        };
        // END - draw Objects ===================================================================================


        // START - tilemaps ==================================
        // 1280 * 720  ==>  32 * 18
        var tilemap1 = [
    "--------------------------------",
    "-------------------------e------",
    "------wwwwwwwwwwwwwwwwwwwwwwwwww",
    "--------l--------l--------------",
    "--------------t-----------------",
    "wwwwwwwwwwwwwwwwwwwwwwww--------",
    "--------------l-----------------",
    "------------t--------------t----",
    "------wwwwwwwwwwwwwwwwwwwwwwwwww",
    "--------------------------------",
    "------------t-------------------",
    "wwwwwwwwwwwwwwwwwwwwwwwww-------",
    "----------------l---------------",
    "-------------t------------------",
    "-------wwwwwwwwwwwwwwwwwwwwwwwww",
    "-----------l----------------1-2-",
    "--------------------------------",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ];

        // END - tilemaps =========================================================

        // START - functionality ===================================================================
        lightObj.prototype.found = function(player) {
            if (this.off) {
                return false;
            }

            var x1 = this.x + 7.5;
            var y1 = this.y + 25;
            var x2 = player.position.x;
            var y2 = player.position.y;
            if (checkCollision(x1, y1, 24.5, 35, x2, y2, 40, 80) && this.kind != player.color) {
                return true;
            }
            return false;
        };

        exitObj.prototype.collide = function(x2, y2, w2, h2) {
            var x1 = this.x + 10 + 30;
            var y1 = this.y + 10;
            var w1 = 60;
            var h1 = 70;
            if (checkCollision(x1, y1, w1, h1, x2, y2, w2, h2))
            {
                return true;
            }
            return false;
        }

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
                    initTilemap(tilemap1);
                }
            }else if(start === 1){//enter instruction
                if(mouseX < 70 && mouseX > 10 && mouseY < 40 && mouseY >20)
                {
                    start = 0;
                }
            }
            else if(start === 2){//enter
                if(mouseX < 70 && mouseX > 10 && mouseY < 40 && mouseY >20)
                {
                    start = 0;
                }
            }
            else if(start === 3){//enter
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
            if (start === 4) {
            if (keyCode === LEFT) {
                players[0].direction = 1;
				players[0].isStill = 0;
                players[0].move();
                players[0].position.x -= 10;

            }else if (keyCode === RIGHT){
                players[0].direction = 0;
				players[0].isStill = 0;
                players[0].move();
                players[0].position.x += 10;
            }else if (key.code === 97) {
                players[1].direction = 1;
				players[1].isStill = 0;
                players[1].move();
                players[1].position.x -= 10;
            }else if (key.code === 100){
                players[1].direction = 0;
				players[1].isStill = 0;
                players[1].move();
                players[1].position.x += 10;
            }
        }
        };
		
		var keyReleased = function() {
		    if (start === 4) {
				if (keyCode === LEFT) {
					players[0].isStill = 1;

				}else if (keyCode === RIGHT){
					players[0].isStill = 1;
					
				}else if (key.code === 97) {
					players[1].isStill = 1;

				}else if (key.code === 100){
					players[1].isStill = 1;

				}
			}
		};
        var checkGameEnd = function()
        {
            for (var i=0; i < players.length; i++) {
                var player = players[i];
                var x2 = player.position.x;
                var y2 = player.position.y;
                for (var j=0; j < lights.length; j++) {
                    if (lights[j].found(player)) {
                        start = 5;
                        return;
                    }
                }
                for (var j=0; j < exits.length; j++) {
                    var exit = exits[j];
                    if (exit.collide(x2, y2, 40, 80)) {
                        start = 6;
                        return;
                    }
                }
            }
        };

        // END - funtionality =========================================================================

        var draw = function() {
            if(start===0){//start screen
                drawStarting();
            }else if (start === 1){//instruction
                drawIns();
            }else if(start === 2){ 
                background(85, 106, 163);
                fill(255, 255, 255);
                rect(10,20,60,20);
                fill(0, 0, 0);
                textSize(20);
               text("BACK", 12, 37);
            }else if(start === 3){ // one players
                background(85, 106, 163);
                fill(255, 255, 255);
                rect(10,20,60,20);
                fill(0, 0, 0);
                textSize(20);
                text("BACK", 12, 37);
            }else if(start === 4){
                background(85, 106, 163);
                backGroundDraw(1280, 720);
                fill(255, 255, 255);
                rect(10,20,60,20);
                fill(0, 0, 0);
                textSize(20);
                text("BACK", 12, 37);
                drawTilemap();
                checkGameEnd();

            }
            else if (start === 5) { // lose
                background(85, 106, 163);
                text("You Lose", 500, 300);
            }
            else if (start === 6) { // win
                background(85, 106, 163);
                text("You Win", 500, 300);
            }

        };
}};
