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
import PermissionDialog from '../../components/PermissionDialog'
export default ({
  toggleShouldTrackLocation,
  shouldTrackLocation,
  isTrackingLocation,
  navigation,
  locationPermission,
}) => {
  const shouldShowLocationPermissionsBanner = locationPermission.status !== 'granted' || locationPermission.ios.scope !== 'always'

  return (
    <View 
    style={styles.container}>
      <PermissionDialog
      visible={shouldShowLocationPermissionsBanner}
      title={i18n.t('intro_permission_location_title')}
      body={i18n.t('intro_permission_location_denied')}
      />
      <View 
      style={styles.innerContainer}>
        <Card>
          <Card.Content>
            <Title>
              { i18n.t('home_tracking_card_title', {
                trackingState: i18n.t( shouldTrackLocation ? 'enabled' : 'disabled' ).toUpperCase()
              })}
            </Title>

            <Paragraph>            
              { i18n.t('home_tracking_card_body', {
                recordingState: i18n.t(isTrackingLocation ? 'recording' : 'not_recording' ).toUpperCase()
              })}
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button
            onPress={toggleShouldTrackLocation}>
              { i18n.t( shouldTrackLocation ? 'disable' : 'enable' ) }
            </Button>
          </Card.Actions>
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