import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  maincontainer: {
    flexGrow: 1,
  },
  /*   headcontainer: {
        heigh:'40%',
        width: '100%',
        backgroundColor: '#545B51',
        textAlign:'center',
        justifyContent:'center',
        color:'white',
        fontSize:20
       
  }, */
  taskcontainer: {
    flex: 2,
    backgroundColor: '#FFFFF0',
    alignItems: 'center',
    paddingTop: '18%',
  },
  resultcontainer: {
    flex: 2,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'Black', // Set the text color to white
    fontSize: 19,
    fontWeight: 'bold',
    paddingBottom: '5%',
  },
  texthead: {
    color: 'Black', // Set the text color to white
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: '5%',
  },
  btn_div: {
    flex: 1,
    flexDirection: 'row', // Set to 'row' for horizontal arrangement
    alignItems: 'center',
  },

  input: {
    backgroundColor: 'white',
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    borderColor: '#696969',
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
});

const App = () => {
  const [loan, setloan] = useState('');
  const [interest, setinterest] = useState('');
  const [loan_preod, setloan_period] = useState('');

  const [month_instl, set_month_installment] = useState(0); // Initialize x state
  const [t_payment, settotal_payment] = useState(0); // Initialize y state
  const [t_intersest, settotal_interest] = useState(0); // Initialize z state

  const Calculation = () => {
    const loan_m = parseFloat(loan);
    const interst_m = parseFloat(interest);
    const period = parseFloat(loan_preod);
    if (!isNaN(loan_m) && !isNaN(interst_m) && !isNaN(period)) {
      let payment_interset = (interst_m / 100) * loan_m;
      let payment_total = (payment_interset +loan_m);
      if (period == 1) {
        let month = period * 12;
        set_month_installment((payment_total / month).toFixed(2));
        settotal_interest(payment_interset.toFixed(2));
        settotal_payment(payment_total.toFixed(2));
      }
      else if(period > 1){
        let month = period * 12;
        let tmp = payment_interset;
        tmp *= period;
        settotal_interest(tmp.toFixed(2));
        tmp -= payment_interset;
        payment_total += tmp;
        settotal_payment(payment_total.toFixed(2));
        set_month_installment((payment_total / month).toFixed(2));

      }
      else if(period < 1){
        let month = period * 10;
        let tmp = payment_interset;
        tmp *= period;
        settotal_interest(tmp.toFixed(2));
        tmp -= Math.abs(payment_interset);
        payment_total += tmp;
        settotal_payment(payment_total.toFixed(2));
        set_month_installment((payment_total / month).toFixed(2));

      }
    }
  };
  const Reset = () => {
    setloan('');
    setinterest('');
    setloan_period('');
    set_month_installment(0);
    settotal_payment(0);
    settotal_interest(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.maincontainer}>
      <View style={styles.taskcontainer}>
        <Text style={styles.texthead}>Loan Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Loan Amount Taka"
          keyboardType="numeric"
          onChangeText={setloan}
          value={loan}
        />
        <TextInput
          style={styles.input}
          placeholder="Interest Rate in %"
          keyboardType="numeric"
          onChangeText={setinterest}
          value={interest}
        />
        <TextInput
          style={styles.input}
          placeholder="Loan Period (Years)"
          keyboardType="numeric"
          onChangeText={setloan_period}
          value={loan_preod}
        />

        <View style={styles.btn_div}>
          <Button title="Press Me" onPress={Calculation} />
          <View style={{ width: 5 }} />
          <Button title="Reset" onPress={Reset} />
        </View>
      </View>

      <View style={styles.resultcontainer}>
        <Text style={styles.text}>Monthly Instalment {month_instl} (Tk.)</Text>
        <Text style={styles.text}>Total Payment {t_payment} (Tk.)</Text>
        <Text style={styles.text}>Total Interest {t_intersest} (Tk.)</Text>
      </View>
    </ScrollView>
  );
};
export default App;
