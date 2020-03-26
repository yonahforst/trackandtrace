import React from 'react'

import {
  StyleSheet,
  // Linking,
  Alert,
} from 'react-native'

import { 
  Avatar, 
  Button, 
  Card, 
  Title, 
  Paragraph,
  HelperText,
} from 'react-native-paper';

import i18n from 'i18n-js'


const alertOpenSettings = (title, body) => {
  Alert.alert(
    title,
    body,
    [
      {
        text: i18n.t('cancel'),
        onPress: () => {},
        style: 'cancel',
      },
      // { text: i18n.t('open_settings'), onPress: () => Linking.openURL('app-settings:') },
    ],
  )
}

export default ({
  title,
  subtitle,
  content,
  icon,
  permission,
  onRequestPermission,
}) => {
  const renderButtonForStatus = () => {

     if (permission.status == 'granted')
        return (
          <Button 
          icon={'check'} 
          mode="contained" 
          disabled={true}>
            { i18n.t('intro_permission_granted') }
          </Button>
        )

    if (permission.status == 'undetermiend' || permission.canAskAgain) 
      return (
        <Button 
        mode="contained" 
        onPress={onRequestPermission}>
          { i18n.t('intro_permission_ask') }
        </Button>
      )
        
    return (
      <Button 
      mode="contained"
      onPress={() => alertOpenSettings(title, i18n.t('intro_permission_denied'))}>
        { i18n.t('intro_permission_ask') }
      </Button>
    )
  }

  return (
    <Card>
      <Card.Title 
        title={title} 
        subtitle={subtitle} 
        left={(props) => <Avatar.Icon {...props} icon={icon} />} 
        />
      <Card.Content>
        <Paragraph>
          { content }
        </Paragraph>
      </Card.Content>
      <Card.Actions
      style={styles.actions}>
        { renderButtonForStatus() }
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  actions: {
    justifyContent: 'flex-end'
  }
})