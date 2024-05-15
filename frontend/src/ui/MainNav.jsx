import { Link } from "react-router-dom";
import useWallet from "../context/UseWallet";

function MainNav() {
  const { role } = useWallet();

  if (role === 0) {
    return (
      <>
        <Link to="/register">Register</Link>
      </>
    );
  }

  if (role === 1) {
    return (
      <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patient/bookAppointment">Book appointment</Link>
        <Link to="/patient/allAppointments">All Appointments</Link>
        <Link to="/patient/allRecords">All Records</Link>
        <Link to="/patient/allEmergencyRecords">All Emergency Records</Link>
      </>
    );
  }

  if (role === 2) {
    return (
      <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/doctor/viewAppointments">View Appointments</Link>
      </>
    );
  }
}

export default MainNav;
