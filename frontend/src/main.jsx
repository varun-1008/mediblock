import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BoookAppointment from "./pages/patient/BookAppointment.jsx";
import BookAnAppointment from "./pages/patient/BookAnAppointment.jsx";
import AllAppointments from "./pages/patient/AllAppointments.jsx";
import AllRecords from "./pages/patient/AllRecords.jsx";
import AllEmergencyRecords from "./pages/patient/AllEmergencyRecords.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "patient",
        children: [
          {
            index: true,
            element: <Navigate to="bookAppointment" replace />
          },
          {
            path: "bookAppointment",
            element: <BoookAppointment />,
            children: [
              {
                path: ":doctorAddress",
                element: <BookAnAppointment />
              }
            ] 
          },
          {
            path: "allAppointments",
            element: <AllAppointments />
          },
          {
            path: "allRecords",
            element: <AllRecords />
          },
          {
            path: "allEmergencyRecords",
            element: <AllEmergencyRecords />
          }
        ]
      },
      {
        path: "doctor",
        children: [
          {
            index: true,
            
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
