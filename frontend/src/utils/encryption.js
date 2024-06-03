export async function generateKeyPair() {
  const res = await fetch("https://backend-varun1008s-projects.vercel.app/");
  return await res.json();
}

export async function encryptS({ data }) {
  const res = await fetch(
    "https://backend-varun1008s-projects.vercel.app/encryptS",
    {
      method: "POST",
      body: JSON.stringify({
        data: data,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return await res.json();
}

export async function decryptS({ encryptedData, key }) {
  const res = await fetch(
    "https://backend-varun1008s-projects.vercel.app/decryptS",
    {
      method: "POST",
      body: JSON.stringify({
        encryptedData: encryptedData,
        key: key,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return await res.json();
}

export async function encryptA({ publicKey, data }) {
  const res = await fetch(
    "https://backend-varun1008s-projects.vercel.app/encryptA",
    {
      method: "POST",
      body: JSON.stringify({
        publicKey: publicKey,
        data: data,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return await res.json();
}

export async function decryptA({ privateKey, encryptedData }) {
  const res = await fetch(
    "https://backend-varun1008s-projects.vercel.app/decryptA",
    {
      method: "POST",
      body: JSON.stringify({
        privateKey: privateKey,
        encryptedData: encryptedData,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return await res.json();
}

export async function encryptGA(data) {
  let res = await fetch(
    "https://backend-varun1008s-projects.vercel.app/encryptGA",
    {
      method: "POST",
      body: JSON.stringify({
        data: data,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  res =  await res.json();
  return res.encryptedData;
}

export async function decryptGA(encryptedData) {
  let res = await fetch(
    "https://backend-varun1008s-projects.vercel.app/decryptGA",
    {
      method: "POST",
      body: JSON.stringify({
        encryptedData: encryptedData,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  res =  await res.json();
  return res.data;
}
