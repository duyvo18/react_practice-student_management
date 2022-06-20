import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignUpContainer, LogInContainer, ListingContainer, StudentInfoContainer, Profile, NotFound, ServerError } from "./components";

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
            <Route path="/unexpected" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
      </main>
    </Router>
  );
};

export default App;
