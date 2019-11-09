//var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
//let lines = [];
//let id = 0;

// var textArea = document.getElementById("my-text-area");
// var arrayOfLines = textArea.value.split("\n"); // arrayOfLines is array where every element is string of one line

function getNewId(){
    id+=1;
    return "l"+id;
}
class Line{
    constructor(x1, y1, x2, y2,lineStyle,lineEnd,color,lbl, id){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.lineStyle = lineStyle;
        this.lineEnd = lineEnd;
        this.color = color;
        this.lbl = lbl; 
        this.id = id;
    }
}

function trololo(){
    let x1 = document.getElementById("txt_x1").value;
    let y1 = document.getElementById("txt_y1").value;
    let x2 = document.getElementById("txt_x2").value;
    let y2 = document.getElementById("txt_y2").value;
    let angle = document.getElementById("txt_angle").value;
    let angle_notation = document.getElementById("select_angle").value;
    
    let lineStyle = document.getElementById("select_line_style").value;
    let lineEnd = document.getElementById("select_line_end").value;
    let color = document.getElementById("colorInput").value;
    let lbl = document.getElementById("txt_label").value;

    //alert("lil dicky"+ x1 + " " + y1 + " " + x2 + " " + y2 + " " + lineStyle + " " + lineEnd + " " + color + " " + lbl);
}
function hideSettings(){
    let a = ["txt_x1","txt_y1","txt_x2","txt_y2","txt_angle","select_angle","select_angle_style","select_line_style","select_line_end","colorInput","txt_label","btnAdd"];

    for(var i=0; i<a.length; i++){
        $('label[for=' + a[i] + '], input#' + a[i]).hide();
    }
    for(var i=0; i<a.length; i++){
        $('#' + a[i]).hide();
    }
}
var svg;
document.addEventListener("DOMContentLoaded", function(event) {
    
    svg = document.getElementById("labels");
    // svg.setAttribute("viewBox", "-256 -256 512 512");
    // // document.body.appendChild(svg);
    // document.getElementById("svg-window").appendChild(svg);
    // //alert("ik ben klaar");
    // document.getElementById("txt_x1").value = 0;
    // document.getElementById("txt_y1").value = 0;
    // document.getElementById("txt_x2").value = 40;
    // document.getElementById("txt_y2").value = 66;
    // document.getElementById("txt_angle").value = 45;
    // document.getElementById("select_angle").value = "Deg";
    // document.getElementById("select_line_style").value = "line-continue";
    // document.getElementById("select_line_end").value = "end-bullet";
    // document.getElementById("colorInput").value = "#00ff00";
    // document.getElementById("txt_label").value = "l";

    // hideSettings();
    // document.getElementById("add_line").addEventListener("click", function() {
    //     //hideSettings();
    //     showLineSettingsCoordPair();
    // });
    // document.getElementById("btnADD").addEventListener("click", function() {
    //     //hideSettings();
    //     addLineSettingsCoordPair();
    // });
    
    document.getElementById("btn_process").addEventListener("click", function() {
        svg.innerHTML = '';
        //hideSettings();
        
        drawLabels();
    });

});
function drawLabels(){

    let textArea = document.getElementById("input_names");

    let lines = textArea.value.split("\n"); // arrayOfLines is array where every element is string of one line
  
    //let labels = document.getElementById("labels"); //array with the text for each label
    let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    let label_width = 30;
    let label_height = 10;
    let label_spacing = 2;
    let x0 = 0;
    let y0 = 0;
    let stock_width = 300;
    let stock_height = 300;
    let printed_labels = 0;
    //svg.setAttribute
    svg.appendChild(drawRect(0,0,stock_width,stock_height,"stroke-width:1; fill: none; stroke: #990000"));
    let labelsInRow = Math.floor(stock_width/(label_width+label_spacing));
    
        for(var i = 0; i < lines.length; i++){
            //code here using lines[i] which will give you each line
            // console.log(lines[i]);
            // var para = document.createElement("p");
            // var node = document.createTextNode(lines[i]);
            // para.appendChild(node);
        
            // labels.appendChild(para);
            svg.appendChild(drawRect(x0,y0,label_width,label_height,"stroke-width:1; fill: none; stroke: #009900"));
            textline = drawText(x0+label_width/2,y0+label_height/2,lines[i],label_height);
            svg.appendChild(textline);
            var box = textline.getBBox();
            console.log(box.width);
            console.log(box.height);
            

            textline.setAttribute("x",x0 - box.width/2 + label_width/2);
            textline.setAttribute("y",y0 + label_height);
            
            x0 += label_spacing + label_width;
            if(x0 + label_width>stock_width){
                x0=0;
                y0+= label_spacing + label_height;
            }
            if(y0>stock_height){
                alert("Out of stock");
            }
            //y0 += label_spacing + label_height;  
        }

}
function drawRect(x,y,width,height,style){
    let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttribute("height",height);
    rect.setAttribute("width",width);
    rect.setAttribute("x",x);
    rect.setAttribute("y",y);
    rect.setAttribute("style",style);   
    return rect;
}
function drawText(x,y,string,label_height){
    let text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("fill", "red");
    let textNode = document.createTextNode(string);
    text.appendChild(textNode);
    text.setAttribute("font-size",label_height*0.8);
    // <text x="0" y="15" fill="red">I love SVG!</text>
    return text;
}
function showLineSettingsCoordPair(){
    let a = ["txt_x1","txt_y1","txt_x2","txt_y2","select_line_style","select_line_end","colorInput","txt_label","btnAdd"];

    for(var i=0; i<a.length; i++){
        $('label[for=' + a[i] + '], input#' + a[i]).show();
    }
    for(var i=0; i<a.length; i++){
        $('#' + a[i]).show();
    }
}
function drawLine(l){
    let line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    line.setAttribute("x1", l.x1);
    line.setAttribute("y1", l.y1 );
    line.setAttribute("x2", l.x2 );
    line.setAttribute("y2", l.y2 );
    line.setAttribute("stroke", l.color);
    line.setAttribute("id",l.id);
    line.setAttribute("stroke-linecap","round");
    line.setAttribute("stroke-width", 2  );
    svg.appendChild(line);
}
function addLineSettingsCoordPair(){
    let x1 = document.getElementById("txt_x1").value;
    let y1 = document.getElementById("txt_y1").value;
    let x2 = document.getElementById("txt_x2").value;
    let y2 = document.getElementById("txt_y2").value;
    let angle = document.getElementById("txt_angle").value;
    let angle_notation = document.getElementById("select_angle").value;
    
    let lineStyle = document.getElementById("select_line_style").value;
    let lineEnd = document.getElementById("select_line_end").value;
    let color = document.getElementById("colorInput").value;
    let lbl = document.getElementById("txt_label").value;

    let l = new Line(x1,y1,x2,y2,lineStyle,lineEnd,color,lbl, getNewId());
    lines.push(l);
    drawLine(l);
}



