

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePopup } from '../layouts/PopupManager';
import PromotionInfo from '../member/PromotionPage/PromotionInfo';


const Carousel = ({ 
   
  autoPlay = true, 
  delay = 5000,
  showDots = true,
  showArrows = true,
  draggable = true,
  itemWidth = 265.6 ,// Default width from the example
  //  showError, showSuccess
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const items = [
      {
        id: 1,
        title: "4% Unlimited Bonus + Free Spins",
        description: "Starts at 10:00 PM, to next day 9:59 PM BST!",
        image: "https://img.s628b.com/upload/h5Announcement/image_219729.jpg",
        type: "Limited Offer",
        buttonType: "apply",
        category: "new-promotions",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_219729.jpg",
        howToJoin: [
          "লগইন করুন আপনার অ্যাকাউন্টে",
          "প্রোমোশন পৃষ্ঠায় যান",
          "বোনাসে আবেদন করুন",
          "জয় করুন আকর্ষণীয় পুরস্কার!"
        ],
        bonusDetails: [
          { label: "বোনাস পরিমাণ", value: "4% আনলিমিটেড" },
          { label: "মিনিমাম ডিপোজিট", value: "৳500" },
          { label: "মুক্ত স্পিন", value: "20 ফ্রি স্পিন" },
          { label: "বৈধতা", value: "7 দিন" }
        ],
        termsAndConditions: [
          "শুধুমাত্র 18+ ব্যবহারকারীদের জন্য প্রযোজ্য",
          "নূন্যতম ডিপোজিট ৳500 প্রয়োজন",
          "বোনাস 10x ওয়েজার প্রয়োজন",
          "একটি অ্যাকাউন্টে শুধুমাত্র একবার ব্যবহার করা যাবে"
        ]
      },
      {
        id: 2,
        title: "HEYVIP JILI LUCKY MACAW",
        description: "100% Weekly Winning Contest!",
        image: "https://img.s628b.com/upload/h5Announcement/image_301526.jpg",
        type: "HEYVIP Offer",
        buttonType: "detail",
        category: "slots",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_301526.jpg",
        howToJoin: [
          "HEYVIP গেমসে অংশগ্রহণ করুন",
          "সাপ্তাহিক প্রতিযোগিতায় অংশ নিন",
          "সর্বোচ্চ জয় সংগ্রহ করুন",
          "পুরস্কার দাবি করুন"
        ],
        bonusDetails: [
          { label: "প্রতিযোগিতা ধরন", value: "সাপ্তাহিক" },
          { label: "পুরস্কার পুল", value: "৳50,000" },
          { label: "অংশগ্রহণের সময়", value: "সোমবার - রবিবার" },
          { label: "বিজয়ী ঘোষণা", value: "প্রতি সোমবার" }
        ],
        termsAndConditions: [
          "সমস্ত HEYVIP গেম প্রযোজ্য",
          "সাপ্তাহিক টুর্নামেন্ট ভিত্তিক",
          "শীর্ষ 50 খেলোয়াড় পুরস্কার পাবেন",
          "যেকোন সময় নিয়ম পরিবর্তনের অধিকার সংরক্ষিত"
        ]
      },
      {
        id: 3,
        title: "100% Deposit Bonus on PP Game",
        description: "Oracle Of Gold Exclusive",
        image: "https://img.s628b.com/upload/h5Announcement/image_301818.jpg",
        type: "Limited Offer",
        buttonType: "apply",
        category: "slots",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_301818.jpg",
        howToJoin: [
          "প্রাগম্যাটিক প্লে গেম নির্বাচন করুন",
          "ডিপোজিট করুন নূন্যতম ৳1000",
          "স্বয়ংক্রিয়ভাবে 100% বোনাস পান",
          "Oracle Of Gold গেমে ব্যবহার করুন"
        ],
        bonusDetails: [
          { label: "বোনাস পরিমাণ", value: "100% ডিপোজিট" },
          { label: "মিনিমাম ডিপোজিট", value: "৳1000" },
          { label: "সর্বোচ্চ বোনাস", value: "৳10,000" },
          { label: "গেম সীমাবদ্ধতা", value: "Oracle Of Gold" }
        ],
        termsAndConditions: [
          "শুধুমাত্র প্রাগম্যাটিক প্লে গেমস",
          "বোনাস 15x ওয়েজার প্রয়োজন",
          "7 দিনের মধ্যে ব্যবহার করতে হবে",
          "নগদীকরণের আগে শর্ত পূরণ করুন"
        ]
      },
      {
        id: 4,
        title: "Daily Attendance Bonus",
        description: "Stay Active, Win Every Day!",
        image: "https://img.s628b.com/upload/h5Announcement/image_289817.jpg",
        type: "PRAGMATIC PLAY Special",
        buttonType: "detail",
        category: "live-casino",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_289817.jpg",
        howToJoin: [
          "প্রতিদিন লগইন করুন",
          "অ্যাটেনডেন্স বোনাস ক্লিক করুন",
          "দৈনিক পুরস্কার সংগ্রহ করুন",
          "7 দিন ক্রমাগত বোনাস পান"
        ],
        bonusDetails: [
          { label: "দিন 1", value: "৳50 ফ্রি ক্রেডিট" },
          { label: "দিন 2", value: "10 ফ্রি স্পিন" },
          { label: "দিন 3", value: "৳100 বোনাস" },
          { label: "দিন 7", value: "৳500 বিশেষ বোনাস" }
        ],
        termsAndConditions: [
          "প্রতিদিন লগইন প্রয়োজন",
          "24 ঘন্টার মধ্যে ক্লেইম করতে হবে",
          "ক্রমান্বয়ে 7 দিন পুরস্কার",
          "যেকোন দিন মিস করলে রিসেট হবে"
        ]
      },
      {
        id: 5,
        title: "Deposit & Get 200 Free Spins",
        description: "Enjoy extra spin in every deposit!",
        image: "https://img.s628b.com/upload/h5Announcement/image_290977.jpg",
        type: "HEYVIP Special",
        buttonType: "apply",
        category: "slots",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_290977.jpg",
        howToJoin: [
          "যেকোনো পরিমাণ ডিপোজিট করুন",
          "স্বয়ংক্রিয়ভাবে 200 ফ্রি স্পিন পান",
          "নির্বাচিত স্লট গেমে ব্যবহার করুন",
          "জিতুন বড় পুরস্কার"
        ],
        bonusDetails: [
          { label: "ফ্রি স্পিন", value: "200 স্পিন" },
          { label: "মিনিমাম ডিপোজিট", value: "৳500" },
          { label: "গেম সীমাবদ্ধতা", value: "নির্বাচিত স্লট" },
          { label: "বৈধতা", value: "3 দিন" }
        ],
        termsAndConditions: [
          "যেকোনো ডিপোজিটে প্রযোজ্য",
          "ফ্রি স্পিন 3 দিনের মধ্যে ব্যবহার করুন",
          "জয়ের ওয়েজার 20x প্রয়োজন",
          "একদিনে একবার ব্যবহার করা যাবে"
        ]
      },
      {
        id: 6,
        title: "৳500 Welcome Bonus on All Games",
        description: "Get Unlimited Withdrawal!",
        image: "https://img.s628b.com/upload/h5Announcement/image_258671.jpg",
        type: "Welcome Offer",
        buttonType: "detail",
        category: "new-promotions",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_258671.jpg",
        howToJoin: [
          "নতুন অ্যাকাউন্ট রেজিস্টার করুন",
          "প্রথম ডিপোজিট করুন",
          "স্বয়ংক্রিয়ভাবে ৳500 বোনাস পান",
          "সমস্ত গেমে ব্যবহার করুন"
        ],
        bonusDetails: [
          { label: "বোনাস পরিমাণ", value: "৳500 ওয়েলকাম" },
          { label: "ডিপোজিট প্রয়োজন", value: "প্রথম ডিপোজিট" },
          { label: "সর্বোচ্চ উইথড্রয়াল", value: "আনলিমিটেড" },
          { label: "গেম সীমাবদ্ধতা", value: "সমস্ত গেম" }
        ],
        termsAndConditions: [
          "শুধুমাত্র নতুন রেজিস্ট্রেশনের জন্য",
          "KYC ভেরিফিকেশন প্রয়োজন",
          "বোনাস 5x ওয়েজার প্রয়োজন",
          "30 দিনের মধ্যে ব্যবহার করতে হবে"
        ]
      },
      {
        id: 7,
        title: "৳8,000 Daily Sports Reload Bonus",
        description: "ICC Women's World Cup Special",
        image: "https://img.s628b.com/upload/h5Announcement/image_290585.jpg",
        type: "Limited Offer",
        buttonType: "apply",
        category: "sports",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_290585.jpg",
        howToJoin: [
          "স্পোর্টস বিভাগে যান",
          "যেকোনো ক্রীড়া ইভেন্টে বেট করুন",
          "দৈনিক ৳8,000 পর্যন্ত বোনাস পান",
          "আরও বেট করতে ব্যবহার করুন"
        ],
        bonusDetails: [
          { label: "বোনাস পরিমাণ", value: "৳8,000 দৈনিক" },
          { label: "বোনাস ধরন", value: "রিলোড বোনাস" },
          { label: "বেট প্রয়োজন", value: "যেকোনো স্পোর্টস" },
          { label: "বৈধতা", value: "প্রতিদিন" }
        ],
        termsAndConditions: [
          "শুধুমাত্র স্পোর্টস বেটিং",
          "ন্যূনতম বেট ৳500",
          "বোনাস 8x রোলওভার প্রয়োজন",
          "প্রতিদিন একবার ব্যবহার করা যাবে"
        ]
      },
      {
        id: 8,
        title: "৳10,800 Weekly Reload Bonus On Slots",
        description: "Progressive slot rewards every time you deposit!",
        image: "https://img.s628b.com/upload/h5Announcement/image_270781.jpg",
        type: "Limited Offer",
        buttonType: "apply",
        category: "slots",
        bannerImage: "https://img.s628b.com/upload/h5Announcement/image_270781.jpg",
        howToJoin: [
          "স্লট গেমসে ডিপোজিট করুন",
          "সাপ্তাহিক রিলোড বোনাস পান",
          "৳10,800 পর্যন্ত সংগ্রহ করুন",
          "আরও গেম খেলুন"
        ],
        bonusDetails: [
          { label: "সর্বোচ্চ বোনাস", value: "৳10,800" },
          { label: "বোনাস ধরন", value: "সাপ্তাহিক রিলোড" },
          { label: "ডিপোজিট ফ্রিকোয়েন্সি", value: "সাপ্তাহিক" },
          { label: "গেম সীমাবদ্ধতা", value: "স্লট গেমস" }
        ],
        termsAndConditions: [
          "শুধুমাত্র স্লট গেমসে প্রযোজ্য",
          "সাপ্তাহিক ডিপোজিট প্রয়োজন",
          "বোনাস 10x ওয়েজার প্রয়োজন",
          "প্রতি সপ্তাহে একবার"
        ]
      }
    ];



  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length);
    setTranslateX(0);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
    setTranslateX(0);
  }, [items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setTranslateX(0);
  };

  // Auto-play with pause on hover
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(nextSlide, delay);
    };

    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };

    startAutoPlay();

    // Pause on hover
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }

    return () => {
      stopAutoPlay();
      if (carousel) {
        carousel.removeEventListener('mouseenter', stopAutoPlay);
        carousel.removeEventListener('mouseleave', startAutoPlay);
      }
    };
  }, [autoPlay, delay, nextSlide, items.length]);

  // Drag functionality
  const handleDragStart = (e) => {
    if (!draggable) return;
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !draggable) return;
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setTranslateX(currentX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging || !draggable) return;
    setIsDragging(false);
    
    const dragThreshold = 100;
    if (Math.abs(translateX) > dragThreshold) {
      if (translateX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    setTranslateX(0);
  };
  const { openPopup, closePopup } = usePopup();

  const handlePromoDetail = useCallback((promotion) => {
    openPopup(
      <PromotionInfo
        promotion={promotion}
        // showSuccess={showSuccess}
        onClose={() => {}}
      />,
      { 
        contentClass: 'promotionPop',
        size: 'large'
      }
    );
  }, [openPopup]);

  // const handlePromoAction = useCallback((promotion) => {
   
  //     handlePromoDetail(promotion);
  //     closePopup();
  // }, [showSuccess, handlePromoDetail]);

  return (
    <div className="mcd-carousel-banner" ref={carouselRef}>
      <div dir="ltr" className="banner">
        <div className="banner-v1">
          <div className="carousel-wrap style-init mcd siblings">
            {/* Drag container */}
            <div 
              className="cdk-drag item-drag"
              style={{ transform: `translate3d(${translateX}px, 0px, 0px)` }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div className="item-left">
                <div 
                  className="item-wrap"
                  style={{ 
                    transform: `translateX(-${currentIndex * itemWidth  + translateX }px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  {items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="item"
                      style={{ width: `${itemWidth}px` }}
                      data-idx={index}
                      data-message-id={item.messageId}
                      onClick={() => handlePromoDetail(item)}
                    >
                      <div
                        className="item-pic"
                        style={{ backgroundImage: `url("${item.image}")` }}
                        
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && item.onClick) {
                            handlePromoDetail(item);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Dot Navigation */}
            {showDots && items.length > 1 && (
              <ul className="dot-group style-bar">
                {items.map((_, index) => (
                  <li
                    key={index}
                    className={index === currentIndex ? 'active' : ''}
                    onClick={() => goToSlide(index)}
                    data-idx={index}
                  >
                    <span 
                      className="dot-progress" 
                      style={{ 
                        animationDuration: index === currentIndex ? `${delay}ms` : '0ms'
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;