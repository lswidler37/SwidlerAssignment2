"use strict";

// declare global variables
let gl; 
let points;
let colors;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }


    //  Initialize our data for the triangles

    //(red, green, blue) values for all of the vertices
    colors = [];
    
    // And, add our vertices point into our array of points
    points = [];

    //Creating the Image
        
        //Triangles for base
            let color = vec3(.4, .4, .4);
            drawSolidTriangle(-.4, -.8,       //darkest, bottom middle
                                0, -.4,
                               .4, -.8,
                            color);
            color = vec3(.3, .3, .3);
            drawSolidTriangle( -.7, -.4,      //second darkest, bottom left
                               -.4, -.8,
                                 0, -.4,
                            color);  
            color = vec3(.8, .8, .8);
            drawSolidTriangle( .7, -.4,      //second lightest, bottom right
                               .4, -.8,
                                0, -.4,
                            color); 
            color = vec3(.9, .9, .9);
            drawSolidTriangle( .7, -.4,      //lightest, top right
                               .4, 0,
                                0, -.4,
                            color);    
            color = vec3(.8, .8, .8);
            drawSolidTriangle( .4, .0,      //third lightest, top middle
                                 -.4, 0,
                                0, -.4,
                            color);
            color = vec3(.6, .6, .6);
            drawSolidTriangle( -.7, -.4,      //somewhat dark, top left
                               -.4, 0,
                                0, -.4,
                            color);
            color = vec3(.55, .55, .55);
            drawSolidTriangle( -.7, -.4,      //darker, for depth
                               -.58, -.02, 
                               -.4, 0,  
                            color);
            color = vec3(.2, .2, .2);
            drawSolidTriangle( -.7, -.4,      //darkest, for depth
                               -.55, -.75, 
                               -.4, -.8,  
                            color);                
        //Triangles for the plant
            color = vec3(0, .4, .0);
            drawSolidTriangle( -.4, 0,      //plant 1
                              -.2, 0, 
                            -.25, .2,  
                            color);
            color = vec3(0, .5, .0);
            drawSolidTriangle( -.4, 0,      //plant 1
                               -.4, .3, 
                              -.25, .2,  
                            color);
            color = vec3(0, .6, .0);
            drawSolidTriangle( -.3, .4,      //plant 1
                               -.4, .3, 
                              -.25, .2,  
                            color);
            color = vec3(0, .7, .0);
            drawSolidTriangle( -.3, .4,      //plant 1
                               -.4, .3, 
                              -.4, .6,  
                            color);
            color = vec3(0, .4, .0);
            drawSolidTriangle( .1, 0,      //plant 2
                              .3, 0, 
                            .295, .2,  
                            color);
            color = vec3(0, .5, .0);
            drawSolidTriangle( .1, 0,      //plant 2
                               .1, .3, 
                              .295, .2,  
                            color);
            color = vec3(0, .6, .0);
            drawSolidTriangle( .2, .4,      //plant 2
                               .1, .3, 
                              .295, .2,  
                            color);
            color = vec3(0, .7, .0);
            drawSolidTriangle( .2, .4,      //plant 2
                               .1, .3, 
                              .1, .6,  
                            color);
            color = vec3(0, .4, .0);
            drawSolidTriangle( -.1, 0,      //middle plant
                               .05, 0, 
                              -.1, .2,  
                            color);
            color = vec3(0, .5, .0);
            drawSolidTriangle( .05, .3,      //middle plant
                               .05, 0, 
                              -.1, .2,  
                            color);
            color = vec3(0, .6, .0);
            drawSolidTriangle( .05, .3,      //middle plant
                               -.1, .4, 
                              -.1, .2,  
                            color);
            color = vec3(0, .7, .0);
            drawSolidTriangle( .05, .3,      //middle plant
                               -.1, .4, 
                              .05, .5,  
                            color);
            color = vec3(0, .8, .0);
            drawSolidTriangle( -.2, .5,      //middle plant
                               -.1, .4, 
                               .05, .5,  
                            color);
            color = vec3(0, .7, .0);
            drawSolidTriangle( -.2, .5,      //middle plant
                               -.05, .5, 
                               -.2, .7,  
                            color);
                            
    
    

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, .8, .5); //medium blue background

    //  Load shaders and initialize attribute buffers

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );


    render();
};


function drawSolidTriangle(firstx, firsty, secondx, secondy, thirdx, thirdy, color) {
    //Points
        let pt0 = vec2(firstx, firsty);
        let pt1 = vec2(secondx, secondy);
        let pt2 = vec2(thirdx, thirdy);
        points.push(pt0);
        points.push(pt1);
        points.push(pt2);
    //Colors
        colors.push(color);
        colors.push(color);
        colors.push(color);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}
