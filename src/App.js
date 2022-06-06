import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignUpContainer, LogInContainer, ListingContainer} from "./components";

function App() {
  return (
    <Router>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          {
            <Routes>
              <Route path="/" element={<SignUpContainer />} />
              <Route path="/login" element={<LogInContainer />} />
              <Route path="/listing" element={<ListingContainer />} />
              <Route
                path="*"
                element={
                  <div className="text-center text-4xl font-bold">
                    404: NOT FOUND
                  </div>
                } />
            </Routes>
          }
        </main>
      </div>
    </Router>
  );
};

export default App;
