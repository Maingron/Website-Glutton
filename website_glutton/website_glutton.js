// Website Glutton - Original Code by Maingron in 2019 - https://github.com/Maingron/Website-Glutton https://maingron.com/website_glutton

window.onload = function() {
    if(!data) {
        var data = {};
    }
    var objects = {};
    var myOffsetTop = 0;
    var myOffsetLeft = 0;

    data.CSSpath = "website_glutton/website_glutton.css"; // Path to the Glutton CSS file
    data.applyMonsterTo = document.body; // Glutton is a child of this
    if(!data.ticktime) {
        data.ticktime = 100 //ms
    }
    data.maxBlockedFields = 400; // Max length of "trail"

    data.field = { // Size of 1 movement unit
        "oneHeight":10,
        "oneWidth":10
    };

    data.temp = {};
    data.monster = {
        "position": {
            "left":0,
            "top":0
        }
    };
    data.monstername = "monster"; // Name of the monster
    data.mouse = {
        "x":0,
        "y":0
    };
    data.tickcount = 0;

    function init() {
        summonMonster();
        objects.monster = document.getElementById(data.monstername);

        loadCSS();

        data.temp.tagNameAlength = document.body.getElementsByTagName("a").length;

        for(var i=0; data.temp.tagNameAlength > i; i++) {
            data.temp.currentElement = document.body.getElementsByTagName("a")[i]

            data.temp.summon = document.createElement("a");
            data.temp.summon.classList = data.temp.currentElement.classList;
            data.temp.summon.href = data.temp.currentElement.href;
            data.temp.summon.classList.add("monsterthing");
            data.temp.summon.style.top = returnOffsetTop(data.temp.currentElement);
            data.temp.summon.style.left = returnOffsetLeft(data.temp.currentElement);
            data.temp.summon.style.height = data.temp.currentElement.offsetHeight + "px";
            data.temp.summon.style.width = data.temp.currentElement.offsetWidth + "px";

            data.applyMonsterTo.appendChild(data.temp.summon);
        }
    }


    function loadCSS() {
        var link = document.createElement("link");
        link.href = data.CSSpath;
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild( link );
    }

    init();

    function summonMonster() {
        data.temp.summon = document.createElement("div");
        data.temp.summon.id = data.monstername;
        data.applyMonsterTo.appendChild(data.temp.summon);
    }

    function doTick() {
        doMove();
        doRender();

        data.tickcount++;
        data.temp.summon = document.createElement("div");
        data.temp.summon.classList = "monsterhide";
        data.temp.summon.style.top = data.monster.position.top * data.field.oneHeight + "px";
        data.temp.summon.style.left = data.monster.position.left * data.field.oneWidth + "px";
        data.applyMonsterTo.appendChild(data.temp.summon);

        if(data.tickcount > data.maxBlockedFields) {
            document.getElementsByClassName("monsterhide")[0].outerHTML = "";
        }
    }

    function doMove() {
        if(data.mouse.x / data.field.oneWidth > data.monster.position.left) {
            data.monster.position.left++;
        } else if(data.mouse.x / data.field.oneWidth < data.monster.position.left) {
            data.monster.position.left--;
        }

        if(data.mouse.y / data.field.oneHeight > data.monster.position.top) {
            data.monster.position.top++;
        } else if(data.mouse.y / data.field.oneHeight < data.monster.position.top) {
            data.monster.position.top--;
        }
    }

    function doRender() {
        objects.monster.style.top = data.monster.position.top * data.field.oneHeight + "px";
        objects.monster.style.left = data.monster.position.left * data.field.oneWidth + "px";
    }

    function returnOffsetTop(which) {
        myOffsetTop = which.getBoundingClientRect().top + window.pageYOffset;
        return(myOffsetTop + "px");
    }

    function returnOffsetLeft(which) {
        myOffsetLeft = which.getBoundingClientRect().left + window.pageXOffset;
        return(myOffsetLeft + "px");
    }


    window.setInterval(function() {
        doTick();
    }, data.ticktime );

    addEventListener("mousemove",function(event) {
        data.mouse.x = Math.floor(event.pageX / data.field.oneWidth) * data.field.oneWidth;
        data.mouse.y = Math.floor(event.pageY / data.field.oneHeight) * data.field.oneHeight;
    });
};
