import React from "react";
import {Badge, Button} from "@nextui-org/react";
import {NotificationIcon} from "./NotificationIcon";

export default function NotificationButton() {
  return (
    // <Badge content="" shape="circle" color="success">
      
      <Button
        radius="full"
        isIconOnly
        aria-label="more than 99 notifications"
        variant="light"
      >
        <NotificationIcon size={26} />
      </Button>

    //  </Badge>
  );
}
