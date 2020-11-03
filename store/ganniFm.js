import {
	MUSIC_PLAY_PAUSE,
	FORCE_STOP_MUSIC,
	SONGS_FETCH
} from '~/model/constants'

export const state = () => ({
	musicPlaying: false,
	songs: [
		{
			title: 'All Saints - Never Ever.mp3',
			src: `/audio/1-01 Never Ever.mp3`
		},
		{
			title: 'Sugababes - Overload.mp3',
			src: `/audio/1-01 Overload.mp3`
		},
		{
			title: 'Nirvana - Come As You Are.mp3',
			src: `/audio/1-03 Come As You Are.mp3`
		},
		{
			title: 'Janet Jackson - Together Again.mp3',
			src: `/audio/1-11 Together Again.mp3`
		},
		{
			title: 'Madonna - Express Yourself.mp3',
			src: `/audio/1-12 Express Yourself.mp3`
		}
	]
})

export const mutations = {
	[MUSIC_PLAY_PAUSE.mutation](state, playing) {
		if (window.GS_LOGS) console.warn('MUSIC_PLAY_PAUSE', playing)
		state.musicPlaying = playing
	},

	[FORCE_STOP_MUSIC.mutation](state) {
		if (window.GS_LOGS) console.warn('FORCE_STOP_MUSIC | pause music')
		state.musicPlaying = false
	},

	[SONGS_FETCH.mutation](state, data) {
		const parsed = data =>
			data.reduce(
				(acc, cur) => [
					...acc,
					{
						title: cur.songName,
						src: cur.cloudinaryUrl
					}
				],
				[]
			)

		state.songs = parsed(data)
	}
}

export const actions = {
	[MUSIC_PLAY_PAUSE.action]({ commit }, playing) {
		if (window.GS_LOGS) console.log('playing', playing)
		if (typeof playing === 'undefined') commit(MUSIC_PLAY_PAUSE.mutation, true)
		else commit(MUSIC_PLAY_PAUSE.mutation, playing)
	},
	[FORCE_STOP_MUSIC.action]({ commit }) {
		commit(FORCE_STOP_MUSIC.mutation)
	}
}
