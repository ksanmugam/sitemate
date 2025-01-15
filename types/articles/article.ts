interface Article {
  id: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ArticlesContextData {
  articles: Article[];
  count: number;
  query: string;
  setQuery: (query: string) => void;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  isFetched: boolean;
  searchArticles: () => void;
}

interface SortModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedOption: string;
  onSelect: (value: string) => void;
}
