import React from 'react'

import {
  StyleSheet
} from 'react-native'

import { 
  Avatar, 
  Button, 
  Card, 
  Title, 
  Paragraph,
} from 'react-native-paper';

import i18n from 'i18n-js'

export default ({
  title,
  subtitle,
  content,
  icon,
  hasPermission,
  onRequestPermission,
}) => (
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

      <Button 
      icon={hasPermission ? 'check' : undefined} 
      mode="contained" 
      disabled={hasPermission}
      onPress={onRequestPermission}>
        {hasPermission ? i18n.t('intro_permission_granted') : i18n.t('intro_permission_ask')}
      </Button>

    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  actions: {
    justifyContent: 'flex-end'
  }
})