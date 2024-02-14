
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useDispatch, useSelector } from 'react-redux';
import {
  Images,
  Screen
} from "../../Helper";

import { filterItemAction, setDeliveryModeAction, setInvoiceModeAction, setOrderModeAction, setPaymentModeAction } from '../../Store/actions/commonActions';

const OrderFilterScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { filterItems, orderModeData, deliveryModeData, invoiceModeData, paymentModeData } = useSelector((state) => state.common)
  console.log("orderModeData:::", orderModeData)
  const [menuItems, setMenuItems] = React.useState([
    {
      id: '1', name: 'Order',
      filters: [
        { id: 'draft', value: 'Quatation', isChecked: false },
        { id: 'sale', value: 'Order', isChecked: false },
      ]
    },
    {
      id: '2', name: 'Delivery',
      filters: [
        { id: 'pending', value: 'Not Delivered', isChecked: false },
        { id: 'partial', value: 'Partially Delivered', isChecked: false },
        { id: 'full', value: 'Fully Delivered', isChecked: false },
      ]
    },
    {
      id: '3', name: 'Invoice',
      filters: [
        { id: 'invoiced', value: 'Fully Invoiced', isChecked: false },
        { id: 'to invoice', value: 'Invoice Not Created', isChecked: false },
        { id: 'no', value: 'Nothing to Invoice', isChecked: false },
      ]
    },
    {
      id: '4', name: 'Date-range',
      filters: [
        { id: 'startDate', value: 'startDate', isChecked: false },
        { id: 'endDate', value: 'endDate', isChecked: false },
      ]
    },
    {
      id: '5', name: 'Payment mode',
      filters: [
        { id: 'cash', value: 'Cash', isChecked: false },
        { id: 'creditCard', value: 'Credit Card', isChecked: false },
        { id: 'googlePay', value: 'Google Pay', isChecked: false },
        { id: 'phonePe', value: 'PhonePe', isChecked: false },
        { id: 'debitCard', value: 'Debit Card', isChecked: false },
        { id: 'netBanking', value: 'Net Banking', isChecked: false },
        { id: 'otherUPI', value: 'Other UPI', isChecked: false },
      ]
    },
  ])
  useEffect(() => {
    if (filterItems && filterItems.length > 0) {

      setMenuItems([...filterItems])
    }
  }, [])
  
  
  const [selectedItem, setSelectedItem] = React.useState('1')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [customerdata, setcustomerdata] = useState([]);
  const [orderMode, setOrderMode] = useState(orderModeData.length > 0 ? orderModeData : [])
  const [deliveryMode, setDeliveryMode] = useState(deliveryModeData.length > 0 ? deliveryModeData : [])
  const [invoiceMode, setInvoiceMode] = useState(invoiceModeData.length > 0 ? invoiceModeData : [])
  const [paymentMode, setpaymentMode] = useState(paymentModeData.length > 0 ? paymentModeData : [])


  const searchRead = async () => {

    const uid = await AsyncStorage.getItem("userId");

    const searchCriteria = [
      ["user_id", "=", Number(uid)],
      ["id", "!=", 0]
    ]
    if (orderMode.length > 0) {
      searchCriteria.push(["state", "in", orderMode])
    }
    if (paymentMode.length > 0) {
      searchCriteria.push(["payment_mode", "=", paymentMode])
    }
    if (startDate.length !== undefined) {
      searchCriteria.push(["date_order", ">=", startDate])
    }
    if (endDate.length !== undefined) {
      searchCriteria.push(["date_order", "<=", endDate])
    }
    console.log("searchCriteria  after push:::", searchCriteria)

    navigation.navigate(Screen.ShowOrderScreen, { filterSearchCriteria: searchCriteria })

  };

  const handleCheckBoxClick = (clickedItem) => {
    const updatedMenuItems = menuItems.map((menu) => {
      if (menu.id === selectedItem) {
        const updatedFilters = menu.filters.map((filter) => {
          if (filter.id === clickedItem.id) {
            return { ...filter, isChecked: !filter.isChecked };
          }
          return filter;
        });
        return { ...menu, filters: updatedFilters };
      }
      return menu;
    });

    switch (selectedItem) {
      case '1': 
        const updatedOrderMode = updatedMenuItems[0].filters.filter((filter) => filter.isChecked).map((filter) => filter.id);
        setOrderMode(updatedOrderMode);
        dispatch(setOrderModeAction(updatedOrderMode))
        break;
      case '2': 
        const updatedDeliveryMode = updatedMenuItems[1].filters.filter((filter) => filter.isChecked).map((filter) => filter.id);
        setDeliveryMode(updatedDeliveryMode);
        dispatch(setDeliveryModeAction(updatedDeliveryMode))
        break;
      case '3': 
        const updatedInvoiceMode = updatedMenuItems[2].filters.filter((filter) => filter.isChecked).map((filter) => filter.id);
        setInvoiceMode(updatedInvoiceMode);
        dispatch(setInvoiceModeAction(updatedInvoiceMode))
        break;
      case '5': 
        const updatedPaymentMode = updatedMenuItems[4].filters.filter((filter) => filter.isChecked).map((filter) => filter.value);
        setpaymentMode(updatedPaymentMode);
        dispatch(setPaymentModeAction(updatedPaymentMode))
        break;
      default:
        break;
    }
    setMenuItems(updatedMenuItems);
    dispatch(filterItemAction(updatedMenuItems))
  };

  
  const handleStartDateChange = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate || startDate;
      setShowStartDatePicker(Platform.OS === 'ios');
      const splitDate = moment(currentDate).format('YYYY-MM-DD');
      setStartDate(splitDate)
    }
  };

  
  const handleEndDateChange = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate || endDate;
      setShowEndDatePicker(Platform.OS === 'ios');
      const splitDate = moment(currentDate).format('YYYY-MM-DD');
      setEndDate(splitDate)
      
    }
  };

  const clearFilter = () => {
    const updatedMenuItems = menuItems.map((menu) => {
      const updatedFilters = menu.filters.map((filter) => {
        return { ...filter, isChecked: false };
      });
      return { ...menu, filters: updatedFilters };

    });
    setMenuItems(updatedMenuItems);
    setOrderMode([])
    setDeliveryMode([])
    setInvoiceMode([])
    setpaymentMode([])
    setcustomerdata([])
    setStartDate(new Date())
    setEndDate(new Date())
    dispatch(filterItemAction([]))
    dispatch(setOrderModeAction([]))
    dispatch(setPaymentModeAction([]))
    dispatch(setInvoiceModeAction([]))
    dispatch(setDeliveryModeAction([]))
  }

  return (
    <>

      <View style={styles.content}>
        <View style={styles.menuColumn}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {menuItems.map(
              (item, index) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => setSelectedItem(item.id)} style={[styles.menuItem, item.id === selectedItem ? styles.selectedMenuItem : null]}>
                    <Text numberOfLines={2} style={[
                      styles.menuItemText, { color: item.id === selectedItem ? "#fff" : "#000" }
                    ]}>{item.name}</Text>
                  </TouchableOpacity>
                )
              }
            )
            }
          </ScrollView>
        </View>
        <View style={styles.settingsColumn}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {
              selectedItem === '1' &&
              <View style={styles.settingsView} >
                {
                  menuItems[0]?.filters.map((item, idx) => {
                    return (
                      <CheckBox
                        key={idx}
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => handleCheckBoxClick(item)}
                        isChecked={item.isChecked}
                        leftText={item.value}
                        leftTextStyle={{ color: '#000' }}
                      />
                    )
                  })


                }

              </View>
            }
            {
              selectedItem === '2' &&
              <View style={styles.settingsView} >
                {
                  menuItems[1]?.filters.map((item, idx) => {
                    return (
                      <CheckBox
                        key={idx}
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => handleCheckBoxClick(item)}
                        isChecked={item.isChecked}
                        leftText={item.value}
                        leftTextStyle={{ color: '#000' }}
                      />
                    )
                  })

                }
              </View>
            }

            {
              selectedItem === '3' &&
              <View style={styles.settingsView} >
                {
                  menuItems[2]?.filters.map((item, idx) => {
                    return (
                      <CheckBox
                        key={idx}
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => handleCheckBoxClick(item)}
                        isChecked={item.isChecked}
                        leftText={item.value}
                        leftTextStyle={{ color: '#000' }}
                      />
                    )
                  })
                }
              </View>
            }

            {
              selectedItem === '4' &&
              <View style={styles.settingsView} >

                <View>
                  <TouchableOpacity onPress={() => setShowStartDatePicker(!showStartDatePicker)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, alignItems: 'center' }}>
                    <Text style={{ color: '#000' }}>{'Start date'}</Text>
                    <Image source={Images.calender} style={{
                      height: 25, width: 25
                    }} />
                  </TouchableOpacity>
                  {showStartDatePicker && (
                    <DateTimePicker
                      
                      value={new Date()}
                      mode="date"
                      display="default"
                      is24Hour={true}
                      onChange={handleStartDateChange}
                    />
                  )
                  }
                  <TouchableOpacity onPress={() => setShowEndDatePicker(!showEndDatePicker)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, alignItems: 'center' }}>
                    <Text style={{ color: '#000' }}>{'End date'}</Text>
                    <Image source={Images.calender} style={{
                      height: 25, width: 25
                    }} />
                  </TouchableOpacity>
                  {showEndDatePicker && (
                    <DateTimePicker
                      
                      value={new Date()}
                      mode="date"
                      
                      onChange={handleEndDateChange}
                    />
                  )
                  }
                </View>
              </View>
            }

            {
              selectedItem === '5' &&
              <View style={styles.settingsView} >
                {
                  menuItems[4]?.filters.map((item, idx) => {
                    return (
                      <CheckBox
                        key={idx}
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => handleCheckBoxClick(item)}
                        isChecked={item.isChecked}
                        leftText={item.value}
                        leftTextStyle={{ color: '#000' }}
                      />
                    )
                  })
                }
              </View>
            }
          </ScrollView>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10 }}>
        <TouchableOpacity onPress={() => clearFilter()} style={{ marginRight: 15, marginLeft: 15, paddingVertical: 10, flex: 0.5, backgroundColor: "#8B8000", borderRadius: 6 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: '#fff', fontWeight: '500' }}>CLEAR FILTERS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => searchRead()}
          style={{ marginRight: 15, marginLeft: 15, paddingVertical: 10, flex: 0.5, backgroundColor: '#4E2F1B', borderRadius: 6 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: '#fff', fontWeight: '500' }}>APPLY</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  menuColumn: {
    flex: .35,
    flexDirection: 'column',
    backgroundColor: '#dedede',
  },
  menuItem: {
    
    flex: 0,
    
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  selectedMenuItem: {
    backgroundColor: '#8B8000',

  },

  menuItemText: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: 'normal',
    paddingVertical: 16,
    color: '#000',
  },
  
  settingsColumn: {
    flex: .65,
    padding: 10,
    backgroundColor: 'white'
  },
  btnDRed: {
    backgroundColor: "red",
  },

});

export default OrderFilterScreen;
