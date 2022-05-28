var { OAuthApp, createNodeMiddleware }  = require("octokit")

const clientId = 'c8197b9538a81b217aa1';
const clientSecret = 'bf42e26a95e0b561d94e0f4c0d26415168b5aa34';
const app = new OAuthApp({
  clientId,
  clientSecret,
  defaultScopes: ["repo", "gist"],
});

app.on("token", async ({ token, octokit }) => {
  await octokit.rest.gists.create({
    description: "I created this gist using Octokit!",
    public: true,
    files: {
      "example.js": `/* some code here */`,
    },
  });
});

module.exports = createNodeMiddleware(app)
