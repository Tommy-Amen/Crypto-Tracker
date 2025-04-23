import React, { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const CoinArea = () => {
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const { filteredCryptos, currentCurrency, setCurrentCurrency } =
    useContext(CryptoContext);

  const handleCurrencySelect = (selectCurrency) => {
    switch (selectCurrency) {
      case "usd":
        setCurrentCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrentCurrency({ name: "eur", symbol: "€" });
        break;
      default:
        setCurrentCurrency({ name: "usd", symbol: "$" });
    }
    setIsCurrencyDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 text-white px-4 sm:px-[5%] py-6 md:py-10 relative z-0">
      <div className="text-center mb-8 md:mb-12 space-y-4 group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl opacity-30 animate-pulse-slow" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent animate-gradient-x leading-tight">
          Crypto <br />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Market Intelligence
          </span>
        </h1>
        <p className="text-gray-300/80 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mt-4">
          Track real-time crypto market metrics with advanced analytics and{" "}
          <span className="bg-gradient-to-r from-emerald-400/80 to-cyan-400/80 bg-clip-text text-transparent">
            neural network predictions
          </span>
        </p>
      </div>

      {/* Task Header */}
      <div className="hidden md:grid grid-cols-5 gap-4 text-sm py-4 px-4 mb-2 bg-gray-800/40 backdrop-blur-lg rounded-xl border border-emerald-500/20">
        <p className="text-emerald-400/90">Rank</p>
        <p className="text-cyan-400/90">Coins</p>

        <div
          onClick={() => {
            setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
          }}
          className="relative flex items-center gap-1 cursor-pointer group"
        >
          <span>Price</span>
          <div className="flex items-center gap-1">
            <span className="text-emerald-400/90">
              ({currentCurrency.name})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-cyan-400/80 transition-transform ${
                isCurrencyDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <p>24H Flux</p>
        <p>Market Cap</p>
      </div>

      {/* CURRENCY DROPDOWN */}
      {isCurrencyDropdownOpen && (
        <div className="relative bg-gray-800/95 backdrop-blur-xl rounded-lg border border-emerald-500/20 shadow-2xl z-50">
          {["usd", "eur"].map((code) => (
            <div
              key={code}
              className="px-4 py-3 hover:bg-emerald-600/30 transition-colors cursor-ponter flex items-center gap-2"
              onClick={() => handleCurrencySelect(code)}
            >
              <span className="text-emerald-400/80">
                {code === "usd" ? "$" : code == "eur" ? "€" : ""}
              </span>
              <span className="text-gray-100">{code.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}

      {/* COIN LIST */}
      <div className="space-y-3 relative z-10">
        {filteredCryptos.slice(0, 12).map((item) => (
          <Link
            to={`/crypto/${item.id}`}
            key={item.id}
            className="block p-4 bg-gray-800/30 backdrop-blur-md hover:bg-gray-700/40 rounded-xl border border-emerald-500/10 hover:border-cyan-500/30 transition-all duration-300 group"
          >
            {/* MOBILE TABLET LAYOUT */}
            <div className="md:hidden space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400/80 text-sm">
                    #{item.market_cap_rank}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 p-0.5"
                  />
                  <div>
                    <p className="font-medium text-gray-100 sm:text-base text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs sm:text-sm text-cyan-400/80 mt-0.5">
                      {item.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm sm:text-base text-gray-100">
                    {currentCurrency.symbol}{" "}
                    {item.current_price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-emerald-500/10">
                <div
                  className={`flex items-center gap-1 text-sm sm:text-base ${
                    item.price_change_percentage_24h > 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  <span>
                    {item.price_change_percentage_24h > 0
                      ? "&#9650;"
                      : "&#9660;"}
                  </span>
                  {Math.abs(item.price_change_percentage_24h.toFixed(2))}%
                </div>
                <div className="text-right">
                  <p>
                    {currentCurrency.symbol} {item.market_cap.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-400/60 mt-0.5">
                    Vol: {currentCurrency.symbol}{" "}
                    {item.total_volume.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidded md:grid grid-cols-5 gap-4 items-center">
              <span className="text-emerald-400/80 text-sm lg:text-base">
                #{item.market_cap_rank}
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5"
                />
                <div>
                  <p className="font-medium text-gray-100 text-base lg:text-lg">
                    {item.name}
                  </p>
                  <p className="text-sm lg:text-base text-emerald-400/80">{item.symbol.toUpperCase()}</p>
                </div>
                    </div>
                    <div className="flex items-center">

                    </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinArea;
