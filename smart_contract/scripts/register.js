const fs = require("fs");
const path = require("path");
const { addKeypair } = require("../utils/supabase");

async function main() {
    const addressFile = path.join("constants", "address.txt");

    const address = fs.readFileSync(addressFile, "utf8");
    const contract = await ethers.getContractAt("MediBlock", address);

    const [p1, p2, p3, d1, d2, d3] = await ethers.getSigners();

    const users = [p1, p2, p3, d1, d2, d3];

    const cids = [
        "QmR6rVyMB5B2XCxwyxjSZCgALCbmfxFErzPjeoFEq1A2e1",
        "QmfBDpcvJ8eGnXHdhAEtVQVwL1aBCGusJtppiQDh2YdEcb",
        "QmZb82kyT6ffp8kvJLYKQDMMBLTJMRRz17b222q69PB1xQ",
        "QmRsgZQWQSWqQK9goscRgwfg6ReYkPfT17t46onqhxjZA6",
        "QmXQXUV9SBR5XPkHbqsZ3b5T5ti1DrjC6FrJZieBpp4HuQ",
        "QmQkoCfxKy7Cb2WwnKfx2rS2mY3VzFsfFnPrCRjrBjiJBt",
    ];

    const pendingInfos = cids.map(async (cid) => {
        const info = await fetch("https://backend-varun1008s-projects.vercel.app/encryptGA", {
            method: "POST",
            body : JSON.stringify({
                "data" : cid
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        return info.json();
    });

    const infos = await Promise.all(pendingInfos);

    for(let i = 0; i < 3; ++i) {
        await addKeypair(users[i].address)
        await contract.connect(users[i]).patientRegistration(infos[i].encryptedData);
    }

    for(let i = 3; i < 6; ++i) {
        await addKeypair(users[i].address)
        await contract.connect(users[i]).doctorRegistration(infos[i].encryptedData);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
