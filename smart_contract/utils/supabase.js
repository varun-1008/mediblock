const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://cguusxyoeookuiggdwvk.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndXVzeHlvZW9va3VpZ2dkd3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczMzE0NTUsImV4cCI6MjAzMjkwNzQ1NX0.RqyWBki1uLCA28CUQv2LhTkMcsA9HCVnepy83sn8sJ4";
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMPublickeyExists(value) {
    try {
        // Query the table for the specific value in the given column
        const { data, error } = await supabase
            .from("keys")
            .select("m_public_key")
            .eq("m_public_key", value);

        if (error) {
            throw error;
        }

        // If data array is not empty, the value exists
        if (data.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking value existence:", error);
        return false;
    }
}

async function generateKeyPair() {
    const res = await fetch("https://backend-varun1008s-projects.vercel.app/");
    const data = await res.json();
    return data;
}

async function addKeypair(key) {
    try {
        const alreadyExists = await checkMPublickeyExists(key);

        if (!alreadyExists) {
            const { publicKey, privateKey } = await generateKeyPair();

            await supabase
                .from("keys")
                .insert([
                    {
                        m_public_key: key,
                        public_key: publicKey,
                        private_key: privateKey,
                    },
                ])
                .select();
        }
    } catch (error) {
        console.error("Error checking value existence:", error);
        return false;
    }
}

module.exports = { checkMPublickeyExists, addKeypair };
