import { Alert, Platform, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Monday({
  dayAvailable,
  setDayAvailable,
  workingHours,
  setWorkingHours,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    type: "",
    start: "",
    end: "",
  }); // type - start|enf

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.log(moment(date).format("h:mm a"));

    // console.log(selectedItem);

    const setDate = moment(date).format("h:mm a");
    const others = workingHours.filter((a) => a.id !== selectedItem.id);

    // console.log(others);

    if (selectedItem.type === "start") {
      setWorkingHours([
        ...others,
        { id: selectedItem.id, start: setDate, end: "" },
      ]);
    } else {
      const first = moment(selectedItem.start, "HH:mm a");
      const second = moment(setDate, "HH:mm a");

      if (second.isSame(first)) {
        return Alert.alert(
          "Oops...",
          "End time can not be equal to start time"
        );
      }

      if (second.isBefore(first)) {
        return Alert.alert(
          "Oops...",
          "End time can not be less than start time"
        );
      }

      setWorkingHours([
        ...others,
        { id: selectedItem.id, start: selectedItem.start, end: setDate },
      ]);
    }

    setDatePickerVisibility(false);
  };

  //
  // Add timeline
  function addTimeline() {
    // If the day is marked as disabled, do nothing
    console.log("Working...");
    if (!dayAvailable) {
      return;
    }

    // showDatePicker();
    // workingHours.slice(-1)[0].id === i.id;

    // Get the last item in the list
    const lastItem = workingHours.slice(-1)[0];
    // Validate that it has data before adding another
    if (lastItem.start === "" || lastItem.end === "") {
      return;
    }

    setWorkingHours([
      ...workingHours,
      {
        id: lastItem.id + 1,
        start: "",
        end: "",
      },
    ]);
  }

  //
  // Remove timeline from selected timeline
  function removeTimeline(id: number) {
    const cleaned = workingHours.filter((a) => a.id !== id);

    setWorkingHours(cleaned);
  }

  //
  //
  return (
    <View>
      <View style={styles.timelineParent}>
        <View style={styles.dayContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#60a5fa" }}
            thumbColor={dayAvailable ? "blue" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setDayAvailable((prev) => !prev);
            }}
            value={dayAvailable}
          />

          <Text
            style={[
              styles.weekDay,
              { marginTop: Platform.OS === "ios" ? 5 : 13 },
            ]}
          >
            Mondays
          </Text>
        </View>

        <View style={styles.slotContainer}>
          {!dayAvailable && (
            <View style={styles.slotCard}>
              <View style={{ flex: 1 }}></View>

              <View
                style={{
                  flex: 5,
                  flexDirection: "row",
                  marginVertical: 5,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    borderColor: "#e5e7eb",
                    borderWidth: 1,
                    padding: 15,
                    borderRadius: 5,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#9ca3af" }}>Unavailable</Text>
                  </View>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Ionicons
                  name="md-add-outline"
                  size={25}
                  color={dayAvailable ? "blue" : "#404040"}
                  style={{ padding: 10 }}
                  onPress={addTimeline}
                />
              </View>
            </View>
          )}

          {dayAvailable &&
            workingHours.map((i, index) => (
              <View key={i.id} style={styles.slotCard}>
                <View style={{ flex: 1 }}>
                  {index > 0 && (
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color="grey"
                      style={{ padding: 5 }}
                      onPress={() => removeTimeline(i.id)}
                    />
                  )}
                </View>

                <View style={styles.slotRow}>
                  <View
                    style={{
                      flexDirection: "row",
                      // justifyContent: "center",
                    }}
                  >
                    <Text
                      onPress={() => {
                        setSelectedItem({
                          id: i.id,
                          type: "start",
                          start: i.start,
                          end: i.end,
                        });
                        showDatePicker();
                      }}
                      style={[
                        styles.startEndTime,
                        { color: i.start ? "#000000" : "#9ca3af" },
                      ]}
                    >
                      {i.start ? i.start : "Start"}
                    </Text>

                    <Text style={{ paddingVertical: 10 }}>{" - "}</Text>

                    <Text
                      onPress={() => {
                        setSelectedItem({
                          id: i.id,
                          type: "end",
                          start: i.start,
                          end: i.end,
                        });
                        showDatePicker();
                      }}
                      style={[
                        styles.startEndTime,
                        { color: i.start ? "#000000" : "#9ca3af" },
                      ]}
                    >
                      {i.end ? i.end : "End"}
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  {workingHours.slice(-1)[0].id === i.id && (
                    <Ionicons
                      name="md-add-outline"
                      size={25}
                      color={dayAvailable ? "blue" : "#404040"}
                      style={{ padding: 10 }}
                      onPress={addTimeline}
                    />
                  )}
                </View>
              </View>
            ))}
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        // mode="date"
        // mode="datetime"
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timelineParent: {
    flexDirection: "row",
    paddingVertical: 10,
    marginVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },

  dayContainer: { flex: 1, flexDirection: "row", alignItems: "flex-start" },

  weekDay: { marginLeft: 10, fontSize: 16 },

  slotContainer: { flex: 2, alignItems: "center" },

  slotCard: { flexDirection: "row", alignItems: "center" },

  slotRow: {
    flex: 5,
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    width: "100%",
  },

  startEndTime: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 90,
    textAlign: "center",
  },
});
