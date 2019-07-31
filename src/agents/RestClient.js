import join from 'url-join';

export default class RestClient {

    constructor(options) {
        if (!(options && options.root)) throw new Error("Missing 'root' URL for the API");
        this.root = options.root;
    }

    async get(path) {
        const url = join(this.root, path);
        return await fetch(url);
    }

    async getJSON(path = "") {
        const resp = await this.get(path);
        if ( !resp.ok ) throw new Error(`${resp.statusText} (${resp.status})`);
        return await resp.json();
    }

}