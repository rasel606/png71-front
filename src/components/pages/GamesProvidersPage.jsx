

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import GameBox from "../games/GameBox";
import SearchTab from "../games/SearchTab";
import SearchPage from "../games/SearchPage";
import SortBar from "../games/SortBar";
import JackpotBanner from "../games/JackpotBanner";
import { useGamePlay } from "../../hooks/useGamePlay";
import { useApp } from "../../contexts/AppContext";

const GamesProvidersPage = () => {
  const { category_name, providercode } = useParams();
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(
    providercode ? [providercode] : "ALL"
  );

  const { gameLaunchState, closeGame, launchGame, setGameLaunchState } = useApp();
  const [sortOption, setSortOption] = useState("recommend");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef();
  const limit = 24;
  const { apiCall } = useApi();

  const { 
    isPlaying, 
    playGameData, 
    showPopup, 
    handlePlay, 
    handleClosePopup 
  } = useGamePlay();

  // Fetch providers data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await apiCall("/New-table-Games-with-Providers", "GET", {
          category_name: category_name,
        });
        console.log("GamesProvidersPage category result", result.data);
        if (result.success) {
          setData(result.data[0] || {});
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category_name]);

  // Handle provider selection
  const handleProviderChange = (provider) => {
    let newProvider;
    
    if (provider === "ALL") {
      newProvider = "ALL";
    } else {
      if (selectedProvider === "ALL") {
        newProvider = [provider];
      } else if (Array.isArray(selectedProvider)) {
        if (selectedProvider.includes(provider)) {
          newProvider = selectedProvider.filter((p) => p !== provider);
          if (newProvider.length === 0) {
            newProvider = "ALL";
          }
        } else {
          newProvider = [...selectedProvider, provider];
        }
      } else {
        newProvider = [provider];
      }
    }

    setSelectedProvider(newProvider);
    setPage(0);
    setGameData([]);
    setHasMore(true);
  };

  // Fetch games with filters
  const fetchGames = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);
      const providerParam = selectedProvider === "ALL" 
        ? "" 
        : Array.isArray(selectedProvider) 
          ? selectedProvider.join(",") 
          : selectedProvider;

      const result = await apiCall(
        "/New-Games-with-Providers-By-Category",
        "GET",
        {
          category_name: category_name,
          page: page,
          provider: providerParam,
          gameName: searchQuery,
          sortBy: sortOption,
        }
      );

      console.log("GET GamesProvidersPage result:", result);

      if (result.success) {
        const newGames = result.data || [];
        if (newGames.length < limit) {
          setHasMore(false);
        }
        setGameData((prev) => [...prev, ...result.data]);
        setPage((prev) => prev + 1);
      }


      if (result.success) {
        if (result.data.length < limit) setHasMore(false);
        setGameData((prev) => [...prev, ...result.data]);

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(0);
    setGameData([]);
    setHasMore(true);
  }, [selectedProvider, searchQuery, sortOption, category_name]);

  // Initial fetch and when page changes
  // useEffect(() => {
  //   if (page === 0 && hasMore) {
  //     fetchGames();
  //   }
  // }, [page, hasMore]);

  // Infinite scroll setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchGames();
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading]);

  const handleSearchConfirm = () => {
    setShowSearch(false);
    setPage(0);
    setGameData([]);
    setHasMore(true);
  };

  return (
    <div className="content mcd-style">
      <div className="content-main">
        <div className="content-box">
          <div className="games">
            <JackpotBanner />
            
            {/* Search Tab Component */}
            <SearchTab
              providers={data.uniqueProviders || []}
              selectedProvider={selectedProvider}
              onProviderChange={handleProviderChange}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
            />

            {/* Search Page Component */}
            <SearchPage
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              providers={data.uniqueProviders || []}
              selectedProvider={selectedProvider}
              onProviderChange={handleProviderChange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onConfirm={handleSearchConfirm}
            />

            {/* Sort Bar Component */}
            <SortBar 
              sortOption={sortOption} 
              setSortOption={setSortOption} 
              title={category_name || "Games"}
            />

            {/* Games Grid */}
            <div className="games-main">
              {gameData.map((game) => (
                <GameBox
                  key={game._id}
                  game={game}
                  onPlay={launchGame}
                  type="game"
                />
              ))}
            </div>

            {/* Loading and End of Page */}
            <div ref={loader} className="loading">
              {isLoading && <div className="list-loading">Loading more games...</div>}
              {!hasMore && gameData.length > 0 && (
                <div className="prompt">－end of page－</div>
              )}
              {!hasMore && gameData.length === 0 && !isLoading && (
                <div className="prompt">No games found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Popup would go here */}
      {/* {showPopup && (
        <GamePopup
          showPopup={showPopup}
          playGameData={playGameData}
          onClose={handleClosePopup}
          title="Game"
        />
      )} */}
    </div>
  );
};

export default GamesProvidersPage;