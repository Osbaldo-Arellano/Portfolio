import React, { useEffect, useState } from "react";
import axios from "axios";

// Define interfaces (you can remove or adjust these if needed)
interface LanguageStats {
  [language: string]: {
    bytes: number;
    lines: number;
  };
}

interface LatestPush {
  repoName: string;
  message: string;
  date: string;
}

const GitHubStats: React.FC = () => {
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [totalLines, setTotalLines] = useState(0);
  const [latestPush, setLatestPush] = useState<LatestPush | null>(null);
  const [loading, setLoading] = useState(true);

  // Replace with your actual token or remove entirely if you don't need authorized calls
  const GITHUB_TOKEN = "ADD_TOKEN";

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const reposResponse = await axios.get(
          "https://api.github.com/user/repos",
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
            params: {
              visibility: "all", // Fetch public and private repos
            },
          }
        );

        const languageStats: LanguageStats = {};
        let totalLinesCount = 0;
        let latestPushInfo: LatestPush | null = null;

        for (const repo of reposResponse.data) {
          const langResponse = await axios.get(repo.languages_url, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });

          for (const [language, value] of Object.entries(langResponse.data)) {
            if (!languageStats[language]) {
              languageStats[language] = { bytes: 0, lines: 0 };
            }
            languageStats[language].bytes += value as number;
            const lines = Math.round((value as number) / 50);
            languageStats[language].lines += lines;
            totalLinesCount += lines;
          }

          const commitsResponse = await axios.get(
            repo.commits_url.replace("{/sha}", ""),
            {
              headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
              },
              params: { per_page: 1 },
            }
          );

          const commit = commitsResponse.data[0];
          const commitDate = new Date(commit.commit.author.date);

          if (
            !latestPushInfo ||
            commitDate.getTime() > new Date(latestPushInfo.date).getTime()
          ) {
            latestPushInfo = {
              repoName: repo.name,
              message: commit.commit.message,
              date: commit.commit.author.date,
            };
          }
        }

        setLanguages(languageStats);
        setTotalLines(totalLinesCount);
        setLatestPush(latestPushInfo);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {loading ? (
        <div className="flex flex-col flex-grow items-center justify-center bg-gray-200 border-2 border-gray-800 shadow-lg p-4">
          <div className="bg-blue-600 text-white px-2 py-1 w-full text-center">
            <span>Loading GitHub Stats...</span>
          </div>
          <p className="text-center mt-4">Please wait...</p>
        </div>
      ) : (
        <div className="flex flex-col flex-grow bg-gray-200 shadow-lg p-4 overflow-auto">
          <div className="bg-gray-300 text-black px-2 py-1 w-full text-center mb-4">
            <span>GitHub Stats</span>
          </div>

          {latestPush && (
            <div className="mb-4">
              <p className="text-md font-bold">Latest Push:</p>
              <p>
                <span className="font-bold">Repository:</span>{" "}
                {latestPush.repoName}
              </p>
              <p>
                <span className="font-bold">Message:</span> {latestPush.message}
              </p>
              <p>
                <span className="font-bold">Date:</span>{" "}
                {new Date(latestPush.date).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHubStats;
