import React, {
  useState,
} from 'react'

import {
  View, 
  StyleSheet,
  FlatList,
} from 'react-native'

import i18n from 'i18n-js'

import SelectableFlatList from '../../components/SelectableFlatList'


export default ({
  tripIds=[],
  deleteTrips,
  navigation: {
    navigate,
  }
}) => {


  const renderItem = ({ 
    item,
  }) => {
    const date = new Date(parseInt(item))

    return {
      title: i18n.strftime(date, '%a %-d-%b %-H:%M'),
      onPress: () => navigate('tripDetail', { 
        tripId: item,
      })
    }
  }

  return (
    <View 
    style={styles.container}>
      <SelectableFlatList
      data={tripIds}
      renderItem={renderItem}
      bulkAction={{
        title: 'Delete Selected',
        onPress: deleteTrips,
        alertMessage: 'These trips will be deleted permenantly'
      }}
      keyExtractor={item => item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  actions: {
    justifyContent: 'flex-end'
  }
})