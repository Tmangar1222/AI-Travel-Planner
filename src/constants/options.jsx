export const SelectTravelersList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'Solo adventure awaits.',
        icon: '🕺',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Romantic escape for two.',
        icon: '👩‍❤️‍👨',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Quality time with loved ones.',
        icon: '👨‍👩‍👧‍👦',
        people: '3+'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Memorable trips with friends.',
        icon: '🚶‍♂️🚶‍♀️',
        people: '4+'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget',
        desc: 'Affordable travel for minimal spenders.',
        icon: '💵',
        range: '$ '
    },
    {
        id: 2,
        title: 'Economy',
        desc: 'Balanced comfort at a reasonable cost.',
        icon: '💰',
        range: '$$'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Exclusive experiences with premium comfort.',
        icon: '💸',
        range: '$$$$'
    }
];

export const AI_PROMPT = `Generate a personalized travel plan for: Location: {location}, Duration: {totalday} days, Traveler Type: {traveler}, Budget: {budget}. Provide a list of hotels with: Hotel Name, Hotel Address, Price, Hotel Image URL, Geo Coordinates (Latitude, Longitude), Rating, Description. Suggested itinerary for {totalday} days should include: Place Name, Place Details, Place Image URL, Place Address, Ticket Pricing, Rating, Estimated Travel Time, and Best Time to Visit. Each day should have activites ranging from 8am- midnight with outlines times and 5 acitivity option each. Return the data in JSON format for API integration.`;
