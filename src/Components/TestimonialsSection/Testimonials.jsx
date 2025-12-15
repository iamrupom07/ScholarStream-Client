import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// --- Mock Data ---
const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    university: "Stanford University",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    review:
      "This platform helped me find a fully funded scholarship for my Masters. The search filters are incredibly accurate and saved me hours of research.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    university: "MIT",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    review:
      "I applied to 5 scholarships and won 3! The application tips provided alongside the listings were a game changer for my essays.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amara Ndiaye",
    university: "University of Toronto",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    review:
      "User-friendly and up-to-date. I highly recommend this to any international student looking for financial aid.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Rodriguez",
    university: "Oxford University",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    review:
      "Finding a scholarship seemed impossible until I used this site. The detailed eligibility criteria made the process seamless.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lina Wong",
    university: "Cambridge University",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    review:
      "A fantastic resource! The support team was also very helpful with a specific query I had about a fellowship application.",
    rating: 4,
  },
];

// --- Card Component ---
const TestimonialCard = ({ review }) => (
  <div className="card w-full bg-base-200 shadow-xl border border-base-300 h-full p-6">
    <div className="flex items-center gap-4 mb-4">
      <div className="avatar">
        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={review.image} alt={review.name} />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg">{review.name}</h4>
        <p className="text-xs text-gray-500">{review.university}</p>
      </div>
    </div>

    <div className="rating rating-sm mb-4">
      {[...Array(5)].map((_, i) => (
        <input
          key={i}
          type="radio"
          name={`rating-${review.id}`}
          className="mask mask-star-2 bg-orange-400"
          checked={i < review.rating}
          readOnly
        />
      ))}
    </div>
    <p className="italic text-gray-600">"{review.review}"</p>
  </div>
);

// --- Main Carousel Component ---
const Testimonials = () => {
  return (
    <section className="py-24 bg-base-100 text-base-content">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Trusted by students worldwide to find and secure their future.
          </p>
        </div>

        {/* Swiper Component */}
        <Swiper
          // Define Swiper Modules
          modules={[Pagination, Navigation, Autoplay]}
          // Core Configuration
          spaceBetween={30}
          loop={true}
          // Autoplay Configuration
          autoplay={{
            delay: 4500, // Time between slides (4.5 seconds)
            disableOnInteraction: false, // Keep autoplaying after user interaction
          }}
          // Navigation (Arrows) Configuration
          navigation={true}
          // Pagination (Dots) Configuration
          pagination={{ clickable: true }}
          // Responsive Breakpoints (Tailwind-like)
          breakpoints={{
            640: {
              // Mobile
              slidesPerView: 1,
            },
            768: {
              // Tablet
              slidesPerView: 2,
            },
            1024: {
              // Desktop
              slidesPerView: 3,
            },
          }}
          className="mySwiper pt-8 pb-16" // Added padding for pagination/navigation outside the slides
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <TestimonialCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
