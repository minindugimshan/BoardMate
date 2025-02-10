// export const propertyData = [
//     {
//       id: 1,
//       name: "Dehiwala Single Room",
//       type: "Single room",
//       price: 10000,
//       location: "Dehiwala",
//       university: "IIT",
//       gender: "male",
//       roomType: "single",
//       rating: 4.8,
//       totalUsers: 2854,
//       amenities: ["Furniture", "Wi-Fi", "Kitchen"],
//       images: [
//         "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//         "https://images.unsplash.com/photo-1522771930-78848d9293e8",
//       ],
//       description: "Modern single room accommodation near IIT",
//       features: {
//         bedrooms: 1,
//         bathrooms: 1,
//         hasKitchen: true
//       }
//     },
//     {
//       id: 2,
//       name: "Colombo Shared Room",
//       type: "Shared room",
//       price: 8000,
//       location: "Colombo",
//       university: "IIT",
//       gender: "male",
//       roomType: "shared",
//       rating: 4.5,
//       totalUsers: 1542,
//       amenities: ["Furniture", "Wi-Fi", "Kitchen", "Parking"],
//       images: [
//         "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//       ],
//       description: "Comfortable shared room in the heart of Colombo"
//     },
//     {
//       id: 3,
//       name: "Nugegoda Double Room",
//       type: "Double room",
//       price: 15000,
//       location: "Nugegoda",
//       university: "IIT",
//       gender: "female",
//       roomType: "double",
//       rating: 4.7,
//       totalUsers: 986,
//       amenities: ["Furniture", "Wi-Fi", "Kitchen", "AC"],
//       images: [
//         "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//       ],
//       description: "Spacious double room perfect for students"
//     }
//   ];

export const propertyData = [
  {
    id: 1,
    name: "Mr. Anura's Boys Hostel",
    type: "Boys Hostel",
    price: 15000,
    location: "Dehiwala",
    university: "IIT",
    gender: "Boys",
    address: "9/F1, Hilda Mahal, Hilda mawatha, Dehiwala",
    contactNumber: "773475655",
    totalRooms: 6,
    totalBeds: 10,
    availableBeds: 5,
    facilities: [
      "Beds", 
      "Tables", 
      "Chairs", 
      "Attached sharing bathroom", 
      "Pantry", 
      "Ceiling fan", 
      "Separate electricity", 
      "Separate water"
    ],
    description: "Beds, Tables, Chairs, Attached sharing bathroom, Pantry, Ceiling fan, Seperate electricity & water, Need 3 months key money",
    images: ["https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    rating: 4.5,
    totalUsers: 2000
  },
  {
    id: 2,
    name: "Mr. Anura's Girls Hostel",
    type: "Girls Hostel",
    price: 18000,
    location: "Dehiwala",
    university: "IIT",
    gender: "Girls",
    address: "9B, 2/3, Hilda mahal, Hilda mawatha, Dehiwala",
    contactNumber: "773475655",
    totalRooms: 3,
    totalBeds: 5,
    availableBeds: 5,
    facilities: [
      "Beds", 
      "Tables", 
      "Chairs", 
      "Attached sharing bathroom", 
      "Pantry (TV/Washing Machine)", 
      "Ceiling fan", 
      "Separate electricity", 
      "Separate water"
    ],
    description: "Beds, Tables, Chairs, Attached sharing bathroom, Pantry (Tv / Washing machine), Ceiling fan, Seperate electricity & water, Need 3 months key money.",
    images: ["https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    rating: 4.7,
    totalUsers: 1500
  }
  // Add more properties from the document
].slice(0, 10); // Limit to first 10 for brevity
