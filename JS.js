const body = document.body;
var val = [];
var x_add = [-1, 0, 1, 0];
var y_add = [0, 1, 0, -1];
var checker = [];
var NUMBER_OF_CHANGE = 10;
var str = "";
var second = 0;
function change(x, y)
{
    let num = x*10+y;
    let text = num.toString();
    //document.getElementById("demo").innerHTML = text;
    if(val[x][y]==0) document.getElementById(text).style.backgroundColor = 'black';
    else document.getElementById(text).style.backgroundColor = 'peachpuff';
    val[x][y] ^= 1;
}
function checker_change(x, y)
{
    checker[x][y] ^= 1;
    for(let i = 0; i< 4; i++)
    {
        let xnew = x+x_add[i], ynew = y+y_add[i];
        if(xnew<0||xnew>=3||ynew<0||ynew>=3) continue;
        checker[xnew][ynew] ^= 1;
    }
}
function CHECK_RESULT()
{
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j< 3; j++)
        {
            if(checker[i][j]!=val[i][j]) 
            {
                document.getElementById("HEADING").innerHTML = "YOU'RE SO DUMBBBB !!!!!!!!!!!!!!!!!";
                document.getElementById("ANSWER").innerHTML = str;
                return;
            }
        }
    }
    document.getElementById("HEADING").innerHTML = "YOU'RE A GENIUS !!!!!!!!!!!!!!!!!";
}
function EVENTCHANGE(x, y)
{
    if(NUMBER_OF_CHANGE>=3||second<0) return;
    change(x,y);
    for(let i = 0; i< 4; i++)
    {
        let xnew = x+x_add[i], ynew = y+y_add[i];
        if(xnew<0||xnew>=3||ynew<0||ynew>=3) continue;
        change(xnew,ynew);
    }
    NUMBER_OF_CHANGE++;
    document.getElementById("MOVE").innerHTML = (3-NUMBER_OF_CHANGE).toString()+ " MOVES LEFT";
    if(NUMBER_OF_CHANGE==3)
    {
        CHECK_RESULT();
    }
}
function random(min, max) {
    return Math.min(max,Math.floor(Math.random() * (max - min) ) + min);
}
function init() 
{
    NUMBER_OF_CHANGE = 0;
    document.getElementById("HEADING").innerHTML = "GO FOR IT !!!!!!!";
    document.getElementById("ANSWER").innerHTML = "";
    document.getElementById("MOVE").innerHTML = "3 MOVES LEFT";
    document.getElementById("BUTT").style.display = "none";
    for(let i = 0; i< 3; i++)
    {
        for(let j = 0; j< 3; j++)
        {
            checker[i][j] = 0;
            val[i][j] = 0;
            let num = i*10+j;
            let text = num.toString();
            document.getElementById(text).style.backgroundColor = 'peachpuff';
            document.getElementById("small"+text).style.backgroundColor = 'peachpuff';
        }
    }
    for(let i = 0; i< 3; i++)
    {
        for(let j = 0; j< 3; j++)
        {
            if(random(0,2)==1)
            {
                change(i, j);
            }
        }
    }
    for(let i = 0; i< 3; i++)
    {
        for(let j = 0; j< 3; j++)
        {
            checker[i][j] = val[i][j];
        }
    }
    str = "";
    for(let i = 0; i< 3; i++)
    {
        let number1 = random(0, 3); let number2 = random(0, 3);
        checker_change(number1, number2);
        number1++; number2++;
        let str1 = number1.toString(); let str2 = number2.toString();
        str += "[ " + str1 + " , " + str2 + " ] ";
    }
    for(let i = 0; i< 3; i++)
    {
        for(let j = 0; j< 3; j++)
        {
            if(checker[i][j]==1)
            {
                let num = i*10+j;
                let text = num.toString();
                document.getElementById("small"+text).style.backgroundColor = "black";
            }
        }
    }
    document.getElementById("timer").innerHTML = "2 m 0 s"
    second = 119;
    const COUNTDOWN = setInterval(function()
    {
        if(NUMBER_OF_CHANGE==3) 
        {
            clearInterval(COUNTDOWN);
        document.getElementById("BUTT").style.display = "initial";
            return;
        }
        if(second==-1) return;
        document.getElementById("timer").innerHTML = Math.floor(second/60).toString() + " m " + (second%60).toString() + " s";
        if(second==0) 
        {
            document.getElementById("HEADING").innerHTML = "TIME'S UP";
            clearInterval(COUNTDOWN);
            document.getElementById("BUTT").style.display = "initial";
        }
        second--;
    }, 1000);
}
function main()
{
    const small_tab = document.getElementById("right");
    for(let i = 0; i < 3; i++)
    {
        const small_tr = small_tab.insertRow();
        for(let j = 0; j< 3; j++)
        {
            const small_tc = small_tr.insertCell();
            let x = document.createElement("div");
            x.className = "block";
            let num = i*10+j;
            let text = num.toString();
            x.setAttribute("id","small"+text);
            small_tc.appendChild(x);
        }
    }
    const tab = document.getElementById("left");
    for(let i = 0; i < 3; i++)
    {
        const tr = tab.insertRow();
        var value = [];
        var checker_row = [];
        for(let j = 0; j< 3; j++)
        {
            checker_row.push(0);
            value.push(0);
            const tc = tr.insertCell();
            let x = document.createElement("div");
            x.className = "block";
            let num = i*10+j;
            let text = num.toString();
            //document.getElementById("demo").innerHTML = text;
            x.setAttribute("id",text);
            x.addEventListener("click", function(){EVENTCHANGE(i, j)});
            tc.appendChild(x);
            //document.getElementById(text).innerHTML = 'gay';
        }
        val.push(value);
        checker.push(checker_row);
    }
    
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j< 3; j++)
        {
            let num = i*10+j;
            let text = num.toString();
            document.getElementById("small"+text).style.width = "80px";
            document.getElementById("small"+text).style.height = "80px";
        }
    }
}
main();
