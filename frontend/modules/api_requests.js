let API_url = "https://fashion-production-896d.up.railway.app";
// let API_url = "http://127.0.0.1:8000";

async function sendImageToBackend(base64) {
    const res = await fetch(`${API_url}/detect`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ image: base64 })
    });

    const data = await res.json();
    console.log("Data received from backend:", data);
    return data;
}

export { sendImageToBackend };
