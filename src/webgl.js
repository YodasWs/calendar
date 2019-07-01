/***********************************************************************************/
// Forked from MDN's WebGL Tutorial
// https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample5/webgl-demo.js

const WebGL = (function() {

	let gl;
	let buffers;
	let programInfo;
	let shaderProgram;

	const init = (canvas) => {
		gl = canvas.getContext('webgl');

		// Initialize a shader program; this is where all the lighting
		// for the vertices and so forth is established.
		shaderProgram = initShaderProgram(gl);

		// Collect all the info needed to use the shader program.
		// Look up which attributes our shader program is using
		// for aVertexPosition, aVevrtexColor and also
		// look up uniform locations.
		programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
				vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
				cameraMatrix: gl.getUniformLocation(shaderProgram, 'uCameraMatrix'),
			},
		};
	};

	let cameraMatrix = matrix.flatten(matrix.identity(4));

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl) {
	// Vertex shader program
	const vsSource = `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;
		uniform mat4 uCameraMatrix;
		uniform mat4 uProjectionMatrix;
		varying lowp vec4 vColor;
		void main(void) {
			gl_Position = uProjectionMatrix * uCameraMatrix * aVertexPosition;
			vColor = aVertexColor;
		}
	`;

	// Fragment shader program
	const fsSource = `
		varying lowp vec4 vColor;
		void main(void) {
			gl_FragColor = vColor;
		}
	`;

	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

	// Create the shader program

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	// If creating the shader program failed, alert

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}

	return shaderProgram;
}

//
// creates a shader of the given type, uploads the source, and compiles it.
//
function loadShader(gl, type, source) {
	const shader = gl.createShader(type);

	// Send the source to the shader object

	gl.shaderSource(shader, source);

	// Compile the shader program

	gl.compileShader(shader);

	// See if it compiled successfully

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

//
// Draw the scene.
//
function drawScene(bufferData) {
	// Clear the canvas before we start drawing on it.
	gl.clearColor(1, 1, 1, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clearDepth(1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Perspective
	const projectionMatrix = (() => {
		const S = 2;
		return matrix.flatten([
			[S * gl.canvas.height / gl.canvas.width, 0, 0, 0],
			[0, S, 0, 0],
			[0, 0, -1 / 2, 0],
			[0, 0, 0, 1],
		]);
	})();

	bufferData.forEach((buffer) => {
		const buffers = {
			indices: gl.createBuffer(),
			colors: gl.createBuffer(),
			points: gl.createBuffer(),
		};

		// Set Colors Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colors);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matrix.flatten(buffer.pointColors)), gl.STATIC_DRAW);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexColor,
			4, // number of bytes per color
			gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

		// Set Vertices Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.points);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matrix.flatten(buffer.renderedPoints)), gl.STATIC_DRAW);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition,
			3, // number of bytes per point
			gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

		// Set Indices Buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(buffer.indices), gl.STATIC_DRAW);

		// Tell WebGL to use our program when drawing
		gl.useProgram(programInfo.program);

		// Set Uniform Matrices
		gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
		gl.uniformMatrix4fv(programInfo.uniformLocations.cameraMatrix, false, cameraMatrix);

		// TODO: gl.drawElements
		gl.drawElements(buffer.drawType, buffer.indices.length, gl.UNSIGNED_SHORT, 0);
	});
}

//
// Rotate View
//
function rotateCamera(x, y, z) {
	cameraMatrix = matrix.flatten([
		...matrix.axonometric(x, y, z).map(r => r.push(0) && r),
		[0, 0, 0, 1],
	]);
}

return {
	rotateCamera,
	drawScene,
	init,
}

})();
