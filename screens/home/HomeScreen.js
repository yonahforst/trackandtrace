import React from 'react'

import {
  View, 
  StyleSheet,
} from 'react-native'

import { 
  Avatar, 
  Button, 
  Card, 
  Title, 
  Paragraph,
  Switch,
  Divider,
} from 'react-native-paper';

import i18n from 'i18n-js'

export default ({
  isTrackingLocation,
  navigation,
}) => {

  return (
    <View 
    style={styles.container}>
      <Card>
        <Card.Content>
          <Title>
            { i18n.t('home_tracking_card_title', {
              trackingState: i18n.t('home_enabled').toUpperCase()
            })}
          </Title>

          <Paragraph>            
            { i18n.t('home_tracking_card_body', {
              recordingState: i18n.t(isTrackingLocation ? 'home_recording' : 'home_not_recording' ).toUpperCase()
            })}
          </Paragraph>
        </Card.Content>
        {/** <Card.Actions style={styles.actions}>
          <Button
          disabled={true}>
          Pause location tracking
          </Button>
        </Card.Actions> **/}
      </Card> 

      <Divider/>

      <Card>
        <Card.Title
        title={ i18n.t('home_trips_card_title')}
        />
        <Card.Actions
        style={styles.actions}>

          <Button
          onPress={() => navigation.navigate('trips')}>
          { i18n.t('home_go') }
          </Button>
        </Card.Actions>
      </Card> 

      <Divider/>

      <Card>
        <Card.Title
        title={ i18n.t('home_health_card_title') }
        />
        <Card.Actions
        style={styles.actions}>

          <Button
          onPress={() => navigation.navigate('health')}>
          { i18n.t('home_view') }
          </Button>
        </Card.Actions>

      </Card> 

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