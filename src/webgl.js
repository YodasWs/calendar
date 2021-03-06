/***********************************************************************************/
// Forked from MDN's WebGL Tutorial
// https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample5/webgl-demo.js

window.WebGL = (function() {

	let S;
	let gl;
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
				vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
				vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
				cameraMatrix: gl.getUniformLocation(shaderProgram, 'uCameraMatrix'),
				normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
				dLightMatrix: gl.getUniformLocation(shaderProgram, 'uLightMatrix'),
			},
		};
	};

	let cameraMatrix = matrix.flatten(matrix.identity(4));
	let normalMatrix = matrix.flatten(matrix.identity(4));
	let dLightMatrix = matrix.flatten(matrix.identity(3));

	//
	// Initialize a shader program, so WebGL knows how to draw our data
	//
	function initShaderProgram(gl) {
		// Vertex shader program
		const vsSource = `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;
		uniform mat4 uProjectionMatrix;
		uniform mat4 uCameraMatrix;
		uniform mat4 uNormalMatrix;
		varying lowp vec4 vColor;

		uniform mat3 uLightMatrix;
		varying highp vec3 vDirectionalVector;

		attribute vec3 aVertexNormal;
		varying highp vec3 vTransformedNormal;

		void main(void) {
			// Each Point's Projected Position
			gl_Position = uProjectionMatrix * uCameraMatrix * aVertexPosition;

			vColor = aVertexColor;

			// Undo Camera Rotation to keep Lighting in constant position
			vTransformedNormal = normalize(mat3(uNormalMatrix) * aVertexNormal);

			vDirectionalVector = normalize(uLightMatrix * vec3(0, 0, 1));
		}
		`;

		// Fragment shader program
		const fsSource = `
		varying highp vec3 vLighting;
		varying lowp vec4 vColor;
		varying highp vec3 vTransformedNormal;
		varying highp vec3 vDirectionalVector;

		highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
		highp vec3 directionalLightColor = vec3(1, 1, 1);

		void main(void) {
			// Directional Light
			highp float directional = max(dot(vTransformedNormal.xyz, vDirectionalVector), 0.0);
			// Apply Lighting on Vertex's Color
			highp vec3 vLighting = ambientLight + (directionalLightColor * directional);
			gl_FragColor = vColor * vec4(vLighting, 1.0);
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
		gl.clearColor(0, 0, 0, 1);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clearDepth(1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Perspective
		const projectionMatrix = (() => {
			return matrix.flatten([
				[S * gl.canvas.height / gl.canvas.width, 0, 0, 0],
				[0, S, 0, 0],
				[0, 0, -1, 0],
				[0, 0, 0, 1],
			]);
		})();

		bufferData.forEach((buffer) => {
			const buffers = {
				indices: gl.createBuffer(),
				normals: gl.createBuffer(),
			};

			buffer.points.forEach((p) => {
			});

			[
				// Colors
				{
					array: buffer.pointColors,
					attrib: 'vertexColor',
					numBytes: 4,
				},
				// Vertices
				{
					array: buffer.renderedPoints,
					attrib: 'vertexPosition',
					numBytes: 3,
				},
				// Normals at Vertices
				{
					array: buffer.renderedNormals,
					attrib: 'vertexNormal',
					numBytes: 3,
				},
			].forEach((buf) => {
				gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matrix.flatten(buf.array)), gl.STATIC_DRAW);
				gl.vertexAttribPointer(
					programInfo.attribLocations[buf.attrib],
					buf.numBytes,
					gl.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray(programInfo.attribLocations[buf.attrib]);
			});

			// Set Indices Buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(buffer.indices), gl.STATIC_DRAW);

			// Tell WebGL to use our program when drawing
			gl.useProgram(programInfo.program);

			// Set Uniform Matrices
			gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
			gl.uniformMatrix4fv(programInfo.uniformLocations.cameraMatrix, false, cameraMatrix);
			gl.uniformMatrix3fv(programInfo.uniformLocations.dLightMatrix, false, dLightMatrix);
			gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix, false, normalMatrix);

			// Draw!
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

		// Undo Camera Rotation to keep Lighting in constant position
		normalMatrix = matrix.flatten(matrix.inverseTranspose(cameraMatrix));
	}

	function rotateLight(x, y, z) {
		dLightMatrix = matrix.flatten(matrix.axonometric(x, y, z));
	}

	function lookAt(eye, center, up) {
		cameraMatrix = matrix.flatten(matrix.lookAt(eye, center, up));
		normalMatrix = matrix.flatten(matrix.inverseTranspose(cameraMatrix));
	}

	function zoom(z) {
		S = 50 / z;
	}

	return {
		rotateCamera,
		rotateLight,
		drawScene,
		lookAt,
		init,
		zoom,
	}

})();
