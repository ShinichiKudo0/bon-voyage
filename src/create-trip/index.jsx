import React, { useEffect, useState } from "react";
import { SelectBudgetOptions, SelectTravelersList } from "@/constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MapPin, Calendar, DollarSign, Users, Sparkles, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BonVoyage from "../assets/BonVoyage.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom"; // Make sure this is imported

function CreateTrip() {
  const [opendialog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveler: "",
  });
  
  // Initialize navigate hook
  const navigate = useNavigate();

  // Navigation function
  const handleBackToHome = () => {
    navigate('/');
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.noOfDays > 20 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the details mentioned above.");
      return;
    }
    setloading(true);
    const Final_Prompt = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);
    console.log(Final_Prompt);
    const result = await chatSession.sendMessage(Final_Prompt);
    console.log(result?.response.text());
    setloading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITRIPS", docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID,
    });
    setloading(false);
    navigate("/view-trip/" + docID);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* FIXED: Back to Home Button */}
          <button 
            onClick={handleBackToHome}
            className="flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tell us your preferences and let our AI create a personalized itinerary just for you
            </p>
          </div>
        </div>
      </div>

      {/* Rest of your form components remain the same... */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          
          {/* Destination */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-2">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Where do you want to go?</h2>
            </div>
            
            <input
              type="text"
              placeholder="Enter your dream destination..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 text-lg"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
            
            {formData.location && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-orange-800">
                  ✈️ Destination: <strong>{formData.location}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-2">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">How many days?</h2>
            </div>
            
            <input
              placeholder="e.g., 7 days"
              type="number"
              min="1"
              max="30"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 text-lg"
              value={formData.noOfDays}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          {/* Budget */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-2">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">What's your budget range?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-6 border-2 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    formData?.budget === item.title
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travelers */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Who's traveling?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SelectTravelersList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-6 border-2 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    formData?.traveler === item.people
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center pt-8">
            <Button 
              onClick={OnGenerateTrip} 
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-4 text-lg rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                  <span>Creating Your Perfect Trip...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <span>Generate My Dream Trip</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Login Dialog - Keep your existing dialog code */}
      <Dialog open={opendialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl">
          <DialogHeader>
            <DialogDescription>
              <DialogTitle></DialogTitle>
              <div className="flex flex-col items-center space-y-6 py-6">
                <div className="relative">
                  <img
                    src={BonVoyage}
                    className="w-full h-32 object-contain"
                    alt="Bon Voyage"
                  />
                </div>
                
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Almost There!
                  </h2>
                  <p className="text-gray-600 text-sm max-w-xs">
                    Sign in with Google to save your trip and access all our AI-powered features
                  </p>
                </div>
                
                <Button
                  onClick={login}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FcGoogle className="w-5 h-5" />
                  Continue with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;