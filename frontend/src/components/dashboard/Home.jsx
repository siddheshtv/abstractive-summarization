import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://0.0.0.0:8000/summarize", {
        video_url: videoUrl,
        filename: "sample.mp4",
      });
      setSummary(response.data.summary[0].summary_text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post(
        "http://0.0.0.0:8000/summarize-offline",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSummary(response.data.summary[0].summary_text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <div>
        {isAuthenticated ? (
          <div>
            <h2 className="text-xl pb-12">Hello {user.name}</h2>
            <div className="grid grid-cols-2 justify-center items-center">
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col max-w-sm items-start justify-center space-y-3"
                >
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="border-2 border-gray-300 rounded-lg"
                    placeholder="video_url"
                    name="video_url"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 px-4 py-2 text-gray-50 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Get Summary"}
                  </button>
                </form>
              </div>
              <div>
                <input type="file" onChange={handleFileUpload} />
                {file && <p>File selected: {file.name}</p>}
              </div>
            </div>

            {summary && <p className="mt-3">Summary: {summary}</p>}
          </div>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-500 px-4 py-2 text-gray-50"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
