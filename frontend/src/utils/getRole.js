export async function getRole({address, contract}) {
    try {
        const role = await contract.role(address);
        return role;
    } catch (err) {
        throw new Error("Cannot fetch role");
    }
}