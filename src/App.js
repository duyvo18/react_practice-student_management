import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignUpContainer, LogInContainer, ListingContainer, StudentInfoContainer, Profile } from "./components";

function App() {
  return (
    <Router>
      <main>
        {
          <Routes>
            <Route path="/" element={<LogInContainer />} />
            <Route path="/signup" element={<SignUpContainer />} />
            <Route path="/signup/info" element={<StudentInfoContainer />} />
            <Route path="/listing" element={<ListingContainer />} />
            <Route path="/profile" element={<Profile />} />
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
    </Router>
  );
};

export default App;
