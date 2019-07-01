"use strict";const WebGL=function(){let gl;let programInfo;let shaderProgram;const init=canvas=>{gl=canvas.getContext("webgl");shaderProgram=initShaderProgram(gl);programInfo={program:shaderProgram,attribLocations:{vertexPosition:gl.getAttribLocation(shaderProgram,"aVertexPosition"),vertexNormal:gl.getAttribLocation(shaderProgram,"aVertexNormal"),vertexColor:gl.getAttribLocation(shaderProgram,"aVertexColor")},uniformLocations:{projectionMatrix:gl.getUniformLocation(shaderProgram,"uProjectionMatrix"),cameraMatrix:gl.getUniformLocation(shaderProgram,"uCameraMatrix"),normalMatrix:gl.getUniformLocation(shaderProgram,"uNormalMatrix")}}};let cameraMatrix=matrix.flatten(matrix.identity(4));let normalMatrix=matrix.flatten(matrix.identity(4));function initShaderProgram(gl){const vsSource=`
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;
		uniform mat4 uCameraMatrix;
		uniform mat4 uProjectionMatrix;
		varying highp vec3 vLighting;
		varying lowp vec4 vColor;

		attribute vec3 aVertexNormal;

		highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);
		highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.5);
		highp vec3 directionalVector = normalize(vec3(1, 2, 4));

		void main(void) {
			gl_Position = uProjectionMatrix * uCameraMatrix * aVertexPosition;
			vColor = aVertexColor;

			highp float directional = max(dot(aVertexNormal.xyz, directionalVector), 0.0);

			vLighting = ambientLight + (directionalLightColor * directional);
		}
	`;const fsSource=`
		varying highp vec3 vLighting;
		varying lowp vec4 vColor;
		void main(void) {
			gl_FragColor = vColor * vec4(vLighting, 1.0);
		}
	`;const vertexShader=loadShader(gl,gl.VERTEX_SHADER,vsSource);const fragmentShader=loadShader(gl,gl.FRAGMENT_SHADER,fsSource);const shaderProgram=gl.createProgram();gl.attachShader(shaderProgram,vertexShader);gl.attachShader(shaderProgram,fragmentShader);gl.linkProgram(shaderProgram);if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){console.error("Unable to initialize the shader program: "+gl.getProgramInfoLog(shaderProgram));return null}return shaderProgram}function loadShader(gl,type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){console.error("An error occurred compiling the shaders: "+gl.getShaderInfoLog(shader));gl.deleteShader(shader);return null}return shader}function drawScene(bufferData){gl.clearColor(0,0,0,1);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.clearDepth(1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);const projectionMatrix=(()=>{const S=2;return matrix.flatten([[S*gl.canvas.height/gl.canvas.width,0,0,0],[0,S,0,0],[0,0,-1/2,0],[0,0,0,1]])})();bufferData.forEach(buffer=>{const buffers={indices:gl.createBuffer(),normals:gl.createBuffer()};buffer.points.forEach(p=>{});[{array:buffer.pointColors,attrib:"vertexColor",numBytes:4},{array:buffer.renderedPoints,attrib:"vertexPosition",numBytes:3},{array:buffer.renderedNormals,attrib:"vertexNormal",numBytes:3}].forEach(buf=>{gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(matrix.flatten(buf.array)),gl.STATIC_DRAW);gl.vertexAttribPointer(programInfo.attribLocations[buf.attrib],buf.numBytes,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(programInfo.attribLocations[buf.attrib])});gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffers.indices);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(buffer.indices),gl.STATIC_DRAW);gl.useProgram(programInfo.program);gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,false,projectionMatrix);gl.uniformMatrix4fv(programInfo.uniformLocations.cameraMatrix,false,cameraMatrix);gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix,false,normalMatrix);gl.drawElements(buffer.drawType,buffer.indices.length,gl.UNSIGNED_SHORT,0)})}function rotateCamera(x,y,z){cameraMatrix=matrix.flatten([...matrix.axonometric(x,y,z).map(r=>r.push(0)&&r),[0,0,0,1]]);const m=cameraMatrix.slice(0);const x00=m[0][0];const x01=m[0][1];const x02=m[0][2];const x03=m[0][3];const x04=m[1][0];const x05=m[1][1];const x06=m[1][2];const x07=m[1][3];const x08=m[2][0];const x09=m[2][1];const x10=m[2][2];const x11=m[2][3];const x12=m[3][0];const x13=m[3][1];const x14=m[3][2];const x15=m[3][3];const a0=x00*x05-x01*x04;const a1=x00*x06-x02*x04;const a2=x00*x07-x03*x04;const a3=x01*x06-x02*x05;const a4=x01*x07-x03*x05;const a5=x02*x07-x03*x06;const b0=x08*x13-x09*x12;const b1=x08*x14-x10*x12;const b2=x08*x15-x11*x12;const b3=x09*x14-x10*x13;const b4=x09*x15-x11*x13;const b5=x10*x15-x11*x14;const invdet=1/(a0*b5-a1*b4+a2*b3+a3*b2-a4*b1+a5*b0);normalMatrix=matrix.flatten([[(+x05*b5-x06*b4+x07*b3)*invdet,(-x04*b5+x06*b2-x07*b1)*invdet,(+x04*b4-x05*b2+x07*b0)*invdet,(-x04*b3+x05*b1-x06*b0)*invdet],[(-x01*b5+x02*b4-x03*b3)*invdet,(+x00*b5-x02*b2+x03*b1)*invdet,(-x00*b4+x01*b2-x03*b0)*invdet,(+x00*b3-x01*b1+x02*b0)*invdet],[(+x13*a5-x14*a4+x15*a3)*invdet,(-x12*a5+x14*a2-x15*a1)*invdet,(+x12*a4-x13*a2+x15*a0)*invdet,(-x12*a3+x13*a1-x14*a0)*invdet],[(-x09*a5+x10*a4-x11*a3)*invdet,(+x08*a5-x10*a2+x11*a1)*invdet,(-x08*a4+x09*a2-x11*a0)*invdet,(+x08*a3-x09*a1+x10*a0)*invdet]])}return{rotateCamera,drawScene,init}}();