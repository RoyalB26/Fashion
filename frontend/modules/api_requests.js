let API_url = "http://localhost:8000";

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
