import camelCase from 'lodash/camelCase';

const createMutation = (type) => ({
	action: camelCase(`${type}_ACTION`),
	mutation: camelCase(`${type}_MUTATION`),
	stateKey: camelCase(type)
});


export const TOPMOST_WINDOW = createMutation('TOPMOST_WINDOW');
export const CLOSE_WINDOW = createMutation('CLOSE_WINDOW');
export const OPEN_CONTENT = createMutation('OPEN_CONTENT');




const createComponent = (type) => ({
	name: camelCase(`${type}_NAME`)
});

export const COMPONENT_COLLECTION = createComponent('COMPONENT_COLLECTION');