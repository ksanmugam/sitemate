// import {
//   render,
//   fireEvent,
//   waitFor,
//   screen,
// } from "@testing-library/react-native";
// import HomeScreen from "@/app/index";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// // Mocking the Toast module
// jest.mock("react-native-toast-message", () => ({
//   show: jest.fn(),
// }));

// describe("HomeScreen", () => {
//   beforeEach(() => {
//     // Reset any mocks before each test
//     jest.clearAllMocks();
//   });

//   it("renders FlatList with articles", async () => {
//     const mockArticles = [
//       { id: 1, title: "Article 1" },
//       { id: 2, title: "Article 2" },
//     ];

//     // Render HomeScreen with mocked articles state
//     const { getByTestId, getAllByTestId } = render(<HomeScreen />);

//     // Directly set articles and triggering refresh for testing
//     await waitFor(() => getByTestId("articles-list"));

//     // Simulate articles being available
//     fireEvent.scroll(getByTestId("articles-list"), {
//       contentOffset: { y: 0 },
//       animated: true,
//     });

//     // Check that article cards are rendered
//     const articles = getAllByTestId("article-card");
//     expect(articles).toHaveLength(mockArticles.length);
//   });

//   it("shows toast on filter button press", async () => {
//     const { getByTestId } = render(<HomeScreen />);

//     // Find the filter button and simulate press
//     const filterButton = getByTestId("filter-button");
//     fireEvent.press(filterButton);

//     // Check if toast is shown
//     expect(Toast.show).toHaveBeenCalledWith({
//       type: "info",
//       position: "bottom",
//       text1: "Filter coming soon ;)",
//     });
//   });
// });
