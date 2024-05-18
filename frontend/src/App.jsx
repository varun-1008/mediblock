import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import WalletProvider from "./context/WalletContext";
import Register from "./pages/Register";
import BoookAppointment from "./pages/patient/BookAppointment";
import ViewAppointments from "./pages/doctor/ViewAppointments";
import AllAppointments from "./pages/patient/AllAppointments";
import ViewAppointment from "./pages/doctor/ViewAppointment";
import CreateRecord from "./pages/doctor/CreateRecord";
import AllRecords from "./pages/patient/AllRecords";
import AllEmergencyRecords from "./pages/patient/AllEmergencyRecords";
import BookAnAppointment from "./pages/patient/BookAnAppointment";

function App() {

  return (
    <>
      <WalletProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                    <AppLayout />
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="patient">
                  <Route path="bookAppointment" element={<BoookAppointment />}/>
                  <Route path="bookAppointment/:doctorAddress" element={<BookAnAppointment />}/>
                  <Route path="allAppointments" element={<AllAppointments />} />
                  <Route path="allRecords" element={<AllRecords />} />
                  <Route path="allEmergencyRecords" element={<AllEmergencyRecords />} />
                </Route>

                <Route path="doctor">
                  <Route path="viewAppointments" element={<ViewAppointments />}/>
                  <Route path="viewAppointments/create/:patientAddress" element={<CreateRecord />} />
                  <Route path="viewAppointments/:patientAddress" element={<ViewAppointment />}/>
                </Route>
                
                <Route path="register" element={<Register />}/>
              </Route>
                
            </Routes>
          </BrowserRouter>
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
    </>
  );
}

export default App;
