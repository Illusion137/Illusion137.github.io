As both a heavy user of the app `Musi`and someone who was in the process of building their own similar music app I found a couple of linked bugs and such between our apps. After solving the bugs in my demo app at the time I reached out to `Musi`and provided them with detailed bug descriptions and fixes and also proof of concepts of additional features that they wanted to add.

The showcase shows the app update that includes the bug fix.

The Bug Report in question looked something like:

# Bug Info

Location: _Add YouTube Playlist_ &#8594; _YouTube Playlist_
Occurs when you import a private YouTube Playlist that has over 100 videos
Reason: When sending YouTube Continuation Request where you most likely have headers as such

```js
// Note Some headers have been removed such as 'x-client-data' and 'x-goog-visitor-id'
let headers = {
	accept: '*/*',
	'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36,gzip(gfe)',
	'accept-language': 'en-US,en;q=0.9',
	'content-type': 'application/json',
	'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
	'sec-ch-ua-arch': '"x86"',
	'sec-ch-ua-bitness': '"64"',
	'sec-ch-ua-full-version': '"117.0.5938.132"',
	'sec-ch-ua-full-version-list': '"Google Chrome";v="117.0.5938.132", "Not;A=Brand";v="8.0.0.0", "Chromium";v="117.0.5938.132"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-model': '""',
	'sec-ch-ua-platform': '"Windows"',
	'sec-ch-ua-platform-version': '"15.0.0"',
	'sec-ch-ua-wow64': '?0',
	'x-goog-authuser': '0',
	'x-origin': 'https://www.youtube.com',
	'x-youtube-bootstrap-logged-in': 'true',
	'x-youtube-client-name': '1',
	'x-youtube-client-version': '2.20231003.02.01',
	Cookies: Prefs.prefs.external_services.youtube_cookies, //Cookies in format of ' "KEY=VALUE; KEY2=VALUE2..." '
	Referer: url, // "https://www.youtube.com/playlist?list=..."
};
```

However you are missing an `"authorization": SAPISIDHASH,` header which holds a value in the format of:
\``SAPISIDHASH ${timeStampSecondsStr}_${shaDigest}`\`

Below is a function that generates the SAPISIDHASH required for authorization.

# SAPISIDHASH Function - Javascript

```js
import * as sha1 from 'sha1-uint8array';

export function getYouTubeSapisidHashAuth(SAPISID, CURRENT_TIMESTAMP, ORIGIN = 'https://www.youtube.com') {
	let timeStampSecondsStr = String(CURRENT_TIMESTAMP).slice(0, 10);
	let dataString = [timeStampSecondsStr, SAPISID, ORIGIN].join(' ');
	let data = Uint8Array.from(Array.from(dataString).map((letter) => letter.charCodeAt(0)));
	let shaDigest = sha1.createHash().update(data).digest('hex');
	let SAPISIDHASH = `SAPISIDHASH ${timeStampSecondsStr}_${shaDigest}`;
	return SAPISIDHASH;
}
```

## Parameters:

`SAPISID = YouTubeCookies["SAPISID"]; Ex: "x0X0xxxX00XXXXxx/X0xx000xXXxxXx0xx"`
`CURRENT_TIMESTAMP = Number of milliseconds for this date since the epoch; Ex: 1696623652005`
`ORIGIN = The Google Website Origin; Ex/Default (What you will need to use): "https://www.youtube.com"`
