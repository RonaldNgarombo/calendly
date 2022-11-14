import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Sunday from "./src/working_hours/Sunday";
import Monday from "./src/working_hours/Monday";
import Tuesday from "./src/working_hours/Tuesday";
import Wednesday from "./src/working_hours/Wednesday";
import Thursday from "./src/working_hours/Thursday";
import Friday from "./src/working_hours/Friday";
import Saturday from "./src/working_hours/Saturdays";

export default function App() {
  const [sundayAvailable, setSundayAvailable] = useState(false);
  const [sundayWorkingHours, setSundayWorkingHours] = useState([
    { id: 1, start: "", end: "" },
  ]);

  const [mondayAvailable, setMondayAvailable] = useState(false);
  const [mondayWorkingHours, setMondayWorkingHours] = useState([
    { id: 1, start: "", end: "" },
  ]);

  const [tuesdayAvailable, setTuesdayAvailable] = useState(false);
  const [tuesdayWorkingHours, setTuesdayWorkingHours] = useState([
    { id: 1, start: "", end: "" },
  ]);

  const [wednesdayAvailable, setWednesdayAvailable] = useState(false);
  const [wednesdayWorkingHours, setWednesdayWorkingHours] = useState([
    { id: 1, start: "", end: "" },
  ]);

  const [thursdayAvailable, setThursdayAvailable] = useState(false);
  const [thursdayWorkingHours, setThursdayWorkingHours] = useState([
    { id: 1, start: "", end: "" },
  ]);

  const [fridayAvailable, setFridayAvailable] = useState(false);
  const [fridayWorkingHours, setFridayWorkingHours] = useState([
    { id: 1, start: "", end: "" },
  ]);

  const [saturdayAvailable, setSaturdayAvailable] = useState(false);
  const [saturdayWorkingHours, setSaturdayWorkingHours] = useState([
    { id: 1, start: "", end: "" },
  ]);

  //
  //
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.workingTitle}>Working Hours</Text>

        <Text style={styles.workingDesc}>
          Set typical weekly hours and add overrides for specif dates
        </Text>

        <View style={styles.weeklyContainer}>
          <Text style={styles.weeklyText}>Weekly hours</Text>
        </View>

        <ScrollView>
          <Sunday
            dayAvailable={sundayAvailable}
            setDayAvailable={setSundayAvailable}
            workingHours={sundayWorkingHours}
            setWorkingHours={setSundayWorkingHours}
          />

          <Monday
            dayAvailable={mondayAvailable}
            setDayAvailable={setMondayAvailable}
            workingHours={mondayWorkingHours}
            setWorkingHours={setMondayWorkingHours}
          />

          <Tuesday
            dayAvailable={tuesdayAvailable}
            setDayAvailable={setTuesdayAvailable}
            workingHours={tuesdayWorkingHours}
            setWorkingHours={setTuesdayWorkingHours}
          />

          <Wednesday
            dayAvailable={wednesdayAvailable}
            setDayAvailable={setWednesdayAvailable}
            workingHours={wednesdayWorkingHours}
            setWorkingHours={setWednesdayWorkingHours}
          />

          <Thursday
            dayAvailable={thursdayAvailable}
            setDayAvailable={setThursdayAvailable}
            workingHours={thursdayWorkingHours}
            setWorkingHours={setThursdayWorkingHours}
          />

          <Friday
            dayAvailable={fridayAvailable}
            setDayAvailable={setFridayAvailable}
            workingHours={fridayWorkingHours}
            setWorkingHours={setFridayWorkingHours}
          />

          <Saturday
            dayAvailable={saturdayAvailable}
            setDayAvailable={setSaturdayAvailable}
            workingHours={saturdayWorkingHours}
            setWorkingHours={setSaturdayWorkingHours}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  workingTitle: { fontSize: 16, fontWeight: "600", textAlign: "center" },

  workingDesc: {
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 60,
  },

  weeklyContainer: {
    borderBottomColor: "blue",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },

  weeklyText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 10 },
});
