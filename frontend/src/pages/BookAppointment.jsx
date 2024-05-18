import { useEffect, useState } from "react";
import styled from "styled-components";
import useWallet from "../context/UseWallet";
import { ipfsDownload } from "../utils/ipfs";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

function BoookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const { signer, contract } = useWallet();

  const navigate = useNavigate();

  function handleBook(address) {
    navigate(`${address}`);
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

  if (doctors.length === 0) return <h1>Loading</h1>;

  return (
    <>
      <h1>Book Appointment</h1>
      {doctors.map((doctor) => {
        return (
          <StyledDiv key={doctor.name}>
            <p>{doctor.name}</p>
            <p>{doctor.speciality}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.phone}</p>
            <button onClick={() => handleBook(doctor.address)}>Book</button>
          </StyledDiv>
        );
      })}
    </>
  );
}

export default BoookAppointment;
