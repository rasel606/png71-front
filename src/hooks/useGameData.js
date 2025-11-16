// // hooks/useGameData.js
// import { useState, useEffect } from 'react';
// import { useApi } from './useApi';

// export const useGameData = (initialUrl = "https://api.png71.live/api/games/New-table-Games-with-Providers") => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [active, setActive] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const { apiCall } = useApi();
//   const fetchGameData = async (url = initialUrl) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log(result)
//       setData(result.data);

//       // Set initial active state
//       if (result.length > 0) {
//         setActive(result[0]?.category);
//         setActiveIndex(0);
//       }

//       return result;
//     } catch (err) {
//       console.error("Error fetching game data:", err);
//       setError("গেম ডেটা লোড করতে সমস্যা হচ্ছে");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGameData();
//   }, []);



//   const [gameData, setGameData] = useState([]);


//   const fetchGames = async (category_name) => {


//     try {
//       setLoading(true);
//       // const providerParam = selectedProvider === "ALL"
//       //   ? ""
//       //   : Array.isArray(selectedProvider)
//       //     ? selectedProvider.join(",")
//       //     : selectedProvider;

//       const result = await apiCall(
//         "/New-Games-with-Providers-By-Category",
//         "GET",
//         {
//           category_name: category_name,
//         }
//       );

//       console.log("GET GamesProvidersPage result:", result);


//       setGameData(result.data || []);





//     } catch (error) {
//       console.error("Error fetching games:", error);

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (active && activeIndex > 2) {
//       fetchGames(active.category_name);
//     }

//   }, [active, activeIndex]);

//   useEffect(() => {
//     if (data.length > 0) {
//       setActive(data[0]?.category);
//       setActiveIndex(0); // Reset index when data changes
//     }
//   }, [data]);

//   const handleItemClick = (index, item) => {
//     setActiveIndex(index);
//     setActive(item ? item : data[0]?.category?.uniqueProviders);
//   };

//   const refetch = () => {
//     return fetchGameData();
//   };

//   const setActiveCategory = (categoryName) => {
//     const categoryIndex = data.findIndex(
//       item => item?.category?.name === categoryName
//     );
//     if (categoryIndex !== -1) {
//       setActiveIndex(categoryIndex);
//       setActive(data[categoryIndex]?.category);
//     }
//   };

//   return {
//     data,
//     loading,
//     error,
//     active,
//     activeIndex,
//     handleItemClick,
//     setActiveCategory,
//     refetch,
//     setActive,
//     setActiveIndex,
//     gameData
//   };
// };

// hooks/useGameData.js
import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { apiService } from '../services/api';

export const useGameData = ( category_name) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameData, setGameData] = useState([]);


  const fetchGameData = async (url = initialUrl) => {
    setLoading(true);
    setError(null);

    try {
      setLoading(true);
      const result = await apiService.get("/api/games/New-table-Games-with-Providers", "GET", {
        category_name: category_name,
      });
      console.log("GamesProvidersPage category result", result.data);
      if (result.success) {
        setData(result.data[0] || {});
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGames = async (category_name) => {
    if (!category_name) return;

    try {
      // setLoading(true);
      const result = await apiService.get(
        "/api/games/New-Games-with-Providers-By-Category",
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
      setGameData(result.data || []);
    } catch (error) {
      console.error("Error fetching games:", error);
      // } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  // Fetch games when active category changes
  useEffect(() => {
    if (active && active.category_name) {
      fetchGames(active.category_name || "");
    }
  }, [active, data]);

  console.log(data)
  // Set initial active category when data loads
  useEffect(() => {
    if (data.length > 0 && !active) {
      setActive(data[0]);
      setActiveIndex(0);
    }
  }, [data, active]);

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item?.category || item);
  };

  const refetch = () => {
    return fetchGameData();
  };

  const setActiveCategory = (categoryName) => {
    const categoryIndex = data.findIndex(
      item => item?.category?.name === categoryName
    );
    if (categoryIndex !== -1) {
      setActiveIndex(categoryIndex);
      setActive(data[categoryIndex]?.category);
    }
  };

  return {
    data,
    loading,
    error,
    active,
    activeIndex,
    handleItemClick,
    setActiveCategory,
    refetch,
    setActive,
    setActiveIndex,
    gameData
  };
};