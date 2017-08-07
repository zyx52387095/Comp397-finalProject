(function(w){
    var FRAME_RATE = 13,    //精灵表播放速度
        SCALE_X = 1.5,    //X轴缩放
        SCALE_Y = 1.5,    //Y轴缩放
        GRAVITY = 3,    //重力加速度
        JUMP_SPEED = 2.6,        //垂直速度
        WIDTH = 40,
        HEIGHT = 96,
        PICWIDTH = 64,
        PICHEIGHT = 64,
        PROPORTION = 150/1;  //游戏与实际的距离比例

    var Man = function(x , y , img){
        this.x = x;
        this.y = y;
        this.endy = y;
        this.vx = 0.5;
        this.vy = 0;
        this.ground = [];
        this.state = "run";
        this.jumpNum = 0;
        this.jumpMax = 1;
        this.init(img);
    }

    Man.prototype = {
        constructors:Man,

        init:function(img){
            var manSpriteSheet = new createjs.SpriteSheet({　　//实例化精灵表绘制器
                "images":[img],
                "frames":{"regX":0,"height":PICWIDTH,"count":45,"regY":1,"width":PICHEIGHT},
                "animations":{
                    "run":{
                        frames:[21,20,19,18,17,16,15,14,13,12],　　　　//精灵表每一帧的位置
                        next:"run",　　　　　　　　　　　　　　　　　　　　//当精灵表循环完后的下一步动作
                        speed:1,　　　　　　　　　　　　　　　　　　　　　　//精灵表播放速度
                    }, 
                    "jump":{
                        frames:[34,35,36,37,38,39,40,41,42,43],
                        next:"run",
                        speed:1,
                    },
                    "die":{
                        frames:[8,7,6,5,4,3,2,1,0],
                        next:"die",
                        speed:1,
                    }
                }
            });
            this.sprite = new createjs.Sprite(manSpriteSheet , this.state);　　//实例化精灵
            this.sprite.framerate = FRAME_RATE;　　　　　　//精灵表绘制速率
            this.sprite.setTransform(this.x, this.y, SCALE_X, SCALE_Y);　　//设置精灵的位置
            stage.addChild(this.sprite);　　　　//添加到舞台
        },

        update:function(){
            var sprite = this.sprite;
            var time = createjs.Ticker.getInterval()/1000;　　　　//获取当前帧与上一帧的时间间隔

            if(this.state==="run"){　　　　　　　　　　
                if(sprite.x<this.x){
                    sprite.x +=this.vx;
                }else {
                    sprite.x = this.x
                }
            }
            if(this.endy>sprite.y||this.state==="jump"){　　//角色的动作处理
                var nexty = sprite.y+time*this.vy*PROPORTION;
                this.vy += time*GRAVITY;
                sprite.y += time*this.vy*PROPORTION;
                if(Math.abs(sprite.y-this.endy)<10&&this.vy>0){
                    this.state = "run";
                    sprite.y=this.endy;
                    this.vy = 0;
                }
            }
            
            if(sprite.x+(PICWIDTH*SCALE_X-WIDTH)/2<0||sprite.y>C_H+200){
                this.die();
                createjs.Ticker.reset();
                alert("you are Die!");
            }

            switch(this.state){
                case "run":
                    this.jumpNum = 0;
                    break;
                case "die":
                    if(sprite.currentFrame===0){
                        sprite.paused = true;
                    }
                break;
            }
        },

        run:function(){
            this.sprite.gotoAndPlay("run")
        },

        jump:function(){
            this.vy = -JUMP_SPEED;
            this.state = "jump";
            this.sprite.gotoAndPlay("jump");　　//让精灵表播放特定的动画
            this.jumpNum++;
        },

        die:function(){
            this.state = "die";
            this.sprite.gotoAndPlay("die")
        },

        size:function(){
            return {
                w:WIDTH,
                h:HEIGHT
            }
        },

        picsize:function(){
            return {
                w:PICWIDTH,
                h:PICHEIGHT
            }
        }
    }

    w.createMan = function(x , y , img){
        return new Man(x , y , img)
    };
})(window)