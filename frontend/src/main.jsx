import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BoookAppointment from "./pages/patient/BookAppointment.jsx";
import BookAnAppointment from "./pages/patient/BookAnAppointment.jsx";
import AllAppointments from "./pages/patient/AllAppointments.jsx";
import AllRecords from "./pages/patient/AllRecords.jsx";
import AllEmergencyRecords from "./pages/patient/AllEmergencyRecords.jsx";
import ViewAppointments from "./pages/doctor/ViewAppointments.jsx";
import CreateRecord from "./pages/doctor/CreateRecord.jsx";
import WalletProvider from "./context/WalletContext";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import ViewAppointment from "./pages/doctor/ViewAppointment";
import { EmergencyRecords } from "./pages/doctor/EmergencyRecords";
import EmergencyRecordDetails from "./pages/doctor/EmergencyRecordDetails";
import ProfilePage from "./pages/ProfilePage";
import SharedRecords from "./pages/doctor/SharedRecords";
import PatientSharedRecords from "./pages/doctor/PatientSharedRecords";
import AddRecordPage from "./pages/patient/AddRecordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "patient",
        children: [
          {
            index: true,
            element: <Navigate to="bookAppointment" replace />,
          },
          {
            path: "bookAppointment",
            element: <BoookAppointment />,
          },
          {
            path: "bookAppointment/:doctorAddress",
            element: <BookAnAppointment />,
          },
          {
            path: "allAppointments",
            element: <AllAppointments />,
          },
          {
            path: "allRecords",
            element: <AllRecords />,
          },
          {
            path: "allEmergencyRecords",
            element: <AllEmergencyRecords />,
          },
          {
            path: "add-record",
            element: <AddRecordPage />,
          },
        ],
      },
      {
        path: "doctor",
        children: [
          {
            index: true,
            element: <Navigate to="viewAppointments" replace />,
          },
          {
            path: "viewAppointments",
            element: <ViewAppointments />,
          },
          {
            path: "viewAppointments/:patientAddress",
            element: <ViewAppointment />,
          },
          {
            path: "emergencyRecords",
            element: <EmergencyRecords />,
          },
          {
            path: "emergencyRecords/:patientAddress",
            element: <EmergencyRecordDetails />,
          },
          {
            path: "create/:patientAddress",
            element: <CreateRecord />,
          },
          {
            path: "shared-records",
            element: <SharedRecords />,
          },
          {
            path: "shared-records/:patientAddress",
            element: <PatientSharedRecords />,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <WalletProvider>
    <RouterProvider router={router} />
  </WalletProvider>
  // </React.StrictMode>
);
