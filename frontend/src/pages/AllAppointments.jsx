import { useEffect, useState } from "react";
import useWallet from "../context/UseWallet";
import { ipfsDownload } from "../utils/ipfs";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

function AllAppointments() {
  const { signer, contract } = useWallet();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    (async function () {
      const newData = [];

      const doctorsAddresses = await contract
        .connect(signer)
        .getAppointedDoctors();

      for (const [index, doctorAddress] of doctorsAddresses.entries()) {
        const cid = await contract.getDoctorInfo(doctorAddress);
        const info = await ipfsDownload(cid);
        info.index = index;
        info.address = doctorAddress;
        newData.push(info);
      }
      setDoctors(newData);
    })();
  }, [doctors, signer, contract]);
  return (
    <>
      <h1>All Appointments</h1>
      {doctors.map((doctor) => {
        return (
          <StyledDiv key={doctor.name}>
            <p>{doctor.name}</p>
            <p>{doctor.speciality}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.phone}</p>
          </StyledDiv>
        );
      })}
    </>
  );
}

export default AllAppointments;
