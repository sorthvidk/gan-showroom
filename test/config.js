const path = require('path')

const BASE_PATH = path.join(__dirname, '../')
const ASSET_FOLDER = path.join(BASE_PATH, `assets/test/`)

module.exports = {
	NETLIFY_CMS_CONFIG_FILE_PATH: BASE_PATH + 'static/admin/config.yml',
	COLLECTION_ITEMS_PATH: ASSET_FOLDER + 'collectionItems'
}
