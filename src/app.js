/* app.json */
yodasws.page('home').setRoute({
	template: 'pages/home.html',
	route: '/',
}).on('load', () => {
	const canvas = document.querySelector('canvas');

	// If we don't have a GL context, give up now
	if (!canvas.getContext('webgl')) {
		console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	buildCalendar();
});

const x = 0;
const y = 1;
const z = 2;

const radii = {
	scale: 1,
	moonScale: 1,
	moonOrbit: 385 * 1000,
	earth: 6371,
	moon: 1737.4,
};
const moon = {
	radius:			  1.7374, // 1000km
	perigee:		362.6000, // 1000km
	apogee:			405.4000, // 1000km
	semimajorAxis:	384.3990, // 1000km
	orbitalPeriod: 27.321611, // days
	synodicPeriod: 29.530589, // days
	inclination: 5.145,
};
const earth = {
	radius:			     6.3710, // 1000km
	perihelion:		147095.0000, // 1000km
	aphelion:		152100.0000, // 1000km
	semimajorAxis:	149598.0230, // 1000km
	orbitalPeriod: 365.256363004, // days
};

function buildCalendar() {
	const {
		AbstractMesh,
		Animation,
		AnimationGroup,
		Color3,
		Color4,
		DirectionalLight,
		Engine,
		FollowCamera,
		Mesh,
		MeshBuilder,
		Scene,
		SkyMaterial,
		StandardMaterial,
		Texture,
		UniversalCamera,
		Vector3,
		GUI,
		GrassProceduralTexture,
		DynamicTerrain,
	} = BABYLON;

	// First set the scene
	const canvas = document.querySelector('canvas');
	const engine = new Engine(canvas, true);
	const scene = new Scene(engine);
	scene.useRightHandedSystem = true;
	scene.ambientColor = new Color3(0.8, 0.8, 0.8);
	scene.doNotHandleCursors = true;

	// Build the sky
	const skyMaterial = new SkyMaterial('sky', scene);
	skyMaterial.backFaceCulling = false;
	skyMaterial.luminance = 0.2;
	skyMaterial.useSunPosition = true; // Do not set sun position from azimuth and inclination
	skyMaterial.sunPosition = new Vector3(10, 3, 1);
	skyMaterial.turbidity = 2;
	skyMaterial.rayleigh = 3;
	skyMaterial.cameraOffset.y = 200;
	const skybox = MeshBuilder.CreateSphere('skyBox', {
		segments: 5,
		diameter: moon.perigee * 3.2,
	}, scene);
	skybox.material = skyMaterial;
	skybox.position = new Vector3(0, 0, 0);

	const cameras = [
		new UniversalCamera(
			'cameraTopLeftCorner',
			new Vector3(0, 10, moon.radius * 3),
			scene
		),
	];
	cameras[0].lockedTarget = new Vector3(0, 0, 0);
	scene.activeCamera = cameras[0];

	// Define Surface Materials
	const grass = new StandardMaterial('grass', scene);
	grass.ambientColor = new Color3(0x7f / 0xff, 0xe5 / 0xff, 0x70 / 0xff);
	grass.ambientTexture = new GrassProceduralTexture('grassPT', 256, scene);
	grass.specularColor = new Color3(0x50 / 0xff, 0x50 / 0xff, 0x50 / 0xff);

	const asphalt = new StandardMaterial('asphalt', scene);
	asphalt.ambientColor = new Color3(0xb7 / 0xff, 0xb5 / 0xff, 0xba / 0xff);
	asphalt.specularColor = new Color3(0x60 / 0xff, 0x60 / 0xff, 0x60 / 0xff);
	const rpt = new GrassProceduralTexture('asphaltPT', 256, scene);
	rpt.grassColors = [
		new Color3(0xb7 / 0xff, 0xb5 / 0xff, 0xba / 0xff),
		new Color3(0x87 / 0xff, 0x85 / 0xff, 0x8a / 0xff),
		new Color3(0x97 / 0xff, 0x95 / 0xff, 0x9a / 0xff),
	];
	asphalt.ambientTexture = rpt;

	const black = new StandardMaterial('black', scene);
	black.diffuseColor = new Color3(1 / 0xff, 1 / 0xff, 1 / 0xff);
	black.ambientColor = new Color3(1 / 0xff, 1 / 0xff, 1 / 0xff);

	const trackSiding = new StandardMaterial('trackSiding', scene);
	trackSiding.diffuseColor = new Color3(0xeb / 0xff, 0x58 / 0xff, 0x63 / 0xff);
	trackSiding.ambientColor = new Color3(0xeb / 0xff, 0x58 / 0xff, 0x63 / 0xff);
	trackSiding.specularColor = new Color3(0xa0 / 0xff, 0xa0 / 0xff, 0xa0 / 0xff);

	// Add ground
	/*
	const dtGround = (() => {
		const vertexSpacing = moon.apogee / 100;
		const mapSubX = 200;
		const mapSubZ = 200;
		const terrainSub = 60;

		const mapData = new Float32Array(mapSubX * mapSubZ * 3);
		for (let l = 0; l < mapSubZ; l++) {
			for (let w = 0; w < mapSubX; w++) {
				const point = [
					(w - mapSubX / 2) * vertexSpacing,
					-0.05,
					(l - mapSubZ / 2) * vertexSpacing,
				];
				mapData[3 * (l * mapSubX + w) + x] = point[x];
				mapData[3 * (l * mapSubX + w) + y] = point[y];
				mapData[3 * (l * mapSubX + w) + z] = point[z];
			}
		}

		// Ground Terrain
		const dtGround = new DynamicTerrain('dtGround', {
			mapData,
			mapSubX,
			mapSubZ,
			terrainSub,
		}, scene);
		dtGround.updateCameraLOD = camera => Math.abs((camera.globalPosition.y / 10)|0);
		dtGround.mesh.material = grass;
		dtGround.isAlwaysVisible = true;
		return dtGround;
	})();
	/**/

	moon.sphere = MeshBuilder.CreateSphere('world', {
		segments: 16,
		diameter: moon.radius * 2,
	}, scene);
	const scale = 2;
	moon.sphere.position = new Vector3(-moon.perigee / scale, 0, -moon.perigee / scale);

	earth.sphere = MeshBuilder.CreateSphere('world', {
		segments: 16,
		diameter: earth.radius * 2,
	}, scene);
	earth.sphere.position = new Vector3(0, 0, 0);

	let i = 0;
	const aniInterval = setInterval(() => {
		i++;
		const r = moon.perigee * 1.5;
		cameras[0].position = new Vector3(r * Math.cos(i % 360 * Math.PI / 180), earth.radius * 5, r * Math.sin(i % 360 * Math.PI / 180));
		scene.render();
	}, 50);
}
