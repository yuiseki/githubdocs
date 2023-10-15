import fs from "node:fs/promises";
import * as dotenv from "dotenv";

dotenv.config();

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const urlsFile = await fs.readFile("data/github.com/list.txt", "utf-8");
const urls = urlsFile.split("\n");
console.info(urls.length);

// GitHub API共通認証ヘッダー
const githubHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_APP_USER_TOKEN}`,
};

// GitHub APIのRate Limit緩和リクエスト
const rateLimitRes = await fetch("https://api.github.com/meta", {
  headers: githubHeaders,
});
console.log(rateLimitRes.headers);

for await (const url of urls) {
  console.info(url);
  if (0 === url.length) {
    continue;
  }
  try {
    const metadata = {
      name: "",
      fullName: "",
      authorUrl: "",
      author: "",
      title: "",
      licence: "",
    };
    const path = url.replace("https://github.com/", "");
    try {
      try {
        const alreadyFetched = (
          await fs.lstat(`./data/github.com/${path}/README.md`)
        ).isFile();
        if (alreadyFetched) {
          continue;
        }
      } catch (error) {
        console.log("");
      }
      const metadataUrl = "https://api.github.com/repos/" + path;
      const metadataRes = await fetch(metadataUrl, { headers: githubHeaders });
      const metadataJson = await metadataRes.json();
      console.log(metadataRes.headers);
      console.log(metadataJson);
      metadata.title = metadataJson.full_name + "; " + metadataJson.description;
      metadata.fullName = metadataJson.full_name;
      if (metadataJson.licence && metadataJson.licence.name) {
        metadata.licence = metadataJson.licence.name;
      }
      try {
        metadata.name = metadataJson.name;
      } catch (error) {
        console.log(metadataJson);
      }

      try {
        metadata.authorUrl = metadataJson.owner.html_url;
        metadata.author = metadataJson.owner.login;
      } catch (error) {
        console.log(metadataJson);
      }
    } catch (error) {
      console.error(error);
    }

    let readMeUrl = "";

    const readMeCandidates = [
      "/raw/gh-pages/README.md",
      "/raw/master/README.md",
      "/raw/main/README.md",
    ];
    for await (const readMeCandidate of readMeCandidates) {
      const readMeCandidateUrl = url + readMeCandidate;
      const readMeCandidateRes = await fetch(readMeCandidateUrl, {
        method: "HEAD",
        redirect: "follow",
      });
      if (readMeCandidateRes.ok) {
        readMeUrl = readMeCandidateUrl;
      }
    }

    console.log(readMeUrl);
    const readMeMarkdownRes = await fetch(readMeUrl, { redirect: "follow" });
    const readMeContent = await readMeMarkdownRes.text();

    const metadataJson = JSON.stringify(metadata, null, 2);

    await fs.mkdir(`./data/github.com/${path}/`, {
      recursive: true,
    });
    await fs.writeFile(`./data/github.com/${path}/README.md`, readMeContent);
    await fs.writeFile(`./data/github.com/${path}/metadata.json`, metadataJson);

    console.log();
  } catch (error) {
    console.error(error);
  }
  await sleep(1000);
}
