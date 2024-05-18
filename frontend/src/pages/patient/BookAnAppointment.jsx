import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWallet from "../../context/UseWallet";
import Records from "../../ui/Records";

function BookAnAppointment() {
  const { doctorAddress } = useParams();

  const [records, setRecords] = useState(null);
  const [selected, setSelected] = useState([]);
  const { signer, contract, address } = useWallet();

  const navigate = useNavigate();

  function handleSelect({ linkIndex }) {
    const isSelected = selected.find((el) => el === linkIndex);
    let newSelected = [...selected];
    if (isSelected !== undefined)
      newSelected = newSelected.filter((el) => el !== linkIndex);
    else newSelected.push(linkIndex);
    setSelected(newSelected);
  }

  async function handleBook() {
    for (const linkIndex of selected) {
      const tx = await contract
        .connect(signer)
        .giveAccess(linkIndex, doctorAddress, Date.now() + 7 * 24 * 60 * 60);
      await tx.wait();
    }

    const tx = await contract.connect(signer).addAppointment(doctorAddress);
    await tx.wait();

    navigate("/patient/allAppointments");
  }

  useEffect(() => {
    (async function () {
      const newData = [];

      let records = await contract.connect(signer).getRecords();

      const titles = records[0];
      const timestamps = records[1];
      const linkIndices = records[2];
      const recordIndices = records[3];
      const length = titles.length;

      for (let i = 0; i < length; ++i) {
        const recordObj = {
          title: titles[i],
          time: timestamps[i],
          linkIndex: Number(linkIndices[i]),
          recordIndex: Number(recordIndices[i]),
        };

        if (newData[linkIndices[i]] === undefined) newData[linkIndices[i]] = [];
        newData[linkIndices[i]].push(recordObj);
      }

      setRecords(newData);
    })();
  }, [signer, contract]);

  if (records === null) return <h1>Loading</h1>;

  return (
    <>
      <h1>Book An Appointment</h1>

      <Records
        recordsInfo={{ address, records }}
        buttonTitle="Select"
        buttonFunction={handleSelect}
      />

      <button onClick={handleBook}>Book</button>
    </>
  );
}

export default BookAnAppointment;
