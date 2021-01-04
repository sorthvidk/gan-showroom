import camelCase from 'lodash/camelCase'

const create = type => ({
	action: camelCase(`${type}_ACTION`),
	mutation: camelCase(`${type}_MUTATION`),
	stateKey: camelCase(type)
})

export const IS_MOBILE = create('IS_MOBILE')

export const COOKIES_ACCEPT = create('COOKIES_ACCEPT')
export const LOGIN = create('LOGIN')
export const COPYRIGHT_ACCEPT = create('COPYRIGHT_ACCEPT')
export const SAVE_AS_BACKGROUND = create('SAVE_AS_BACKGROUND')
export const IDLE = create('IDLE')
export const RESET_STATE = create('RESET_STATE')

export const CURRENT_STYLE = create('CURRENT_STYLE')
export const SET_HIDDEN_ASSETS = create('SET_HIDDEN_ASSETS')

export const AUTHORIZE_GROUPS = create('AUTHORIZE_GROUPS')

export const KEYPRESS = create('KEYPRESS')
export const MOUSEMOVE = create('MOUSEMOVE')

export const INIT_PROGRESS = create('INIT_PROGRESS')
export const UPDATE_PROGRESS = create('UPDATE_PROGRESS')

export const CONNECT_ASSETS = create('CONNECT_ASSETS')
export const INDEX_COLLECTION_DATA = create('INDEX_COLLECTION_DATA')
export const COLLECTION_LAYOUT_CHANGE = create('COLLECTION_LAYOUT_CHANGE')
export const TOPMOST_WINDOW = create('TOPMOST_WINDOW')
export const CLOSE_WINDOW = create('CLOSE_WINDOW')
export const UPDATE_WINDOW = create('UPDATE_WINDOW')
export const CLOSE_WINDOW_GROUP = create('CLOSE_WINDOW_GROUP')
export const EXPAND_WINDOW_GROUP = create('EXPAND_WINDOW_GROUP')
export const OPEN_CONTENT = create('OPEN_CONTENT')
export const OPEN_CONTENT_IN_DASHBOARD = create('OPEN_CONTENT_IN_DASHBOARD')
export const OPEN_GALLERY = create('OPEN_GALLERY')
export const ADD_TO_WISHLIST = create('ADD_TO_WISHLIST')
export const REMOVE_FROM_WISHLIST = create('REMOVE_FROM_WISHLIST')
export const ALL_ASSETS_VISIBLE = create('ALL_ASSETS_VISIBLE')
// export const SHOW_NEXT_STYLE = create('SHOW_NEXT_STYLE')
export const SHOW_NEW_STYLE = create('SHOW_NEW_STYLE')

export const SET_CURRENT_FILTER = create('SET_CURRENT_FILTER')
export const SET_GROUP_BY_IDENTIFIER = create('SET_GROUP_BY_IDENTIFIER')
export const SET_GROUP_BY_INDEX = create('SET_GROUP_BY_INDEX')
export const SET_NEXT_GROUP = create('SET_NEXT_GROUP')
export const SET_PREVIOUS_GROUP = create('SET_PREVIOUS_GROUP')

export const PROGRESS_UPDATE = create('PROGRESS_UPDATE')
export const OPEN_WISH_LIST = create('OPEN_WISH_LIST')
export const OPEN_STYLE_CONTENT = create('OPEN_STYLE_CONTENT')
export const TOGGLE_MUSIC_PLAYER = create('TOGGLE_MUSIC_PLAYER')
export const FORCE_STOP_MUSIC = create('FORCE_STOP_MUSIC')
export const MUSIC_PLAY_PAUSE = create('MUSIC_PLAY_PAUSE')
export const CLIPBOARD_COPY = create('CLIPBOARD_COPY')
export const DOWNLOAD_PREPARING = create('DOWNLOAD_PREPARING')
export const SHORTENED_URL = create('SHORTENED_URL')

export const CONNECT_EXHIBITION_ASSETS = create('CONNECT_EXHIBITION_ASSETS')
export const OPEN_EXHIBITION_CONTENT = create('OPEN_EXHIBITION_CONTENT')

export const SAVE_COLLAGE = create('SAVE_COLLAGE')
export const MAKE_BACKGROUND = create('MAKE_BACKGROUND')
export const COLLAGE_IS_OPEN = create('COLLAGE_IS_OPEN')
export const CHANGE_COLLAGE = create('CHANGE_COLLAGE')

export const ASSISTANT_UPDATE = create('ASSISTANT_UPDATE')
export const ASSISTANT_TEXT = create('ASSISTANT_TEXT')
export const ASSISTANT_MODE = create('ASSISTANT_MODE')
export const ASSISTANT_EXPANDED = create('ASSISTANT_EXPANDED')
export const ASSISTANT_TOGGLE = create('ASSISTANT_TOGGLE')

export const DESKTOP_BACKGROUND = create('DESKTOP_BACKGROUND')

export const PUZZLE_INSTANCE = create('PUZZLE_INSTANCE')
export const SAVE_PUZZLE = create('SAVE_PUZZLE')

export const AUDIO_TRACK = create('AUDIO_TRACK')
export const AUDIO_PLAYING = create('AUDIO_PLAYING')
export const AUDIO_PROGRESS = create('AUDIO_PROGRESS')
export const SCROLL_PROGRESS = create('SCROLL_PROGRESS')
export const AUDIO_SCROLLABLE = create('AUDIO_SCROLLABLE')
export const IS_INTRO = create('IS_INTRO')

export const FETCH_PASSWORDS = create('FETCH_PASSWORDS')
export const FETCH_EXHIBITION = create('FETCH_EXHIBITION')
export const FETCH_EXHIBITION_ASSETS = create('FETCH_EXHIBITION_ASSETS')
export const FETCH_COLLECTION_ITEMS = create('FETCH_COLLECTION_ITEMS')
export const FETCH_COLLECTION_GROUPS = create('FETCH_COLLECTION_GROUPS')
export const FETCH_COLLECTION_FILTERS = create('FETCH_COLLECTION_FILTERS')
export const FETCH_COLLECTION_ASSETS = create('FETCH_COLLECTION_ASSETS')
export const FETCH_FILMS = create('FETCH_FILMS')
export const FETCH_GANNIGIRLS = create('FETCH_GANNIGIRLS')
export const FETCH_LOOKBOOK = create('FETCH_LOOKBOOK')
export const FETCH_ANAS = create('FETCH_ANAS')
export const FETCH_GENERAL = create('FETCH_GENERAL')
export const FETCH_ASSISTANT = create('FETCH_ASSISTANT')
export const FETCH_DITTE = create('FETCH_DITTE')
export const FETCH_SONGS = create('FETCH_SONGS')
export const FETCH_ABOUT = create('FETCH_ABOUT')
export const FETCH_DESKTOP = create('FETCH_DESKTOP')
export const FETCH_INTRO = create('FETCH_INTRO')
export const FETCH_VIMEO = create('FETCH_VIMEO')
