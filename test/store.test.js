import _ from 'lodash'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'

// https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28

describe('store/collection', () => {
	// ----------------------------------------------------
	// focus on the code from here...
	const localVue = createLocalVue()
	localVue.use(Vuex)
	let NuxtStore
	let store

	beforeAll(async () => {
		// note the store will mutate across tests
		const storePath = `${process.env.buildDir}/store.js`
		NuxtStore = await import(storePath)
	})

	beforeEach(async () => {
		store = await NuxtStore.createStore()
	})
	// ...to here is what matters
	// ----------------------------------------------------

	describe('collection/allStyles', () => {
		let styles

		beforeEach(() => {
			styles = store.getters['collection/allStyles']
		})

		test('getter is a function', () => {
			expect(_.isArray(styles)).toBe(true)
		})

		// test('should be 6 movies total', () => {
		// 	expect(styles.length).toBe(0)
		// })
	})
})
