import React from "react";
import "./iPongAlert.css";

import {
  Tabs,
  Tab,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Image,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  User,
  Tooltip,
} from "@nextui-org/react";

export default function IPongAlert(props) {
  
  console.log("undefinded:,", props.hideCloseButton);

  return (
    <Modal backdrop="opaque" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col modal-header-text-color gap-1">
              {" "}
              {props.UserAlertHeader}{" "}
            </ModalHeader>
            <ModalBody className="modal-body-text-color">
              {props.UserAlertMessage}
            </ModalBody>
            <ModalFooter>
              {props.hideCloseButton == undefined || props.hideCloseButton ? (
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              ) : null}
              <Button
                color="primary"
                onPress={onClose}
                onClick={props.handelRemoveUser}
              >
                {props.UserOptions}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
