'use strict';
if (!Date.now)
Date.now = function() { return new Date().getTime(); };
(function() {
    'use strict';
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
            nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

function Game(id,params){
    var _ = this;
    var settings = {
        width:960,						//canvas width
        height:640						//canvas height
    };
    Object.assign(_,settings,params);
    var $canvas = document.getElementById(id);
    $canvas.width = _.width;
    $canvas.height = _.height;
    var _context = $canvas.getContext('2d');	//Canvas context
    var _stages = [];							//Scene Object Queue
    var _events = {};							//collection of events
    var _index=0,								//current scene index
        _hander;  								//Frame Animation Control
//active object construction
    var Item = function(params){
        this._params = params||{};
        this._id = 0;               //identifier
        this._stage = null;         //Bind to owning scene
        this._settings = {
            x:0,					//Position coordinates: abscissa
            y:0,					//Position coordinates: vertical coordinates
            width:20,				//width
            height:20,				//high
            type:0,					//Object type, 0 means common object (not bound to map), 1 means player control object, 2 means program control object
            color:'#F00',			//logo color
            status:1,				//Object status, 0 means inactive/end, 1 means normal, 2 means pause, 3 means temporary, 4 means abnormal
            orientation:0,			//Current positioning direction, 0 means right, 1 means down, 2 means left, 3 means up
            speed:0,				//Moving speed
//map related
            location:null,			//Locate the map, map object
            coord:null,				//If the object is bound to the map, map coordinates need to be set; if not bound, position coordinates should be set
            path:[],				//The path that Npc walks automatically
            vector:null,			//target coordinates
//Layout related
            frames:1,				//Speed ​​level, how many frames of the internal calculator times change once
            times:0,				//Refresh canvas count (for loop animation status judgment)
            timeout:0,				//Countdown (for process animation status judgment)
            control:{},				//Control the cache and handle it when the anchor point is reached
            update:function(){}, 	//Update parameter information
            draw:function(){}		//draw
        };
        Object.assign(this,this._settings,this._params);
    };
    Item.prototype.bind = function(eventType,callback){
        if(!_events[eventType]){
            _events[eventType] = {};
            $canvas.addEventListener(eventType,function(e){
                var position = _.getPosition(e);
                _stages[_index].items.forEach(function(item){
                    if(item.x<=position.x&&position.x<=item.x+item.width&&item.y<=position.y&&position.y<=item.y+item.height){
                        var key = 's'+_index+'i'+item._id;
                        if(_events[eventType][key]){
                            _events[eventType][key](e);
                        }
                    }
                });
                e.preventDefault();
            });
        }
        _events[eventType]['s'+this._stage.index+'i'+this._id] = callback.bind(this);  //绑定作用域
    };
    //map object constructor
    var Map = function(params){
        this._params = params||{};
        this._id = 0;               //identifier
        this._stage = null;         //Bind to owning scene
        this._settings = {
            x:0,					//Map start coordinates
            y:0,
            size:20,				//The width of the map cell
            data:[],				//map data
            x_length:0,				//Two-dimensional array x-axis length
            y_length:0,				//Two-dimensional array y-axis length
            frames:1,				//Speed ​​level, how many frames of the internal calculator times change once
            times:0,				//Refresh canvas count (for loop animation status judgment)
            cache:false,    		//Whether it is static (if it is static, set the cache)
            update:function(){},	//update map data
            draw:function(){},		//draw a map
        };
        Object.assign(this,this._settings,this._params);
    };
    //Get the value of a point on the map
    Map.prototype.get = function(x,y){
        if(this.data[y]&&typeof this.data[y][x]!='undefined'){
            return this.data[y][x];
        }
        return -1;
    };
    //Set the value of a point on the map
    Map.prototype.set = function(x,y,value){
        if(this.data[y]){
            this.data[y][x] = value;
        }
    };
    //Convert map coordinates to canvas coordinates
    Map.prototype.coord2position = function(cx,cy){
        return {
            x:this.x+cx*this.size+this.size/2,
            y:this.y+cy*this.size+this.size/2
        };
    };
    //Convert canvas coordinates to map coordinates
    Map.prototype.position2coord = function(x,y){
        var fx = Math.abs(x-this.x)%this.size-this.size/2;
        var fy = Math.abs(y-this.y)%this.size-this.size/2;
        return {
            x:Math.floor((x-this.x)/this.size),
            y:Math.floor((y-this.y)/this.size),
            offset:Math.sqrt(fx*fx+fy*fy)
        };
    };
    //addressing algorithm
    Map.prototype.finder = function(params){
        var defaults = {
            map:null,
            start:{},
            end:{},
            type:'path'
        };
        var options = Object.assign({},defaults,params);
        if(options.map[options.start.y][options.start.x]||options.map[options.end.y][options.end.x]){ //When the start or end point is set on a wall
            return [];
        }
        var finded = false;
        var result = [];
        var y_length  = options.map.length;
        var x_length = options.map[0].length;
        var steps = Array(y_length).fill(0).map(()=>Array(x_length).fill(0));     //Mapping of steps
        var _getValue = function(x,y){  //获取地图上的值
            if(options.map[y]&&typeof options.map[y][x]!='undefined'){
                return options.map[y][x];
            }
            return -1;
        };
        var _next = function(to){ //Determine whether it is possible to go, and put it into the list
            var value = _getValue(to.x,to.y);
            if(value<1){
                if(value==-1){
                    to.x = (to.x+x_length)%x_length;
                    to.y = (to.y+y_length)%y_length;
                    to.change = 1;
                }
                if(!steps[to.y][to.x]){
                    result.push(to);
                }
            }
        };
        var _render = function(list){//find the line
            var new_list = [];
            var next = function(from,to){
                var value = _getValue(to.x,to.y);
                if(value<1){	//Is it possible to go at the current point
                    if(value==-1){
                        to.x = (to.x+x_length)%x_length;
                        to.y = (to.y+y_length)%y_length;
                        to.change = 1;
                    }
                    if(to.x==options.end.x&&to.y==options.end.y){
                        steps[to.y][to.x] = from;
                        finded = true;
                    }else if(!steps[to.y][to.x]){
                        steps[to.y][to.x] = from;
                        new_list.push(to);
                    }
                }
            };
            list.forEach(function(current){
				next(current,{y:current.y+1,x:current.x});
                next(current,{y:current.y,x:current.x+1});
                next(current,{y:current.y-1,x:current.x});
                next(current,{y:current.y,x:current.x-1});
            });
            if(!finded&&new_list.length){
                _render(new_list);
            }
        };
        _render([options.start]);
        if(finded){
            var current=options.end;
            if(options.type=='path'){
                while(current.x!=options.start.x||current.y!=options.start.y){
                    result.unshift(current);
                    current=steps[current.y][current.x];
                }
            }else if(options.type=='next'){
                _next({x:current.x+1,y:current.y});
                _next({x:current.x,y:current.y+1});
                _next({x:current.x-1,y:current.y});
                _next({x:current.x,y:current.y-1});
            }
        }
        return result;
    };
    //Scene Object Constructor
    var Stage = function(params){
        this._params = params||{};
        this._settings = {
            index:0,                        //Scene Index
            status:0,						//Scene status, 0 means inactive/end, 1 means normal, 2 means pause, 3 means temporary state
            maps:[],						//map queue
            audio:[],						//audio resource
            images:[],						//image resources
            items:[],						//object queue
            timeout:0,						//Countdown (for process animation status judgment)
            update:function(){}				//Sniffing, dealing with the relative relationship of different objects under the layout
        };
        Object.assign(this,this._settings,this._params);
    };
    //add object
    Stage.prototype.createItem = function(options){
        var item = new Item(options);
        //dynamic properties
        if(item.location){
            Object.assign(item,item.location.coord2position(item.coord.x,item.coord.y));
        }
        //relationship binding
        item._stage = this;
        item._id = this.items.length;
        this.items.push(item);
        return item;
    };
    //reset object position
    Stage.prototype.resetItems = function(){
        this.status = 1;
        this.items.forEach(function(item,index){
            Object.assign(item,item._settings,item._params);
            if(item.location){
                Object.assign(item,item.location.coord2position(item.coord.x,item.coord.y));
            }
        });
    };
    //Get list of objects
    Stage.prototype.getItemsByType = function(type){
        return this.items.filter(function(item){
	    return item.type == type;
        });
    };
    //add map
    Stage.prototype.createMap = function(options){
        var map = new Map(options);
        //dynamic properties
        map.data = JSON.parse(JSON.stringify(map._params.data));
        map.y_length = map.data.length;
        map.x_length = map.data[0].length;
        map.imageData = null;
        //relationship binding
        map._stage = this;
        map._id = this.maps.length;
        this.maps.push(map);
        return map;
    };
    //reset map
    Stage.prototype.resetMaps = function(){
        this.status = 1;
        this.maps.forEach(function(map){
            Object.assign(map,map._settings,map._params);
            map.data = JSON.parse(JSON.stringify(map._params.data));
            map.y_length = map.data.length;
            map.x_length = map.data[0].length;
            map.imageData = null;
        });
    };
    //reset
    Stage.prototype.reset = function(){
        Object.assign(this,this._settings,this._params);
        this.resetItems();
        this.resetMaps();
    };
    //bind event
    Stage.prototype.bind = function(eventType,callback){
        if(!_events[eventType]){
            _events[eventType] = {};
            window.addEventListener(eventType,function(e){
                var key = 's' + _index;
                if(_events[eventType][key]){
                    _events[eventType][key](e);
                }
                e.preventDefault();
            });
        }
        _events[eventType]['s'+this.index] = callback.bind(this);	//bind event scope
    };
    //animation start
    this.start = function() {
        var f = 0;		//frame rate calculation
        var timestamp = (new Date()).getTime();
        var fn = function(){
            var now = (new Date()).getTime();
            if(now-timestamp<16){   // Frequency limit to prevent high-brush screen animation from being too fast
                _hander = requestAnimationFrame(fn);
                return false;
            }
            timestamp = now;
            var stage = _stages[_index];
            _context.clearRect(0,0,_.width,_.height);		//clear canvas
            _context.fillStyle = '#000000';
            _context.fillRect(0,0,_.width,_.height);
            f++;
            if(stage.timeout){
                stage.timeout--;
            }
            if(stage.update()!=false){		            //Update returns false, then no drawing
                stage.maps.forEach(function(map){
                    if(!(f%map.frames)){
                        map.times = f/map.frames;		//counter
                    }
                    if(map.cache){
                        if(!map.imageData){
                            _context.save();
                            map.draw(_context);
                            map.imageData = _context.getImageData(0,0,_.width,_.height);
                            _context.restore();
                        }else{
                            _context.putImageData(map.imageData,0,0);
                        }
                    }else{
                    	map.update();
                        map.draw(_context);
                    }
                });
                stage.items.forEach(function(item){
                    if(!(f%item.frames)){
                        item.times = f/item.frames;		   //counter
                    }
                    if(stage.status==1&&item.status!=2){  	//Neither the object nor the scene state is paused
                        if(item.location){
                            item.coord = item.location.position2coord(item.x,item.y);
                        }
                        if(item.timeout){
                            item.timeout--;
                        }
                        item.update();
                    }
                    item.draw(_context);
                });
            }
            _hander = requestAnimationFrame(fn);
        };
        _hander = requestAnimationFrame(fn);
    };
    //animation end
    this.stop = function(){
        _hander&&cancelAnimationFrame(_hander);
    };
    //event coordinates
    this.getPosition = function(e){
        var box = $canvas.getBoundingClientRect();
        return {
            x:e.clientX-box.left*(_.width/box.width),
            y:e.clientY-box.top*(_.height/box.height)
        };
    }
    //Create a scene
    this.createStage = function(options){
        var stage = new Stage(options);
        stage.index = _stages.length;
        _stages.push(stage);
        return stage;
    };
    //designated set
    this.setStage = function(index){
        _stages[_index].status = 0;
        _index = index;
        _stages[_index].status = 1;
        _stages[_index].reset(); //重置
        return _stages[_index];
    };
    //next set
    this.nextStage = function(){
        if(_index<_stages.length-1){
            return this.setStage(++_index);
        }else{
            throw new Error('unfound new stage.');
        }
    };
    //Get a list of scenes
    this.getStages = function(){
        return _stages;
    };
    //Initialize the game engine
    this.init = function(){
        _index = 0;
        this.start();
    };
}
