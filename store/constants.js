import camelCase from 'lodash/camelCase';

const createMutation = (type) => ({
	action: camelCase(`${type}_ACTION`),
	mutation: camelCase(`${type}_MUTATION`),
	stateKey: camelCase(type)
});


export const TOPMOST_WINDOW = createMutation('TOPMOST_WINDOW');
export const CLOSE_WINDOW = createMutation('CLOSE_WINDOW');
export const UPDATE_WINDOW = createMutation('UPDATE_WINDOW');
export const CLOSE_WINDOW_GROUP = createMutation('CLOSE_WINDOW_GROUP');
export const OPEN_CONTENT = createMutation('OPEN_CONTENT');
export const ESC_KEYPRESS = createMutation('ESC_KEYPRESS');




export const COMPONENT_COLLECTION = 'collection';
export const COMPONENT_IMAGE_VIEWER = 'image-viewer';