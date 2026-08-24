Lib-Origin a internal general purpose TypeScript utility library and a web-scaping, data-extracting library. There are several utilities for bridging the native gap between Node.js and React Native through _Roze_ . Illusive is built as both a library for extracting music data, but also as a backend to my React Native music app _Illusi_ . _Roze_ , more than just the native bridge, also is a backend to a audiobook generation app, similarly named [Roze](https://github.com/Illusion137/Roze).

Overall this is just a massive general purpose TypeScript library with around ~150,000 lines of code.

Two major architectural decisions are that Errors are always values and the code should run in any enviorment through use of custom native modules.

More specifically, errors are in the shape of:

```ts
interface ResponseError {
	error: Error;
}
```

and errors are created using the `generror_...` related functions, for logging purposes.

Native modules are created as such:

```TypeScript
import type { FileSystem } from "@native/fs/fs.base";
import { get_native_platform } from "@native/native_mode";

let fs_instance: FileSystem;

export async function load_native_fs(): Promise<FileSystem>{
	if (fs_instance) return fs_instance;
	switch (get_native_platform()) {
		case "WEB":
			console.error("Web Native FileSystem is NOT implemented");
			break;
		case "NODE":
			try {
				fs_instance = (await import("./fs.node.ts")).node_fs;
			} catch (e) { console.error(e); }
			break;
		case "REACT_NATIVE":
			try {
				fs_instance = (await import("./fs.mobile.ts")).mobile_fs;
			} catch (e) { console.error(e); }
			break;
	}
	return fs_instance;
}

export function fs(): FileSystem {
	if (fs_instance) return fs_instance;
    console.error(new Error("Native Module [fs/FileSystem] is NOT loaded"));
	return fs_instance;
}
```

Then with these you can load the native module asynchronously and then run them synchronously.

Besides all of that the structure of the project is organized as such:

- `common` contains many utilities like auth, parsing, fetching, timings, logging, seeding, status codes, and caching.
    - Most importantly would be `rozfetch.ts` which allows for fetching data with caching and better error handling and messages.
- `origin` contains web scrapers for `amazon_music`, `apple_music`, `youtube`, etc...
- `illusive` processes information from `origin` and outputs standardized data and such.
- `illusicord` discord bot based off of illusive.
- `roze` processes files to create audio/audiovisual books.
- `roze/native` bridges React native and Node.js.
- `roze/lib` bridges Node.js libraries for Windows, OSX, and Linux.
