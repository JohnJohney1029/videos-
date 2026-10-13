
const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");
const statusBox = document.getElementById("status");
const message = document.getElementById("message");
const video = document.getElementById("video");

generateBtn.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();
    const style = document.getElementById("style").value;
    const format = document.getElementById("format").value;

    if (!prompt) {
        promptInput.focus();
        promptInput.placeholder =
            "Pehle apni kids video ki story likho...";
        return;
    }

    result.hidden = false;
    video.hidden = true;
    video.removeAttribute("src");

    statusBox.textContent = "Preparing your video request...";
    message.textContent = "";

    generateBtn.disabled = true;
    generateBtn.textContent = "✨ Please wait...";

    try {
        /*
          REAL AI VIDEO GENERATION:

          Apne backend par POST /api/generate endpoint banao.
          Endpoint ko 25-second video generate karni hogi.

          Expected response:
          {
            "videoUrl": "https://your-server.com/video.mp4"
          }

          API key ko is file mein mat rakhna.
        */

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt,
                style,
                format,
                duration: 25
            })
        });

        if (!response.ok) {
            throw new Error(
                "AI video backend is not connected yet."
            );
        }

        const data = await response.json();

        if (!data.videoUrl) {
            throw new Error("No video URL was returned.");
        }

        video.src = data.videoUrl;
        video.hidden = false;

        statusBox.textContent = "Your video is ready! 🎉";
        message.textContent =
            "Your kids video has been generated.";

        video.load();

    } catch (error) {
        statusBox.textContent =
            "AI video generator is not connected yet.";

        message.textContent =
            "The website design is ready, but actual video generation needs an AI video model and a backend. Connect a provider before using Generate.";

        console.error(error);

    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "✨ Generate Kids Video →";
    }

    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});
