import { useEffect, useState } from "react";
import useWallet from "../../context/UseWallet";
import { ipfsDownload } from "../../utils/ipfs";
import { useNavigate } from "react-router-dom";
import DoctorCard from "@/components/DoctorCard";
import { LoadingState } from "@/components/LoadingState";
import { SearchDoctors } from "@/components/SearchDoctors";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const { signer, contract, address } = useWallet();
  const navigate = useNavigate();

  function handleBook(address, name) {
    const params = new URLSearchParams();
    params.append("name", name);
    navigate({
      pathname: `${address}`,
      search: params.toString(),
    });
  }

  useEffect(() => {
    (async function () {
      const newData = [];

      const doctorsAddresses = await contract
        .connect(signer)
        .getNotAppointedDoctors();

      for (const doctorAddress of doctorsAddresses) {
        const cid = await contract.getDoctorInfo(doctorAddress);
        const info = await ipfsDownload(cid);
        info.address = doctorAddress;
        newData.push(info);
      }
      setDoctors(newData);
    })();
  }, [signer, contract]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleInputOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredData = (searchQuery, doctors) => {
    let filteredData = doctors;
    if (searchQuery) {
      filteredData = filteredData.filter((doctor) => {
        const name =
          doctor.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
        const speciality =
          doctor.speciality.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
          -1;

        return name || speciality;
      });
    }

    return filteredData;
  };

  const finalDoctors = getFilteredData(searchQuery, doctors);

  if (doctors.length === 0) return <LoadingState />;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-medium">Book an Appointment</h1>
        <p className="text-sm text-zinc-400">
          Please choose a doctor to book an appointment
        </p>
      </div>
      <div className="space-y-5">
        <SearchDoctors
          value={searchQuery}
          handleInputOnChange={handleInputOnChange}
        />
        {finalDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            {finalDoctors.map((doctor) => {
              return (
                <DoctorCard
                  doctor={doctor}
                  key={doctor.address}
                  handleBook={handleBook}
                />
              );
            })}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <p className="text-zinc-400">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;
