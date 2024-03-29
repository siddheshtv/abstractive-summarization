import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

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
      <Navbar />
      <div>
        {isAuthenticated ? (
          <div className="min-h-screen">
            <h1 className="text-3xl pt-24 pb-12 text-center font-bold">
              Get video summaries with ease.
            </h1>
            <div className="grid grid-cols-2 justify-center items-center p-4 divide-x-2 border-2 m-5 rounded-lg">
              <div className="p-4 flex flex-col space-y-3 justify-center items-center">
                <h1 className="text-2xl font-bold py-4">
                  Summary using YouTube links
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col max-w-sm items-start justify-center space-y-3"
                >
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="video_url">Video URL</label>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="border-2 border-gray-300 rounded-lg p-2 w-[420px]"
                      placeholder="https://"
                      name="video_url"
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Get Summary"}
                  </button>
                </form>
              </div>
              <div className="p-4 flex flex-col space-y-3 justify-center items-center">
                <h1 className="text-2xl font-bold py-4">Upload a video</h1>
                <div className="flex flex-col space-y-1">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-4 focus:outline-none focus:border-blue-500"
                  />
                  {file && (
                    <p className="text-green-700 mt-2">
                      File selected: {file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="mt-6 max-w-2xl">
                {summary && (
                  <p className="border-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-lg text-lg">
                    <span className="font-bold text-xl py-3">Summary</span>:{" "}
                    <br />
                    {summary}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <p className="flex justify-center items-center text-xl py-24">
              You are not logged in, please either create an account or sign in.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
