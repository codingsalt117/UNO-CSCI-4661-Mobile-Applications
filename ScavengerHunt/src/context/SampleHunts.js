
const testHunt1 =
    {
        // create hunt list: create new hunt -> create hunt editor -> new hunt created
        // update hunt -> create hunt editor (passes current hunt state via huntID) -> calls updateHunt(huntID)
        id: 1,
        editing: false,
        name: "French Quarter Adventure",
        description: "Explore the historic French Quarter, known for its vibrant culture and lively atmosphere. Solve puzzles to uncover hidden gems and experience the heart of New Orleans.",
        locationsCount: 4,
        createdByUser: true,
        hasWon: false,
        isEditing: false,
        locations: []
    };
const testHunt2 = {
    id: 2,
    name: "Mountain Expedition",
    description: "Embark on a thrilling adventure in the majestic mountains. Solve riddles and enjoy breathtaking views as you conquer the peaks.",
    locationsCount: 5,
    createdByUser: false,
    isEditing: false,
}
const testHunt3 = {
    id: 3,
    name: "Urban Explorer Challenge",
    description: "Navigate through city streets, uncovering urban secrets and hidden treasures. Perfect for those who love the hustle and bustle.",
    locationsCount: 6,
    createdByUser: false,
    isEditing: false,
}

const unoHunt = {
    id: 4,
    name: "UNO Orientation",
    description: "Find stuff at UNO. Fun! Thrilling!",
    hasWon: false,
    isEditing: false,
    locations: [
        {
            id: 1,
            description: 'I picked this one because it had a cool name',
            hint: 'Has cool name',
            title: 'Milneburg Hall',
            latLng: {
                latitude: 30.029705841023993,
                longitude: -90.06640258820413,
            },
            isFound: false
        },
        {
            id: 2,
            description: 'This is where the books live, gitchu one!',
            title: 'Earl K. Long Library',
            hint: 'Communist books',
            latLng: {
                latitude: 30.02750663195721,
                longitude: -90.06695221157736
            },
            isFound: false
        },
        {
            id: 3,
            description: 'Capitalist version of library',
            title: 'UNO Bookstore',
            hint: 'Capitalist books',
            latLng: {
                latitude: 30.029111646588,
                longitude: -90.06456292751855
            },
            isFound: false
        }
    ],
    createdByUser: false,
}

const getTestHunts = () => {
    return [
        testHunt1,
        testHunt2,
        testHunt3,
        unoHunt
    ]
}

export { getTestHunts }
