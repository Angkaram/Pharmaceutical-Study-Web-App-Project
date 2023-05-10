import { PDFDownloadLink, Document, Page, View, Text, Image, Font, Header, Footer, StyleSheet } from '@react-pdf/renderer';
import header from '../assets/images/header.png';
import footer from '../assets/images/footer.png';

const styles = StyleSheet.create({
  body: {
    paddingTop: 125,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Times-Roman",
    marginBottom: 10,
  },
  patient: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  text: {
    left: 10,
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  visits: {
    left: 20,
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  container: {
    flexDirection: 'column',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 10,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '20%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '20%',
    paddingBottom: 25,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '15%',
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

function PDFDocument({ treatment, control }) {

  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.header} src={header} fixed/>
        <View>
          <Text style={styles.title}>Treatment Group</Text>
          {treatment.map(patient => (
            <View key={patient._id}>
              <Text style={styles.patient}>Patient ID: {patient._id}</Text>
              <Text style={styles.text}>DOB: {patient.dob}</Text>
              <Text style={styles.text}>Height: {patient.height}</Text>
              <Text style={styles.text}>Weight: {patient.weight}</Text>
              <Text style={styles.text}>BloodType: {patient.bloodType}</Text>
              <Text style={styles.text}>Blood Pressure: {patient.bloodPressure}</Text>
              <Text style={styles.text}>Temperature: {patient.temperature}</Text>
              <Text style={styles.text}>Oxygen Saturation: {patient.oxygenSaturation}</Text>
              <Text style={styles.text}>Doses: {patient.doses}</Text>
              <Text style={styles.text}>Allergies: {patient.allergies && patient.allergies.length > 0 ? patient.allergies.map(allergy => allergy.allergy).join(', ') : 'None'}</Text>
              <Text style={styles.text}>Family History: {patient.familyHistory}</Text>
              <Text style={styles.text}>Current Medications: {patient.currentMedications ? patient.currentMedications.map(medication => medication.medication).join(', ') : 'None'}</Text>
              <Text style={styles.text}>Visits: </Text>
              {patient.visits.map(visit => (
                <View key={visit.dateTime}>
                  <View style={styles.container}>
                    <Text style={styles.visits}>Date: {visit.dateTime}</Text>
                    <Text style={styles.visits}>Notes: {visit.notes ? visit.notes : 'None'}</Text>
                    <Text style={styles.visits}>HIV Viral Load: {visit.hivViralLoad ? visit.hivViralLoad : 'None'}</Text>
                    <View style={styles.line}></View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
        <Image style={styles.footer} src={footer} fixed/>
      </Page>
      <Page style={styles.body}>
        <Image style={styles.header} src={header} fixed/>
        <View>
          <Text style={styles.title}>Control Group</Text>
          {control.map(patient => (
            <View key={patient._id}>
              <Text style={styles.patient}>Patient ID: {patient._id}</Text>
              <Text style={styles.text}>DOB: {patient.dob}</Text>
              <Text style={styles.text}>Height: {patient.height}</Text>
              <Text style={styles.text}>Weight: {patient.weight}</Text>
              <Text style={styles.text}>BloodType: {patient.bloodType}</Text>
              <Text style={styles.text}>Blood Pressure: {patient.bloodPressure}</Text>
              <Text style={styles.text}>Temperature: {patient.temperature}</Text>
              <Text style={styles.text}>Oxygen Saturation: {patient.oxygenSaturation}</Text>
              <Text style={styles.text}>Doses: {patient.doses}</Text>
              <Text style={styles.text}>Allergies: {patient.allergies && patient.allergies.length > 0 ? patient.allergies.map(allergy => allergy.allergy).join(', ') : 'None'}</Text>
              <Text style={styles.text}>Family History: {patient.familyHistory}</Text>
              <Text style={styles.text}>Current Medications: {patient.currentMedications ? patient.currentMedications.map(medication => medication.medication).join(', ') : 'None'}</Text>
              <Text style={styles.text}>Visits: </Text>
              {patient.visits.map(visit => (
                <View key={visit.dateTime}>
                <View style={styles.container}>
                  <Text style={styles.visits}>Date: {visit.dateTime}</Text>
                  <Text style={styles.visits}>Notes: {visit.notes ? visit.notes : 'N/A'}</Text>
                  <Text style={styles.visits}>HIV Viral Load: {visit.hivViralLoad ? visit.hivViralLoad : 'N/A'}</Text>
                  <View style={styles.horizontalLine}></View>
                </View>
                </View>
              ))}
            </View>
          ))}
        </View>
        <Image style={styles.footer} src={footer} fixed/>
      </Page>
    </Document>
  );
}

export default PDFDocument;