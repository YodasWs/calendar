"use strict";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==_typeof(t)&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t){r.d(n,a,function(e){return t[e]}.bind(null,a))}return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){r(2),r(3),yodasws.page("home").setRoute({template:"pages/home.html",route:"/"}).on("load",function(){var t=function(){var e=document.querySelector("canvas"),r=e.getContext("webgl"),n=[];function a(t){this.color=t,this.rotation=matrix.identity(3),this.translation=new Array(3).fill(0),this.renderedNormals=[],this.renderedPoints=[],this.pointColors=[],this.indices=[],this.normals=[],this.points=[]}function o(t,e,n,o,i){a.call(this,i),this.points=[[t,e,0],[t,e+o,0],[t+o,e+o,0],[t+o,e,0]],this.indices=[1,0,2,3],this.drawType=r.TRIANGLE_STRIP}function s(t,e,n){a.call(this,n),this.drawType=r.TRIANGLE_STRIP;var o=0;for(var _r=0;_r<360;_r+=4.5){this.points.push([(t+Math.pow(-1,o%2)*e)*Math.cos(_r*Math.PI/180),(t+Math.pow(-1,o%2)*e)*Math.sin(_r*Math.PI/180),0]),this.indices.push(o++)}this.indices.push(0,1)}function h(t,e){a.call(this,e),this.points=[[0,0,0]],this.indices=[0],this.drawType=r.TRIANGLE_FAN;var n=0;for(var _e=0;_e<360;_e+=4.5){this.points.push([t*Math.cos(_e*Math.PI/180),t*Math.sin(_e*Math.PI/180),0]),this.indices.push(++n)}this.indices.push(1)}function c(t,e,n){var o=arguments.length>3&&arguments[3]!==undefined?arguments[3]:!1;a.call(this,n),this.drawType=r.TRIANGLE_STRIP;var i=0;for(var _r2=0;_r2<360;_r2+=4.5){this.points.push([t*Math.cos(_r2*Math.PI/180),t*Math.sin(_r2*Math.PI/180),Math.pow(-1,i%2)*e]),this.normals.push([Math.cos(_r2*Math.PI/180+(o?0:Math.PI)),Math.sin(_r2*Math.PI/180+(o?0:Math.PI)),0]),this.indices.push(i++)}this.indices.push(0,1)}function l(t,e,n){var o=arguments.length>3&&arguments[3]!==undefined?arguments[3]:!1;a.call(this,n),this.drawType=r.TRIANGLE_FAN,this.points=[[0,0,e]],this.normals=[[0,0,o?1:-1]],this.indices=[0];var i=0;for(var _e2=0;_e2<360;_e2+=4.5){this.points.push([t*Math.cos(_e2*Math.PI/180),t*Math.sin(_e2*Math.PI/180),0]),this.normals.push([Math.cos(_e2*Math.PI/180+(o?0:Math.PI)),Math.sin(_e2*Math.PI/180+(o?0:Math.PI)),0]),this.indices.push(++i)}this.indices.push(1)}function m(t,e){a.call(this,e),this.drawType=r.TRIANGLE_STRIP,this.indices=[],this.normals=[],this.points=[];var n=0;for(var _e3=0;_e3<=180;_e3+=180/55){this.points.length;var _r3=0===_e3||180===_e3?1:55;for(var _a=0;_a<360;_a+=360/_r3){if((180!==_e3||180===_e3&&0===_a)&&(this.points.push([t*Math.sin(_e3*Math.PI/180)*Math.cos(_a*Math.PI/180),t*Math.sin(_e3*Math.PI/180)*Math.sin(_a*Math.PI/180),t*Math.cos(_e3*Math.PI/180)]),this.normals.push([Math.sin(_e3*Math.PI/180)*Math.cos(_a*Math.PI/180),Math.sin(_e3*Math.PI/180)*Math.sin(_a*Math.PI/180),Math.cos(_e3*Math.PI/180)])),this.indices.push(n),this.indices.push(Math.max(++n-_r3,0)),180===_e3)for(var _t=1;_t<57;_t++){this.indices.push(this.points.length-_t),this.indices.push(this.points.length-1)}}}}return a.prototype={render:function render(){var _this=this;if(0===this.renderedPoints.length||0===this.renderedNormals.length||0===this.pointColors.length){this.renderedNormals=[],this.renderedPoints=[],this.pointColors=[];var _t2=matrix.multiply(this.rotation,matrix.form2dCol([0,0,1]));this.points.forEach(function(r,n){_this.pointColors.push(_this.color),0===_this.normals.length?_this.renderedNormals.push(_t2):_this.renderedNormals.push(matrix.multiply(_this.rotation,matrix.form2dCol(_this.normals[n]||[0,0,1]))),_this.renderedPoints.push(matrix.multiply(matrix.add(matrix.multiply(_this.rotation,matrix.form2dCol(r)),matrix.form2dCol(_this.translation)),1/e.width/5))})}return this},rotate:function rotate(t,e,r){t*=Math.PI/180,e*=Math.PI/180,r*=Math.PI/180;var n=[[1,0,0],[0,Math.cos(r),Math.sin(r)],[0,-Math.sin(r),Math.cos(r)]],a=[[Math.cos(e),0,Math.sin(e)],[0,1,0],[-Math.sin(e),0,Math.cos(e)]],o=[[Math.cos(t),Math.sin(t),0],[-Math.sin(t),Math.cos(t),0],[0,0,1]];this.rotation=matrix.multiply(matrix.multiply(o,a),n),this.renderedPoints=[]},translate:function translate(t,e,r){this.translation=[t,e,r],this.renderedPoints=[]}},o.prototype={__proto__:a.prototype,constructor:o},s.prototype={__proto__:a.prototype,constructor:s},h.prototype={__proto__:a.prototype,constructor:h},c.prototype={__proto__:a.prototype,constructor:c},l.prototype={__proto__:a.prototype,constructor:l},m.prototype={__proto__:a.prototype,constructor:m},{Circle:s,Sphere:m,Square:o,Cone:l,Disc:h,Ring:c,addShapes:function addShapes(){n.push.apply(n,arguments)},draw:function draw(e){var r=(e*=Number.parseInt(document.getElementById("speed").value,10)/100)%360,a=[];n.forEach(function(t){a.push(t.render(r))}),i(e),WebGL.drawScene(a),d.translate.apply(d,_toConsumableArray(matrix.flatten(matrix.form2dCol([u*Math.cos(r*Math.PI/180),u*Math.sin(r*Math.PI/180),0])))),requestAnimationFrame(t.draw)}}}();function e(){WebGL.rotateCamera(Number.parseInt(document.getElementById("radx").value,10),Number.parseInt(document.getElementById("rady").value,10),Number.parseInt(document.getElementById("radz").value,10))}function r(){WebGL.rotateLight(Number.parseInt(document.getElementById("lightx").value,10),Number.parseInt(document.getElementById("lighty").value,10),Number.parseInt(document.getElementById("lightz").value,10))}function n(){WebGL.zoom(Number.parseInt(document.getElementById("zoom").value,10))}function a(t){t.target.closest("label").querySelector("output").innerText=t.target.value}function o(t){if(t.target.checked)switch(document.querySelectorAll("[data-camera]").forEach(function(e){e.dataset.camera===t.target.value?e.removeAttribute("hidden"):e.setAttribute("hidden","")}),t.target.value){case"origin":e();break;case"surface":i();}}function i(t){var e=t/5%360,r=(l.scale+5)/640/5;WebGL.lookAt([r*Math.sin(0*Math.PI/180),r*Math.cos(0*Math.PI/180),0],[Math.cos(e*Math.PI/180),0,Math.sin(e*Math.PI/180)],[0,Math.sin(0*Math.PI/180),Math.cos(0*Math.PI/180)])}document.getElementById("radx").addEventListener("input",e),document.getElementById("rady").addEventListener("input",e),document.getElementById("radz").addEventListener("input",e),e(),document.getElementById("lightx").addEventListener("input",r),document.getElementById("lighty").addEventListener("input",r),document.getElementById("lightz").addEventListener("input",r),r(),document.getElementById("zoom").addEventListener("input",n),n(),document.querySelectorAll("input[type=\"range\"]").forEach(function(t){t.addEventListener("input",a)}),document.querySelectorAll("[name=\"camera\"]").forEach(function(t){t.addEventListener("input",o)}),document.getElementById("lat").addEventListener("input",i);var s=160,h=255,c=[[1,s/h,1,1],[s/h,1,1,1],[1,1,s/h,1],[s/h,1,s/h,1],[1,s/h,s/h,1],[s/h,s/h,1,1]],l={scale:200,moonScale:5,moonOrbit:385e3,earth:6371,moon:1731.1},u=l.scale*l.moonScale*1.5,m=new t.Sphere(l.scale,c[3]);t.addShapes(m);var d=new t.Sphere(l.scale*l.moonScale/8,c[5]);t.addShapes(d),d.translate(u,0,0);var p=new Array(2).fill(0).map(function(e,r){return new t[r<2?"Ring":"Circle"](u+Math.pow(-1,r%2)*.01,l.scale/10,c[0],!r)});t.addShapes.apply(t,_toConsumableArray(p)),p.forEach(function(t,e){}),function(){var e=document.querySelector("canvas");e.getContext("webgl")?(WebGL.init(e),requestAnimationFrame(t.draw)):console.error("Unable to initialize WebGL. Your browser or machine may not support it.")}()})},function(t,e){var r=function(){var t=function t(_t3){return _t3.map(function(t){return[t]})};function e(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[0,0,1];this.camera=t}var r=function r(t,e){return new Array(t).fill(0).map(function(t){return new Array(e).fill(0)})},n={flatten:function flatten(t){return t.reduce(function(t,e){return t.concat(e)},[])},identity:function identity(t){var e=r(t,t);return e.forEach(function(t,e){return t[e]=1}),e},transpose:function transpose(t){var e=r(t[0].length,t.length);return t.forEach(function(t,r){t.forEach(function(t,n){e[n][r]=t})}),e},add:function add(t,e){if(t.length===e.length&&t[0].length===e[0].length)return"number"==typeof t[0]?t.map(function(t,r){return t+e[r]}):t.map(function(t,r){return t.map(function(t,n){return t+e[r][n]})});console.log("Error! Matrices must be same size!")},multiply:function multiply(t,e){if("number"==typeof e)return"number"==typeof t[0]?t.map(function(t){return t*e}):t.map(function(t){return t.map(function(t){return t*e})});if(t[0].length!==e.length)return void console.log("Error! Matrices are incorrect size!");var n=r(t.length,e[0].length);return t.forEach(function(r,a){e[0].forEach(function(r,o){n[a][o]=e.reduce(function(r,n,i){return r+t[a][i]*e[i][o]},0)})}),n}},a=function a(){for(var _len=arguments.length,t=new Array(_len),_key=0;_key<_len;_key++){t[_key]=arguments[_key]}t=t.map(function(t){return t*Math.PI/180});var e=[[1,0,0],[0,Math.cos(t[0]),Math.sin(t[0])],[0,-Math.sin(t[0]),Math.cos(t[0])]],r=[[Math.cos(t[1]),0,-Math.sin(t[1])],[0,1,0],[Math.sin(t[1]),0,Math.cos(t[1])]],a=[[Math.cos(t[2]),Math.sin(t[2]),0],[-Math.sin(t[2]),Math.cos(t[2]),0],[0,0,1]];return n.multiply(n.multiply(e,r),a)},o=a(180*Math.asin(Math.tan(30*Math.PI/180))/Math.PI,45,0);return e.prototype=_objectSpread(_objectSpread(_objectSpread({},e.prototype),n),{},{create:r,isometric:o,axonometric:a,form2dCol:t,form2dRow:function form2dRow(t){return[t]},projection:function projection(e){var r=n.flatten(n.multiply(a(Number.parseInt(document.getElementById("radx").value,10),Number.parseInt(document.getElementById("rady").value,10),Number.parseInt(document.getElementById("radz").value,10)),t(e)));return[[r[0]/this.camera[2]+this.camera[0]],[r[1]/this.camera[2]+this.camera[1]],[r[2]/this.camera[2]+this.camera[2]]]},crossProduct:function crossProduct(t,e){return t[0]instanceof Array&&(t=n.flatten(t)),e[0]instanceof Array&&(e=n.flatten(e)),[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]},inverseTranspose:function inverseTranspose(t){if(4===t.length&&(t=matrix.flatten(t)),16!==t.length)return console.error("We only do inverse on 4\xD74 matrices!"),matrix.identity(4);var e=t[0],r=t[1],n=t[2],a=t[3],o=t[4],i=t[5],s=t[6],h=t[7],c=t[8],l=t[9],u=t[10],m=t[11],d=t[12],p=t[13],f=t[14],M=t[15],g=e*i-r*o,y=e*s-n*o,x=e*h-a*o,v=r*s-n*i,I=r*h-a*i,P=n*h-a*s,E=c*p-l*d,b=c*f-u*d,L=c*M-m*d,_=l*f-u*p,A=l*M-m*p,S=u*M-m*f,T=1/(g*S-y*A+x*_+v*L-I*b+P*E);return[[(+i*S-s*A+h*_)*T,(-o*S+s*L-h*b)*T,(+o*A-i*L+h*E)*T,(-o*_+i*b-s*E)*T],[(-r*S+n*A-a*_)*T,(+e*S-n*L+a*b)*T,(-e*A+r*L-a*E)*T,(+e*_-r*b+n*E)*T],[(+p*P-f*I+M*v)*T,(-d*P+f*x-M*y)*T,(+d*I-p*x+M*g)*T,(-d*v+p*y-f*g)*T],[(-l*P+u*I-m*v)*T,(+c*P-u*x+m*y)*T,(-c*I+l*x-m*g)*T,(+c*v-l*y+u*g)*T]]},lookAt:function lookAt(t,e,r){var a,o,i,s,h,c,l,u,m,d;var p=t[0],f=t[1],M=t[2],g=e[0],y=e[1],x=e[2];if(Math.abs(p-g)<1e-6&&Math.abs(f-y)<1e-6&&Math.abs(M-x)<1e-6)return n.identity(4);l=p-g,u=f-y,m=M-x,d=Math.hypot(l,u,m),l/=d,u/=d,m/=d;var v=r[0],I=r[1],P=r[2];return a=I*m-P*u,o=P*l-v*m,i=v*u-I*l,d=Math.hypot(a,o,i),d?(a/=d,o/=d,i/=d):(a=0,o=0,i=0),s=u*i-m*o,h=m*a-l*i,c=l*o-u*a,d=Math.hypot(s,h,c),d?(s/=d,h/=d,c/=d):(s=0,h=0,c=0),[[a,s,l,0],[o,h,u,0],[i,c,m,0],[-(a*p+o*f+i*M),-(s*p+h*f+c*M),-(l*p+u*f+m*M),1]]}}),e}();window.matrix=new r},function(t,e){window.WebGL=function(){var t,e,r,n;var a=matrix.flatten(matrix.identity(4)),o=matrix.flatten(matrix.identity(4)),i=matrix.flatten(matrix.identity(3));function s(t,e,r){var n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(n)),t.deleteShader(n),null)}return{rotateCamera:function rotateCamera(t,e,r){a=matrix.flatten([].concat(_toConsumableArray(matrix.axonometric(t,e,r).map(function(t){return t.push(0)&&t})),[[0,0,0,1]])),o=matrix.flatten(matrix.inverseTranspose(a))},rotateLight:function rotateLight(t,e,r){i=matrix.flatten(matrix.axonometric(t,e,r))},drawScene:function drawScene(n){e.clearColor(0,0,0,1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);var s=matrix.flatten([[t*e.canvas.height/e.canvas.width,0,0,0],[0,t,0,0],[0,0,-1,0],[0,0,0,1]]);n.forEach(function(t){var n={indices:e.createBuffer(),normals:e.createBuffer()};t.points.forEach(function(t){}),[{array:t.pointColors,attrib:"vertexColor",numBytes:4},{array:t.renderedPoints,attrib:"vertexPosition",numBytes:3},{array:t.renderedNormals,attrib:"vertexNormal",numBytes:3}].forEach(function(t){e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array(matrix.flatten(t.array)),e.STATIC_DRAW),e.vertexAttribPointer(r.attribLocations[t.attrib],t.numBytes,e.FLOAT,!1,0,0),e.enableVertexAttribArray(r.attribLocations[t.attrib])}),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.indices),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(t.indices),e.STATIC_DRAW),e.useProgram(r.program),e.uniformMatrix4fv(r.uniformLocations.projectionMatrix,!1,s),e.uniformMatrix4fv(r.uniformLocations.cameraMatrix,!1,a),e.uniformMatrix3fv(r.uniformLocations.dLightMatrix,!1,i),e.uniformMatrix4fv(r.uniformLocations.normalMatrix,!1,o),e.drawElements(t.drawType,t.indices.length,e.UNSIGNED_SHORT,0)})},lookAt:function lookAt(t,e,r){a=matrix.flatten(matrix.lookAt(t,e,r)),o=matrix.flatten(matrix.inverseTranspose(a))},init:function init(t){e=t.getContext("webgl"),n=function(t){var e=s(t,t.VERTEX_SHADER,"\n\t\tattribute vec4 aVertexPosition;\n\t\tattribute vec4 aVertexColor;\n\t\tuniform mat4 uProjectionMatrix;\n\t\tuniform mat4 uCameraMatrix;\n\t\tuniform mat4 uNormalMatrix;\n\t\tvarying lowp vec4 vColor;\n\n\t\tuniform mat3 uLightMatrix;\n\t\tvarying highp vec3 vDirectionalVector;\n\n\t\tattribute vec3 aVertexNormal;\n\t\tvarying highp vec3 vTransformedNormal;\n\n\t\tvoid main(void) {\n\t\t\t// Each Point's Projected Position\n\t\t\tgl_Position = uProjectionMatrix * uCameraMatrix * aVertexPosition;\n\n\t\t\tvColor = aVertexColor;\n\n\t\t\t// Undo Camera Rotation to keep Lighting in constant position\n\t\t\tvTransformedNormal = normalize(mat3(uNormalMatrix) * aVertexNormal);\n\n\t\t\tvDirectionalVector = normalize(uLightMatrix * vec3(0, 0, 1));\n\t\t}\n\t\t"),r=s(t,t.FRAGMENT_SHADER,"\n\t\tvarying highp vec3 vLighting;\n\t\tvarying lowp vec4 vColor;\n\t\tvarying highp vec3 vTransformedNormal;\n\t\tvarying highp vec3 vDirectionalVector;\n\n\t\thighp vec3 ambientLight = vec3(0.3, 0.3, 0.3);\n\t\thighp vec3 directionalLightColor = vec3(1, 1, 1);\n\n\t\tvoid main(void) {\n\t\t\t// Directional Light\n\t\t\thighp float directional = max(dot(vTransformedNormal.xyz, vDirectionalVector), 0.0);\n\t\t\t// Apply Lighting on Vertex's Color\n\t\t\thighp vec3 vLighting = ambientLight + (directionalLightColor * directional);\n\t\t\tgl_FragColor = vColor * vec4(vLighting, 1.0);\n\t\t}\n\t\t"),n=t.createProgram();if(t.attachShader(n,e),t.attachShader(n,r),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))return console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(n)),null;return n}(e),r={program:n,attribLocations:{vertexPosition:e.getAttribLocation(n,"aVertexPosition"),vertexNormal:e.getAttribLocation(n,"aVertexNormal"),vertexColor:e.getAttribLocation(n,"aVertexColor")},uniformLocations:{projectionMatrix:e.getUniformLocation(n,"uProjectionMatrix"),cameraMatrix:e.getUniformLocation(n,"uCameraMatrix"),normalMatrix:e.getUniformLocation(n,"uNormalMatrix"),dLightMatrix:e.getUniformLocation(n,"uLightMatrix")}}},zoom:function zoom(e){t=50/e}}}()}]);