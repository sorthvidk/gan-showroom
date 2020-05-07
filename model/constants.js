import camelCase from 'lodash/camelCase';

const createMutation = (type) => ({
	action: camelCase(`${type}_ACTION`),
	mutation: camelCase(`${type}_MUTATION`),
	stateKey: camelCase(type)
});

export const ESC_KEYPRESS = createMutation('ESC_KEYPRESS');
export const LEFT_KEYPRESS = createMutation('LEFT_KEYPRESS');
export const RIGHT_KEYPRESS = createMutation('RIGHT_KEYPRESS');

export const CONNECT_ASSETS = createMutation('CONNECT_ASSETS');
export const FILTER_COLLECTION = createMutation('FILTER_COLLECTION');
export const TOPMOST_WINDOW = createMutation('TOPMOST_WINDOW');
export const CLOSE_WINDOW = createMutation('CLOSE_WINDOW');
export const UPDATE_WINDOW = createMutation('UPDATE_WINDOW');
export const CLOSE_WINDOW_GROUP = createMutation('CLOSE_WINDOW_GROUP');
export const EXPAND_WINDOW_GROUP = createMutation('EXPAND_WINDOW_GROUP');
export const OPEN_CONTENT = createMutation('OPEN_CONTENT');
export const OPEN_GALLERY = createMutation('OPEN_GALLERY');
export const ADD_TO_WISHLIST = createMutation('ADD_TO_WISHLIST');
export const REMOVE_FROM_WISHLIST = createMutation('REMOVE_FROM_WISHLIST');
export const ALL_ASSETS_VISIBLE = createMutation('ALL_ASSETS_VISIBLE');
export const SHOW_NEXT_STYLE = createMutation('SHOW_NEXT_STYLE');
export const SHOW_PREVIOUS_STYLE = createMutation('SHOW_PREVIOUS_STYLE');
export const SET_CURRENT_FILTER = createMutation('SET_CURRENT_FILTER');
export const PROGRESS_UPDATE = createMutation('PROGRESS_UPDATE');
export const OPEN_WISH_LIST = createMutation('OPEN_WISH_LIST');
export const OPEN_STYLE_CONTENT = createMutation('OPEN_STYLE_CONTENT');