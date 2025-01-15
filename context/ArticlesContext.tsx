import articlesService from "@/services/articlesService";
import { applyAdvancedSearchRules } from "@/utils/applyAdvancedSearchRules";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Create the context with an initial value of undefined
const ArticlesContext = createContext<ArticlesContextData | undefined>(
  undefined
);

interface ArticlesProviderProps {
  children: ReactNode;
}

export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");

  // Query function to fetch articles with the advanced search query
  const {
    data,
    isFetching,
    isFetched,
    isError,
    error,
    refetch: searchArticles,
  } = useQuery({
    queryKey: ["articles", query],
    queryFn: async () =>
      await articlesService.getArticles(applyAdvancedSearchRules(query)),
    enabled: false, // Only fetch if `query` is not empty
  });

  // const {
  //   data: articles,
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   promise,
  // } = useInfiniteQuery({
  //   queryKey: ["articles", query],
  //   queryFn: async ({ pageParam }) =>
  //     await articlesService.getArticles(
  //       applyAdvancedSearchRules(query),
  //       pageParam
  //     ),
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
  //     lastPage.nextCursor,
  //   getPreviousPageParam: (
  //     firstPage,
  //     allPages,
  //     firstPageParam,
  //     allPageParams
  //   ) => firstPage.previousCursor,
  // });

  return (
    <ArticlesContext.Provider
      value={{
        articles: data?.articles,
        count: data?.count,
        query,
        setQuery,
        isError,
        error,
        isFetching,
        isFetched,
        searchArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

// Custom hook to use the ArticlesContext
export const useArticles = (): ArticlesContextData => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
