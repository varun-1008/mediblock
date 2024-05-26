import axios from 'axios';

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTE1NmM1Zi00OTA2LTQwYWYtODVjMi02OGQwYjM2YzEyOGUiLCJlbWFpbCI6ImFnYXJ3YWwudmFydW4xMDA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmN2Y4ZTc2YWM4NTkwMWYzYTNhMCIsInNjb3BlZEtleVNlY3JldCI6Ijk2ZmQwZjNmNzc0NzE1YmZmYmJkMGM3Y2M3Njk5NTg5ODEzYzkzNWJmNzc2NjRjNTUzM2QxNDFlOTVmZTNiNTIiLCJpYXQiOjE3MTI5OTMzOTV9.27u5eLDj82N3kkTBHPB1m6cCjCtKCNpo-m3m5SkKXJ0";

export async function ipfsUpload(text) {
  try {
    const blob = new Blob([text], { type: "text/plain" });
    const data = new FormData();
    data.append("file", blob);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    // console.log(resData);
    return resData;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function ipfsDownload(cid) {
    // const res = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    const res = await axios.get(`https://salmon-persistent-ox-513.mypinata.cloud/ipfs/${cid}`);
    return res.data;
}
