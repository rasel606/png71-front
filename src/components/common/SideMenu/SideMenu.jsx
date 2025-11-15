// // components/layouts/SideMenu.jsx
// import React, { useState, useEffect } from "react";
// import { useGameData } from "../../../hooks/useGameData";
// import { useRefreshBalance } from "../../../hooks/useRefreshBalance";

// import { Link } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";
// import { useApp } from "../../../contexts/AppContext";

// const SideMenu = ({ onClose }) => {
//   const [activeCategory, setActiveCategory] = useState("slots");
//   const [activeSubMenu, setActiveSubMenu] = useState("games");

//   const { gameLaunchState, closeGame, launchGame, setGameLaunchState } =
//     useApp();
//   const { balance, refreshing, handleRefresh } = useRefreshBalance();

//   const { data, loading, active, activeIndex, handleItemClick, gameData } =
//     useGameData();

//   const { userId, userDeatils } = useAuth();

//   const onRefreshBalance = () => {
//     if (userId) {
//       handleRefresh(userId);
//     }
//   };

//   // Menu data structure
//   const menuData = {
//     home: {
//       id: "home",
//       title: "Home",
//       icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1761636564965",
//       link: "/",
//     },

//     promotions: [
//       {
//         id: "promotions",
//         title: "Promotions",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-promotion.png?v=1761636564965",
//         link: "/promotion",
//       },
//       {
//         id: "vip-program",
//         title: "VIP Program",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-vip.png?v=1761636564965",
//         link: "https://sbajisuper.link/en/vip",
//         external: true,
//       },
//       {
//         id: "referral",
//         title: "Referral",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-referral.png?v=1761636564965",
//         link: "#",
//         external: true,
//       },
//       {
//         id: "contact-us",
//         title: "Contact Us",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-talk.png?v=1761636564965",
//         link: "#",
//         external: true,
//       },
//     ],
//     support: [
//       {
//         id: "live-chat",
//         title: "Live Chat",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1761636564965",
//         link: "#",
//       },
//       {
//         id: "telegram",
//         title: "Telegram",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-telegram.png?v=1761636564965",
//         link: "https://t.me/Superbajibd",
//         external: true,
//       },
//       {
//         id: "email",
//         title: "Support Email",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-email.png?v=1761636564965",
//         link: "mailto:support@superbaji.com",
//         external: true,
//       },
//       {
//         id: "facebook",
//         title: "Facebook",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-facebook-messenger.png?v=1761636564965",
//         link: "https://m.me/superbajibangladesh",
//         external: true,
//       },
//     ],
//     referral: [
//       {
//         id: "refer-bonus",
//         title: "Refer Bonus",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/side-sub-nav/icon-referral-bonus.png?v=1761636564965",
//         link: "/bd/en/member/common-referral",
//       },
//       {
//         id: "refer-program",
//         title: "Refer Program",
//         icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/side-sub-nav/icon-referral-program.png?v=1761636564965",
//         link: "https://sbajisuper.link/en/referral",
//         external: true,
//       },
//     ],
//   };

//   const handleCategoryClick = (categoryId) => {
//     setActiveCategory(categoryId);
//     setActiveSubMenu("games");
//   };

//   const handleSubMenuClick = (subMenu) => {
//     setActiveSubMenu(subMenu);
//   };

//   // const handleItemClick = (item) => {
//   //   if (item.external) {
//   //     window.open(item.link, "_blank");
//   //   } else if (item.link) {
//   //     window.location.href = item.link;
//   //   }
//   //   // Handle game/vendor selection here
//   //   console.log("Selected item:", item);
//   // };

//   // if (!show) return null;

//   // const currentCategory = menuData.categories.find(
//   //   (cat) => cat.id === activeCategory
//   // );
//   const hasSubMenu = data && active

//   return (
//     <>

//       {/* First Level Menu */}
//       <div className="menu-first active">
//         {/* Home */}
//         <ul className="home ng-star-inserted">
//           <li data-category="home">
//             <span
//               className="item-icon"
//               style={{ backgroundImage: `url(${menuData.home.icon})` }}
//             ></span>
//             <a onClick={() => handleItemClick(menuData.home)}>
//               {menuData.home.title}
//             </a>
//           </li>
//         </ul>

//         {/* Game Categories */}
//         <ul className="vendor ng-star-inserted">
//           {data.map((category, index) => (
//             <li
//               key={category.id}
//               className={index === activeIndex ? "active" : ""}
//               onClick={() => handleItemClick(category.id)}
//             >
//               <span
//                 className="item-icon"
//                 style={{ backgroundImage: `url(${category.image})` }}
//               ></span>
//               <a>{category.category_name}</a>
//             </li>
//           ))}
//         </ul>

//         {/* Promotions Block */}
//         <ul className="promotion-block ng-star-inserted">
//           {menuData.promotions.map((item) => (
//             <li key={item.id} data-category={item.id}>
//               <span
//                 className="item-icon"
//                 style={{ backgroundImage: `url(${item.icon})` }}
//               ></span>
//               <a
//                 onClick={() => handleItemClick(item)}
//                 className={item.external ? "external" : ""}
//               >
//                 {item.title}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Support Block */}
//         <div className="support-block ng-star-inserted">
//           <ul className="menu-second-ul ng-star-inserted">
//             {menuData.support.map((item) => (
//               <li key={item.id} className={item.id}>
//                 <a
//                   onClick={() => handleItemClick(item)}
//                   className="item-link"
//                   target={item.external ? "_blank" : "_self"}
//                 >
//                   <span
//                     className="item-icon ng-star-inserted"
//                     style={{ backgroundImage: `url(${item.icon})` }}
//                   ></span>
//                   <p className="item-text">{item.title}</p>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Referral Block */}
//         <ul className="menu-second-ul ng-star-inserted">
//           {menuData.referral.map((item) => (
//             <li key={item.id} data-category="refer-composite-entry">
//               <a
//                 onClick={() => handleItemClick(item)}
//                 className={item.external ? "external" : ""}
//               >
//                 <span
//                   className="item-icon"
//                   style={{ backgroundImage: `url(${item.icon})` }}
//                 ></span>
//                 <p className="item-text">{item.title}</p>
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Language Selector */}
//         <div className="language-select-area ng-star-inserted">
//           <div className="language-area active" value="1">
//             <img
//               alt="GB"
//               src="https://img.s628b.com/sb/h5/assets/images/flag/GB.png?v=1761636564965"
//               loading="lazy"
//             />
//             <p>English</p>
//           </div>
//           <div className="language-area" value="8">
//             <img
//               alt="BD"
//               src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1761636564965"
//               loading="lazy"
//             />
//             <p>বাংলা</p>
//           </div>
//         </div>
//       </div>

//       {/* Second Level Menu (Submenu) */}
//       {active && (
//         <div className="menu-second">
//           {activeIndex < 2 ? (
//             // ✅ Direct game list for first 2 categories
//             <ul>
//               {gameData && gameData.length > 0 ? (
//                 gameData.map((game, index) => (
//                   <li key={index}>
//                     <Link
//                       onClick={() => launchGame(game)}
//                       className="game-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <img
//                         src={game.image_url}
//                         alt={game.gameName}
//                         loading="lazy"
//                       />
//                       <p>{game.gameName}</p>
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <div className="no-games">কোন গেম পাওয়া যায়নি</div>
//               )}
//             </ul>
//           ) : (
//             <div className="no-games">কোন গেম পাওয়া যায়নি</div>
//           )}

//           {active && (<ul className={`menu-second-ul ${active ? "active" : ""}`}>
//             {active?.uniqueProviders?.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={`/gamesProvidersPage/${encodeURIComponent(
//                     active.category_name
//                   )}/${encodeURIComponent(item.providercode)}`}
//                   className="game-link"
//                 >
//                   <img src={item.image_url} alt={item.company} />
//                   <p>{item.company}</p>
//                 </Link>
//               </li>
//             ))}
//           </ul>)}
         
//         </div>
//       )}

//       {/* Menu Mask */}
//       <div className="menu-mask ng-trigger ng-trigger-popBgTriggerAni ng-star-inserted"></div>
//       {/* </div> */}
//     </>
//   );
// };

// export default SideMenu;


import React from "react";
import { useGameData } from "../../../hooks/useGameData";
import { useRefreshBalance } from "../../../hooks/useRefreshBalance";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useApp } from "../../../contexts/AppContext";

const SideMenu = ({ onClose }) => {
  const { gameLaunchState, closeGame, launchGame } = useApp();
  const { balance, refreshing, handleRefresh } = useRefreshBalance();

  const { data, loading, active, activeIndex, handleItemClick, gameData } = useGameData();

  const { userId } = useAuth();

  const onRefreshBalance = () => {
    if (userId) {
      handleRefresh(userId);
    }
  };

  // Menu data structure
  const menuData = {
    home: {
      id: "home",
      title: "Home",
      icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1761636564965",
      link: "/",
    },
    promotions: [
      {
        id: "promotions",
        title: "Promotions",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-promotion.png?v=1761636564965",
        link: "/promotion",
      },
      {
        id: "vip-program",
        title: "VIP Program",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-vip.png?v=1761636564965",
        link: "https://sbajisuper.link/en/vip",
        external: true,
      },
      {
        id: "referral",
        title: "Referral",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-referral.png?v=1761636564965",
        link: "#",
        external: true,
      },
      {
        id: "contact-us",
        title: "Contact Us",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-talk.png?v=1761636564965",
        link: "#",
        external: true,
      },
    ],
    support: [
      {
        id: "live-chat",
        title: "Live Chat",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1761636564965",
        link: "#",
      },
      {
        id: "telegram",
        title: "Telegram",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-telegram.png?v=1761636564965",
        link: "https://t.me/Superbajibd",
        external: true,
      },
      {
        id: "email",
        title: "Support Email",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-email.png?v=1761636564965",
        link: "mailto:support@superbaji.com",
        external: true,
      },
      {
        id: "facebook",
        title: "Facebook",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-facebook-messenger.png?v=1761636564965",
        link: "https://m.me/superbajibangladesh",
        external: true,
      },
    ],
    referral: [
      {
        id: "refer-bonus",
        title: "Refer Bonus",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/side-sub-nav/icon-referral-bonus.png?v=1761636564965",
        link: "/bd/en/member/common-referral",
      },
      {
        id: "refer-program",
        title: "Refer Program",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/side-sub-nav/icon-referral-program.png?v=1761636564965",
        link: "https://sbajisuper.link/en/referral",
        external: true,
      },
    ],
  };

  // Determine if we should show games or providers
  const shouldShowGames = activeIndex < 2;
  const shouldShowProviders = activeIndex >= 2 && active?.uniqueProviders;

  const handleMenuItemClick = (e, index, item) => {
    e.stopPropagation();
    handleItemClick(index, item);
  };

  const handleGameLaunch = (e, game) => {
    e.stopPropagation();
    launchGame(game);
  };

  const handleSecondMenuClick = (e) => {
    // Stop propagation to prevent closing the popup
    e.stopPropagation();
  };

  const handleLinkClick = (e) => {
    // Stop propagation for link clicks
    e.stopPropagation();
  };

  return (
    <>
      <div className="menu-first active">
        {/* Home */}
        <ul className="home ng-star-inserted">
          <li data-category="home">
            <span
              className="item-icon"
              style={{ backgroundImage: `url(${menuData.home.icon})` }}
            ></span>
            <a onClick={(e) => e.stopPropagation()}>
              {menuData.home.title}
            </a>
          </li>
        </ul>

        {/* Game Categories */}
        <ul className="vendor ng-star-inserted">
          {data.map((category, index) => (
            <li
              key={category.id || index}
              className={index === activeIndex ? "active" : ""}
              onClick={(e) => handleMenuItemClick(e, index, category)}
            >
              <span
                className="item-icon"
                style={{ backgroundImage: `url(${category.image})` }}
              ></span>
              <a>{category.category_name}</a>
            </li>
          ))}
        </ul>

        {/* Promotions Block */}
        <ul className="promotion-block ng-star-inserted">
          {menuData.promotions.map((item) => (
            <li key={item.id} data-category={item.id}>
              <span
                className="item-icon"
                style={{ backgroundImage: `url(${item.icon})` }}
              ></span>
              <a
                onClick={(e) => e.stopPropagation()}
                className={item.external ? "external" : ""}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Support Block */}
        <div className="support-block ng-star-inserted">
          <ul className="menu-second-ul ng-star-inserted">
            {menuData.support.map((item) => (
              <li key={item.id} className={item.id}>
                <a
                  onClick={(e) => e.stopPropagation()}
                  className="item-link"
                  target={item.external ? "_blank" : "_self"}
                >
                  <span
                    className="item-icon ng-star-inserted"
                    style={{ backgroundImage: `url(${item.icon})` }}
                  ></span>
                  <p className="item-text">{item.title}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Referral Block */}
        <ul className="menu-second-ul ng-star-inserted">
          {menuData.referral.map((item) => (
            <li key={item.id} data-category="refer-composite-entry">
              <a
                onClick={(e) => e.stopPropagation()}
                className={item.external ? "external" : ""}
              >
                <span
                  className="item-icon"
                  style={{ backgroundImage: `url(${item.icon})` }}
                ></span>
                <p className="item-text">{item.title}</p>
              </a>
            </li>
          ))}
        </ul>

        {/* Language Selector */}
        <div className="language-select-area ng-star-inserted">
          <div className="language-area active" value="1">
            <img
              alt="GB"
              src="https://img.s628b.com/sb/h5/assets/images/flag/GB.png?v=1761636564965"
              loading="lazy"
            />
            <p>English</p>
          </div>
          <div className="language-area" value="8">
            <img
              alt="BD"
              src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1761636564965"
              loading="lazy"
            />
            <p>বাংলা</p>
          </div>
        </div>
      </div>

      {/* Second Level Menu - Add onClick to stop propagation */}
      {active && (
        <div className="menu-second" onClick={handleSecondMenuClick}>
          {/* Show games for first 2 categories */}
          {shouldShowGames && (
            <ul className={`menu-second-ul ${active ? "active" : ""}`} onClick={handleSecondMenuClick}>
              {gameData && gameData.length > 0 ? (
                gameData.map((game, index) => (
                  <li key={index} onClick={handleSecondMenuClick}>
                    <a 
                      onClick={(e) => handleGameLaunch(e, game)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={game.image_url}
                        alt={game.gameName}
                        loading="lazy"
                      />
                      <p>{game.gameName}</p>
                    </a>
                  </li>
                ))
              ) : (
                <li onClick={handleSecondMenuClick}>
                  <div className="no-games">কোন গেম পাওয়া যায়নি</div>
                </li>
              )}
            </ul>
          )}

          {/* Show providers for other categories */}
          {shouldShowProviders && (
            <ul className={`menu-second-ul ${active ? "active" : ""}`} onClick={handleSecondMenuClick}>
              {active.uniqueProviders?.map((item, index) => (
                <li key={index} onClick={handleSecondMenuClick}>
                  <Link
                    to={`/gamesProvidersPage/${encodeURIComponent(
                      active.category_name
                    )}/${encodeURIComponent(item.providercode)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick(e);
                    }}
                  >
                    <img src={item.image_url} alt={item.company} loading="lazy" />
                    <p>{item.company}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Show message if no content */}
          {!shouldShowGames && !shouldShowProviders && (
            <ul className={`menu-second-ul ${active ? "active" : ""}`} onClick={handleSecondMenuClick}>
              <li onClick={handleSecondMenuClick}>
                <div className="no-games">কোন গেম পাওয়া যায়নি</div>
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Menu Mask - Also prevent closing when clicking mask */}
      <div 
        className="menu-mask ng-trigger ng-trigger-popBgTriggerAni ng-star-inserted"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </>
  );
};

export default SideMenu;