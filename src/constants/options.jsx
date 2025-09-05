export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep costs on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about costs",
    icon: "💸",
  },
];

export const AI_PROMPT = `Generate a detailed travel plan in JSON format for the following parameters:
- Location: {location}
- Duration: {noOfDays}
- Number of travelers: {traveler}
- Budget: {budget}

The JSON response should strictly follow this format:

{
   "location": "{location}",
   "Duration": "{noOfDays}",
   "traveler": "{traveler}",
   "budget": "{budget}",
   "hotels": [
     {
       "HotelName": "The Peninsula New York",
       "Hotel": "The Peninsula New York",
       "Price": "$1,200 - $2,000 per night",
       "address": "700 Fifth Avenue, New York, NY 10019",
       "description": "A luxurious hotel with stunning views of Central Park and the city skyline. Features elegant rooms, world-class dining, and a rooftop pool.",
       "geoCoordinates": "40.7580° N, 73.9785° W",
       "hotelImageUrl": "https://source.unsplash.com/featured/?hotel,{location}",
       "rating": 4.5
     }
   ],
   "itinerary": [
     {
       "day": 1,
       "plan": [
         {
           "placeName": "Times Square",
           "PlaceDetails": "A bustling intersection known for its bright lights, billboards, and Broadway theaters.",
           "PlaceImageUrl": "https://source.unsplash.com/featured/?hotel,{location}",
           "Geo Coordinates": "40.7580° N, 73.9855° W",
           "ticketPricing": "Free",
           "Timetravel": "10:00 AM - 02:00 PM"
         },
         {
           "placeName": "Central Park",
           "PlaceDetails": "A sprawling green oasis in the heart of Manhattan. Features walking trails, playgrounds, museums, and the Bethesda Terrace.",
           "PlaceImageUrl": "https://source.unsplash.com/featured/?hotel,{location}",
           "Geo Coordinates": "40.7851° N, 73.9683° W",
           "ticketPricing": "Free",
           "Timetravel": "02:30 PM - 05:30 PM"
         },
         {
           "placeName": "Top of the Rock",
           "PlaceDetails": "An observation deck at Rockefeller Center offering stunning views of New York City.",
           "PlaceImageUrl": "https://source.unsplash.com/featured/?hotel,{location}",
           "Geo Coordinates": "40.7580° N, 73.9803° W",
           "ticketPricing": "$36",
           "Timetravel": "06:00 PM - 08:00 PM"
         }
       ]
     }
     // Additional days and plans go here...
   ],
   "travelers": Number("{traveler}")
}

Please ensure the JSON response is complete and strictly follows the format, including all fields and maintaining the same key names. Add more hotel options and itinerary plans based on the number of days provided.Use unsplashand unsplash only to get the image links of whatever images you search for and then use those links as image urls according to requirements.

For all image URLs, use the Unsplash API format:
- For hotels: https://source.unsplash.com/featured/?hotel,{location}
- For places: https://source.unsplash.com/featured/?{placeName},{location}

Replace {location} with the actual location and {placeName} with the actual place name in these URLs. This will fetch relevant images from Unsplash for each location and place.
`;

// export const AI_PROMPT = `Generate Travel Plan for Location: {location} , for {totalDays} Days for {traveler} with a {budget} budget,give me Hotels options list with HotelName,Hotel,address,Price,hotel image url,geo coordinates,rating,description and suggest itinenary with placeName,Place Details ,Place Image Url,Geo Coordinates,ticket Pricing,Time travel each of the location for {totalDays} days with each day plan with best time to visit in hours in JSON format. Give the answer in the defined Json format : {
//    "location": "location",
//    "totalDays": Number("numberOfDays"),
//    "traveler": "traverler",
//    "budget": "budget",
//    "hotels": [
//      {
//        "HotelName": "The Peninsula New York",
//        "Hotel": "The Peninsula New York",
//        "Price": "$1,200 - $2,000 per night",
//        "address": "700 Fifth Avenue, New York, NY 10019",
//        "description": "A luxurious hotel with stunning views of Central Park and the city skyline. Features elegant rooms, world-class dining, and a rooftop pool.",
//        "geoCoordinates": "40.7580° N, 73.9785° W",
//        "hotelImageUrl": "https://www.thepeninsula.com/newyork/en/images/gallery/hotel-exterior/peninsula-new-york-exterior.jpg",
//        "rating": 4.5
//      }
//    ],
//    "itinerary": [
//      {
//        "day": 1,
//        "plan": [
//          {
//            "placeName": "Times Square",
//            "Place Details": "A bustling intersection known for its bright lights, billboards, and Broadway theaters.",
//            "Place Image Url": "https://www.nycgo.com/images/nycgo-photos/times-square-1347096965.jpg",
//            "Geo Coordinates": "40.7580° N, 73.9855° W",
//            "ticket Pricing": "Free",
//            "Time travel": "10:00 AM - 02:00 PM"
//          },
//          {
//            "placeName": "Central Park",
//            "Place Details": "A sprawling green oasis in the heart of Manhattan. Features walking trails, playgrounds, museums, and the Bethesda Terrace.",
//            "Place Image Url": "https://www.nycgo.com/images/nycgo-photos/central-park-1232323747.jpg",
//            "Geo Coordinates": "40.7851° N, 73.9683° W",
//            "ticket Pricing": "Free",
//            "Time travel": "02:30 PM - 05:30 PM"
//          },
//          {
//            "placeName": "Top of the Rock",
//            "Place Details": "An observation deck at Rockefeller Center offering stunning views of New York City.",
//            "Place Image Url": "https://www.nycgo.com/images/nycgo-photos/top-of-the-rock-1592724631.jpg",
//            "Geo Coordinates": "40.7580° N, 73.9803° W",
//            "ticket Pricing": "$36",
//            "Time travel": "06:00 PM - 08:00 PM"
//          }
//        ]
//      },
//      {
//        "day": 2,
//        "plan": [
//          {
//            "placeName": "Statue of Liberty",
//            "Place Details": "A symbol of freedom and democracy, this iconic statue is a must-see in New York Harbor.",
//            "Place Image Url": "https://www.nycgo.com/images/nycgo-photos/statue-of-liberty-1623845161.jpg",
//            "Geo Coordinates": "40.6892° N, 74.0445° W",
//            "ticket Pricing": "$25",
//            "Time travel": "09:00 AM - 12:00 PM"
//          },
//          {
//            "placeName": "Empire State Building",
//            "Place Details": "A landmark skyscraper offering breathtaking views from its observation decks.",
//            "Place Image Url": "https://www.nycgo.com/images/nycgo-photos/empire-state-building-1356497684.jpg",
//            "Geo Coordinates": "40.7484° N, 73.9857° W",
//            "ticket Pricing": "$42",
//            "Time travel": "01:00 PM - 03:00 PM"
//          },
//          {
//            "placeName": "Brooklyn Bridge",
//            "Place Details": "A historic bridge connecting Manhattan and Brooklyn, known for its iconic architecture.",
//            "Place Image Url": "https://www.nycgo.com/images/nycgo-photos/brooklyn-bridge-1347096975.jpg",
//            "Geo Coordinates": "40.7061° N, 73.9969° W",
//            "ticket Pricing": "Free",
//            "Time travel": "04:00 PM - 06:00 PM"
//          }
//        ]
//      }
//      // Continue adding plans for the remaining days...
//    ],
//    "travelers": 2
//  } , add more hotels or more plans based on the number of days that the user has provided as an input but make sure the format is similar to the sampleJson provided.`;
