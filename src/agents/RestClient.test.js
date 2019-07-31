import RestClient from "./RestClient";

it('should throw if not supplied with a root URL', () => {
    return expect(() => new RestClient({ url: "" })).toThrow();
});

describe('given an initialised rest client', () => {

    let client;
    let apiRoot = 'http://test.com/api';

    beforeEach(() => {
        client = new RestClient({ root: apiRoot });
    });

    describe('when i get the root of the api', () => {

        let cid, spy, resp;

        beforeEach(async () => {
            cid = Math.random();
            spy = jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: () => ({ "cid": cid }) }));
            resp = await client.get("");
        });

        it('should call the api', () => expect(spy).toHaveBeenCalledWith(apiRoot));

        it('should return the correct response object', async () => {
            const payload = await resp.json();
            expect(payload.cid).toBe(cid);
        });

        afterEach(() => global.fetch.mockClear());

    });

    describe('when I get something under the root of the api', () => {

        let spy;
        const resource = "posts";

        beforeEach(async () => {
            spy = jest.spyOn(global, 'fetch').mockImplementation(async () => ({ text: () => 'hello' }));
            await client.get(resource);
        });

        it('should call the correct url', () => expect(spy).toHaveBeenCalledWith(`${apiRoot}/${resource}`));

        afterEach(() => global.fetch.mockClear());

    });

    describe('when i successfully fetch JSON', () => {

        let json;
        const expected = { "hello": "world" };

        beforeEach(async () => {
            jest.spyOn(global, 'fetch').mockImplementation(async () => ({ ok: true, json: () => expected }));
            json = await client.getJSON();
        });

        it('should return the parsed json object', () => expect(json).toMatchObject(expected));

        afterEach(() => global.fetch.mockClear());

    });

    describe('when i fail to fetch JSON', () => {

        beforeEach(async () => {
            jest.spyOn(global, 'fetch').mockImplementation(async () => ({ ok: false, json: () => ({}) }));
        });

        it('should return the parsed json object', async () => {
            await expect(client.getJSON()).rejects.toThrow();
        });

        afterEach(() => global.fetch.mockClear());

    });
});