import camelCase from 'lodash/camelCase';

const createMutation = (type) => ({
	action: camelCase(`${type}_ACTION`),
	mutation: camelCase(`${type}_MUTATION`),
	stateKey: camelCase(type)
});



//ALL interactions
export const CONNECT_ASSETS = createMutation('CONNECT_ASSETS');
export const FILTER_COLLECTION = createMutation('FILTER_COLLECTION');

//bring window to top, activate window
export const TOPMOST_WINDOW = createMutation('TOPMOST_WINDOW');
export const CLOSE_WINDOW = createMutation('CLOSE_WINDOW');
export const UPDATE_WINDOW = createMutation('UPDATE_WINDOW');
export const CLOSE_WINDOW_GROUP = createMutation('CLOSE_WINDOW_GROUP');
export const EXPAND_WINDOW_GROUP = createMutation('EXPAND_WINDOW_GROUP');
export const OPEN_CONTENT = createMutation('OPEN_CONTENT');
export const ESC_KEYPRESS = createMutation('ESC_KEYPRESS');
export const OPEN_GALLERY = createMutation('OPEN_GALLERY');

export const SET_CURRENT_FILTER = createMutation('SET_CURRENT_FILTER');
export const PROGRESS_UPDATE = createMutation('PROGRESS_UPDATE');