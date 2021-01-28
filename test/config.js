const path = require('path')

const BASE_PATH = path.join(__dirname, '../')
const ASSET_FOLDER = path.join(BASE_PATH, `assets/content/`)

module.exports = {
	NETLIFY_CMS_CONFIG_FILE_PATH: BASE_PATH + 'static/admin/config.yml',
	ASSET_FOLDER,
	COLLECTION_ITEMS_PATH: ASSET_FOLDER + 'collectionItems',
	MEDIA_ASSETS_PATH: ASSET_FOLDER + 'mediaAssets'
}
