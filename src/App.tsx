import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TokenStats from "./components/TokenStats";
import TokenTrading from "./components/TokenTrading";
import Marketplace from "./components/Marketplace";
import Footer from "./components/Footer";
import NotificationSystem, { useNotifications } from "./components/NotificationSystem";
import UserProfile from "./components/UserProfile";
import NFTMinting from "./components/NFTMinting";

function App() {
  console.log("🎨 App component rendering…");

  const { notifications, addNotification, removeNotification } = useNotifications();
  const [isLoading, setIsLoading] = React.useState(true);

  // Add welcome notification and handle loading
  React.useEffect(() => {
    console.log("⏰ Setting up timers…");

    // Set loading to false after a short delay to ensure everything is rendered
    const loadingTimer = setTimeout(() => {
      console.log("✅ Setting isLoading to false");
      setIsLoading(false);
    }, 1000);

    const welcomeTimer = setTimeout(() => {
      console.log("🎉 Adding welcome notification");
      addNotification(
        "info",
        "Welcome to Bonkeez Exchange!",
        "All systems are now fully functional"
      );
    }, 2000);

    return () => {
      console.log("🧹 Cleaning up timers");
      clearTimeout(loadingTimer);
      clearTimeout(welcomeTimer);
    };
  }, [addNotification]); // Add dependency

  console.log("🔍 Current loading state:", isLoading);

  if (isLoading) {
    console.log("⏳ Showing loading screen…");
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-xl mt-4">Loading Bonkeez Exchange…</p>
          <p className="text-white text-sm mt-2">
            Debug: isLoading = {isLoading.toString()}
          </p>
        </div>
      </div>
    );
  }

  console.log("🎨 Rendering main app content…");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
      <NotificationSystem notifications={notifications} onRemove={removeNotification} />
      <Header />
      <Hero />
      <TokenStats />

      {/* Profile Section */}
      <section
        id="profile"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Your Bonkeez Profile
            </h2>
            <p className="text-lg text-slate-300">
              Connect your wallet to view your collection and $BNKZ balance
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <UserProfile />
          </div>
        </div>
      </section>

      <TokenTrading />
      <Marketplace />

      {/* NFT Minting Section */}
      <section id="minting" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Mint Your Bonkeez
            </h2>
            <p className="text-xl text-slate-300">
              Mint unique Bonkeez NFTs directly from the collection
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <NFTMinting />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;