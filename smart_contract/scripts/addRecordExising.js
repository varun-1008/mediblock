const fs = require("fs");
const path = require("path");

async function main() {
    const addressFile = path.join("constants", "address.txt");

    const address = fs.readFileSync(addressFile, "utf8");
    const contract = await ethers.getContractAt(
        "MediBlock",
        address,
    );

    const [p1, p2, p3, d1, d2, d3] = await ethers.getSigners();

    // const p1Info = "QmR6rVyMB5B2XCxwyxjSZCgALCbmfxFErzPjeoFEq1A2e1";
    // const p2Info = "QmfBDpcvJ8eGnXHdhAEtVQVwL1aBCGusJtppiQDh2YdEcb";
    // const p3Info = "QmZb82kyT6ffp8kvJLYKQDMMBLTJMRRz17b222q69PB1xQ";
    // const d1Info = "QmRsgZQWQSWqQK9goscRgwfg6ReYkPfT17t46onqhxjZA6";
    // const d2Info = "QmXQXUV9SBR5XPkHbqsZ3b5T5ti1DrjC6FrJZieBpp4HuQ";
    // const d3Info = "QmQkoCfxKy7Cb2WwnKfx2rS2mY3VzFsfFnPrCRjrBjiJBt";

    await contract.connect(d1).addRecordNewLink(p1, "Pain in chest", "25123556634", "QmRv39BkD9b1HjBrBmvygz48PguojbGChdLP3oLpqYMfRr");
    await contract.connect(d1).addRecordNewLink(p1, "Pain in leg", "25123556634", "QmcSmh9RrePDWAZf1GZXGm33oBN2bpCa3sR1FN73Ak8hgW");
    await contract.connect(d1).addRecordExistingLink(p1, 0, "Pain in heart", "25123556634", "QmRv39BkD9b1HjBrBmvygz48PguojbGChdLP3oLpqYMfRr");
    // await contract.connect(p2).patientRegistration(p2Info);
    // await contract.connect(p3).patientRegistration(p3Info);
    // await contract.connect(d1).doctorRegistration(d1Info);
    // await contract.connect(d2).doctorRegistration(d2Info);
    // await contract.connect(d3).doctorRegistration(d3Info);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
