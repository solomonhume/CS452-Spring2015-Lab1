// Jiaju Huang 0530537
// jiajhua@clarkson.edu
var canvas;
var gl;
var leng;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    canvas.addEventListener('click', drawNext, false);
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	leng = 5;
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
drawNext();
};

function drawNext(){
	    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    if (leng == 5)
    {var vertices = [
        vec2(  0,  1 ),
        vec2(  1,  0 ),
        vec2(  0, -1 )
    ];}
    else if (leng == 3)
    	{var vertices = [
        vec2(  1,  1 ),
        vec2(  1,  -1 ),
        vec2( -1,  1 ),
        vec2( -1, -1 )
    ];}
    else
    {var vertices = [
        vec2(  0,  0.8 ),
        vec2(  0.8,  0.3 ),
        vec2( -0.8,  0.3 ),
        vec2( -0.4, -0.6 ),
        vec2( 0.4, -0.6 )
    ];}
    // Load the data into the GPU
    leng = vertices.length;
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render();
	}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, leng );
    window.requestAnimFrame(render);
}
