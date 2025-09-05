import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import BonVoyage from "../../assets/BonVoyage.png";
import { Plane, Menu, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

function Header() {
  const [opendialog, setOpenDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      });
  };

  useEffect(() => {
    console.log(user);
    
    // Add scroll listener for header background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur opacity-50 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent ${
                isScrolled ? '' : 'text-white'
              }`}>
                Bon Voyage
              </span>
              <span className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
                AI Travel Planner
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
<a href="/create-trip">
  <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full px-6 py-2 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
    Create Trip +
  </Button>
</a>

<a href="/my-trips">
  <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full px-6 py-2 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
    My Trips
  </Button>
</a>

                
                <Popover>
                  <PopoverTrigger>
                    <div className="relative">
                      <img 
                        src={user.picture} 
                        className="rounded-full w-12 h-12 border-2 border-white/30 hover:border-orange-400 transition-all duration-300 cursor-pointer shadow-lg" 
                        alt="Profile"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl">
                    <div className="space-y-1">
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <a href="/community">
                        <div className="px-4 py-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors duration-200">
                          <span className="text-sm text-gray-700">Join Our Community</span>
                        </div>
                      </a>
                      <div 
                        onClick={() => {
                          googleLogout();
                          localStorage.clear();
                          window.location.reload(); 
                        }} 
                        className="px-4 py-3 hover:bg-red-50 rounded-xl cursor-pointer transition-colors duration-200"
                      >
                        <span className="text-sm text-red-600">Logout</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Button 
                onClick={() => setOpenDialog(true)}
                className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
                }`}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="sm"
              className={`p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/20">
            <div className="px-6 py-4 space-y-4">
              {user ? (
                <>
                  <a href="/create-trip" className="block">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full py-3 font-semibold">
                      Create Trip +
                    </Button>
                  </a>
                  <a href="/my-trips" className="block">
                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full py-3 font-semibold">
                      My Trips
                    </Button>
                  </a>
                  <a href="/community" className="block">
                    <Button variant="ghost" className="w-full text-gray-700 hover:bg-gray-50 rounded-full py-3">
                      Join Our Community
                    </Button>
                  </a>
                  <Button 
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload(); 
                    }}
                    variant="ghost" 
                    className="w-full text-red-600 hover:bg-red-50 rounded-full py-3"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => {
                    setOpenDialog(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full py-3 font-semibold"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Login Dialog */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent rounded-lg"></div>
                </div>
                
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Welcome to Bon Voyage
                  </h2>
                  <p className="text-gray-600 text-sm max-w-xs">
                    Sign in with Google to start planning your dream adventures with AI-powered recommendations
                  </p>
                </div>
                
                <Button
                  onClick={login}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FcGoogle className="w-5 h-5" />
                  Continue with Google
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;