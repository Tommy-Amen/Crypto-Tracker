import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import AreaChart from "./AreaChart";

const CoinPage = () => {
  const { cryptoId } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [period, setPeriod] = useState("10");
  const [error, setError] = useState(null);

  const { currentCurrency } = useContext(CryptoContext);

  if (!cryptoId)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Error: No cryptocurrency ID provided.</p>
      </div>
    );

  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-BCvmzAZECeVBgtPjwk4bSVUD",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const detailsRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}`,
          requestOptions
        );
        if (!detailsRes.ok)
          throw new Error(
            `Error fetching coin details: ${detailsRes.statusText}`
          );
        setCoinDetails(await detailsRes.json());

        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currentCurrency.name}&days=${period}&interval=daily`,
          requestOptions
        );

        console.log("Request options:", requestOptions);
        if (!chartRes.ok)
          throw new Error(`Error fetching chart data:, ${chartRes.statusText}`);

        setChartData(await chartRes.json());
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchData();
  }, [currentCurrency, cryptoId, period]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );

  if (!coinDetails || !chartData)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 text-white px-4 sm:px-[5%] md:px-[8%] py-6">
      <div className="flex flex-col items-center md:flex-row gap-4 mb-6 bg-gray-800/30 backdrop-blur-lg p-4 rounded-xl border border-emerald-500/20">
        <img
          src={coinDetails.image?.large}
          alt={coinDetails.name}
          className="w-16 h-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {coinDetails.name}

            <span className="text-xl md:text-2xl ml-2 text-cyan-400/80 block mt-1">
              ({coinDetails.symbol?.toUpperCase()})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-300/80">
            Rank: #{coinDetails.market_cap_rank}
          </p>
        </div>
      </div>
      <div className="mb-6 bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
          <h2 className="text-lg font-semibold text-emerald-400/90">
            {currentCurrency.symbol} Price Chart
          </h2>
          <div className="relative group">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-gray-800/60 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            >
              <option value="1">24H</option>
              <option value="7">7D</option>
              <option value="10">10D</option>
              <option value="30">30D</option>
              <option value="90">3M</option>
              <option value="365">1Y</option>
            </select>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/20 to-cyan-500/20 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300 -z-10" />
          </div>
              </div>
              <div className="h-64 md:h-80">
                  <AreaChart historicalData={chartData} currencySymbol={currentCurrency.symbol} />
              </div>
          </div>
          <div className="space-y-3"></div>
    </div>
  );
};

export default CoinPage;
