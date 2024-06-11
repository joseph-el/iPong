import DefaultMaleAvatar from "../pages/iPongProfile/assets/default-male.jpeg";
import DefaultFemaleAvatar from "../pages/iPongProfile/assets/default-female.jpeg";

export  const getAvatarSrc = (picture, gender) => {

  if (picture)
      return picture;
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };
    if (!gender) {
      
      return DefaultMaleAvatar;
    }
    
    if (!picture|| !isValidUrl(picture)) {
      if (gender == "female") {
        return DefaultFemaleAvatar;
      } else if (gender == "male") {
        return DefaultMaleAvatar;
      } else {
        return DefaultMaleAvatar;
      }
    }
    return picture;
  };