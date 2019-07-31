import React from 'react';
import App from './App';
import waitUntil from 'async-wait-until';
import renderer, { act } from 'react-test-renderer';

const fakePosts = [
  { "id": 1, "title": "Things are great" },
  { "id": 2, "title": "It's all terrible" },
  { "id": 3, "title": "I'm starting to learn things" }
];

const fakeComments = [
  { "id": 1, "body": "This post is rather misguided in my opinion", "postId": 1 },
  { "id": 2, "body": "Great post!", "postId": 1 }
];

const fakeProfile = {
  "name": "andrew"
};

const ok = json => ({ ok: true, status: 200, json: () => json });
const notFound = () => ({ ok: false, status: 404 });

describe("given APIs return valid JSON", () => {

  let calls = [];
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(url => {
      calls.push(url);
      if (url.endsWith("/posts")) return ok(fakePosts);
      if (url.endsWith("/comments")) return ok(fakeComments);
      if (url.endsWith("/profile")) return ok(fakeProfile);
      return notFound();
    });
  });

  describe("when i render the app and wait for data to load", () => {

    let tree;

    beforeEach(async () => {

      const app = <App />;
      act(() => {
        tree = renderer.create(app);
      });
      await waitUntil(() => calls.length > 2);
      act(() => {

        tree.update(app);

      });

    });

    it("should have done stuff", () => {

      expect(tree.toJSON()).toMatchSnapshot();

    });

  });

  afterEach(() => global.fetch.mockClear());
});