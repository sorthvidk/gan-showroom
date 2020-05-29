import camelCase from 'lodash/camelCase'

const createMutation = type => ({
	action: camelCase(`${type}_ACTION`),
	mutation: camelCase(`${type}_MUTATION`),
	stateKey: camelCase(type)
})

export const COOKIES_ACCEPT = createMutation('COOKIES_ACCEPT')
export const LOGIN = createMutation('LOGIN')
export const WALLPAPER_CHANGE = createMutation('WALLPAPER_CHANGE')
export const VISIBILITY = createMutation('VISIBILITY')

export const COLLECTION_ITEMS_FETCH = createMutation('COLLECTION_ITEMS_FETCH')
export const COLLECTION_FILTERS_FETCH = createMutation(
	'COLLECTION_FILTERS_FETCH'
)
export const COLLECTION_ASSETS_FETCH = createMutation('COLLECTION_ASSETS_FETCH')
export const FILMS_FETCH = createMutation('FILMS_FETCH')
export const GANNIGIRLS_FETCH = createMutation('GANNIGIRLS_FETCH')
export const LOOKBOOK_FETCH = createMutation('LOOKBOOK_FETCH')
export const GENERAL_FETCH = createMutation('GENERAL_FETCH')

export const KEYPRESS = createMutation('KEYPRESS')
export const MOUSEMOVE = createMutation('MOUSEMOVE')
export const INIT_PROGRESS = createMutation('INIT_PROGRESS')
export const CONNECT_ASSETS = createMutation('CONNECT_ASSETS')
export const FILTER_COLLECTION = createMutation('FILTER_COLLECTION')
export const TOPMOST_WINDOW = createMutation('TOPMOST_WINDOW')
export const CLOSE_WINDOW = createMutation('CLOSE_WINDOW')
export const UPDATE_WINDOW = createMutation('UPDATE_WINDOW')
export const CLOSE_WINDOW_GROUP = createMutation('CLOSE_WINDOW_GROUP')
export const EXPAND_WINDOW_GROUP = createMutation('EXPAND_WINDOW_GROUP')
export const OPEN_CONTENT = createMutation('OPEN_CONTENT')
export const OPEN_GALLERY = createMutation('OPEN_GALLERY')
export const ADD_TO_WISHLIST = createMutation('ADD_TO_WISHLIST')
export const REMOVE_FROM_WISHLIST = createMutation('REMOVE_FROM_WISHLIST')
export const ALL_ASSETS_VISIBLE = createMutation('ALL_ASSETS_VISIBLE')
export const SHOW_NEXT_STYLE = createMutation('SHOW_NEXT_STYLE')
export const SHOW_PREVIOUS_STYLE = createMutation('SHOW_PREVIOUS_STYLE')
export const SET_CURRENT_FILTER = createMutation('SET_CURRENT_FILTER')
export const PROGRESS_UPDATE = createMutation('PROGRESS_UPDATE')
export const OPEN_WISH_LIST = createMutation('OPEN_WISH_LIST')
export const OPEN_STYLE_CONTENT = createMutation('OPEN_STYLE_CONTENT')
export const TOGGLE_MUSIC_PLAYER = createMutation('TOGGLE_MUSIC_PLAYER')
export const FORCE_STOP_MUSIC = createMutation('FORCE_STOP_MUSIC')
export const MUSIC_PLAY_PAUSE = createMutation('MUSIC_PLAY_PAUSE')
export const CLIPBOARD_COPY = createMutation('CLIPBOARD_COPY')
export const DOWNLOAD_PREPARING = createMutation('DOWNLOAD_PREPARING')
