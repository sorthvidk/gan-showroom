import camelCase from 'lodash/camelCase';

const createMutation = (type) => ({
	action: camelCase(`${type}_ACTION`),
	mutation: camelCase(`${type}_MUTATION`),
	stateKey: camelCase(type)
});

// General
export const TOPMOST_WINDOW = createMutation('TOPMOST_WINDOW');
