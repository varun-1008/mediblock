import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BoookAppointment from "./pages/patient/BookAppointment.jsx";
import BookAnAppointment from "./pages/patient/BookAnAppointment.jsx";
import AllAppointments from "./pages/patient/AllAppointments.jsx";
import AllRecords from "./pages/patient/AllRecords.jsx";
import AllEmergencyRecords from "./pages/patient/AllEmergencyRecords.jsx";
import ViewAppointments from "./pages/doctor/ViewAppointments.jsx";
import CreateRecord from "./pages/doctor/CreateRecord.jsx";
import ViewAppointment from "./pages/doctor/ViewAppointment.jsx";
import WalletProvider from "./context/WalletContext";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Settings from "./pages/Settings";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: "dashboard",
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
          },
          {
            path: "bookAppointment/:doctorAddress",
            element: <BookAnAppointment />
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
            element: <Navigate to="viewAppointments" replace />
          },
          {
            path: "viewAppointments",
            element: <ViewAppointments />,
            children: [
              {
                index: true,
                element: <Navigate to ="viewAppointments/:patientAddress" replace/>
              },
              {
                path: "viewAppointments/:patientAddress",
                element: <ViewAppointment />
              },
              {
                path: "create/:patientAddress",
                element: <CreateRecord />
              }
            ]
          }
        ]
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <WalletProvider>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  </WalletProvider>
  // </React.StrictMode>
);
