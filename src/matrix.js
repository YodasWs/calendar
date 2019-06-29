const Matrix = (function() {
	const form2dCol = v => v.map(p => [p]);
	const form2dRow = v => [v];
	const x = 0, y = 1, z = 2;

	function Matrix(camera = [0, 0, 1]) {
		this.camera = camera;
	}

	const create = (n, m) => new Array(n).fill(0).map(r => new Array(m).fill(0));

	const basicOperations = {
		flatten: m => m.reduce((f, r) => f.concat(r), []),

		identity(n) {
			const iden = create(n, n);
			iden.forEach((r, i) => r[i] = 1);
			return iden;
		},

		transpose(m) {
			const t = create(m[0].length, m.length);
			m.forEach((r, i) => {
				r.forEach((c, j) => {
					t[j][i] = c;
				});
			});
			return t;
		},

		add(m1, m2) {
			if (m1.length !== m2.length || m1[0].length !== m2[0].length) {
				console.log('Error! Matrices must be same size!');
				return;
			}

			if (typeof m1[0] === 'number') {
				return m1.slice(0).map((c, i) => c + m2[i]);
			}

			return m1.slice(0).map((row, i) => row.map((cell, j) => cell + m2[i][j]));
		},

		multiply(m1, m2) {
			// Scalar multiplication
			if (typeof m2 === 'number') {
				if (typeof m1[0] === 'number')
					return m1.map(c => c * m2);
				return m1.map(r => r.map(c => c * m2));
			}

			if (m1[0].length !== m2.length) {
				console.log('Error! Matrices are incorrect size!');
				return;
			}

			// Matrix multiplication!
			const product = create(m1.length, m2[0].length);
			m1.forEach((row, i) => {
				m2[0].forEach((a, j) => {
					product[i][j] = m2.reduce((sum, c, k) => sum + m1[i][k] * m2[k][j], 0);
				});
			});
			return product;
		},
	};

	const axonometric = (...theta) => {
		theta = theta.map(a => a * Math.PI / 180);
		const X = [
			[1, 0, 0],
			[0, Math.cos(theta[x]), Math.sin(theta[x])],
			[0, -Math.sin(theta[x]), Math.cos(theta[x])],
		];
		const Y = [
			[Math.cos(theta[y]), 0, -Math.sin(theta[y])],
			[0, 1, 0],
			[Math.sin(theta[y]), 0, Math.cos(theta[y])],
		];
		const Z = [
			[Math.cos(theta[z]), Math.sin(theta[z]), 0],
			[-Math.sin(theta[z]), Math.cos(theta[z]), 0],
			[0, 0, 1],
		];
		return basicOperations.multiply(
			basicOperations.multiply(X, Y),
			Z,
		);
	};

	const isometric = axonometric(
		Math.asin(Math.tan(30 * Math.PI / 180)) * 180 / Math.PI,
		45,
		0,
	);

	Matrix.prototype = {
		...Matrix.prototype,
		...basicOperations,
		create,
		isometric,
		axonometric,
		form2dCol,
		form2dRow,

		projection(point) {
			const d = basicOperations.flatten(
				basicOperations.multiply(
					axonometric(
						Number.parseInt(document.getElementById('radx').value, 10),
						Number.parseInt(document.getElementById('rady').value, 10),
						Number.parseInt(document.getElementById('radz').value, 10),
					),
					form2dCol(point),
				),
			);
			return [
				[d[x] / this.camera[z] + this.camera[x]],
				[d[y] / this.camera[z] + this.camera[y]],
				[d[z] / this.camera[z] + this.camera[z]],
			];
		},

		crossProduct(v1, v2) {
			if (v1[0] instanceof Array) v1 = basicOperations.flatten(v1);
			if (v2[0] instanceof Array) v2 = basicOperations.flatten(v2);
			return [
				v1[y] * v2[z] - v1[z] * v2[y],
				v1[z] * v2[x] - v1[x] * v2[z],
				v1[x] * v2[y] - v1[y] * v2[x],
			];
		},
	};

	return Matrix;
})();
const matrix = new Matrix();
