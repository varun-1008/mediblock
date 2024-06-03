export async function registerPatient({ cid, signer, contract }) {
  try {
    const tx = await contract.connect(signer).patientRegistration(cid);
    await tx.wait();
    return true;
  } catch (err) {
    return false;
  }
}

export async function patientInfoCid({ address, contract }) {
  try {
    const cid = await contract.getPatientInfo(address);
    console.log("cid = ", cid);
    return cid;
  } catch (err) {
    throw new Error("Cannot fetch patient info");
  }
}
