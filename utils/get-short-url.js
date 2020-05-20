export default async function(longUrl) {
	let body = {
    	'domain': 'bit.ly',
		'long_url': encodeURI(longUrl)
    }
    body = JSON.stringify(body);
  
    let shortUrl = longUrl;

	const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer a8e530c98a0e04db9c65afecbcfaedc488f5b429'
		},
		body: body
	})
  .then(response => Promise.all([response.ok, response.json()]))
  .then(([responseOk, body]) => {
    if (responseOk) {
      shortUrl=json.link
    } else {
      throw new Error(body);
    }
  })
  .catch(error => {
    // catches error case and if fetch itself rejects
  });

  return shortUrl
}