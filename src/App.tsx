import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const textFetcher = (url: string) => fetch(url).then((r) => r.text());
const jsonFetcher = (url: string) => fetch(url).then((r) => r.json());

const RepositoryItem: React.FC<{ url: string }> = ({ url }) => {
  const path = useMemo(() => {
    return url.replace("https://github.com/", "");
  }, [url]);

  const { data: metadata } = useSWR(
    `/data/github.com/${path}/metadata.json`,
    jsonFetcher,
  );

  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (metadata) {
      const newTitle = metadata.title.split("; ")[1];
      if (newTitle !== null && newTitle != "null") {
        setTitle(newTitle);
      }
    }
  }, [metadata]);

  if (!metadata || !title) {
    return null;
  }

  return (
    <div>
      <h3>{path}</h3>
      <div style={{ marginLeft: "10px" }}>{title}</div>
    </div>
  );
};

function App() {
  const { data: urls } = useSWR("/data/github.com/list.txt", textFetcher);

  if (!urls) {
    return null;
  }
  return (
    <div>
      <h1>Search GitHub Repositories</h1>
      <div>
        {urls
          ?.split("\n")
          .map((url: string) => <RepositoryItem key={url} url={url} />)}
      </div>
    </div>
  );
}

export default App;
