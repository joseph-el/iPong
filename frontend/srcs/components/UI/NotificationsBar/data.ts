type UserType = "ImessagesNotifications" | "FriendNotifications";

interface User {
    name: string;
    avatar: string;
    type: UserType;
    time: Date;
}

const getRandomDate = (): Date => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7); // within the last 7 days
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const users: User[] = [
    { name: "Taha Naceur Elidrissi", avatar: "https://cdn.intra.42.fr/users/1e212df3b450650d04418d1c03827563/tnaceur.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Zakariae El Khadir", avatar: "https://cdn.intra.42.fr/users/d253bf077c4fb611910625bca09ce269/zel-khad.jpeg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Ali Ahmed", avatar: "https://randomuser.me/api/portraits/men/10.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Fatima Zahra", avatar: "https://randomuser.me/api/portraits/women/11.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Hassan Mohammad", avatar: "https://randomuser.me/api/portraits/men/12.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Aisha Ali", avatar: "https://randomuser.me/api/portraits/women/13.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Omar Khaled", avatar: "https://randomuser.me/api/portraits/men/14.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Layla Youssef", avatar: "https://randomuser.me/api/portraits/women/15.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Mohammed Saeed", avatar: "https://randomuser.me/api/portraits/men/16.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Noor Alia", avatar: "https://randomuser.me/api/portraits/women/17.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Karim Hassan", avatar: "https://randomuser.me/api/portraits/men/18.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Salma Rami", avatar: "https://randomuser.me/api/portraits/women/19.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Ahmed Riad", avatar: "https://randomuser.me/api/portraits/men/20.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Dana Farah", avatar: "https://randomuser.me/api/portraits/women/21.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Youssef Amine", avatar: "https://randomuser.me/api/portraits/men/22.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Mariam Sami", avatar: "https://randomuser.me/api/portraits/women/23.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Ibrahim Jamil", avatar: "https://randomuser.me/api/portraits/men/24.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Zainab Hadi", avatar: "https://randomuser.me/api/portraits/women/25.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Mustafa Tamer", avatar: "https://randomuser.me/api/portraits/men/26.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Huda Rashid", avatar: "https://randomuser.me/api/portraits/women/27.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Khalid Adnan", avatar: "https://randomuser.me/api/portraits/men/28.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Amal Omar", avatar: "https://randomuser.me/api/portraits/women/29.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Sami Naji", avatar: "https://randomuser.me/api/portraits/men/30.jpg", type: "ImessagesNotifications", time: getRandomDate() },
    { name: "Rania Karim", avatar: "https://randomuser.me/api/portraits/women/31.jpg", type: "FriendNotifications", time: getRandomDate() },
    { name: "Nabil Fouad", avatar: "https://randomuser.me/api/portraits/men/32.jpg", type: "ImessagesNotifications", time: getRandomDate() }
];

export default users;