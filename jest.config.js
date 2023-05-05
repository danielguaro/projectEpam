const setup = {
	testEnvironment: 'jest-environment-jsdom',
	setupFiles: ['./jest.setup.js'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.css$': '<rootDir>/node_modules/jest-css-modules-transform',
		'^.+\\.png$': 'jest-transform-stub',
	},
	moduleNameMapper: {
		'\\.(png)$': '<rootDir>/stub.js',
	},
	transformIgnorePatterns: [],
};

export default setup;
