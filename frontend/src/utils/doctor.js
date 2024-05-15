export async function registerDoctor({ cid, signer, contract }) {
  try {
    const tx = await contract.connect(signer).doctorRegistration(cid);
    await tx.wait();
    return true;
  } catch (err) {
    return false;
  }
}

export async function doctorInfoCid({ address, contract }) {
  try {
    const cid = await contract.getDoctorInfo(address);
    return cid;
  } catch (err) {
    throw new Error("Cannot fetch patient info");
  }
}

