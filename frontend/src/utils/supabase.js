import { createClient } from "@supabase/supabase-js";
import { generateKeyPair } from "./encryption";

const supabaseUrl = "https://cguusxyoeookuiggdwvk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndXVzeHlvZW9va3VpZ2dkd3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczMzE0NTUsImV4cCI6MjAzMjkwNzQ1NX0.RqyWBki1uLCA28CUQv2LhTkMcsA9HCVnepy83sn8sJ4";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkMPublickeyExists(value) {
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
      console.log(`Value ${value} exists in column m_public_key.`);
      return true;
    } else {
      console.log(`Value ${value} does not exist in column m_public_key.`);
      return false;
    }
  } catch (error) {
    console.error("Error checking value existence:", error);
    return false;
  }
}

export async function addKeyPair(key) {
  try {
    const alreadyExists = await checkMPublickeyExists(key);

    if (!alreadyExists) {
      const { public_key, private_key } = await generateKeyPair();

      await supabase
        .from("keys")
        .insert([{ m_public_key: key, public_key, private_key }])
        .select();
    }
  } catch (error) {
    console.error("Error checking value existence:", error);
    return false;
  }
}

export async function getPublicKey(key) {
  try {
    const { data } = await supabase
      .from("keys")
      .select("public_key")
      .eq("m_public_key", key);

    return data;
  } catch (error) {
    console.error("Error checking value existence:", error);
    return false;
  }
}

export async function getPrivatekey(key) {
  try {
    const { data } = await supabase
      .from("keys")
      .select("private_key")
      .eq("m_public_key", key);

    return data;
  } catch (error) {
    console.error("Error checking value existence:", error);
    return false;
  }
}

export default supabase;