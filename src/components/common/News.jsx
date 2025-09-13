import React, { useEffect, useState } from "react";
import { useGetNewsByState, useGetNewsByCity } from "@/api/news";
import { Link } from "react-router-dom";

const News = ({ state, city }) => {
  const {
    data: stateNewsData,
    isLoading: stateLoading,
    isError: stateError,
  } = useGetNewsByState(state);
  const {
    data: cityNewsData,
    isLoading: cityLoading,
    isError: cityError,
  } = useGetNewsByCity(city);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    if (stateNewsData || cityNewsData) {
      const combinedNews = [...(stateNewsData || []), ...(cityNewsData || [])];
      const uniqueNews = Array.from(
        new Set(combinedNews.map((item) => item.title))
      ).map((title) => combinedNews.find((item) => item.title === title));
      const sortedNews = uniqueNews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNewsData(sortedNews);
    }
  }, [stateNewsData, cityNewsData]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-white">News</h1>
      <div
        className="bg-[#212121] flex flex-col h-64 overflow-y-scroll w-full"
        style={{ scrollbarWidth: "none" }}
      >
        {newsData.map((newsItem, index) => (
          <div
            key={index}
            className="news-tile border rounded shadow-lg p-4 my-4 w-full"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-200">
              {newsItem.title}
            </h2>
            <p className="mb-4 text-gray-400">{newsItem.content}</p>
            <div className="flex justify-between">
              <p className="text-gray-400">~{newsItem.newsWriter.name}</p>
              {newsItem.sourceLink.length > 0 && (
                <a
                  href={newsItem.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
