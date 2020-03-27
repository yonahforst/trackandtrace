import React, {
  useState,
} from 'react'

import {
  View, 
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native'

import { 
  Avatar, 
  Button, 
  Card, 
  Title, 
  Paragraph,
  Switch,
  Divider,
  List,
  IconButton,
} from 'react-native-paper';

const noop = () => {}

export default ({
  data,
  keyExtractor,
  bulkAction,
  renderItem,
  outerStyle,
}) => {


  const [ selected, setSelected ] = useState([]) 
  const [ isEditing, setIsEditing ] = useState(false)
  const allSelected = data.every(i => selected.includes(keyExtractor(i)))
  const anySelected = selected.length > 0

  const toggleSelectAll = () => setSelected(
    allSelected ? [] : data.map(keyExtractor)
  )


  const toggleIsEdting = () => {
    setSelected([])
    setIsEditing(!isEditing)
  }

  const alertBulkAction = () => {
    Alert.alert(
      'Are you sure?',
      bulkAction.alertMessage,
      [
        {
          text: 'Cancel',
          onPress: noop,
          style: 'cancel',
        },
        { text: bulkAction.title, onPress: onBulkAction},
      ]
    ); 
  }

  const onBulkAction = async () => {
    await bulkAction.onPress(selected)
    setSelected([])
    setIsEditing(false)
  }

  const renderHeaderRight = () => {

    if (isEditing && anySelected)
      return (
        <Button 
        compact 
        onPress={bulkAction.alertMessage ? alertBulkAction : onBulkAction}>
          {bulkAction.title}
        </Button>
      )
      

    return (
      <Button 
      compact 
      onPress={toggleIsEdting} 
      disabled={data.length == 0}>
        { isEditing ? 'cancel' : 'edit' }
      </Button>
    )
  }

  const renderHeaderLeft = (props) => {
    if (!isEditing)
      return

    return (
      <IconButton
      {...props}
      icon={allSelected 
        ? 'checkbox-multiple-marked-circle' 
        : 'checkbox-multiple-blank-circle-outline'
      }
      onPress={toggleSelectAll}
      />
    )
  }

  const toggleSelected = (itemId) => setSelected(
    selected.includes(itemId) 
    ? selected.filter(id => id !== itemId)
    : [ ...selected, itemId ]
  )

  const renderSelectedItem = (props) => {
    const itemId = keyExtractor(props.item)
    const isSelected = selected.includes(itemId)
    
    return (
      <List.Item
      style={styles.item}
      {...renderItem(props)}
      left={props => isEditing ? (
        <IconButton
        {...props}
        icon={isSelected ? 'check-circle' : 'checkbox-blank-circle-outline'}
        onPress={() => toggleSelected(itemId)}
        />
      ) : props.left }
      />
    )
  }
  return (
    <View 
    style={outerStyle || styles.container}>

      <List.Item
      right={renderHeaderRight}
      left={renderHeaderLeft}
      />

      <Divider />

      <FlatList
      data={data}
      renderItem={renderSelectedItem}
      keyExtractor={keyExtractor}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  item: {
    backgroundColor: 'white',
  }
})