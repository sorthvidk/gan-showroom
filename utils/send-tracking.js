export default function(category,action) {
	console.warn("GOOGLE: '"+category+"', '"+action+"'")

	window.$gtm.push(
		{ 
			'event': 'GAEvent',
  			'eventCategory' : category,
			'eventAction' : action,
			'eventLabel' : category
		}
	)
}