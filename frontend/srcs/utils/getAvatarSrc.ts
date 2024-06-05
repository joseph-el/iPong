import DefaultMaleAvatar from "../pages/iPongProfile/assets/default-male.jpeg";
import DefaultFemaleAvatar from "../pages/iPongProfile/assets/default-female.jpeg";

export  const getAvatarSrc = (picture, username) => {
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };
    if (!picture|| !isValidUrl(picture)) {
      if (username.startsWith('F-;')) {
        return DefaultFemaleAvatar;
      } else if (username.startsWith('M-;')) {
        return DefaultMaleAvatar;
      } else {
        return DefaultMaleAvatar;
      }
    }
    return picture;
  };