import { useState, ChangeEvent, DragEvent, useEffect } from "react";
import axios from "axios";
import { PawPrint, Feather, XCircle, Search, Sparkles, CloudUpload, Repeat, ListChecks, Info, RefreshCcw } from "lucide-react";

export interface Prediction {
  label: string;
  confidence: number;
}

export interface AnimalInfo {
  species: string;
  kingdom: string;
  class: string;
  subclass: string;
  habitat: string;
  fact: string;
  diet: string;
  lifespan: string;
}

export interface PredictionResponse {
  top_prediction: Prediction;
  top_5: Prediction[];
  heatmap_data: string | null;
  animal_info: AnimalInfo;
}

const ScanPage = () => {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing Ecosystem...");

  useEffect(() => {
    if (isLoading) {
      const messages = [
        "Analyzing Ecosystem...",
        "Searching through the wild...",
        "Identifying the creature...",
        "Just a moment..."
      ];
      let index = 0;
      const interval = setInterval(() => {
        setLoadingText(messages[index]);
        index = (index + 1) % messages.length;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleImageUpload = async (file: File) => {
    if (!file) {
      setError("Please select an image first!");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setPrediction(null);
    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<PredictionResponse>("/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        const newScan = {
          id: new Date().toISOString(),
          image: base64Image,
          prediction: response.data.top_prediction.label,
          date: new Date().toLocaleDateString(),
        };
        const history = JSON.parse(localStorage.getItem("wildscan-history") || "[]");
        localStorage.setItem("wildscan-history", JSON.stringify([newScan, ...history]));
        URL.revokeObjectURL(previewUrl);
      };

      setPrediction(response.data);
      setIsLoading(false);
    } catch (err: any) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.detail
          ? err.response.data.detail
          : "Prediction failed. Try another image.";
      setError(message);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    setError(null);
    setImagePreview(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const ImageUploaderUI = () => (
    <div
      className={`relative w-full aspect-square border-2 border-dashed rounded-xl transition-colors duration-200 p-4 ${
        dragActive ? "border-green-500 bg-green-500/10" : "border-gray-300 dark:border-gray-600"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      {!imagePreview ? (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-full text-center cursor-pointer text-gray-500 dark:text-gray-400"
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <RefreshCcw className="w-12 h-12 text-green-500 animate-spin" />
              <p className="mt-4 text-xl font-semibold">Uploading...</p>
            </div>
          ) : (
            <CloudUpload className="w-16 h-16 mb-4 text-green-500" />
          )}
          <p className="text-xl font-semibold">Click or drag an image here</p>
          <p className="text-sm mt-2">JPG, PNG, GIF, or WEBP</p>
        </label>
      ) : (
        <div className="w-full h-full rounded-lg overflow-hidden relative">
          <img
            src={imagePreview}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );

  const SpeciesInfoUI = () => {
    if (!prediction?.animal_info) return null;

    const info = prediction.animal_info;

    return (
      <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-inner mt-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Species Information
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
          <li className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">Species:</span> {info.species}
          </li>
          <li className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">Kingdom:</span> {info.kingdom}
          </li>
          <li className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">Class:</span> {info.class}
          </li>
          <li className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">Subclass:</span> {info.subclass}
          </li>
          <li className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">Habitat:</span> {info.habitat}
          </li>
          <li className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">Diet:</span> {info.diet}
          </li>
          <li className="text-sm">
            <span className="font-bold text-gray-800 dark:text-gray-200">Lifespan:</span> {info.lifespan}
          </li>
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
          <p className="text-sm font-light text-gray-700 dark:text-gray-300">
            <span className="font-bold">Fact:</span> {info.fact}
          </p>
        </div>
      </div>
    );
  };

  const ResultsPanelUI = () => {
    if (!prediction) return null;

    const topPrediction = prediction.top_prediction;
    const top5 = prediction.top_5;
    const confidence = (topPrediction.confidence * 100).toFixed(2);

    return (
      <div className="w-full h-full flex flex-col justify-start items-center space-y-6 animate-fadeIn">
        <div className="w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            {topPrediction.label}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            Confidence: <span className="font-bold">{confidence}%</span>
          </p>
          {Number(confidence) < 80 && (
            <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
              <Info className="w-4 h-4 mr-1" />
              <p>Confidence is low. Try a clearer image.</p>
            </div>
          )}
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-inner">
          <div className="flex items-center text-gray-800 dark:text-gray-200 mb-3 font-semibold">
            <ListChecks className="w-5 h-5 mr-2" />
            <h3 className="text-lg">Top 5 Possibilities</h3>
          </div>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            {top5.map((pred, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-800 dark:text-gray-200">{pred.label}</span>
                <span className="text-sm font-mono">
                  {(pred.confidence * 100).toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleReset}
          className="mt-6 px-6 py-2 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors font-semibold shadow-lg flex items-center"
        >
          <Repeat className="w-5 h-5 mr-2" />
          Scan Another Image
        </button>
        {prediction.animal_info && <SpeciesInfoUI />}
        {prediction.heatmap_data && (
          <div className="w-full mt-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Heatmap Analysis
            </h3>
            <img
              src={`data:image/png;base64,${prediction.heatmap_data}`}
              alt="Prediction heatmap"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-8 flex flex-col flex-grow relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <Feather className="absolute top-10 left-[10%] w-8 h-8 text-green-400/10 -rotate-12 animate-float" />
          <PawPrint className="absolute top-64 right-[10%] w-10 h-10 text-green-400/15 rotate-12 animate-float-delay" />
          <Feather className="absolute bottom-20 left-[25%] w-6 h-6 text-green-400/10 rotate-45 animate-float-fast" />
          <PawPrint className="absolute bottom-40 right-[25%] w-8 h-8 text-green-400/15 -rotate-45 animate-float-slow" />
        </div>

        <div className="text-center mb-12 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 dark:text-green-300 mb-4 tracking-tight leading-tight">
            Discover the <span className="text-green-500 dark:text-green-400">Creature</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Upload a photo of an animal, and let WildScan use the power of AI to identify it for you.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${imagePreview ? 'lg:grid-cols-[1fr_1.5fr]' : 'lg:grid-cols-2'} gap-8 items-start max-w-7xl mx-auto relative z-10 w-full transition-all duration-500`}>
          <ImageUploaderUI />

          <div className="relative min-h-[400px] flex flex-col items-center justify-center p-4 rounded-xl shadow-lg dark:shadow-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700">
            {isLoading && (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <PawPrint className="w-20 h-20 text-green-500 animate-bounce-slow" />
                <p className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
                  {loadingText}
                </p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center text-center p-6 rounded-lg w-full">
                <XCircle className="w-16 h-16 text-red-500 mb-4 animate-shake" />
                <p className="text-lg font-medium text-red-600 dark:text-red-400">{error}</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors font-semibold"
                >
                  Try Again
                </button>
              </div>
            )}

            {prediction && imagePreview && <ResultsPanelUI />}

            {!prediction && !isLoading && !error && (
              <div className="text-center text-gray-500 dark:text-gray-400 space-y-4 max-w-sm">
                <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
                <p className="text-xl font-semibold">Your analysis will appear here.</p>
                <p>Upload a clear image of an animal to begin the identification process.</p>
              </div>
            )}
          </div>
        </div>
        <Sparkles className="absolute top-[20%] right-[30%] w-4 h-4 text-yellow-300/50 animate-sparkle" />
        <Sparkles className="absolute bottom-[10%] left-[5%] w-3 h-3 text-yellow-300/50 animate-sparkle-delay" />
      </div>
    </>
  );
};

export default ScanPage;