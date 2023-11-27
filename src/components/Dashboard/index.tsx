import React, { useState } from "react";
import {
  VStack, Flex, HStack, Text, Button, Tag, Circle, ChakraProvider, useToast
} from "@chakra-ui/react";
import { Clock, MapPin, Car, Unlock, Lock } from "lucide-react";

const SmartParkingDashboard = () => {
  const toast = useToast();
  const [parkingSlots, setParkingSlots] = useState([
    // Initial state with mock data
    { id: 1, reserved: false },
    { id: 2, reserved: false },
    { id: 3, reserved: false },
  ]);

  // Function to toggle reservation status
  const toggleReservation = (slotId: number) => {
    const updatedSlots = parkingSlots.map((slot) =>
      slot.id === slotId ? { ...slot, reserved: !slot.reserved } : slot
    );
    setParkingSlots(updatedSlots);

    // Display toast notification on status change
    toast({
      title: `Parking Slot ${slotId}`,
      description: updatedSlots[slotId - 1].reserved
        ? "Reservation confirmed."
        : "Reservation cancelled.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider>
      <VStack
        spacing={4}
        p={6}
        boxShadow="md"
        borderRadius="md"
        backgroundColor="white"
        className="max-w-md mx-auto"
      >
        {/* Dashboard Header */}
        <Flex alignItems="center" justifyContent="space-between" w="full">
          <VStack alignItems="start">
            <HStack>
              <Text fontWeight="bold">Reservations</Text>
            </HStack>
            <HStack>
              <Clock className="text-xl" />
              <Text>{new Date().toLocaleTimeString()}</Text>
            </HStack>
          </VStack>
          <MapPin className="text-3xl" />
        </Flex>

        {/* Parking Slots List */}
        {parkingSlots.map((slot) => (
          <Flex
            key={slot.id}
            justifyContent="space-between"
            alignItems="center"
            w="full"
            p={4}
            borderWidth="1px"
            borderRadius="md"
            mb={2}
          >
            <HStack>
              <Car className="text-2xl" />
              <Text>Parking Slot {slot.id}</Text>
            </HStack>
            <Button
              onClick={() => toggleReservation(slot.id)}
              leftIcon={slot.reserved ? <Unlock /> : <Lock />}
              colorScheme={slot.reserved ? "red" : "green"}
              size="sm"
            >
              {slot.reserved ? "Cancel" : "Reserve"}
            </Button>
            <Tag
              size="sm"
              colorScheme={slot.reserved ? "red" : "green"}
              borderRadius="full"
            >
              <Circle className={`text-xs ${slot.reserved ? "fill-current" : ""}`} />
              {slot.reserved ? "Reserved" : "Available"}
            </Tag>
          </Flex>
        ))}
      </VStack>
    </ChakraProvider>
  );
};

export default SmartParkingDashboard;
