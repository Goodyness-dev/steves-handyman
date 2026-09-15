export const BUSINESS_INFO = {
  name: "Steve's Handyman",
  legalName: "Steve's Handyman LLC",
  tagline: "Precision Home Repair & Multi-Trade Craftsmanship — Denison & Texoma's Trusted Handyman",
  address: {
    street: "Serving Denison & Grayson County",
    city: "Denison",
    state: "TX",
    zip: "75020",
    formatted: "Denison, TX 75020 (Serving Denison, Sherman & Lake Texoma)",
  },
  phone: "(903) 465-2244",
  secondaryPhone: "(903) 463-5520",
  website: "steveshandymantx.com",
  email: "contact@steveshandymantx.com",
  googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Denison+TX+75020",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Denison%2C%20TX%2075020&t=&z=13&ie=UTF8&iwloc=&output=embed",
  
  hours: [
    { day: "Monday", open: "7:30 AM", close: "6:00 PM", note: "" },
    { day: "Tuesday", open: "7:30 AM", close: "6:00 PM", note: "" },
    { day: "Wednesday", open: "7:30 AM", close: "6:00 PM", note: "" },
    { day: "Thursday", open: "7:30 AM", close: "6:00 PM", note: "" },
    { day: "Friday", open: "7:30 AM", close: "6:00 PM", note: "" },
    { day: "Saturday", open: "8:00 AM", close: "3:00 PM", note: "Consultations & By Appt" },
    { day: "Sunday", open: "Closed", close: "Closed", note: "Emergency Calls On-Duty" },
  ],

  history: [
    {
      year: "1998",
      title: "Woodworking & Carpentry Roots",
      description: "Steve began as an apprentice cabinetmaker and residential framer, mastering tight tolerances, joinery, and structural carpentry."
    },
    {
      year: "2008",
      title: "Multi-Trade Licensure & Handyman Launch",
      description: "Founded Steve's Handyman to give Texoma homeowners a single trusted, clean, and reliable master contractor for punch-lists, drywall, fixtures, and rot repair."
    },
    {
      year: "2018",
      title: "Deck & Exterior Specialty Division",
      description: "Expanded into custom composite deck builds, rot restoration, fencing, and precision exterior finish work built to withstand Texas heat and weather."
    },
    {
      year: "Present",
      title: "Texoma's Highest-Rated Craftsman",
      description: "Over 2,400 successfully completed residential projects across Denison, Sherman, Pottsboro, and Lake Texoma with a 100% satisfaction guarantee."
    }
  ],

  owner: {
    name: "Steve Miller",
    role: "Founder & Master Craftsman",
    quote: "A true handyman treats every home as if his own family slept under that roof. We take the stress out of home repair by arriving on time, working clean, explaining the fix transparently, and standing behind our craftsmanship with an unconditional 1-year guarantee."
  },

  reviews: [
    {
      author: "Travis M.",
      location: "Denison, TX",
      source: "Yelp Review",
      rating: 5,
      date: "3 weeks ago",
      comment: "Steve rebuilt our front porch steps and repaired water-damaged drywall in our living room. You literally cannot find the seam where he matched the texture. Punctual, polite, and completely cleaned up before leaving."
    },
    {
      author: "Brenda K.",
      location: "Sherman, TX",
      source: "Google Review",
      rating: 5,
      date: "1 month ago",
      comment: "Had an electrical ceiling fan issue and a leaking kitchen faucet. Steve knocked out both in under two hours with top-tier hardware. His upfront quote was the exact amount I paid—zero hidden fees."
    },
    {
      author: "Colton D.",
      location: "Pottsboro / Lake Texoma",
      source: "Yelp Review",
      rating: 5,
      date: "2 months ago",
      comment: "Steve is the only contractor I trust at our lake house. He replaced several rotted exterior fascia boards, stained our cedar deck, and rehung our storm doors. Top-shelf craftsmanship and honest pricing."
    },
    {
      author: "Sandra L.",
      location: "Denison, TX",
      source: "Google Review",
      rating: 5,
      date: "4 months ago",
      comment: "As a senior living alone, it's hard to find contractors who don't try to take advantage. Steve was courteous, walked me through every repair option, and fixed three sticking doors and bathroom caulking. Highly recommended!"
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const time = hour + minutes / 60;
  
  if (day === 0) return false; // Sunday closed
  if (day === 6) {
    // Saturday 8:00 AM - 3:00 PM
    return time >= 8 && time < 15;
  }
  // Monday - Friday 7:30 AM - 6:00 PM
  return time >= 7.5 && time < 18;
};
